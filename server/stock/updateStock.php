<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$itemId = $myData->itemId;
$stock = $myData->stock;

$sql = "UPDATE stock_master SET stock ='$stock' WHERE item_id = '$itemId'";

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