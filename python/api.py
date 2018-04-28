import requests
import pymongo
import json
from bson import json_util
from pymongo import MongoClient

sources = json.load(open('sources.json'))
for source in sources:
    #obtener data de API MinFin
    params = {
        'sql': 'SELECT * FROM "'+source["codeSource"] +'" limit 10', 
    }
    req = requests.get(
        source["apiUrl"],
        params=params)
    data = req.text
    #conectar a db mongo...
    client = MongoClient('mongo', 27017)
    db = client[source["db"]]
    collection = db[source["collection"]]
    data = json_util.loads(data)
    result = collection.insert_one(data)
    print(result)
exit
