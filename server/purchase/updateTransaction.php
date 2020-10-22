<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$deleteIndex  = $myData->deleteIndex;
$voucherNo = $myData->voucherNo;
$add_amount = $myData->amount;

$sql = "DELETE FROM purchase_credit_operations WHERE voucher_no = '$voucherNo' AND credit_order = '$deleteIndex'";
$conn->query($sql);

$sql = "SELECT * FROM purchase_credit_operations WHERE voucher_no = '$voucherNo' ORDER BY credit_order DESC LIMIT 1";
$result = $conn->query($sql);

$rs = $result->fetch_array(MYSQLI_ASSOC);
$credit_order = $rs['credit_order'];

if($credit_order != 0){
    
    $amount = $rs['balance'];
    $amount = $amount + $add_amount;
    
    $sql = "UPDATE purchase_credit_operations SET balance = '$amount' WHERE voucher_no = '$voucherNo' AND credit_order = '$credit_order'";
    $conn->query($sql);
}

    $sql = "UPDATE purchase_credit_master SET status = 'pending' WHERE voucher_no = '$voucherNo'";
    $conn->query($sql);

    $sql = "UPDATE purchase_master SET transaction_completed = false WHERE voucher_no = '$voucherNo'";
    $conn->query($sql);

$res = array('flag' => true);
$conn->close();
echo json_encode($res);
?>