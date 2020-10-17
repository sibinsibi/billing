<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");


$sql = "SELECT * FROM purchase_credit_master where status ='pending'";
$result = $conn->query($sql);

$allData = array(); 
while($row = $result->fetch_assoc()){ 
    $data['voucher_no'] = $row['voucher_no'];
    $data['invoice_no'] = $row['invoice_no'];
    $data['invoice_date'] = $row['invoice_date'];
    $data['s_id'] = $row['s_id'];
    $data['s_name'] = $row['s_name'];
    $data['total_amount'] = $row['total_amount'];
    $data['paid'] = $row['paid'];
    $data['balance'] = $row['balance'];
    $data['status'] = $row['status'];
    array_push($allData, $data); 
} 

echo json_encode($allData); 

?>