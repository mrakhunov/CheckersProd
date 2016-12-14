// To minimize use: http://jscompress.com/
//or http://dean.edwards.name/packer/
 
 var textToClipboardHolder = null;
 var baseURL = window.location.origin === "file://" ? "http://checkershome.com/devHTML/" : window.location.href;
 var Board = {
    id: null,
	oneRow: 8,
	italian: false,
	parenttId: null,
	tag: null,
	emptyboard: false,
	buildCellsize: 80,
	currentCellSize: 30,
	cellbackgroundcurrent: null,
	colorName: null,
	isNotationShown: false,
	isChess: true,
	isChessBefore: true,
	isShowSettings: true,
	version: function() { $('#curr-version').html("&copy2014 Mikhail Rakhunov. Checkers Home(1.2.17)"); },
	cellbackground:  {
		cellblue:['#7DBDE7', 'rgba(125, 189, 231, 0)', 'rgb(35, 137, 231)'], /* black cell, white cell, and board border*/
	    cellbrown:['#A45200', '#FBD584', '#990000'],
		cellgray:['#959B9B', 'rgba(125, 189, 231, 0)', 'rgb(111, 112, 112)'],
		cellgreen:['rgba(77, 163, 69, 0.52)','rgba(125, 189, 231, 0)', 'rgba(44, 145, 35, 1)']
		
	}
	
}	

var setBoardSize = function(size, selector, colorName) {
    var tblSelector = '#' + selector;
	var tdSize = size + 'px';
	var cnvsSize = size*0.95 + 'px';
	var border = $('table').css('border-style');
	var borderSize = 4;
	colorName = colorName? colorName : Board.colorName;
		
	if( size < 20) { borderSize = 2; }
	else if( size <= 30) { borderSize = 3; }
	else if( size <= 60) { borderSize = 4; }
	else if( size <= 80) { borderSize = 5; }
	border = borderSize + 'px ' + border;
	$(tblSelector).css('border', border);
	$('table').css('border-color',Board.cellbackground[colorName][2]);
	$(tblSelector + ' canvas').css('width', cnvsSize);
	$(tblSelector + ' td').css('width', tdSize);
	$(tblSelector + ' td').css('height', tdSize);
	Board.currentCellSize = size;
}

var setCellSize = function(size, selector) {
    var sellSelector = '#' + selector;
	var cnvsSize = size*0.95 + 'px';
	$(sellSelector + ' canvas').css('width', cnvsSize);
	Board.currentCellSize = size;
}

var Board2 = {
		id: "2",
		oneRow: 8,
		italian: false,
		parenttId: null,
		tag: null,
		emptyboard: false,
		buildCellsize: 80,
	    currentCellSize: 80,
        cellbackgroundcurrent:  null,
		isNotationShown: false,
		isChess: true
	};

var buildBoard = function(boardObj) {
	    var $divHeader;
		var $tbl;
		var $tr;
		var	$td; 
		var rowNum = 1;
		var cellMax = (boardObj.oneRow * boardObj.oneRow)/2;
				
		$divHeader = document.createElement("div");
		$($divHeader).addClass('boardheader');
		$tbl = document.createElement("table");
		$($tbl).attr({
		    "id" : "tbl" + boardObj.id, 
			"cellspacing":"0",
			"cellpadding":"0"
		})
		if(boardObj.parenttId) {
		    document.getElementById(boardObj.parenttId).appendChild($divHeader);
			document.getElementById(boardObj.parenttId).appendChild($tbl);
		} else if (boardObj.tag) {
			var tags = document.getElementsByTagName(boardObj.tag);
			var len = tags.length;
			tags[len - 1].appendChild($divHeader);
			tags[len - 1].appendChild($tbl);
		} else {
		    document.body.appendChild($divHeader);
			document.body.appendChild($tbl);
		}
		
		$tr = document.createElement("tr");
		$tbl.appendChild($tr);
		
	for (var i = 1; i <= cellMax; i++) {
		 if(boardObj.italian) { 
		   	if(rowNum % 2 == 0) {
				$td = document.createElement("td");
				$($td).addClass("cel");
				$tr.appendChild($td);
				$td = document.createElement("td");
				$($td).addClass("celbl");
				$($td).attr('id', i);
				$tr.appendChild($td);
			} else {
				 $td = document.createElement("td");
				$($td).addClass("celbl");
				$($td).attr('id', i);
				$tr.appendChild($td);
				$td = document.createElement("td");
				$($td).addClass("cel");
				$tr.appendChild($td);
			}
			
		} else {
				if(rowNum % 2 == 0) {
			    $td = document.createElement("td");
				$($td).addClass("celbl");
				$($td).attr('id', i);
				$tr.appendChild($td);
				$td = document.createElement("td");
				$($td).addClass("cel");
				$tr.appendChild($td);
				
				} else {
					$td = document.createElement("td");
					$($td).addClass("cel");
					$tr.appendChild($td);
					$td = document.createElement("td");
					$($td).addClass("celbl");
					$($td).attr('id', i);
					$tr.appendChild($td);
				}
			}
			
			 if(i % (boardObj.oneRow/2) == 0) { 
		   		$tr = document.createElement("tr");
				$tbl.appendChild($tr);
				rowNum++; 
		   }
			
		}
	
	
	}
	
var copyChecker = function(obj, name) {
    $cnvs = document.createElement("canvas");
	var canvasSize = Board.buildCellsize.toString();
	$($cnvs).attr({'name': name, 'width': canvasSize, 'height': canvasSize, 'class': 'ch'});
	var st =  name == "wch" ||  name == "wkng" ? "#FFF" : "#000000" ;
	var ctx = $cnvs.getContext('2d');
		
	ctx.beginPath();
	ctx.fillStyle=st;
	ctx.arc(38, 38, 32, 0, 2*Math.PI);
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#999999";
	ctx.stroke();
	
	if(name == "wkng" || name == "bkng"){
		ctx.beginPath();
		ctx.arc(38, 38, 32, 0, 2*Math.PI);
		ctx.stroke();
		ctx.beginPath();
		ctx.fillStyle="#999999";
		ctx.arc(38, 38, 16, 0, 2*Math.PI);
		ctx.fill();
	}
	obj.appendChild($cnvs);
}

var addBoard2 = function(elId) {
	

	var $div = document.createElement("div");
	
	Board2.parenttId = "board" + Board2.id;
	Board2.oneRow      = Board.oneRow;
	Board2.italian     = Board.italian;
	Board2.emptyboard  = Board.emptyboard;
	Board2.buildCellsize    = Board.buildCellsize;
	Board2.currentCellSize = Board.currentCellSize,
	Board2.isNotationShown =  Board.isNotationShown;
	Board2.isChess = Board.isChess;
	Board2.isChessBefore = Board.isChessBefore;
		
	$($div).attr('id', Board2.parenttId).attr('align', 'center');
	$($div).addClass('boardholder');
	document.getElementById(elId).appendChild($div);
	buildBoard(Board2);
	$('#color').trigger('change');	

	var $divNote = document.createElement("div");
	$($divNote).attr("id", "dialog-note");
	$div.appendChild($divNote);
}

var notationNames = ["wch", "wkng", "bch", "bkng"];
var notationArray = [[], [], [], []];

var sendTo = function () {
    writePosition();
	var name = "";
	
	textToClipboardHolder =  new textToClipboard();
	$('<div></div>').appendTo('body')
	.html('<div id="for-board-send"></div>')
	.dialog({
		modal: true, title: Locate.current.modalWindowTitle, zIndex: 10000, autoOpen: true,
		width: 'auto', resizable: false,
		position: { my: "left center", at: "left center", of: $('#content') },
	   buttons: [ 
			{id: "copybtn", text: Locate.current.copyToClipboard, click: function() {textToClipboardHolder.copyToClipboard('#copyText', '#copybtn'); } },
			{ style: "height: 24px;", text: Locate.current.modalWindowButtons[0], click: function() { $( this ).dialog( "close" ); } } 	
		], 
		close: function (event, ui) {
			textToClipboardHolder = null;
			$(this).remove();
		}
	});
	
	// prepare the Copy TO Clipboard functionality
	$('.ui-dialog-buttonpane').append( '<div id="copyText"></div>');
	var btnW = Locate.lang === "ru" ? "250px" : "140px";
	$('#copybtn').css("width", btnW);
	var titleText = Locate.current.modalWindowPositionTitle;
	addBoard2('for-board-send');
	
	var $boardTitle = $('div#board2 .boardheader');
	$($boardTitle).text(titleText).attr('contenteditable', 'true').removeClass( "boardheader" ).addClass('boardheader-advice');
	$('div#board2 .boardheader-advice').click(function(event) {
	    if($(this).attr('title-ready') ==='y') {
			event.preventDefault();
			return false;
		} else {
			$(this).attr('title-ready', 'y').removeClass( "boardheader-advice" ).addClass('boardheader').text("");
		}	
	}); 
	
	$('div#board2 .boardheader-advice').focusout(function(event) {
	   event.preventDefault();
		if($(this).attr('title-ready') ==='y' && $(this).text() === "" ) {
			$(this).attr('title-ready', 'n').removeClass( "boardheader" ).addClass('boardheader-advice').text(titleText);
		}  else {
			buildURL(false);
		}
	}); 	
     
	$('#dialog-note').html(notationArray[4]);
	$('#dialog-note').addClass("note-border");
	
	for (var i = 0; i < 4; i++) {
	    var len = notationArray[i].length;
		if(len > 0) {
          	for(var j = 0; j < len; j++) {
				if( j === 0) {
					name = notationNames[i]
           		} 
				  copyChecker($( "#tbl2 .celbl" )[notationArray[i][j] - 1], name);	
					
			}	
		}
	}
	$(' div#board2 canvas').css('cursor', 'default');
	setBoardSize(Board.currentCellSize, 'tbl2', Board.colorName);
	$('#dialog-note').append( '<p><a id="pos-url" target="_blank"></a></p>');		

	buildURL(false);
	// frize dialog width and height;
	$('.ui-dialog').css("width", $('.ui-dialog').css("width"));
	$('.ui-dialog').css("height", $('.ui-dialog').css("height"));
}

var writePosition = function () {
	var notationText = "";
	notationArray = [[], [], [], []];
	for (var i = 0; i < 4; i++) {
	    var selectorShort = 'canvas[name="' + Locate.current.checkerNames[i][0] + '"]';
		var len = $(selectorShort).length;
		
	    if(len > 1) {
		   for(var j = 1; j < len; j++) {
			  var firstChar = i==0 ? "" : "<br>";
			  notationText += j === 1 ?  (firstChar + Locate.current.checkerNames[i][1] + ": ") : ", "; 
			 
                var checkerID = $($(selectorShort)[j]).parent().attr('id'); 
				if(Board.isChess) {	
				    checkerID = parseInt(checkerID) - 1;
					checkerID = getChessNote(checkerID); 
				}	   
				notationText += checkerID; 
				notationArray[i][j - 1] = $($(selectorShort)[j]).parent().attr('id');
			}
		}
	}	
     notationArray[4] = [notationText];
}

var buildChecker = function(obj) {
    if(!obj) { return; }
	
    $cnvs = document.createElement('canvas');
	var canvasSize = Board.buildCellsize.toString();	
	$($cnvs).attr({'name': menuChecker.name, 'width': canvasSize, 'height': canvasSize, 'class': 'ch'});
	var st =  menuChecker.name == "wch" ||  menuChecker.name == "wkng" ? "#FFF" : "#000000" ;
	var ctx=$cnvs.getContext("2d");
	
	ctx.beginPath();
	ctx.fillStyle=st;
	ctx.arc(38, 38, 32, 0, 2*Math.PI);
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#999999";
	ctx.stroke();
	
	if(menuChecker.name == "wkng" || menuChecker.name == "bkng"){
		ctx.beginPath();
		ctx.arc(38, 38, 32, 0, 2*Math.PI);
		ctx.stroke();
		ctx.beginPath();
		ctx.fillStyle="#999999";
		ctx.arc(38, 38, 16, 0, 2*Math.PI);
		ctx.fill();
	}
	obj.appendChild($cnvs);
	setCellSize(Board.currentCellSize, obj.id);
}

var getChessNote = function getChessNote(indx) {
    var chessNote = new Array("b8","d8","f8","h8","a7","c7","e7","g7","b6","d6","f6","h6","a5","c5","e5","g5","b4","d4","f4","h4","a3","c3","e3","g3","b2","d2","f2","h2","a1","c1","e1","g1");
	return chessNote[indx];
}


var buildURL =  function (openNewWindow) {
	var url = '[';

	for(var i = 0; i < 4; i++) {
	  if(i===0) {
	       url += "[" + (notationArray[i].length===0? "]" : (MREn(notationArray[i]).join() + "]"));
	  } else {
			if(notationArray[i].length === 0) { 
				url += ",[]";
			} else {		
				url += ",[" + MREn(notationArray[i]).join() + "]";
			}
	  }		
	}
    url = baseURL + "pos.php?s=" + MRE(url + "]");
	
     
	 var rowIndx = Math.ceil(Math.random()*10);
	 var boardColorCode = "[" + (Board.oneRow * rowIndx) + "," + (rowIndx * 10 + (Board.italian? 1 : 0)) + "]";
	 url +="&b=" + MRE(boardColorCode); 
	if($('div#board2 .boardheader').text().length > 0) {
		url +="&t=" + MRE($('div#board2 .boardheader').text());
	}
    url +="&c=" + MRE($("#color :selected").val());
    url +="&n=" + $('#cell-size').text();
    url +="&l=" + Locate.lang;	
	if(openNewWindow) { 
		window.open(url, "_blank"); 
	} else {
		$('#pos-url').attr('href', url);
		$('#pos-url').text(Locate.current.modalWindowLink);
		$('#copyText').text(url);
	}
}	

var boardColorChange = function(colorName) {
	$('.celbl').css('background-color',Board.cellbackground[colorName][0]);
	$('.cel').css('background-color',Board.cellbackground[colorName][1]);
	$('table').css('border-color',Board.cellbackground[colorName][2]);
}

 var createBoard = function(elId) {
	var $div = document.createElement("div");
	Board2.parenttId = "board" + Board2.id;
	if(boardSet[1] % 10 == 0) { 
	   Board2.italian = false; 
	   Board2.oneRow = boardSet[0]/(boardSet[1]/10);
	} else {
	    Board2.italian = true; 
		Board2.oneRow =  boardSet[0]/((boardSet[1] - 1)/10);
	}
		
	$($div).attr('id', Board2.parenttId).attr('align', 'center');
	$($div).addClass('boardholder');
	document.getElementById(elId).appendChild($div);
	buildBoard(Board2);

	boardColorChange(sellColor);

	var $divNote = document.createElement("div");
	
	$($divNote).attr("id", "dialog-note");
	$div.appendChild($divNote);
}
  
 var displaySendPosition = function (num, lang, sellColor) {
    var name = "";
	Board.version();  // Write cooperate
	createBoard('sent-position');
		
	$boardTitle = $('div#board2 .boardheader');
	$($boardTitle).text(title);
	for (var i = 0; i < 4; i++) {
	    var len = Notation[i].length;
		if(len > 0) {
		    var newArray = MRDn(Notation[i]);
			len = newArray.length;
          	for(var j = 0; j < len; j++) {
				if( j === 0) {
					name = notationNames[i]
           		} 
				  copyChecker($( "#tbl2 .celbl" )[newArray[j] - 1], name);	
					
			}	
		}
	}
	$(' div#board2 canvas').css('cursor', 'default');
	if(lang === 'ru') {$('title').text(Locate.russian.pageTitle);}
	else {$('title').text(Locate.english.pageTitle);}
	
	setBoardSize(num, 'tbl2', sellColor);
}