<?php
require 'connect_db.php';
include("auth_session.php");

$sql = "use $dbName";
$conn->exec($sql);

$user = $_SESSION["username"];
$points = $_POST["points"];

$query = "UPDATE users SET points = points + ?
        WHERE username = ?";

$stmt = $conn->prepare($query);
$stmt->execute([$points, $user]);

?>