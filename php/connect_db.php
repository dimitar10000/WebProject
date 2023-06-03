<?php
$serverName = "localhost";
$username = "root";
$password = "";
$dbName = "gamedb";

// establish connection
try {
    $conn = new PDO("mysql:host={$serverName}", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>