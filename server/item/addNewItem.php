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

$sql = "INSERT INTO item_master (item_id, item_name, brand, unit, unit_price) VALUES ('$itemId', '$newItem', '$brand', '$unit', '$unitPrice')";

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

$sql2 = "SELECT brand_name from brand_master where brand_name = '$brand'";
$result = $conn->query($sql2);

if(mysqli_num_rows($result) == 0){
    $sql3 = "SELECT *from brand_master ORDER BY id DESC LIMIT 1";
    $result = $conn->query($sql3);
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        $id = $rs['brand_id'];
    }
    preg_match_all('/([\d]+)/', $id, $match);
    $id = (double)$match[0][0];
    $id = $id + 1;
    $id = 'BRD'.$id;
    
    $sql4 = "INSERT INTO brand_master (brand_id, brand_name) VALUES ('$id', '$brand')";
    $conn->query($sql4);

}

$res = array('flag' => $flag && $flag1);
$conn->close();
echo json_encode($res);
?>
