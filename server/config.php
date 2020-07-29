<?php
$user = "root";
$pass = "";

$conn = new mysqli('localhost', $user, $pass, 'billing', '3308');
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
