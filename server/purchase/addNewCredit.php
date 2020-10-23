<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$voucherNo = $myData->voucherNo;
$invoiceNo  = $myData->invoiceNo;
$creditDate  = $myData->creditDate;
$totalAmount  = $myData->totalAmount;
$paid  = $myData->paid;
$balance  = $myData->balance;
$completed  = $myData->completed;

$sql = "SELECT * FROM purchase_credit_operations WHERE voucher_no = '$voucherNo' ORDER BY credit_order DESC LIMIT 1";
$result = $conn->query($sql);

$rs = $result->fetch_array(MYSQLI_ASSOC);
$credit_order = $rs['credit_order'];
$credit_order = $credit_order + 1;

$sql = "INSERT INTO purchase_credit_operations (credit_order, credit_date, voucher_no, invoice_no, total_amount, paid, balance) VALUES ('$credit_order', '$creditDate', '$voucherNo', '$invoiceNo', '$totalAmount', '$paid', '$balance')";
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