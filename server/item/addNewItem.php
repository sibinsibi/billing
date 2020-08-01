<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$itemId = $myData->itemId;
$newItem  = $myData->newItem;
$brand = $myData->brand;
$unit = $myData->unit;


$sql = "INSERT INTO item_master VALUES ('$itemId', '$newItem', '$brand', '$unit')";

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
