
# [CC] Reddit thread analizer

## 3 API APP
| API | Description |
|--|--|
| Redit RSS | Retrieves an xml file containing the contents of that page |
| IBM Text tone analizer | Returns a JSON, that contains analitic data about a provided string |
|Quickchart|Generates a chart image|

## Dependencies
| Dependency | Descriptions |
|--|--|
| dotenv | Processes & parses information inside .env file |
| node-fetch | Enables the browser fetch api, in nodeJS |
| mongodb | Enables querry's to MongoDB database |

## Coding notes
|  |  |
|--|--|
| Routing | The app has a custom router, based on nodejs http module. The app first handles the method of the request in a switch case block, processes the query, or the body, depending on the method of the request, and forwards the request to another method that will handle it |
| File handling | Promise based fs default functions to avoid use of fs.sync  |

## Interface
The intereface is a simple HTML page with one input, for the reddit thread URL.
After an url is provided the server sends that url in 3 diferent API's processing the data, according to the one shown in the interface.
