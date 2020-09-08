<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$companyName = $myData->companyName;
$mob  = $myData->mob;
$landPhone  = $myData->landPhone;
$gst  = $myData->gst;
$address1  = $myData->address1;
$address2  = $myData->address2;
$place  = $myData->place;
$pin  = $myData->pin;

$sql = "INSERT INTO company_details (company_name, mob, land_phone, email, gst_no, address1, address2, place, pin) VALUES ('$companyName', '$mob', '$landPhone', '$gst', '$address1', '$address2', '$place', '$pin')";

$flag = FALSE;
if ($conn->query($sql) === TRUE) {
 $flag = TRUE;
}else{
    $flag = false;
}
$res = array('flag' => $flag);
$conn->close();
echo json_encode($res);

?>