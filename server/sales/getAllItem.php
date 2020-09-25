<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$searchTerm = $_GET['term']; 

$sql = "SELECT * FROM item_master INNER JOIN item_price_details ON item_master.item_id = item_price_details.item_id INNER JOIN stock_master ON item_price_details.item_id = stock_master.item_id";
$result = $conn->query($sql);

$allData = array(); 
while($row = $result->fetch_assoc()){ 
    $data['id'] = $row['item_id']; 
    $data['value'] = $row['item_name'];
    $data['brand'] = $row['brand'];
    $data['unit'] = $row['unit'];
    //$data['unit_price'] = $row['unit_price'];
    $data['selling_price'] = $row['selling_price'];
    $data['discount'] = $row['discount'];
    $data['gst'] = $row['gst'];
    $data['stock'] = $row['stock'];
    array_push($allData, $data); 
} 

echo json_encode($allData); 
?>