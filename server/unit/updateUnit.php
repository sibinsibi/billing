<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$myData = json_decode($_POST["myData"]);

$unitId = $myData->unitId;
$unitName = $myData->unitName;

$sql = "UPDATE unit_master SET unit_name ='$unitName' WHERE unit_id = '$unitId'";

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
