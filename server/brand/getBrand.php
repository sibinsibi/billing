<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../config.php");

$searchTerm = $_GET['term']; 

$sql = "SELECT * FROM brand_master WHERE brand_name LIKE '%".$searchTerm."%'";
$result = $conn->query($sql);

$allData = array(); 
while($row = $result->fetch_assoc()){ 
    $data['value'] = $row['brand_name']; 
    array_push($allData, $data); 
} 

echo json_encode($allData); 
?>