<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);
$invoiceNo = $myData->invoiceNo;

$sql = "SELECT * FROM sales_master INNER JOIN customer_master ON sales_master.c_id = customer_master.c_id where sales_master.invoice_no = '$invoiceNo'";
$result = $conn->query($sql);

$allData = array();
while($row = $result->fetch_assoc()){
    $data['invoice_no'] = $row['invoice_no'];
    $data['invoice_date'] = $row['invoice_date'];
    $data['c_id'] = $row['c_id'];
    $data['c_name'] = $row['c_name'];
    $data['mob'] = $row['mob'];
    $data['cash_credit'] = $row['cash_credit'];
    $data['net_amount'] = $row['net_amount'];
    $data['total_tax'] = $row['total_tax'];
    $data['discount'] = $row['discount'];
    $data['grand_total'] = $row['grand_total'];
    $data['round_off'] = $row['round_off'];
    $data['paid'] = $row['paid'];
    $data['balance'] = $row['balance'];
    $data['remarks'] = $row['remarks'];
    array_push($allData, $data);
} 

$sql = "SELECT * FROM sales_details WHERE invoice_no = '$invoiceNo'";
$result = $conn->query($sql);

$allData1 = array();
while($row = $result->fetch_assoc()){
    $data1['item'] = $row['item'];
    $data1['brand'] = $row['brand'];
    $data1['selling_price'] = $row['selling_price'];
    $data1['qty'] = $row['qty'];
    $data1['gst'] = $row['gst'];
    $data1['tax_amount'] = $row['tax_amount'];
    $data1['discount'] = $row['discount'];
    $data1['total'] = $row['total'];
    array_push($allData1, $data1);
} 

$outp ='{"records":['.json_encode($allData).','.json_encode($allData1).']}';
$conn->close();
echo($outp);
?>