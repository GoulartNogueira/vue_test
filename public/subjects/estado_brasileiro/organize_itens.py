#!/usr/bin/env python
# -*- coding: utf-8 -*-
import io

f= open("./items.js","r")
for x in range(12):
    f.readline()

text = f.read().decode('utf8')
f.close()

import json

#j = json.loads(text[:-1])
j = eval(text[:-1])


print (j[0])
print (j[0]['image_src'])
print (j[0]['image_src'][22:28])

for i in j:
    i.update({"id":i['link_href'].split('/')[5][1:]})
    #f.write(i)

with io.open('./new.json', 'w', encoding='utf8') as json_file:
    data = json.dumps(j, ensure_ascii=False, encoding='utf8')
    json_file.write(unicode(data))

print "DONE"