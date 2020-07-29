<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("config.php");

$myData = json_decode($_POST["myData"]);

$username = $myData->username;
$password  = $myData->password;

$sql = "SELECT * from login where username = '$username' AND password = '$password'";
$result = $conn->query($sql);

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{"username":"'  . $rs["username"] . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();
echo($outp);
?>
