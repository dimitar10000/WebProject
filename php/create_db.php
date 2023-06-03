<?php
require 'connect_db.php';

$query = "CREATE TABLE IF NOT EXISTS `users` (
    `username` varchar(50) NOT NULL,
    `password` varchar(50) NOT NULL,
    `points` int unsigned,
    `words` int unsigned,
    PRIMARY KEY (`username`)
   );";
   
   $result   = mysqli_query($con, $query);

?>