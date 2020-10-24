<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$invoiceNo = $myData->invoiceNo;
$voucherNo = $myData->voucherNo;

$sql = "DELETE FROM purchase_master WHERE voucher_no = '$voucherNo' AND invoice_no = '$invoiceNo'";
$conn->query($sql);

$sql = "DELETE FROM purchase_details WHERE voucher_no = '$voucherNo'";
$conn->query($sql);

$sql = "DELETE FROM purchase_credit_master WHERE voucher_no = '$voucherNo' AND invoice_no = '$invoiceNo'";
$conn->query($sql);

$sql = "DELETE FROM purchase_credit_operations WHERE voucher_no = '$voucherNo' AND invoice_no = '$invoiceNo'";
$conn->query($sql);


$res = array('flag' => true);
$conn->close();
echo json_encode($res);
?>