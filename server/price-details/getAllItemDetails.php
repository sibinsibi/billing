<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$sql = "SELECT * from item_price_details";
$result = $conn->query($sql);

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{"item_id":"'  . $rs["item_id"] . '",';
  $outp .= '"name":"'  . $rs["name"] . '",';
  $outp .= '"brand":"'  . $rs["brand"] . '",';
  $outp .= '"unit_price":"'  . $rs["unit_price"] . '",';
  $outp .= '"purchase_rate":"'  . $rs["purchase_rate"] . '",';
  $outp .= '"selling_price":"'  . $rs["selling_price"] . '",';
  $outp .= '"discount":"'  . $rs["discount"] . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();
echo($outp);
?>
