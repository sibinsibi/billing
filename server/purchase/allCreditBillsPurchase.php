<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$flag  = $myData->flag;

$sql = '';
if($flag == 'supplier'){
    $sId = $myData->sId;
    $sql = "SELECT * FROM pruchase_credit_master WHERE s_id = '$sId'";
}
if($flag == 'Date'){
    $startDate = $myData->startDate;
    $endDate = $myData->endDate;
    $sql = "SELECT * FROM pruchase_credit_master WHERE invoice_date BETWEEN '$startDate' AND '$endDate'";
}

$result = $conn->query($sql);

$allData = array(); 
while($row = $result->fetch_assoc()){ 
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