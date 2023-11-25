import { CarrierApp } from "@shipengine/connect-carrier-api";
import {<% uppercaseMethodsAnswers.forEach(function(method) { %>
  <%- method %>, <% }); %>
} from "./methods";
import { Metadata } from "./definitions";

export default new CarrierApp({
  Metadata, <% uppercaseMethodsAnswers.forEach(function(method) {%>
  <%-method %>, <% }); %>
});
