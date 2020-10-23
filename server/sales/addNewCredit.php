<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$invoiceNo  = $myData->invoiceNo;
$creditDate  = $myData->creditDate;
$totalAmount  = $myData->totalAmount;
$paid  = $myData->paid;
$balance  = $myData->balance;
$completed  = $myData->completed;

$sql = "SELECT * FROM sales_credit_operations WHERE invoice_no = '$invoiceNo' ORDER BY credit_order DESC LIMIT 1";
$result = $conn->query($sql);

$rs = $result->fetch_array(MYSQLI_ASSOC);
$credit_order = $rs['credit_order'];
$credit_order = $credit_order + 1;

$sql = "INSERT INTO sales_credit_operations (credit_order, credit_date, invoice_no, total_amount, paid, balance) VALUES ('$credit_order', '$creditDate', '$invoiceNo', '$totalAmount', '$paid', '$balance')";
$conn->query($sql);

if($completed){
    $sql = "UPDATE sales_credit_master SET status = 'completed' WHERE invoice_no = '$invoiceNo'";
    $conn->query($sql);

    $sql = "UPDATE sales_master SET transaction_completed = true WHERE invoice_no = '$invoiceNo'";
    $conn->query($sql);
}
$res = array('flag' => true);
$conn->close();
echo json_encode($res);
?>