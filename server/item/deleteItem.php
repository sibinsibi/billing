<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$itemId = $myData->itemId;

$sql = "DELETE FROM item_master WHERE item_id = '$itemId'";

$sql1 = "DELETE FROM item_price_details WHERE item_id = '$itemId'";

$sql2 = "DELETE FROM stock_master WHERE item_id = '$itemId'";
$conn->query($sql2);

$flag = FALSE;
if ($conn->query($sql) === TRUE) {
 $flag = TRUE;
}else{
    $flag = false;
}

$flag1 = FALSE;
if ($conn->query($sql1) === TRUE) {
 $flag1 = TRUE;
}else{
    $flag1 = false;
}
$res = array('flag' => $flag && $flag1);
$conn->close();
echo json_encode($res);
?>