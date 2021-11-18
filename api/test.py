from db import Database

db = Database('contacts.db')

list = []
   
for row in db.fetch():
    list.append(row)

print(list)
