<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$itemId = $myData->itemId;
$newItem  = $myData->newItem;
$brand = $myData->brand;
$unit = $myData->unit;

$gst = $myData->gst;
$unitPrice = $myData->unitPrice;
$purchaseRate = $myData->purchaseRate;
$sellingPrice = $myData->sellingPrice;
$discount = $myData->discount;

$sql = "INSERT INTO item_master VALUES ('$itemId', '$newItem', '$brand', '$unit', '$unitPrice')";

$flag = FALSE;
if ($conn->query($sql) === TRUE) {
 $flag = TRUE;
}else{
    $flag = false;
}

$sql1 = "INSERT INTO item_price_details VALUES ('$itemId', '$newItem', '$brand', '$unitPrice', '$purchaseRate', '$sellingPrice', '$discount', '$gst')";
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
