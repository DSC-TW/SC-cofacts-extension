import json
from flask import Flask, request, jsonify
import requests
from utility.constants import url,headers,replies_data
from flask import abort, request
from google.cloud import translate_v3

client = translate_v3.TranslationServiceClient()

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False

PROJECT_ID = "sc-cofacts"
LOCATION = "us-central1"


def _post_replies_from_api(title):
    replies_data['variables']['filter']['moreLikeThis']['like'] = title
    data = json.dumps(replies_data)
    try:
        response = requests.post(url, headers=headers, data=data)
        response.encoding = 'utf8'
    except:
        return  "", response.status_code
    else:
        json_data = json.loads(response.text)
        json_data = json_data['data']['ListReplies']['edges']
        return _replies_data_process(json_data), response.status_code

def _replies_data_process(json_data):
    data = json_data
    output = []
    for reply in data:
        text = reply['node']['text']
        text_type = reply['node']['type']
        creator = reply['node']['user']['name']
        createdTime = reply['node']['createdAt']
        output.append({"text": text, "text_type": text_type, "creator": creator, "createdTime": createdTime})
    return output

def _translate(to_be_translated_text, target_language_code):
    test = client.translate_text(
      parent=client.location_path(PROJECT_ID, LOCATION),
      mime_type="text/plain",
      contents=[to_be_translated_text],
      target_language_code=target_language_code
    )

    return test.translations[0].translated_text

def replies(request):
    try:
        data = request.get_json()
    except:
        return jsonify(message="No given data"), 406
    else:
        title = data['title']
        translated_title = _translate(title, 'zh-TW')
        body, status_code = _post_replies_from_api(translated_title)
        
        for respose in body:
          english_result = _translate(respose["text"], 'en')
          respose["text"] = english_result


        return jsonify(result=body), status_code

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=4040, debug=False)
