<?php
    session_start();
    if(!isset($_SESSION["username"])) {
        echo "denied access";
        exit();
    }
?>