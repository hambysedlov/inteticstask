<?php

   require('connection.php');

   $sql = "SELECT * FROM images
         WHERE ID < '".$_GET['last_id']."' ORDER BY ID DESC LIMIT 5"; 

  $result = mysqli_query($con,$sql);
if(mysqli_num_rows($result)>0){
   $json = include('data.php');
    return json_encode($json);
   }
   else{
   	$json = 1;
   	 echo json_encode($json);
   }
  
?>