<?php

include("auth_session.php");
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Главно меню</title>
    <link rel="stylesheet" href="../styles/menu.css" />
</head>

<body>
    <div id="container">

        <div class="section" id="left-side">
            <div class="left-icon">
                <a href="profile.php"> <img src="../images/profile_image.png" height="150" width="150" /> </a>
            </div>
            <div class="icon-text">
                <b>Профил</b>
            </div>

            <div class="left-icon">
                <a href="dictionary.php"><img src="../images/dictionary.png" height="150" width="150" /> </a>
            </div>
            <div class="icon-text">
                <b>Речник</b>
            </div>
        </div>

        <div class="section" id="middle-part">
            <div id="heading">
                Здравей,
                <?php echo $_SESSION['username']; ?>!
            </div>

            <div id="menu">
                <div id="select-prompt"> <b> Избери ниво </b></div>

                <div class="level" id="easy-level"> <a href="kitchen.php"> Лесно </a></div>
                <div class="level" id="medium-level"> <a href="medium-level.php"> Средно </a> </div>
                <div class="level" id="hard-level"> <a href="hard-level.php"> Трудно </a> </div>
            </div>
        </div>

        <div class="section" id="logout">
            <a href="logout.php">Изход</a>
        </div>
    </div>

</body>

</html>