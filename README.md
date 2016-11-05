# Metro-Out-Performance
"Metro Out Performance" is a small engine in which .csv file is read using Express.js and dumped into SQlite3.

1- Creates schema of ORDER table and METRO_AREAS table in SQlite3.
2- Reads from .csv using Node.js and Express.js.
3- Inserts read csv data into mentioned tables.


## INSTRUCTIONS:

- Open command line in ROOT directory and type:
            
            node server.js

- Use POSTMAN for APIs calls testing and run below APIs.
            
            To dump data in  Metro_Area table from .csv to sqlite:
            http://localhost:3007/metro_areas

            To dump data in  ORDER table from .csv to sqlite:
            http://localhost:3007/orders

            To check Metro_Area output from SQlite3
            http://localhost:3007/showMetro

            To check ORDER output from SQlite3
            http://localhost:3007/showOrders


## TECHNOLOGIES:
- Node.js
- Express.js
- SQlite3