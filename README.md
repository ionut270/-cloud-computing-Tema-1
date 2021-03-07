## Homework 2 - RESTF-ul API
Create an application that provides a RESTFul API

- Use at least the following methods : `GET POST PUT DELETE`
- No frameworks !
- JSON comunication
- At least 2 routes for each method
- Resource based
- Intuitive API
- Respect idempotence & safeness of the methods ?
-  Proper status codes
- Persistent storage
- Create postman colection of requests
## Simple API ideas
### Method definitions for our API
| Method | Definition |
|--|--|
| GET | Retrieve server data, all operations should only read |
| POST | Creates new resources on the server, does not update/retrieve/delete 409 if rss exists |
| PUT | Updates resouces on the server. If a POST request fails because 409 a request to use PUT method is sent |
| DELETE | Removes resources on the server |
### Ideas
- URL shortener
Get for interface, 2 types of url's that can be removed or edited,

## Fancy URL shortener 
