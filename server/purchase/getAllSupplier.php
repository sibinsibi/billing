<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$searchTerm = $_GET['term']; 

$sql = "SELECT * FROM supplier_master WHERE s_name LIKE '%".$searchTerm."%'";
$result = $conn->query($sql);

$allData = array(); 
while($row = $result->fetch_assoc()){ 
    $data['id'] = $row['s_id']; 
    $data['value'] = $row['s_name']; 
    $data['mob'] = $row['mob'];
    $data['gst'] = $row['gst_no'];
    array_push($allData, $data); 
} 

echo json_encode($allData); 
?>
