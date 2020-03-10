---
id: webhook
title: Active Notifications
sidebar_label: Active Notifications
---

Aver can send active notifications via webhooks and / or e-mail about the checks created and completed within an organization.  This removes the overhead of manually polling the API to retrieve the status of a given check and actively notifies you when results are available for the check.

### Configure Notification Options
<ol>
   <li>Login to the Aver portal</li>
   <li>Go to Settings under your organization in the left nav bar</li>
   <li>Set your desired notification types and delivery mechanism</li>
</ol>

### Configure E-Mail Notifications
<ol>
<li>Specify the delivery e-mail address</li>
<li>Configure the types of notifications you want to receive</li>
</ol>

### Configure Webhook Notifications
To receive notifications via webhook, you must configure an endpoint on your site that can receive POST requests.  After you have an endpoint running that can receive messages from Aver, simply set the configuration to send messages to that endpoint.
#### Configure an Endpoint
<ol>
<li>Configure the URL of your Webhook listener endpoint (Aver will POST to this endpoint)</li>
<li>Optionally add a security header key and security header value to be provided with each request from Aver to your endpoint</li>
<li>Configure the types of notifications you want to receive</li>
</ol>

<p>
<img src="https://raw.githubusercontent.com/goaver/api-integration/master/images/webhooks.jpg"></img>
</p>

#### Test the Configuration
<p>
<b>Protip:</b> To test the requests coming from Aver to know what to expect to your endpoint and to test your configuration, https://webhook.site provides temporary endpoint for testing to give full visibility
</p>

##### Example Header
```
content-type: application/json
authorization: my_security_header_value
```

##### Example Message content
```
{
   "statusMessage":{
      "type": "LiveCheck",
      "id": "12345",
      "groupId": " 12345",
      "status": "Completed"
   }
}
```

##### Message Parameters
- <b>type</b> - The type of the entity (LiveCheck, OfflineCheck, WatchlistSearch, RecurringWatchlistSearch)

- <b>id</b> - The id of the entity with the status change

- <b>groupId</b> - The group id of the entity with the status change

- <b>status</b> - The updated status (Complete, Rejected, Failed)
