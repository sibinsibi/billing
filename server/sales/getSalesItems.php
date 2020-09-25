<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$iNo = $myData->iNo;

$sql = "SELECT * FROM sales_details WHERE invoice_no = '$iNo'";
$result = $conn->query($sql);

$allData = array(); 
while($row = $result->fetch_assoc()){ 
    $data['item'] = $row['item'];
    $data['brand'] = $row['brand'];
    $data['selling_price'] = $row['selling_price'];
    $data['qty'] = $row['qty'];
    $data['gst'] = $row['gst'];
    $data['tax_amount'] = $row['tax_amount'];
    $data['discount'] = $row['discount'];
    $data['total'] = $row['total'];
    array_push($allData, $data); 
} 

echo json_encode($allData); 

?>