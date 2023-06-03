<?php
require('connect_db.php');
session_start();

$sql = "use $dbName";
$conn->exec($sql);

$username = stripslashes($_REQUEST['username']);
$password = stripslashes($_REQUEST['password']);

$query = "SELECT * FROM `users` WHERE username=? AND password=?";

$stmt = $conn->prepare($query);
$stmt->execute([$username, md5($password)]);
$rows = $stmt->fetchColumn();

if ($rows == 0) {
    echo "fail";
} else {
    $_SESSION['username'] = $username;
    echo "success";
}
?>