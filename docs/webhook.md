# Receiving Active Notifications via Webhooks

## 1. Configure your Webhook Endpoint for Notifications
1. Navigate to Settings -> Integration
2. Configure the URL of your Webhook listener endpoint (Aver will POST to this endpoint)
3. Optionally add a security header key and security header value to be provided with each request from Aver to your endpoint
4. Configure the types of notifications you want to receive

<p align="center">
<img src="../images/webhooks.jpg?raw=true?raw=true" width="450px">
</p>

## 2. Test your configuration
<p>
<b>Protip:</b>  To test the requests coming from Aver to know what to expect to your endpoint and to test your configuration, https://webhook.site provides temporary endpoint for testing to give full visibility
</p>

### Example Header
<pre>
content-type: application/json
authorization: my_security_header_value
</pre>

### Example Message content
<pre>
{
   "statusMessage":{
      "type": "LiveCheck",
      "id": "12345",
      "groupId": " 12345",
      "status": "Completed"
   }
}
</pre>

### Message Parameters
- <b>type</b> - The type of the entity (LiveCheck, OfflineCheck, WatchlistSearch, RecurringWatchlistSearch)

- <b>id</b> - The id of the entity with the status change

- <b>groupId</b> - The group id of the entity with the status change

- <b>status</b> - The updated status (Complete, Rejected, Failed)
