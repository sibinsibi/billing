<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");


$sql = "SELECT * FROM sales_credit_master where status ='pending'";
$result = $conn->query($sql);

$allData = array(); 
while($row = $result->fetch_assoc()){ 
    $data['invoice_no'] = $row['invoice_no'];
    $data['invoice_date'] = $row['invoice_date'];
    $data['c_id'] = $row['c_id'];
    $data['c_name'] = $row['c_name'];
    $data['total_amount'] = $row['total_amount'];
    $data['paid'] = $row['paid'];
    $data['balance'] = $row['balance'];
    $data['status'] = $row['status'];
    array_push($allData, $data); 
} 

echo json_encode($allData); 

?>