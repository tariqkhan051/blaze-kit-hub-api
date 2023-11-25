<%= projectFolder %>

==========================

<%= projectNameValue %>

- origin: **add origin country here**
- destination: **add destination country here**

<%= projectNameValue %> is an API carrier. It offers <%=servicesAnswers.length%> <%=servicesAnswers.length > 1 ? "services": "service"%>:

<% servicesAnswers.forEach(function(answer){-%>
- <%- answer %>
<% });-%>

Supported Label types are:

- ZPL
- PDF
- PNG

The following values need to be captured:

- **add values to capture here**

We are getting <%= projectNameValue %> API URL from environment variable and if environment variable is not available then default value will be **<%= apiUrl %>**

Instructions to run app locally:

1. Need to make sure NodeJs is installed on machine
2. Open Command Prompt(CMD) in admin mode and run the following commands:
   - npm install --global @shipengine/connect
3. Go to workspace e.g: (integrations-abol\shipping\modules\<%= projectFolder %>)
4. Run following command to start the application
   - connect start

Instructions to publish app on ShipStation UI:

1. After local testing from the root of your project run the following command
   - connect publish
2. Once all the tests executed by the CLI are passing, your application will be packaged and published to shipstation development environment and you will be provided with url and credentials to test it on shipstation UI.
