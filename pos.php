<!DOCTYPE>
<html>
<head>
	<meta name="http-equiv" content="Content-type: text/html; charset=utf-8"/>
	<title>Mikhail Rakhunov's Checkers</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="author" content="Mikhail Rakhunov">
	<meta name="description" content="шашки, стоклеточные шашки, международные шашки, Mikhail Rakhunov, shashki, draughts,russian checkers, italian checkers, english checkers, international checkers, polish checkers, spanish checkers, poolcheckers, american checkers,  checkers, checkers for all devices, шашки, шашки для всех устройств, Михаил Рахунов">
	<link href="css/checkers.css" rel="stylesheet" type="text/css" media="screen">
	<script src="js/jquery-3.1.1.min.js" charset="utf-8"></script>
	<script language="javascript" src="js/locate.js" charset="utf-8"></script>
	<script language="javascript" src="js/mr.js" charset="utf-8"></script>
	<script language="javascript" src="js/pos.js" charset="utf-8"></script>
	<script src="js/checkers.js" charset="utf-8"></script>

<?php
if(isset($_GET["s"]) && isset($_GET["b"]))  {
   echo '<script>var temp=[]; temp[0] = "'.$_GET["s"].'";';
   echo 'temp[1]="' .$_GET["b"]. '";';

   if(isset($_GET["n"])) {
		echo 'temp[2]='.$_GET["n"]. ';';
	} else {
		echo 'temp[2]=40;';

	}
     
	if(isset($_GET["l"])) {
		echo 'temp[3]="'.$_GET["l"].'";';
	} else {
		echo 'temp[3]="en";';
	}
	
	if(isset($_GET["c"])) {
		echo 'temp[4]="'.$_GET["c"].'";';
	} else {
		echo 'temp[4]="cellbrown";';
	}
	
	if(isset($_GET["t"])) {
		echo 'temp[5]="'.$_GET["t"].'";';
	} else {
		echo 'temp[5]="";';
	}
	
    echo '</script>';	
} else {
    echo "No Position was sent correctly...";
}	
?>	
</head>
<body>
	<div id="content-email" style="margin-top: 40px;">
		<div id ="sent-position"></div>
	</div>
</body>
</html>

