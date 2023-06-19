<?php
require 'connect_db.php';
include("auth_session.php");

$sql = "use $dbName";
$conn->exec($sql);

$user = $_SESSION["username"];

$query = "CREATE TABLE IF NOT EXISTS `?` (
word VARCHAR(50)
)";

$stmt = $conn->prepare($query);
$stmt->execute([$user]);

?>