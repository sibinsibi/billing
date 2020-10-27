<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$year = $myData->year;
$month = $myData->month;

$sql = "SELECT * FROM error where year = '$year' AND month = '$month'";
$result = $conn->query($sql);

echo json_encode(mysqli_num_rows($result)); 
?>