# Python code to illustrate
# inserting data in MongoDBS
import json
from pymongo import MongoClient
import pandas as pd

try:
	conn = MongoClient()
	print("Connected successfully!!!")
except:
	print("Could not connect to MongoDB")

# database
db = conn.DATA_LAKE_WEB_SCRAPPING_LEGAL_SEARCH

# Created or Switched to collection names: tweetsTable userTable
collectionLinks = db.links
collectionTexts = db.texts
allTexts = collectionTexts.find()

print(allTexts[0])
data = []
i = 0
for sentence in allTexts:
	i = i + 1
	data.append([sentence['_id'],sentence['linkURL'], sentence['textDocument'], sentence['keyword']])
	print(i)

    


df = pd.DataFrame(data, columns=['id', 'linkUrl','text','topic'])
df.to_csv('df.csv',index=False, sep='@')