FROM mongo:3.6.19-xenial
COPY rushing.json /rushing.json
CMD mongoimport --host mongo --jsonArray --db theRush --collection players --type json --file ./rushing.json --upsert