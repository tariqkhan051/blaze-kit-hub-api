# Samples Generator

This project will help in generating samples from Postman. Each sample folder will be created with the name of the postman request, containing the following files:
    a. Request
    b. Response
    c. Logs
    d. Label file (for createLabel requests)

## Steps To Use

## Changes when deploying module 

1. Update the logger file on deployment. You can check sample logger files on the following path:
`H:\Documents\ShipEngine\SamplesGenerator\DEV`

2. Replace {TEAM_NAME} with your team's folder name on BARI-001.

3. Replace {instance_name} with your module's instance name provided in relay. You can check instance name from here:
http://dev-35/seapps/deployments  

***Note: Do not change anything else in the path provided in sample logger file. Otherwise log files won't be copied to samples folder. 


## Generate samples from Postman
1. Put all the requests you want to generate samples for, in a postman collection.

2. Go to the `Tests` tab of the collection and add the script given below:

## Script starts
let opts = {
    name: request.name || request.url,
    url: request.url,
    generateResultsSheet: false, //whether an excel sheet should be generated or not   
    fileExtension: 'txt', //optional - extension of request and response files. can be set to 'json'
    responseData: pm.response.text(),
    requestData: pm.request.toJSON().body.raw, 
    responseFileName: 'test_response', //optional - default value is 'response'
    requestFileName: 'test_request',  //optional - default value is 'request'
    moduleName: '{instance-name}', //mandatory (will be same as in http://bari-002:3937/{instance-name}/method)
    logFilePath: '//192.168.1.3/Deployment/SE/{team-name}/Logs', //mandatory, path from where log files will be picked
    samplesPath: '//192.168.1.3/Deployment/SE/{team-name}/Samples' //mandatory, else samples won't be generated
};

pm.sendRequest({
    url: 'http://bari-002:5469/internal-se/samples/write',
    method: 'POST',
    header: 'Content-Type:application/json',
    body: {
        mode: 'raw',
        raw: JSON.stringify(opts)
    }
}, function (err, res) {
    console.log(res);
});
## Script ends

3. Replace the `{instance-name}` and `{team-name}` with your module's instance and team's name. 

4. Run your test cases as usual. Samples will be generated on the provided samplesPath. 

## Note: 
If you update any request and want to create it's sample again, simply run that request and the sample folder will be updated with latest data. However, if the request has been added to the excel file previously, you'll have to manually remove the column having old entry. 


## Additionally
Instead of moving each request under one collection, you can copy the script given above, to the `Tests` tab of any request or even a specific folder.

**Note:** To access the `Tests` script of a collection:
1. Right Click on collection in the sidebar.
2. Click on `Edit`
3. Go to `Tests` tab.


## For excel file generation

1. Set `generateResultsSheet: true` in the script given above. 

2. Run the collection from postman. An excel file will be created in the samples folder with the data sent in each request.

## Note: 
The script appends data to the excel file if it already exists. To generate a new sample file, delete the previous one and run the collection from postman again. 