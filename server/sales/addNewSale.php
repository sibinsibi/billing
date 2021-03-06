<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$invoiceNo = $myData->invoiceNo;
$invoiceDate = $myData->invoiceDate;

$cId = $myData->cId;
$cName = ucwords($myData->cName);
$mob = $myData->mob;

if($cId == "" && $mob != ""){

    $id = "";
    $sql3 = "SELECT * from customer_master ORDER BY id DESC LIMIT 1";
    $result = $conn->query($sql3);
    if(mysqli_num_rows($result) == 0){
        $id = "CTR1";
        
    }else{
        while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $id = $rs['c_id'];
        }
        preg_match_all('/([\d]+)/', $id, $match);
        $id = (double)$match[0][0];
        $id = $id + 1;
        $id = 'CTR'.$id;
    }

    $cId = $id;

    $sql4 = "INSERT INTO customer_master (c_id, c_name, mob) VALUES ('$cId', '$cName', '$mob')";
    $conn->query($sql4);   
    
}


$cashCredit = $myData->cashCredit;
$netAmount = $myData->netAmount;
$totalTaxAmount = $myData->totalTaxAmount;
$totalDiscount = $myData->totalDiscount;
$grandTotal = $myData->grandTotal;
$roundOf = $myData->roundOf;
$paid = $myData->paid;
$balance = $myData->balance;
$remarks = $myData->remarks;
$transactionCompleted = $myData->transactionCompleted;
$billedBy = $myData->billedBy;

$sql = "INSERT INTO sales_master (invoice_no, invoice_date, c_id, c_name, cash_credit, net_amount, total_tax, discount, grand_total, round_off, paid, balance, remarks, transaction_completed, billedby) VALUES ('$invoiceNo', '$invoiceDate', '$cId', '$cName', '$cashCredit', '$netAmount', '$totalTaxAmount', '$totalDiscount', '$grandTotal', '$roundOf', '$paid', '$balance', '$remarks', '$transactionCompleted', '$billedBy')";
$conn->query($sql);

if($balance != 0) {
    $sql = "INSERT INTO sales_credit_master (invoice_no, invoice_date, c_id, c_name, total_amount, paid, balance, status) VALUES ('$invoiceNo', '$invoiceDate', '$cId', '$cName', '$grandTotal', '$paid', '$balance', 'pending')";
    $conn->query($sql);
    
    $sql = "INSERT INTO sales_credit_operations (credit_order, credit_date, invoice_no, total_amount, paid, balance) VALUES (1, '$invoiceDate', '$invoiceNo', '$grandTotal', '$paid', '$balance')";
    $conn->query($sql);
}

$items = $myData->items;

foreach($items as $i){

    $item = ucwords($i->item);
    $brand = ucwords($i->brand);
    $unit = $i->unit;
    $unitPrice = $i->unitPrice;
    $sellingPrice = $i->sellingPrice;
    $gst = $i->gst;
    $qty = $i->qty;
    $taxAmount = $i->taxAmount;
    $discount = $i->discount;
    $itemTotalAmount = $i->itemTotalAmount;
    $id = $i->itemId;

    $sql = "INSERT INTO sales_details VALUES ('$invoiceNo', '$item', '$brand', '$sellingPrice', '$qty', '$gst', '$taxAmount', '$discount', '$itemTotalAmount')";
    $conn->query($sql);

    $sql6 = "SELECT * from stock_master where item_id = '$id' ORDER BY id DESC LIMIT 1";
    $result = $conn->query($sql6);
    
    $rs = $result->fetch_array(MYSQLI_ASSOC);
    $stock = $rs['stock'];
    $stock = $stock - $qty;

    if($stock <= 0){
        $stock = 0;
    }

    $sql8 = "UPDATE stock_master SET stock = '$stock' WHERE item_id = '$id'";
    $result = $conn->query($sql8);
    
}

$res = array('flag' => true);
$conn->close();
echo json_encode($res);
?>