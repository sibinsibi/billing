<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$deleteIndex  = $myData->deleteIndex;
$invoiceNo = $myData->invoiceNo;
$add_amount = $myData->amount;
$balance = $myData->balance;

$sql = "DELETE FROM sales_credit_operations WHERE invoice_no = '$invoiceNo' AND credit_order = '$deleteIndex'";
$conn->query($sql);

$sql = "SELECT * FROM sales_credit_operations WHERE invoice_no = '$invoiceNo' ORDER BY credit_order DESC LIMIT 1";
$result = $conn->query($sql);

$rs = $result->fetch_array(MYSQLI_ASSOC);
$credit_order = $rs['credit_order'];

if($credit_order != 1 && $balance != 0){
    
    $amount = $rs['balance'];
    $amount = $amount + $add_amount;
    
    $sql = "UPDATE sales_credit_operations SET balance = '$amount' WHERE invoice_no = '$invoiceNo' AND credit_order = '$credit_order'";
    $conn->query($sql);
}

$sql = "UPDATE sales_credit_master SET status = 'pending' WHERE invoice_no = '$invoiceNo'";
$conn->query($sql);

$sql = "UPDATE sales_master SET transaction_completed = false WHERE invoice_no = '$invoiceNo'";
$conn->query($sql);

$res = array('flag' => true);
$conn->close();
echo json_encode($res);
?>