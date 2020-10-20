<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$sql = "SELECT * from stock_master, item_master where stock_master.item_id = item_master.item_id";
$result = $conn->query($sql);

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{"item_id":"'  . $rs["item_id"] . '",';
  $outp .= '"item_name":"'  . $rs["item_name"] . '",';
  $outp .= '"brand":"'  . $rs["brand"] . '",';
  $outp .= '"unit":"'  . $rs["unit"] . '",';
  $outp .= '"stock1":"'  . $rs["stock"] . '"}';

}
$outp ='{"records":['.$outp.']}';
$conn->close();
echo($outp);
?>