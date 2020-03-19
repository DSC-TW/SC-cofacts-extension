import json
import requests

headers = {
    "Connection": "keep-alive",
    "accept": "*/*",
    "x-app-id": "RUMORS_SITE",
    "DNT": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.62 Safari/537.36",
    "content-type": "application/json",
    "Origin": "https://cofacts.g0v.tw",
    "Sec-Fetch-Site": "same-site",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Referer": "https://cofacts.g0v.tw/",
    "Accept-Language": "zh-TW,zh;q=0.9,en;q=0.8"
}

def get_replies_from_api(title):
    print("title:" + title)
    data  = {
        'operationName': 'ListReplies', 
        'variables': { 
            'filter': { 
                'moreLikeThis': { 
                    'like': 'N/A', 
                    'minimumShouldMatch': '0' 
                    } 
                }, 
        'orderBy': [{ 
            '_score': 'DESC' 
            },{ 
            'createdAt': 'DESC' 
            }]
        }, 
        'query': 'query ListReplies($filter: ListReplyFilter, $orderBy: [ListReplyOrderBy], $before: String, $after: String) { ListReplies(filter: $filter, orderBy: $orderBy, before: $before, after: $after, first: 10) { edges { node {  ...ReplyItem  __typename } cursor __typename } __typename } }  fragment ReplyItem on Reply { id text type createdAt user { id name __typename } articleReplies(status: NORMAL) { articleId replyId __typename } __typename } ' 
    }
    data['variables']['filter']['moreLikeThis']['like'] = title
    data = json.dumps(data)
    try:
        url = "https://cofacts-api.g0v.tw/graphql"
        r = requests.post(url, headers=headers, data=data)
        r.encoding = 'utf8'
        print(r.status_code)
    except:
        print('\033[33m Error! \033[0m')
        return {'status': r.status_code}
    else:
        print('\033[33m Success! \033[0m')
        json_data = json.loads(r.text)
        json_data = json_data['data']['ListReplies']['edges']
        return {'status': r.status_code, 'content':replies_data_process(json_data)}

def replies_data_process(json_data):
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

    if request.method == 'GET':
        output = 'You can try using POST method!'
        return output
    elif request.method == 'POST':
        my_json = request.data.decode('utf8').replace("'", '"')
        data = json.loads(my_json)
        return str(get_replies_from_api(data['title']))
    else:
        return abort(403)

if __name__ == "__main__":
    get_replies(request)