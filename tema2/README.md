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

#### What makes a great URL shortener?

URL shorteners make sharing long links more manageable. Say you want to provide a link on a business card, in an advertisement, or in another situation where hyperlinking isn't ideal. A shortened URL takes up less space, is more memorable and keeps your text tidy.

Another use case for shortened URLs is to create variations of a single link so you can easily track source traffic. For example, you might create one short URL to use on Twitter, a different one for Facebook, and a third to be used in an email newsletter.

Many URL shortening services offer comprehensive tracking tools that allow you to see who is clicking your link, where in the world they are located, and what language they speak. You can use this information to discern click-through rates, which browser your audience prefers, and what devices your content is accessed from. Some services even allow you to bring your own custom domain name for creating your own branded service.

There are many free URL shorteners. And most URL shorteners have a free tier of service, but you often have to pay for added features, such as metrics and customization. The URL shortening services that made the cut for this list are reliable and easy to use, and each one stands out as the "best" for a special reason.
