<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$invoiceNo = $myData->invoiceNo;

$sql = "DELETE FROM sales_master WHERE invoice_no = '$invoiceNo'";
$conn->query($sql);

$sql = "DELETE FROM sales_details WHERE invoice_no = '$invoiceNo'";
$conn->query($sql);

$sql = "DELETE FROM sales_credit_master WHERE invoice_no = '$invoiceNo'";
$conn->query($sql);

$sql = "DELETE FROM sales_credit_operations WHERE invoice_no = '$invoiceNo'";
$conn->query($sql);

$res = array('flag' => true);
$conn->close();
echo json_encode($res);
?>