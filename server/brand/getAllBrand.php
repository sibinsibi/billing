<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$sql = "SELECT * from brand_master";
$result = $conn->query($sql);

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{"brand_id":"'  . $rs["brand_id"] . '",';
  $outp .= '"brand_name":"'  . $rs["brand_name"] . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();
echo($outp);
?>
