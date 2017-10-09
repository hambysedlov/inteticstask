<?php
	define("DB_SERVER", "us-cdbr-iron-east-05.cleardb.net");
	define("DB_USER", "b5864150602010");
	define("DB_PASS", "e978a518");
	define("DB_NAME", "heroku_97fc8885fabe927");
	$con = mysqli_connect(DB_SERVER,DB_USER, DB_PASS) or die(mysqli_error());
	mysqli_select_db($con,DB_NAME) or die("Cannot select DB");
	?>