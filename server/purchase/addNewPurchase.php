<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$voucherNo = $myData->voucherNo;
$voucherDate = $myData->voucherDate;
$invoiceNo = $myData->invoiceNo;
$invoiceDate = $myData->invoiceDate;

$sId = $myData->sId;
$sName = ucwords($myData->sName);
$gstNo = $myData->gstNo;
$mob = $myData->mob;

if($sId == ""){

    $sql3 = "SELECT * from supplier_master ORDER BY id DESC LIMIT 1";
    $result = $conn->query($sql3);
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        $id = $rs['s_id'];
    }
    preg_match_all('/([\d]+)/', $id, $match);
    $id = (double)$match[0][0];
    $id = $id + 1;
    $id = 'SPR'.$id;

    $sId = $id;

    $sql4 = "INSERT INTO supplier_master (s_id, s_name, mob, gst_no) VALUES ('$sId', '$sName', '$mob', '$gstNo')";
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

$sql = "INSERT INTO purchase_master (voucher_no, voucher_date, invoice_no, invoice_date, s_id, s_name, csah_credit, net_amount, total_tax, discount, grand_total, round_off, paid, balance, remarks, transaction_completed) VALUES ('$voucherNo', '$voucherDate', '$invoiceNo', '$invoiceDate', '$sId', '$sName', '$cashCredit', '$netAmount', '$totalTaxAmount', '$totalDiscount', '$grandTotal', '$roundOf', '$paid', '$balance', '$remarks', '$transactionCompleted')";
$conn->query($sql);

$items = $myData->items;

foreach($items as $i){

    $item = ucwords($i->item);
    $brand = ucwords($i->brand);
    $unit = $i->unit;
    $unitPrice = $i->unitPrice;
    $sellingPrice = $i->sellingPrice;
    $purchaseRate = $i->purchaseRate;
    $gst = $i->gst;
    $qty = $i->qty;
    $taxAmount = $i->taxAmount;
    $discount = $i->discount;
    $itemTotalAmount = $i->itemTotalAmount;

    $sql = "INSERT INTO purchase_details VALUES ('$voucherNo', '$item', '$brand', '$sellingPrice', '$purchaseRate', '$qty', '$gst', '$taxAmount', '$discount', '$itemTotalAmount')";
    $conn->query($sql);

    $sql2 = "SELECT brand_name from brand_master where brand_name = '$brand'";
    $result = $conn->query($sql2);

    if(mysqli_num_rows($result) == 0){
        $sql3 = "SELECT *from brand_master ORDER BY id DESC LIMIT 1";
        $result = $conn->query($sql3);
        while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $id = $rs['brand_id'];
        }
        preg_match_all('/([\d]+)/', $id, $match);
        $id = (double)$match[0][0];
        $id = $id + 1;
        $id = 'BRD'.$id;
        
        $sql4 = "INSERT INTO brand_master (brand_id, brand_name) VALUES ('$id', '$brand')";
        $conn->query($sql4);
    }

    $sql2 = "SELECT * from item_price_details where name = '$item' AND brand = '$brand' AND selling_price = '$sellingPrice'";
    $result = $conn->query($sql2);

    $id = '';

    if(mysqli_num_rows($result) == 0){

        $sql3 = "SELECT * from item_master ORDER BY id DESC LIMIT 1";
        $result = $conn->query($sql3);
        while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $id = $rs['item_id'];
        }
        preg_match_all('/([\d]+)/', $id, $match);
        $id = (double)$match[0][0];
        $id = $id + 1;
        $id = 'ITM'.$id;
        
        $sql4 = "INSERT INTO item_master (item_id, item_name, brand, unit, unit_price) VALUES ('$id', '$item', '$brand', '$unit', '$unitPrice')";
        $conn->query($sql4);

        $sql5 = "INSERT INTO item_price_details VALUES ('$id', '$item', '$brand', '$unitPrice', '$purchaseRate', '$sellingPrice', '$discount', '$gst')";
        $conn->query($sql5);
    }
    else{
         while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $id = $rs['item_id'];
        }
    }

    $sql6 = "SELECT * from stock_master where item_id = '$id' ORDER BY id DESC LIMIT 1";
    $result = $conn->query($sql6);
    
    if(mysqli_num_rows($result) == 0){
        
        $sql7 = "INSERT INTO stock_master (item_id, item_name, brand, stock) VALUES ('$id', '$item', '$brand', $qty)";
        $result = $conn->query($sql7);
    }
    else{
            
            $rs = $result->fetch_array(MYSQLI_ASSOC);
            $stock = $rs['stock'][0];
            $stock = $stock + $qty;

            $sql8 = "UPDATE stock_master SET stock = '$stock' WHERE item_id = '$id'";
            $result = $conn->query($sql8);
    }



}

$res = array('flag' => true);
$conn->close();
echo json_encode($res);
?>