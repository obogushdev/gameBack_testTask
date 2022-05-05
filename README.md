## Description

Test task

## Installation
1. Clone or download the repo and go to project catalog
2. Create .env file and fill it like .env_example

## Variant 1 - run with Docker 
3. Run next commands one by one
```bash
$ docker-compose build
$ docker-compose up -d
```

To run ony DB image use 
```bash
$ docker-compose up -d db
```

To run ony app image use 
```bash
$ docker-compose up -d web
```

## Variant 2 - run with native Node.js and MySQL DB

### Prerequisites
    node.js (16.x)
    npm
    mySql server

3. Run you db server
4. Run next commands one by one
```bash
$ npm run start:prod
```

## Fill tables with fake data
    
 After first run You can fill database with test data, to do this use route /init-data \
 ex. http://127.0.0.1:3000/init-data \
 If table are empty they'll be filled by simple test data


## Task routes
Visit route /swagger-api/#/ for whole list of available endpoints
ex.: http://127.0.0.1:3000/swagger-api/

 [method:GET] /catalog - get array of all rows from Catalog table

 [method: POST] /byProduct - perform buying of product by user
```bash
 request body 
 {
  "id": 12,
  "address": "User1"
}
```


