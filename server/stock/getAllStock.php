<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$sql = "SELECT * from stock_master";
$result = $conn->query($sql);

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{"item_id":"'  . $rs["item_id"] . '",';
  $outp .= '"item_name":"'  . $rs["item_name"] . '",';
  $outp .= '"brand":"'  . $rs["brand"] . '",';
  $outp .= '"stock":"'  . $rs["stock"] . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();
echo($outp);
?>