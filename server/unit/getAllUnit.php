<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$sql = "SELECT * from unit_master";
$result = $conn->query($sql);

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{"unit_id":"'  . $rs["unit_id"] . '",';
  $outp .= '"unit_name":"'  . $rs["unit_name"] . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();
echo($outp);
?>
