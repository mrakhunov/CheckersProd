// To minimize use: http://jscompress.com/
//or http://dean.edwards.name/packer/
charset="UTF-8";
var Page = {
	nextrow: false,
	maxrows: 2,
	width: '75%',
	height: '400px',
	maxwidth: '90%',
	boardsonrow: 3,
	stopnextrow: false
}
var checker = null;
var parentTableId = null;

var menuChecker = {
	name:null,
	parentcolor: 'transparent', 
	selectedcolor: 'rgba(232, 194, 240, 0.43)',
	busy: false,
	owner: null,
	body: null,
	toolTip: 'To put this checker on the Board click to the checker,and click to any empty sell on the Board',
    selectedToolTip: 'To stop the Edit Mode click to the checker', 	
	basketToolTip: 'To remove checker from the Board put it here',
	originalState: function () {
		if(this.owner !== null) {
			$('#' + this.owner).css('background-color', this.parentcolor);
			$('#' + this.owner).attr('title', this.toolTip);
			this.owner = null;
		}	
		this.name  = null,
		this.busy  = false;
		this.body = null;
	}
}	

	
/*****************************************************
	   function ready
	*****************************************************/
$( document ).ready(function() {
   
	
	StoredPosition.getBoard();
	Board.oneRow = parseInt(StoredPosition.Board.oneRow);
	Board.italian = StoredPosition.Board.italian;
	Board.cellbackgroundcurrent = StoredPosition.Board.cellbackgroundcurrent;
	Board.colorName = StoredPosition.Board.colorName;
	Board.isShowSettings = StoredPosition.Board.isShowSettings;
	Board.currentCellSize = StoredPosition.Board.currentCellSize;
	Board.lang = StoredPosition.Board.lang; 
	Locate.land = Board.lang;
	Board.version();  // Write cooperate
	
	addBoard('content');
	
	if(!StoredPosition.showPosition()) { // show last position from Local Storage
		startPosition();
	}	
		
	$('#startposition').click(function(event) {
			event.preventDefault();
			menuChecker.originalState();
	        if(!Board.emptyboard) {
				clearBoard();
				Board.emptyboard = true;
			}else {
				startPosition();
				Board.emptyboard = false;
			}
			$('.celbl').css('background-color', Board.cellbackgroundcurrent); // repaine all hileted  checkers cells back
			StoredPosition.buildNotation () //store position to local storage 
	});
			
	$('#newcheckers').click(function(event) {
	    if((Board.id) && (Board.id/Page.boardsonrow) >= Page.maxrows) {
			Page.stopnextrow = true;
		} else {
            Page.stopnextrow = false;		
			Page.nextrow = (Board.id >= Page.boardsonrow && Board.id % Page.boardsonrow == 0);
		}
		
		addBoard('content');
		$('#color').trigger('change');
		event.preventDefault();
    });
	
	
	$('#settingbtn').click(function(event) {
	event.preventDefault();
	    if(Board.isShowSettings) {
		    $('#settingbtn').text(Locate.current.linkShowSettings);
			Board.isShowSettings = false;
		} else {
			$('#settingbtn').text(Locate.current.linkHideSettings);
			Board.isShowSettings = true;
		}
		$('#settings').slideToggle("slow");	
		
    });
	
	
	$('#clearpage').click(function(event) {
		event.preventDefault();
	    $('.boardholder').remove();
		Board.parenttId = null;
		Board.id = null;
		
		
    });
	
	
	$('#send-pos').click(function(event) {
		event.preventDefault();
	    sendTo();
    });
	
	$('#type').change(function(event) {
		
		if(Board.isChess) { $($('.nt-checkbox')[1]).trigger('click'); }
		if(Board.isNotationShown) { $($('.nt-checkbox')[0]).trigger('click'); }
			    
		if($("#type :selected").val() === 'i') {
			Board.oneRow = 8;
			Board.italian = true;
			Board.isChess = false;
			$('#chess-div').css('display', 'none');
		} else {
			if ($("#type :selected").val() === '8') {
				$('#chess-div').css('display', 'block');
			} else {
				Board.isChess = false;
				$('#chess-div').css('display', 'none');
			}
			Board.oneRow = $("#type :selected").val();
			Board.italian = false;
		}
		
		
		if($('.boardholder').length == 1) { 
				$('.boardholder').remove();
				Board.id = null;
				Board.parenttId = null;
				addBoard('content');
				$('#color').trigger('change');
		}

        menuChecker.originalState();		
		startPosition();
		setBoardSize(Board.currentCellSize, 'tbl1', Board.colorName);
		StoredPosition.buildNotation () //store position to local storage 
    });
	
	
	$('#color').change(function(event) {
		$('.celbl').css('background-color',Board.cellbackground[$("#color :selected").val()][0]);
		$('.cel').css('background-color',Board.cellbackground[$("#color :selected").val()][1]);
		$('table').css('border-color',Board.cellbackground[$("#color :selected").val()][2]);
		
		Board.cellbackgroundcurrent = $('.celbl').css('background-color');
		Board.colorName = $(this).val();
		menuChecker.originalState();
		event.preventDefault();
    });
	
	buildCheckerMenu();
	
	$(".ch_menu").click(function(event) {
	    if(checker) { 
		return;
		} else {
		   if(menuChecker.owner && !isNaN(menuChecker.owner)) { return;}
		}
		
		
		event.preventDefault();
		var parentId =  $(this).parent().attr('id');
		
		if(menuChecker.owner == parentId) {
		
			if(menuChecker.name) {
			   menuChecker.name = null;
			   menuChecker.owner = null;
			  $(this).parent().css('background-color', menuChecker.parentcolor);
			  $(this).parent().attr('title',menuChecker.toolTip)
			   menuChecker.busy = false;
			   menuChecker.body = null;
			   $('.celbl canvas').attr('title', '')
			  
			} else {
				  menuChecker.name = $(this).attr('name');
				  menuChecker.owner = $(this).parent().attr('id');
				$(this).parent().css('background-color', menuChecker.selectedcolor);
				$(this).parent().attr('title',menuChecker.selectedToolTip);
				menuChecker.busy = true;
				menuChecker.body = this;
					
			}
			
		} else {
			  menuChecker.name = $(this).attr('name');
			 if(menuChecker.owner) { 
			    var oldOwner = "#" + menuChecker.owner;
				$(oldOwner).css('background-color', menuChecker.parentcolor);
				$(oldOwner).attr('title',menuChecker.toolTip);
			 }
			  menuChecker.owner = $(this).parent().attr('id');
			  $(this).parent().css('background-color', menuChecker.selectedcolor);
			  $(this).parent().attr('title',menuChecker.selectedToolTip);
			  menuChecker.busy = true;
			  menuChecker.body = this;
		}
		
			
    });
	
	$(".nt-checkbox").click(function(event) {
		var $this = $(this);
		if($this.attr('name') === "notation") {
		   if(!Board.emptyboard) { clearBoard(); }
		   showNotation($this.is(':checked')); 
		} else {
			Board.isChess = $this.is(':checked');
			var notationCheckBox = $(".nt-checkbox")[0];
			if(Board.isChess) {
				if(Board.emptyboard) {showNotation($(notationCheckBox).is(':checked'));}
			} else {
				if($(notationCheckBox).is(':checked')) {
					showNotation(true);
				}
			}			
		}
});

$(".flags-icons").click(function(event) {
	Locate.setLang($(this).attr('data-lang')) // set language
});

$( "#slider-range-min" ).slider({
  range: "min",
  value: Board.currentCellSize,
  min: 10,
  max: Board.buildCellsize,
  step: 1,
  slide: function( event, ui ) {
	$( "#cell-size" ).text(ui.value );
	setBoardSize(ui.value, 'tbl1', Board.colorName);
	
  }
});
$( "#cell-size" ).text($( "#slider-range-min" ).slider( "value" ) );
	
$("#color option[value='" + Board.colorName + "']").attr("selected", "selected");
$('#color').trigger('change');

if (Board.oneRow !== 8 || Board.italian) {
    var value = Board.italian? "i" : Board.oneRow;
	$('#type option[value="' + value + '"]').attr("selected", "selected");
	$('#type').trigger('.click');
	Board.isChess = false;
	$('#chess-div').css('display', 'none');	
} else if (Board.oneRow === 8) {
	if(Board.isChess) {	$('.nt-checkbox[name="chess-notation"]').trigger('click');} 
}

$('[data-lang=' + Board.lang + ']').trigger('click')
Locate.setLang(Board.lang) // set language

if(!Board.isShowSettings) { 
	 $('#settingbtn').text(Locate.current.linkShowSettings);
	 $('#settings').css('display', 'none');		
}

});/*******************************************
END  READY
**********************************************/


var addBoard = function(elId) {
   	if(Page.stopnextrow) return;
	
	var $div = document.createElement("div");
		
	if(Page.nextrow) {
	var $p = document.createElement("p");
		$($p).html('&nbsp;');
		document.getElementById(elId).appendChild($p);
	}
	
	if(!Board.id) { 
		Board.id = 1;
		} else {
			Board.id = Board.id + 1;
		}
	
	Board.parenttId = "board" + Board.id;
	$($div).attr('id', Board.parenttId);
	$($div).addClass('boardholder');
	if(document.getElementById(elId)) {
		document.getElementById(elId).appendChild($div);
	} 
	buildBoard(Board);
	
	
	$("#menu-bsk").click(function(event) {
		event.preventDefault();
		if(!checker) return;
		 var thisCheckerName = $(checker).attr('name');
		clearChecker();
		menuChecker.name = thisCheckerName;
		buildChecker(this);
		var currentCellSize = Board.currentCellSize;
		var thisCheckersize = Board.currentCellSize < 30 ? 30 : (Board.currentCellSize > 40 ? 40 : Board.currentCellSize);
		setCellSize(thisCheckersize, this.id);
		$(this).children().css({'position':'relative','left':'30px','top':'6px'});
		
		slowRemove();
		Board.currentCellSize = currentCellSize;// set back cell size 
		StoredPosition.buildNotation () //store position to local storage 
	});
	
	var slowRemove = function () {
		var thisInterval = null;
		window.setInterval(function(){
			thisInterval = $('#menu-bsk canvas').animate({ "left": "+=100px" }, "slow" );
			$('#menu-bsk canvas').remove();
		},
		500 
		);
		
		window.clearInterval(thisInterval);
		if($('.celbl').find('canvas').length == 0){
			$('#startposition').text("Start Position");
			Board.emptyboard = true;
				
		}
	}
	
	$(".celbl").click(function(event) {
		event.preventDefault();
		if(menuChecker.busy) {
			if (this.hasChildNodes()) { 
			
			menuChecker.originalState();
			moveChecker(this);
			}else {
			    var thisChecker = Object.create(menuChecker);
				thisChecker.parentcolor = $(this).css('background-color');
				buildChecker(this);
				setCellSize(Board.currentCellSize, this.id);

				if(Board.emptyboard){
					$('#startposition').text(Locate.current.btnLblClearPosition);
				  Board.emptyboard = false;	
				}
			}
			
		} else {
			moveChecker(this);
			
		}
		StoredPosition.buildNotation () //store position to local storage 
});
	
}

var buildCheckerMenu = function() {
	 var st = ["#FFF", "#000000","#FFF", "#000000"];
	 var checkers_menu = $('.ch_menu');
	 $('.out').attr('title', menuChecker.toolTip);
	 $('#menu-bsk').attr('title', menuChecker.basketToolTip);
	 	
	for (i = 0; i < 4; i++){
		var ctx=checkers_menu[i].getContext("2d");
		ctx.beginPath();
		ctx.fillStyle=st[i];
		ctx.arc(19, 19, 16, 0, 2*Math.PI);
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#999999";
		ctx.stroke();
		
		if(i>1){
			ctx.beginPath();
			ctx.arc(19, 19, 14, 0, 2*Math.PI);
			ctx.stroke();
			ctx.beginPath();
			ctx.fillStyle="#999999";
			ctx.arc(19, 19, 8, 0, 2*Math.PI);
			ctx.fill();
		}
	}	
}


var moveChecker = function(obj) {

	if(Board.isNotationShown) return;
       
		if ($(obj).children().length > 0) {
		     if(menuChecker.owner == obj.id) {
					$(obj).css('background-color', $('.celbl').css('background-color'));
					menuChecker.owner = null;
					checker = null;
					return false;
			  }
		
		    if (checker == null) {
			    parentTableId = $(obj).parent().parent().attr('id');
               	checker = obj.firstChild;
				$(obj).css('background-color', menuChecker.selectedcolor);
					menuChecker.owner = obj.id;
					menuChecker.name = $(checker).attr('name');
			}
		 
		}else {
		      
			if (checker != null) {
			   if(obj.className == "celbl" && parentTableId == $(obj).parent().parent().attr('id')) {
					if(($(checker).attr('name') == "wch" && Board.oneRow/2 >= parseInt(obj.id)) || ($(checker).attr('name') == "bch" && (Board.oneRow*Board.oneRow/2 - Board.oneRow/2) < parseInt(obj.id)) ) {
						$('#' + menuChecker.owner).children().eq(0).remove();
						menuChecker.name = $(checker).attr('name') == "wch" ? "wkng" : "bkng";
						buildChecker (obj);
						
					} else {
						obj.appendChild(checker);
					}
					
					$('#' + menuChecker.owner).css('background-color', $(obj).css('background-color'));
					menuChecker.owner = null;
					menuChecker.name = null;
					checker = null;
					
				} else { return false;}
			}
		}
		return true;
}

var clearChecker = function() {
    if($(checker).parent().attr('class') === "celbl") {
		$(checker).parent().css('background-color', Board.cellbackground[$("#color :selected").val()][0]);
		$(checker).parent().html("");
		checker = null;
		menuChecker.owner = null;
		menuChecker.name = null;
	}	
}

var clearBoard = function() {
    if($('.ch')) {$('.ch').remove();}
	Board.emptyboard = true;
	$('#startposition').text(Locate.current.btnLblStartPosition);
}

var startPosition = function() {
	var oneRowCells = Board.oneRow/2;
	var lastBlackStartSell =  oneRowCells * (oneRowCells - 1);
	var lastEmptySell =  oneRowCells * Board.oneRow - lastBlackStartSell;
	
	if(Board.isChess) { $($('.nt-checkbox')[1]).trigger('click'); }
	if(Board.isNotationShown) { $($('.nt-checkbox')[0]).trigger('click'); }
		
	if($( ".celbl" ).children()) {clearBoard();}
	
	$( ".celbl" ).each( function( index, element ){
		if( parseInt($( this ).attr('id')) <= lastBlackStartSell ){
		   menuChecker.name = "bch";
           buildChecker(this);		   
		} else if   ( parseInt($( this ).attr('id')) > lastEmptySell ) {
			menuChecker.name = "wch";
			buildChecker(this);
		} 
		menuChecker.name = null;
		menuChecker.owner = null;
	});
	Board.emptyboard = false;
	$('#startposition').text(Locate.current.btnLblClearPosition);
	setBoardSize(Board.currentCellSize, 'tbl1', Board.colorName);
}

var showNotation = function(show) {
	$('.celbl').each(function( index, value ) {
	    var i =  $(this).attr('id')
		if(show) {
		     
		     $(this).html(Board.isChess? getChessNote(--i) : i);
			 Board.isNotationShown = true;
		} else {
			$(this).html("");
			Board.isNotationShown = false;
		}
 
	});
}

$( window ).unload(function() {
	StoredPosition.setBoard(Board);
	localStorage.setItem("board", JSON.stringify(StoredPosition.Board)); 
});

/***Create Img */
var createImg = function () {
	var image = document.getElementById('ch').createJpg();	
	document.myform1.storeImage.value = image;
}

var createImg2 = function () {
	var image = document.getElementById('ch').createJpg();	
	loadXMLDoc2(image);
}

function loadXMLDoc2(value)
{
	$.post('createPicture.php', { storeImage : value }, function(data) {
		var notes = document.getElementById('notes');
		var p = document.createElement('p');
		var img = document.createElement('img');
		img.src = trim(data);
		img.style = "border-color:#CCCC99; border-width:2px;";
		notes.appendChild(p);
        p.appendChild(img);
		
	}
	
	);
}
function loadXMLDoc(value)
{
var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
		var notes = document.getElementById('notes');
		var p = document.createElement('p');
		var img = document.createElement('img');
		img.src = trim(xmlhttp.responseText);
		img.style = "border-color:#CCCC99; border-width:2px;";
		notes.appendChild(p);
        p.appendChild(img);
				
    }
  }
xmlhttp.open("POST","createPicture.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("storeImage=" + encodeURIComponent(value));
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}


