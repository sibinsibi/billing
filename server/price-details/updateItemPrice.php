<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);


$itemId = $myData->itemId;
$unitPrice = $myData->unitPrice;
$purchaseRate = $myData->purchaseRate;
$sellingPrice = $myData->sellingPrice;
$discount = $myData->discount;
$gst = $myData->gst;

$sql = "UPDATE item_price_details SET unit_price ='$unitPrice', purchase_rate= '$purchaseRate', selling_price='$sellingPrice', discount='$discount', gst='$gst'  WHERE item_id = '$itemId'";

$flag = FALSE;
if ($conn->query($sql) === TRUE) {
 $flag = TRUE;
}else{
    $flag = FALSE;
}

$sql = "UPDATE item_master SET unit_price ='$unitPrice'  WHERE item_id = '$itemId'";

$flag1 = FALSE;
if ($conn->query($sql) === TRUE) {
 $flag1 = TRUE;
}else{
    $flag1 = FALSE;
}
$res = array('flag' => $flag && $flag1);
$conn->close();
echo json_encode($res);
?>
