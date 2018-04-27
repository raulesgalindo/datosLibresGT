import requests
import pymongo
from bson import json_util
from pymongo import MongoClient


#obtener data de API MinFin
params = {
    'sql': 'SELECT * FROM "105c966a-b71f-4db6-8e8e-caacca249823" limit 10', #Limite para no cargar todo
}
req = requests.get(
    'https://datos.minfin.gob.gt/api/3/action/datastore_search_sql',
    params=params)
data = req.text
#conectar a db mongo...
client = MongoClient('localhost', 27017)
db = client.presupuesto
posts = db.posts
data = json_util.loads(data)
result = posts.insert_one(data)
print(result)
