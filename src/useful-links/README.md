# Performance calculator

## Steps to use

1. Send a GET request to the endpoint (api/links) to get the list of useful links provided in links.json file.

2. New links can be added to the links.json file directly, without needing to restart the service.

3. You can also send a POST request to the endpoint (api/links) to add a link entry.

## Sample Request

```
  {
    "name": "Docker Compose Documentation",
    "details": "Documentation to help understand Docker Compose.",
    "url": "https://docs.docker.com/compose/"
  }
```
