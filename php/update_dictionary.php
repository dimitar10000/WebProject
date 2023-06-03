<?php
require 'connect_db.php';
include("auth_session.php");

$sql = "use $dbName";
$conn->exec($sql);

$user = $_SESSION["username"];
$word = $_POST["word"];

$stmt = $conn->prepare("SELECT * FROM `?` WHERE word = ?");
$stmt->execute([$user,$word]);
$numRows = $stmt->fetchColumn();

if ($numRows == 0) {
    $query = "INSERT INTO `?` (word)
        VALUES(?)";

    $stmt = $conn->prepare($query);
    $stmt->execute([$user,$word]);
}

$stmt = $conn->prepare("SELECT COUNT(*) FROM `?`");
$stmt->execute([$user]);
$number = $stmt->fetchColumn();

$stmt = $conn->prepare("UPDATE users SET words = ? WHERE username = ?");
$stmt->execute([$number,$user]);

?>