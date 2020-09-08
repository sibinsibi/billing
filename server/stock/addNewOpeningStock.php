<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$itemId = $myData->itemId;
$itemName  = $myData->itemName;
$brand  = $myData->brand;
$stock  = $myData->stock;

$sql6 = "SELECT * from stock_master where item_id = '$itemId' ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql6);
    $sql8 = '';
if(mysqli_num_rows($result) == 0){
    
    $sql7 = "INSERT INTO stock_master (item_id, item_name, brand, stock) VALUES ('$itemId', '$itemName', '$brand', $stock)";
    $result = $conn->query($sql7);
}
else{
        
    $rs = $result->fetch_array(MYSQLI_ASSOC);
    $stock1 = $rs['stock'];
    $stock2 = $stock1 + $stock;

    $sql8 = "UPDATE stock_master SET stock = '$stock2' WHERE item_id = '$itemId'";
    $result = $conn->query($sql8);
}

$res = array('flag' => true);
$conn->close();
echo json_encode($res);
?>