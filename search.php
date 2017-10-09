



<?php
if(isset($_POST["value"])){

$output = '';
$value = $_POST["value"];
require_once("connection.php");
$query = 
"SELECT images.catalog, images.ser_name,  GROUP_CONCAT( tags.name_tags ) AS genre 
FROM images 
INNER JOIN tags_image ON images.id = tags_image.id_image 
LEFT JOIN tags ON tags_image.id_tags = tags.id 
WHERE tags.name_tags = '".$value."'
GROUP BY images.id ";
$result = mysqli_query($con,$query);
if(mysqli_num_rows($result) > 0)  
      {  
      	while ($data = mysqli_fetch_array($result)) {

  $output .= '
  <div class="col-lg-3 photo text-center" >
	
<img src="'.$data{'catalog'}.'/'.$data{'ser_name'}.'" height="170"   alt="">
	
</div>';

}
$query1="SELECT * FROM  `tags` WHERE name_tags =  '".$value."' LIMIT 0 , 30";
$result1= mysqli_query($con,$query1);
$row = mysqli_fetch_array($result1);
$view = $row['view'];
$view=$view+1;
$query2="UPDATE tags set view = '".$view."' WHERE name_tags =  '".$value."'";
mysqli_query($con,$query2);
}
 else  
      {  
           $output .= '  
                <tr>  
                     <td colspan="5">No Order Found</td>  
                </tr>  
           ';  
      } 
      }
      else{ echo "Data not was to send";} 
echo $output;




?>