<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$creditOrder  = $myData->creditOrder;
$voucherNo = $myData->voucherNo;
$invoiceNo  = $myData->invoiceNo;
$creditDate  = $myData->creditDate;
$totalAmount  = $myData->totalAmount;
$paid  = $myData->paid;
$balance  = $myData->balance;
$completed  = $myData->completed;

$sql = "INSERT INTO purchase_credit_operations (credit_order, credit_date, voucher_no, invoice_no, total_amount, paid, balance) VALUES ('$creditOrder', '$creditDate', '$voucherNo', '$invoiceNo', '$totalAmount', '$paid', '$balance')";
$conn->query($sql);

if($completed){
    $sql = "UPDATE purchase_credit_master SET status = 'completed' WHERE voucher_no = '$voucherNo'";
    $conn->query($sql);

    $sql = "UPDATE purchase_master SET transaction_completed = true WHERE voucher_no = '$voucherNo'";
    $conn->query($sql);
}
$res = array('flag' => true);
$conn->close();
echo json_encode($res);
?>