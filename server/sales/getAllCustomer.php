<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$searchTerm = $_GET['term']; 

$sql = "SELECT * FROM customer_master WHERE c_name LIKE '%".$searchTerm."%'";
$result = $conn->query($sql);

$allData = array(); 
while($row = $result->fetch_assoc()){ 
    $data['id'] = $row['c_id']; 
    $data['value'] = $row['c_name']; 
    $data['mob'] = $row['mob'];
    array_push($allData, $data); 
} 

echo json_encode($allData); 
?>