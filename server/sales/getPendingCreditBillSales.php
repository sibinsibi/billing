<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$invoiceNo  = $myData->invoiceNo;

$sql = "SELECT * FROM sales_credit_operations WHERE invoice_no = '$invoiceNo' ORDER BY credit_order ASC ";
$result = $conn->query($sql);

$allData = array(); 
while($row = $result->fetch_assoc()){ 
    $data['credit_order'] = $row['credit_order'];
    $data['credit_date'] = $row['credit_date'];
    $data['invoice_no'] = $row['invoice_no'];
    $data['total_amount'] = $row['total_amount'];
    $data['paid'] = $row['paid'];
    $data['balance'] = $row['balance'];
    array_push($allData, $data); 
} 

echo json_encode($allData); 

?>