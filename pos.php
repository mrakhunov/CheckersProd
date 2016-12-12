<!DOCTYPE>
<html>
<head>
	<meta name="http-equiv" content="Content-type: text/html; charset=utf-8"/>
	<title>Mikhail Rakhunov's Checkers</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="author" content="Mikhail Rakhunov">
	<meta name="description" content="Mikhail Rakhunov, checkers, checkers for all devices, шашки, шашки для всех устройств, Михаил Рахунов">

	<link href="css/checkers.css" rel="stylesheet" type="text/css" media="screen">

	<script src="js/jquery-3.1.1.min.js" charset="utf-8"></script>
	<script src="js/jquery-ui-1.11.4.custom.min.js"></script>
<script language="javascript" src="js/locate.js" charset="utf-8"></script>
<script language="javascript" src="js/mr.js" charset="utf-8"></script>
<script language="javascript" src="js/getboard.js" charset="utf-8"></script>
<script src="js/checkers.js" charset="utf-8"></script>

<?php
if(isset($_GET["s"]))  {
   echo '<script> var temp=MRD("'.$_GET["s"].'", true); var title="";';
   echo 'var Notation = JSON.parse(temp);</script>'; 
      if(isset($_GET["b"])) {
	     echo '<script> var temp2=MRD("' .$_GET["b"]. '");';
		 echo 'var boardSet = JSON.parse(temp2);</script>';
	  }	
     if(isset($_GET["t"])) {
		echo '<script>title=MRD("'.$_GET["t"].'");</script>';
	}
	if(isset($_GET["c"])) {
		echo '<script> var sellColor=MRD("'.$_GET["c"].'");</script>';
	}
	if(isset($_GET["n"])) {
		echo '<script> var chS='.$_GET["n"].';</script>';
	} else {
		echo '<script> var chS=40;</script>';
	}
	if(isset($_GET["l"])) {
		echo '<script> var lang="'.$_GET["l"].'";</script>';
	} else {
		echo '<script> var lang="en";</script>';
	}	
} else {
    echo "No Position was sent correctly...";
}	
?>	
</head>

<body>
<div id="content-email" style="margin-top: 40px;">
	<div id ="sent-position"></div>
	<div id="curr-version"></div>
</div>

<script>
	displayPosition();
</script>
</body>
</html>

