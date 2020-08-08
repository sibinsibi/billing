<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$cId = $myData->cId;
$cName = $myData->cName;
$mob = $myData->mob;
$address = $myData->address;

$sql = "INSERT INTO customer_master VALUES ('$cId', '$cName', '$mob', '$address')";

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
