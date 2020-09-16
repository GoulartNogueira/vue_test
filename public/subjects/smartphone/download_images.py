#!/usr/bin/env python
# -*- coding: utf-8 -*-
import io
import os
f= open("./new.json","r")

text = f.read().decode('utf8')
f.close()

import json

j = json.loads(text)
#j = eval(text[:-1])

print (j[0])
print (j[0]['image_src'])
print (j[0]['image_src'][22:28])

for i in j:
    #i.update({"id":i['link_href'].split('/')[5][1:]})
    #f.write(i)
    #print(i)
    image_src = str(i['image_src'])
    #print(image_src)
    image_id = image_src[22:28]
    print(image_id)
    image_to = "./item images/"+image_id+".jpg"
    if os.path.exists(image_to):
        continue
    print "downloading",image_src,"to",image_to
    import time
    time.sleep(1)
    import requests

    print "DONE"

    with open(image_to, 'wb') as handle:
        response = requests.get(image_src, stream=True)

        if not response.ok:
            print response

        for block in response.iter_content(1024):
            if not block:
                break

            handle.write(block)

with io.open('./new2.json', 'w', encoding='utf8') as json_file:
    data = json.dumps(j, ensure_ascii=False, encoding='utf8')
    json_file.write(unicode(data))
