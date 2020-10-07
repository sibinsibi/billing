<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$itemId = $myData->itemId;

$sql6 = "SELECT * from purchase_details where item_id = '$itemId' LIMIT 1";
$result = $conn->query($sql6);

$flag = false;
if(mysqli_num_rows($result) == 0){
    $flag = true;
}

$res = array('flag' => $flag);
$conn->close();
echo json_encode($res);
?>