<?php
require('connect_db.php');

$sql = "use $dbName";
$conn->exec($sql);

$username = stripslashes($_POST['username']);
$password = stripslashes($_POST['password']);

$query = "SELECT * FROM `users` WHERE username=?";
$stmt = $conn->prepare($query);
$stmt->execute([$username]);
$rows = $stmt->fetchColumn();

if ($rows == 0) {
    $query = "INSERT into `users` (username,password,points,words)
                     VALUES (?, ?, 0,0)";

    $stmt = $conn->prepare($query);
    $stmt->execute([$username,md5($password)]);

    if ($stmt) {
        echo "new";
    }
} else {
    echo "exists";
}
?>