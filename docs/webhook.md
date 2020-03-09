---
id: webhook
title: Receiving Notifications
sidebar_label: Notifications
---

Aver allows end consumers to receive Active Notifications via Webhooks.

## 1. Configure your Webhook Endpoint for Notifications
<ol>
<li>Navigate to Settings -> Integration</li>
<li>Configure the URL of your Webhook listener endpoint (Aver will POST to this endpoint)</li>
<li>Optionally add a security header key and security header value to be provided with each request from Aver to your endpoint</li>
<li>Configure the types of notifications you want to receive</li>
</ol>

<p>
<img src="https://raw.githubusercontent.com/goaver/api-integration/master/images/webhooks.jpg"></img>
</p>

## 2. Test your configuration
<p>
<b>Protip:</b> To test the requests coming from Aver to know what to expect to your endpoint and to test your configuration, https://webhook.site provides temporary endpoint for testing to give full visibility
</p>

### Example Header
```
content-type: application/json
authorization: my_security_header_value
```

### Example Message content
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

### Message Parameters
- <b>type</b> - The type of the entity (LiveCheck, OfflineCheck, WatchlistSearch, RecurringWatchlistSearch)

- <b>id</b> - The id of the entity with the status change

- <b>groupId</b> - The group id of the entity with the status change

- <b>status</b> - The updated status (Complete, Rejected, Failed)
