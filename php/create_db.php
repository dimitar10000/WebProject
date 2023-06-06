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
  
  } catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
  }

$sql = "CREATE DATABASE IF NOT EXISTS $dbName";

// create database
try {
  $conn->exec($sql);
  echo "Database created successfully<br>";

} catch(PDOException $e) {
  echo $database . "<br>" . $e->getMessage();
}

$sql = "use $dbName";
$conn->exec($sql);

$query = "CREATE TABLE IF NOT EXISTS `users` (
    `username` varchar(50) NOT NULL,
    `password` varchar(50) NOT NULL,
    `points` int unsigned,
    `words` int unsigned,
    PRIMARY KEY (`username`)
   );";

$stmt = $conn->prepare($query);
$stmt->execute();

?>