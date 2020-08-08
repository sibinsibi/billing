<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$sId = $myData->sId;
$sName = $myData->sName;
$mob = $myData->mob;
$gstNo = $myData->gstNo;

$sql = "UPDATE supplier_master SET s_name ='$sName', mob= '$mob', gst_no='$gstNo' WHERE s_id = '$sId'";

$flag = FALSE;
if ($conn->query($sql) === TRUE) {
 $flag = TRUE;
}else{
    $flag = FALSE;
}
$res = array('flag' => $flag);
$conn->close();
echo json_encode($res);
?>
