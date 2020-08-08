<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$cId = $myData->cId;
$cName = $myData->cName;
$mob = $myData->mob;
$address = $myData->address;

$sql = "UPDATE customer_master SET c_name ='$cName', mob= '$mob', address='$address' WHERE c_id = '$cId'";

$flag = FALSE;
if ($conn->query($sql) === TRUE) {
 $flag = TRUE;
}else{
    $flag = FALSE;
}
$res = array('flag' => $flag);
$conn->close();
echo json_encode($res);
?>
