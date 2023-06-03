<?php
require 'connect_db.php';
include("auth_session.php");

$sql = "use $dbName";
$conn->exec($sql);

$user = $_SESSION["username"];
$stmt = $conn->prepare("SELECT * FROM `?`");
$stmt->execute([$user]);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);

?>