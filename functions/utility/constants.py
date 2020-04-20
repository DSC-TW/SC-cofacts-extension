url = "https://cofacts-api.g0v.tw/graphql"

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

replies_data  = {
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
