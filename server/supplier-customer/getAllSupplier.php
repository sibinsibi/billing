<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$sql = "SELECT * from supplier_master";
$result = $conn->query($sql);

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{"s_id":"'  . $rs["s_id"] . '",';
  $outp .= '"s_name":"'  . $rs["s_name"] . '",';
  $outp .= '"mob":"'  . $rs["mob"] . '",';
  $outp .= '"gst_no":"'  . $rs["gst_no"] . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();
echo($outp);
?>
