import json
import requests
from bs4 import BeautifulSoup

def hello(data):
    backtext = 'Hello world!\ndata:' + str(data) + '\n'
    print(data)
    # print(context)
    return backtext

def get_list_from_api(title):
    print("title:" + title)
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
    data_data  = { 
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
    data_data['variables']['filter']['moreLikeThis']['like'] = title
    data = json.dumps(data_data)
    try:
        r = requests.post("https://cofacts-api.g0v.tw/graphql", headers=headers, data=data)
        r.encoding = 'utf8'
        print(str(r))
    except:
        print('\033[33m Error! \033[0m')
        return 'error'
    else:
        print('\033[33m Success! \033[0m')
        json_data = json.loads(r.text)
        json_data = json_data['data']['ListReplies']['edges']
        # reply = data_process(str(json_data))
        return data_process(json_data)

def data_process(json_data):
    data = json_data
    output = []
    for i in data:
        text = i['node']['text']
        text_type = i['node']['type']
        creator = i['node']['user']['name']
        createdTime = i['node']['createdAt']
        output.append({"text": text, "text_type": text_type, "creator": creator, "createdTime": createdTime})
    return output

# functions-framework --target=hello_method
# curl -X POST -H "Content-Type: application/json" -d '{"title" : "tttt"}' localhost:8080
def hello_method(request):
    from flask import abort

    if request.method == 'GET':
        output = 'You can try using POST method!'
        return output
    elif request.method == 'POST':
        print(request.data)
        my_json = request.data.decode('utf8').replace("'", '"')
        data = json.loads(my_json)
        print(data['title'])
        output = get_list_from_api(data['title'])
        if output == 'error':
            return abort(500)
        else:
            return str(output)
    else:
        return abort(403)