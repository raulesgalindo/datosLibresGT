import requests
import pymongo
import json
from bson import json_util
from pymongo import MongoClient

sources = json.load(open('sources.json'))

for source in sources:
    client = MongoClient('mongo', 27017)
    offset = 0
    batchSize = int(source["batchSize"])
    #obtener data de API MinFin
    params = {
        'sql': 'SELECT COUNT(*) FROM "'+source["codeSource"] +'"'
    }
    req = requests.get(
        source["apiUrl"],
        params=params)
    recordsCount = int(json.loads(req.content)["result"]["records"][0]["count"])
    while offset < recordsCount:
        params = {
        'sql': 'SELECT * FROM "'+source["codeSource"] +'" OFFSET '+ str(offset) +' ROWS LIMIT '+ str(batchSize) 
        }
        req = requests.get(
        source["apiUrl"],
        params=params)
        #conectar a db mongo...
        db = client[source["db"]]
        collection = db[source["collection"]]
        documents = json.loads(req.content)["result"]["records"]
        for document in documents:
            filter = {'_id': document["_id"]}
            result = collection.update(filter, document, upsert= True)
            print(result)
        offset += batchSize
    client.close()
exit
