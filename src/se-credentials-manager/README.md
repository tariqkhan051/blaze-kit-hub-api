# Performance calculator

## Steps to use

1. Send a GET request to the endpoint (internal-se/se-credentials) to get the list of ShipEngine modules and their credentials.

2. Send a POST request to the endpoint (internal-se/se-credentials) to add ShipEngine module credentials.

3. Send a PUT request to the endpoint (internal-se/se-credentials/{credentialId}) to update credentials.

## Sample Request

```
{
	"name": "DPD HU",
	"devUsername": "appid+HU@test.com",
	"devPassword": "appid",
	"stagingUsername": "test+HU@auctane.com",
	"stagingPassword": "password",
	"testApiUrl": "https://test/api/v1.1/",
	"prodApiUrl": "https://test/api/v1.1/",
	"credentials": {
		"customer_id": "012",
		"token": "123"
	}
}
```

4. To delete any credentials, send a DELETE request to the endpoint (internal-se/se-credentials/{credentialId}).
