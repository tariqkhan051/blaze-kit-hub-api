<% splitMethodsAnswers.forEach(function(method){-%>
export * from "./<%- method %>/<%- method %>"
<% });%>
