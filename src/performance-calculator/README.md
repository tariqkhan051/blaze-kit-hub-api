# Performance calculator

## Steps to use
1. Send a POST request to the endpoint (internal-se/perf) with a request similar to the one given below. 

## Sample Request

{
    "request": {
        "transaction_id": "08082113-9548-49a8-bc99-b0afe77a09d5",
        "metadata": {
            "username": "200900001",
            "password": "9886142696",
            "clientId": "88888888889000"
        },
        "service_code": "dpd_classic_international",
        "bill_shipping_to": {
            "bill_to_party": "shipper"
        },
        "ship_to": {
            "name": "UK's Products",
            "address_lines": [
                "Calea Vitan",
                "55-59"
            ],
            "postal_code": "10405",
            "city_locality": "Berlin",
            "country_code": "DE",
            "email": "Umair@gmail.com",
            "phone_number": "+611800787555"
        },
        "label_format": "ZPL",
        "label_layout": "4x6",
        "packages": [
            {
                "package_code": "Tubes",
                "dimension_details": {
                    "source_dimensions": {
                        "length": 1,
                        "width": 1,
                        "height": 1
                    },
                    "source_dimensions_unit": "centimeters"
                },
                "weight_details": {
                    "source_weight": 1,
                    "source_weight_unit": "grams"
                },
                "customs": {
                    "contents": "returned_goods"
                }
            }
        ]
    },
    "scenarios": [
        {
            "regex": "console.log(/^ZPL$/i.test(request.label_format))"
        },
        {
            "native": "console.log(request.label_format?.toUpperCase() === \"ZPL\")"
        }
    ],
    "endpoints": [
        {
            "enpoint1": {
                "url": "http://bari-002:3937/dpd-romania-ts/CreateLabel"
            }
        },
        {
            "enpoint2": {
                "url": "http://bari-002:3937/dpd-romania-master/CreateLabel"
            }
        }
    ],
    "iterationsCount": 100
}