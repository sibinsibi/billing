<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);


$itemId = $myData->itemId;
$itemName  = $myData->itemName;
$brand = $myData->brand;
$unit = $myData->unit;
$gst = $myData->gst;

$sql = "UPDATE item_master SET item_name ='$itemName', brand= '$brand', unit='$unit', gst='$gst'  WHERE item_id = '$itemId'";

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
