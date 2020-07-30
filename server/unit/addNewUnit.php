<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$unitId = $myData->unitId;
$unitName  = $myData->unitName;

$sql = "INSERT INTO unit_master (unit_id, unit_name) VALUES ('$unitId', '$unitName')";

$flag = FALSE;
if ($conn->query($sql) === TRUE) {
 $flag = TRUE;
}else{
    $flag = false;
}
$res = array('flag' => $flag);
$conn->close();
echo json_encode($res);
?>
