# Performance calculator

## Steps to use

1. Send a GET request to the endpoint (api/credentials-manager) to get the list of modules and their credentials.

2. Send a POST request to the endpoint (api/credentials-manager) to add new credentials.

3. Send a PUT request to the endpoint (api/credentials-manager/{credentialId}) to update credentials.

## Sample Request

```
 {
    "name": "Aeris",
    "integrationName": "aeris",
    "originCountry": "US",
    "devUsername": "aerisdev+US@test.com",
    "devPassword": "aerispassword",
    "stagingUsername": "aeristest+US@stage.com",
    "stagingPassword": "securepass",
    "lastUpdated": "2023-08-15T10:22:45.123Z"
  }
```

4. To delete any credentials, send a DELETE request to the endpoint (api/credentials-manager/{credentialId}).
