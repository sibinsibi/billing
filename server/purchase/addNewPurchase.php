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
$sName = $myData->sName;
$gstNo = $myData->gstNo;
$mob = $myData->mob;

if(!$sId){

    $sql = "SELECT s_id from supplier_master where gst_no = '$gstNo' AND s_name = '$sName'";
    $result = $conn->query($sql);

    if(mysqli_num_rows($result) == 0){
        $sql3 = "SELECT *from supplier_master ORDER BY id DESC LIMIT 1";
        $result = $conn->query($sql3);
        while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $id = $rs['s_id'];
        }
        preg_match_all('/([\d]+)/', $id, $match);
        $id = (double)$match[0][0];
        $id = $id + 1;
        $id = 'SPR'.$id;

        $sId = $id;
        
        $sql4 = "INSERT INTO supplier_master VALUES ('$sId', '$sName', '$mob', '$gstNo')";
        $conn->query($sql4);
    
    }
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
$items = $myData->items;


$sql = "INSERT INTO purchase_master VALUES ('$voucherNo', '$voucherDate', '$invoiceNo', '$invoiceDate', '$sId', '$sName', '$cashCredit', '$netAmount', '$totalTaxAmount', '$totalDiscount', '$grandTotal', '$roundOf', '$paid', '$balance', '$remarks', '$transactionCompleted')";

echo $sql;
$flag = FALSE;
if ($conn->query($sql) === TRUE) {
 $flag = TRUE;
}else{
    $flag = false;
}


$res = array('flag' => $myData);
$conn->close();
echo json_encode($res);
?>
