<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);


$itemId = $myData->itemId;
$itemName  = $myData->itemName;
$brand = $myData->brand;
$unit = $myData->unit;

$flag1 = FALSE;

if($unit){
    $unitPrice = $myData->unitPrice;
    $sql = "UPDATE item_price_details SET unit_price ='$unitPrice' WHERE item_id = '$itemId'";
    if ($conn->query($sql) === TRUE) {
    $flag1 = TRUE;
    }else{
        $flag1 = FALSE;
    }

}

$sql = "UPDATE item_master SET item_name ='$itemName', brand= '$brand', unit='$unit', unit_price ='$unitPrice'  WHERE item_id = '$itemId'";

$flag = FALSE;
if ($conn->query($sql) === TRUE) {
 $flag = TRUE;
}else{
    $flag = FALSE;
}
$res = array('flag' => $flag && $flag1);
$conn->close();
echo json_encode($res);
?>
