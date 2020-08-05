<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$sql = "SELECT * from gst";
$result = $conn->query($sql);

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{"percentage":"'  . $rs["percentage"] . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();
echo($outp);
?>
