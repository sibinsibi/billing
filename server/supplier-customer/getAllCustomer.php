<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$sql = "SELECT * from customer_master";
$result = $conn->query($sql);

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{"c_id":"'  . $rs["c_id"] . '",';
  $outp .= '"c_name":"'  . $rs["c_name"] . '",';
  $outp .= '"mob":"'  . $rs["mob"] . '",';
  $outp .= '"address":"'  . $rs["address"] . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();
echo($outp);
?>
