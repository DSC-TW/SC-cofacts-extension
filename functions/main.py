import json
import requests
from utility.constants import url,headers,replies_data

def _get_replies_from_api(title):
    print("title:" + title)
    replies_data['variables']['filter']['moreLikeThis']['like'] = title
    data = json.dumps(replies_data)
    try:
        response = requests.post(url, headers=headers, data=data)
        response.encoding = 'utf8'
        print(response.status_code)
    except:
        print('\033[33m Error! \033[0m')
        return {'status': response.status_code}
    else:
        print('\033[33m Success! \033[0m')
        json_data = json.loads(response.text)
        json_data = json_data['data']['ListReplies']['edges']
        return {'status': response.status_code, 'content':_replies_data_process(json_data)}

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

def get_replies(request):
    from flask import abort

    if request.method == 'POST':
        my_json = request.data.decode('utf8').replace("'", '"')
        data = json.loads(my_json)
        return str(_get_replies_from_api(data['title']))
    else:
        return abort(403)

if __name__ == "__main__":
    get_replies(request)