<?php
include("connect_db.php");
include("auth_session.php");

$sql = "use $dbName";
$conn->exec($sql);

$sql = 'SELECT username,points,words FROM users WHERE username = ?';

$stmt = $conn->prepare($sql);
$stmt->execute([$_SESSION['username']]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

$_SESSION['points'] = $result['points'];
$_SESSION['words'] = $result['words'];

$arr = array('name' => $_SESSION['username'], 'points' => $_SESSION['points'], 'words' => $_SESSION['words']);

echo json_encode($arr);
?>