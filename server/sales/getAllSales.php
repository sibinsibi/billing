<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$flag  = $myData->flag;

$sql = '';
if($flag == 'customer'){
    $cId = $myData->cId;
    $sql = "SELECT * FROM sales_master WHERE c_id = '$cId'";
}
if($flag == 'Date'){
    $startDate = $myData->startDate;
    $endDate = $myData->endDate;
    $sql = "SELECT * FROM sales_master WHERE invoice_date BETWEEN '$startDate' AND '$endDate'";
}

$result = $conn->query($sql);

$allData = array(); 
while($row = $result->fetch_assoc()){ 
    $data['invoice_no'] = $row['invoice_no'];
    $data['invoice_date'] = $row['invoice_date'];
    $data['c_name'] = $row['c_name'];
    $data['cash_credit'] = $row['cash_credit'];
    $data['net_amount'] = $row['net_amount'];
    $data['total_tax'] = $row['total_tax'];
    $data['discount'] = $row['discount'];
    $data['grand_total'] = $row['grand_total'];
    $data['round_off'] = $row['round_off'];
    $data['paid'] = $row['paid'];
    $data['balance'] = $row['balance'];
    $data['remarks'] = $row['remarks'];
    $data['billedby'] = $row['billedby'];
    array_push($allData, $data); 
} 

echo json_encode($allData); 

?>