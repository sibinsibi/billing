<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$sql = "SELECT * from company_details  ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);
$outp = '';
if(mysqli_num_rows($result) !== 0){
  
  $rs = $result->fetch_array(MYSQLI_ASSOC);
  $outp .= '{"name":"'  . $rs["name"] . '",';
  $outp .= '"mob":"'  . $rs["mob"] . '",';
  $outp .= '"land_phone":"'  . $rs["land_phone"] . '",';
  $outp .= '"email":"'  . $rs["email"] . '",';
  $outp .= '"gst_no":"'  . $rs["gst_no"] . '",';
  $outp .= '"address1":"'  . $rs["address1"] . '",';
  $outp .= '"address2":"'  . $rs["address2"] . '",';
  $outp .= '"place":"'  . $rs["place"] . '",';
  $outp .= '"pin":"'  . $rs["pin"] . '",';
  $outp .= '"brand_name":"'  . $rs[""] . '"}';
  
}

$outp ='{"records":['.$outp.']}';
$conn->close();
echo($outp);
?>