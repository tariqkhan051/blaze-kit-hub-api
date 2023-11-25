<% splitPackagingAnswers.forEach(function(answer){-%>
export * from "./<%- answer %>"
<% });%>
