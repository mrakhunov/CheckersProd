/***************************************** 
	checkers.js (version 1.0.1 12/12/2016)
	Copyright 2016 Mikhail Rakhunov
	EMAIL: mrakhunov@yahoo.com
*****************************************************/
var boardColors = {
	blue: {
		blackCell: '#7DBDE7', 
		whiteCell: 'rgba(125, 189, 231, 0)',
		border: 'rgb(35, 137, 231)'
	}, 
	brown: {
		blackCell: '#A45200',
		whiteCell: '#FBD584',
		border: '#990000'
	}, 
	gray:{
		blackCell: '#959B9B',
		whiteCell: 'rgba(125, 189, 231, 0)',
		border: 'rgb(111, 112, 112)'
	},
	green:{
		blackCell: 'rgba(77, 163, 69, 0.52)',
		whiteCell: 'rgba(125, 189, 231, 0)',
		border: 'rgba(44, 145, 35, 1)'
	}
};

(function($) {
var thisId = 1000;
$.fn.showPosition = function(arguments) {
	if(arguments === undefined || arguments === null) {
		thisId++;
		arguments = {
			id: thisId
		}
	} else if (arguments.id === undefined || arguments.id === null || isNaN(arguments.id)|| arguments.id === thisId) {
		thisId++;
		arguments.id = thisId;
	} 
	    	
	var board = {
		title: null || arguments.title,
		parenttId: null || $(this).attr('id'),
		id: arguments.id,
		oneRow: arguments.oneRow || 8,
		buildCellsize: 80,
		italian: arguments.italian || false,
		isNotationShown: arguments.isNotationShown || false,
		isChess: arguments.isChess || true,
		currentCellSize: arguments.cellSize || 24,
		notation: arguments.notation,
		currentColor: (arguments.colorName === undefined || arguments.colorName === null)? 'brown' :  arguments.colorName,
		colors:  boardColors,
		isVersionShown: arguments.isVersionShown || true,
		version: "&copy2016 Mikhail Rakhunov. Checkers Engine(1.0.1)" 
	};
	
	function setBoardSize(sizeArg) {
		if(sizeArg !== undefined && sizeArg !== null && !isNaN(sizeArg)) {
			board.currentCellSize = sizeArg;
		}
		
		var tblSelector = '#tbl' + board.id;
		var size = board.currentCellSize;
		var tdSize = size + 'px';
		var cnvsSize = size*0.95 + 'px';
		var border = $(tblSelector).css('border-style');
		var borderSize = 4;
					
		if( size < 20) { borderSize = 2; }
		else if( size <= 30) { borderSize = 3; }
		else if( size <= 60) { borderSize = 4; }
		else if( size <= 80) { borderSize = 5; }
		border = borderSize + 'px ' + border;
		$(tblSelector).css('border', border);
		$(tblSelector + ' canvas').css('width', cnvsSize);
		$(tblSelector + ' td').css('width', tdSize);
		$(tblSelector + ' td').css('height', tdSize);
		
		var tableSize = (size * board.oneRow + borderSize * 2) + "px";
		$(tblSelector).css('width', tableSize);
		
		setBoardColors(board.currentColor);
	};
	
	function setBoardColors (newColor) {
		var tblSelector = '#tbl' + board.id;
		$(tblSelector).css('border-color', board.colors[newColor].border);
		$(tblSelector).find('.square').css('background-color', board.colors[newColor].whiteCell);
		$(tblSelector).find('.squarebl').css('background-color', board.colors[newColor].blackCell);
	};
	
	function buildBoard () {
	    var $divHeader;
		var $tbl;
		var $tr;
		var	$td; 
		var rowNum = 1;
		var cellMax = (board.oneRow * board.oneRow)/2;
				
		$divHeader = document.createElement("div");
		$($divHeader).addClass('posTitle');
		$($divHeader).text(board.title);
		$divFooter = document.createElement("div");
		$($divFooter).addClass('posFooter');
		$($divFooter).html(board.version);
				
		$tbl = document.createElement("table");
		$($tbl).addClass('position'); 
		$($tbl).attr({
		    "id" : "tbl" + board.id, 
			"cellspacing":"0",
			"cellpadding":"0"
		})
		if(board.parenttId) {
		    document.getElementById(board.parenttId).appendChild($divHeader);
			document.getElementById(board.parenttId).appendChild($tbl);
			if(board.isVersionShown) {
				document.getElementById(board.parenttId).appendChild($divFooter);
			}	
		} else {
		    document.body.appendChild($divHeader);
			document.body.appendChild($tbl);
			if(board.isVersionShown) {
				document.body.appendChild($divFooter)
			}	
		}
		
		$tr = document.createElement("tr");
		$tbl.appendChild($tr);
		
	for (var i = 1; i <= cellMax; i++) {
		 if(board.italian) { 
		   	if(rowNum % 2 == 0) {
				$td = document.createElement("td");
				$($td).addClass("square");
				$tr.appendChild($td);
				$td = document.createElement("td");
				$($td).addClass("squarebl");
				$($td).attr('id', i);
				$tr.appendChild($td);
			} else {
				 $td = document.createElement("td");
				$($td).addClass("squarebl");
				$($td).attr('id', i);
				$tr.appendChild($td);
				$td = document.createElement("td");
				$($td).addClass("square");
				$tr.appendChild($td);
			}
			
		} else {
				if(rowNum % 2 == 0) {
			    $td = document.createElement("td");
				$($td).addClass("squarebl");
				$($td).attr('id', i);
				$tr.appendChild($td);
				$td = document.createElement("td");
				$($td).addClass("square");
				$tr.appendChild($td);
				
				} else {
					$td = document.createElement("td");
					$($td).addClass("square");
					$tr.appendChild($td);
					$td = document.createElement("td");
					$($td).addClass("squarebl");
					$($td).attr('id', i);
					$tr.appendChild($td);
				}
			}
			
			 if(i % (board.oneRow/2) == 0) { 
		   		$tr = document.createElement("tr");
				$tbl.appendChild($tr);
				rowNum++; 
		   }
			
		}
	};
	
	function buildChecker (sellObj, name) {
		if(!sellObj) {
			return; 
		}
		
		$cnvs = document.createElement('canvas');
		var canvasSize = board.buildCellsize.toString();
		$($cnvs).attr({'name': name, 'width': canvasSize, 'height': canvasSize, 'class': 'ch-canvas', 'data-boardId': board.id});
		var st = name == "white" ||  name == "whiteKing" ? "#FFF" : "#000000";
		var ctx=$cnvs.getContext("2d");
		
		ctx.beginPath();
		ctx.fillStyle=st;
		ctx.arc(38, 38, 32, 0, 2*Math.PI);
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#999999";
		ctx.stroke();
		
		if(name == "whiteKing" || name == "blackKing"){
			ctx.beginPath();
			ctx.arc(38, 38, 32, 0, 2*Math.PI);
			ctx.stroke();
			ctx.beginPath();
			ctx.fillStyle="#999999";
			ctx.arc(38, 38, 16, 0, 2*Math.PI);
			ctx.fill();
		}
		
		sellObj.appendChild($cnvs);
	};
	
	function chessNoteToDigitNote (str) {
		var chessNotation = "b8,d8,f8,h8,a7,c7,e7,g7,b6,d6,f6,h6,a5,c5,e5,g5,b4,d4,f4,h4,a3,c3,e3,g3,b2,d2,f2,h2,a1,c1,e1,g1";
		var chessArray = chessNotation.split(",");
		var len = chessArray.length;
		for(var i = 0; i < len; i++ ) {
			if(chessArray[i] === str) {
				return ++i ;
			}
		}
		 return -1;
	}
	
	function setPosition (newNotation) {
		var name = "";
		
		if(newNotation !== undefined && newNotation !== null) {
			board.notation = newNotation;
		}
		
		if(board.notation === undefined || board.notation === null || board.notation.length === 0) {
			setBoardSize();
			return;
		}
		
		$.each( board.notation, function( key, value ) {
			if(key.match(/hashKey/) === null) {
			
			  name = key;
			  var newArray = value;
			 if (value.match(/,/gi) === null) {
				 var res = value.replace(/ /g, "");
				  var x = res.length / 2;
				  var frst = 0;
				  var lst = 2;
				  newArray = [];
				  for( var i = 0; i < x; i++) {
					 newArray.push(res.slice(frst,lst)); 
					 frst = frst + 2;
					 lst = lst + 2;
				  }
			  } else {
				 newArray = value.split(",");
			 }
			  
			  var len = newArray.length;
			  
			  for(var i = 0; i < len; i++) {
				    var str = newArray[i].trim();
					var number  = isNaN(str) ? chessNoteToDigitNote(str) : str;
					 var sellObj = $("#tbl" + board.id).find("td.squarebl")[number - 1];
					 buildChecker(sellObj, name);
				}
			}	
			
		});
			
		setBoardSize();
			
	};
	
	buildBoard();
	setPosition();
	
return {
		SetBoardSize: setBoardSize,
		SetPosition: setPosition,
		SetBoardColors: setBoardColors,
		BuildChecker: buildChecker
	}
}; 


}(jQuery));
