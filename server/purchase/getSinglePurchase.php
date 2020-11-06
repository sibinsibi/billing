<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$invoiceNo = $myData->invoiceNo;
$voucherNo = $myData->voucherNo;

$sql = '';

if($invoiceNo && !$voucherNo){
    $sql = "SELECT * FROM purchase_master where invoice_no = '$invoiceNo'";
}

if($voucherNo && !$invoiceNo){
    $sql = "SELECT * FROM purchase_master where voucher_no = '$voucherNo'";
}

if($voucherNo && $invoiceNo){
    $sql = "SELECT * FROM purchase_master where voucher_no = '$voucherNo' AND invoice_no = '$invoiceNo'";
}
$result = $conn->query($sql);

$allData = array();
while($row = $result->fetch_assoc()){
    $data['voucher_no'] = $row['voucher_no'];
    $data['voucher_date'] = $row['voucher_date'];
    $data['invoice_no'] = $row['invoice_no'];
    $data['invoice_date'] = $row['invoice_date'];
    $data['s_id'] = $row['s_id'];
    $data['s_name'] = $row['s_name'];
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

    $voucherNo = $row['voucher_no'];

    array_push($allData, $data);
} 

$sql = "SELECT * FROM purchase_details where voucher_no = '$voucherNo'";
$result = $conn->query($sql);

$allData1 = array();
while($row = $result->fetch_assoc()){
    $data1['item_id'] = $row['item_id'];
    $data1['item'] = $row['item'];
    $data1['brand'] = $row['brand'];
    $data1['purchase_rate'] = $row['purchase_rate'];
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