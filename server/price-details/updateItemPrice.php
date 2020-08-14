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

$sql = "UPDATE item_price_details SET unit_price ='$unitPrice', purchase_rate= '$purchaseRate', selling_price='$sellingPrice', discount='$discount'  WHERE item_id = '$itemId'";

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
