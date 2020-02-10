<?php
//Get auth token params
$auth_url = 'https://app.goaver.com/api/auth/token';
$key = 'YOUR_API_KEY';
$secret = 'YOUR_API_SECRET';

//Endpoint params
$check_url = 'https://app.goaver.com/api/check/create';
$group_id = 'AVER_CHECK_GROUP_ID';

function getAuthToken($auth_url, $key, $secret){
   $ch = curl_init(); 
   curl_setopt($ch, CURLOPT_URL,$auth_url);
   curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
   curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);  
   curl_setopt($ch, CURLOPT_USERPWD, "$key:$secret");
   try{
       $result = curl_exec($ch);
       curl_close($ch); 
       $json = json_decode($result);
       $token =  $json->token;
       if(!$token)
       {
           echo 'Unable to get access token';
           return;
       }
       return $token;
   }
   catch (Exception $e) {
       echo 'Unable to get access token: ',  $e->getMessage(), "\n";
   }
}

function createCheck($check_url, $token, $group_id, $email, $third_party_identifier){
   $auth_header = "Authorization: Bearer ".$token;
   $post = (object) [
       'groupId' => $group_id,
       'thirdPartyIdentifier' => $third_party_identifier,
       'email' => $email
   ];

   $ch = curl_init();
   curl_setopt($ch, CURLOPT_URL, $check_url);
   curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $auth_header));
   curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
   curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($post)); 
   curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
   try{
      $result = curl_exec($ch);
      curl_close($ch); 
      $json = json_decode($result);
      $url = $json->url;
      if(!$url){
          echo 'Unable to create check: '.$result;
          return;
      }
      return $url;
   }
   catch (Exception $e) {
       echo 'Unable to create check: ',  $e->getMessage(), "\n";
   }
}

//Get a valid auth token
$token = getAuthToken($auth_url, $key, $secret);
if(!$token){
   return;
}

//Call the check create endpoint to get the link url
$third_party_identifier = 'THIRD_PARTY_IDENTIFIER';
$email = 'USER_EMAIL_ADDRESS';
$url = createCheck($check_url, $token, $group_id, $email, $third_party_identifier);
if(!$url){
   return;
}

//We can output a link to start the enrollment process
echo('<a href="'.$url.'">Verify Your Identity Here</a>');  
?>