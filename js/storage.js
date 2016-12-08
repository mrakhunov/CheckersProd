var StoredPosition = {
	Board : {
		oneRow: 8,
		italian: false,
		cellbackgroundcurrent: null,
		colorName: null,
		isNotationShown: false,
		isChess: true,
		isShowSettings: false,
		currentCellSize: 40,
		lang: 'us'
	}, 
	
	checkerTypes: [["wch",[]], ["wkng", []], ["bch", []], ["bkng",[]]],
	setBoard: function (setObject){
		this.Board.oneRow = setObject.oneRow? setObject.oneRow : 8;
		this.Board.italian = setObject.italian? setObject.italian : false;
		this.Board.cellbackgroundcurrent = setObject.cellbackgroundcurrent || null;
		this.Board.colorName = setObject.colorName || "cellbrown";
		this.Board.isShowSettings = setObject.isShowSettings || false;
		this.Board.currentCellSize = setObject.currentCellSize || 40;
		this.Board.lang = setObject.lang || 'us';
		this.Board.isChess = setObject.isChess || true;
		
   	},
	
	buildNotation: function() {
		var notationArray = [[], [], [], []];
		
		for (var i = 0; i < 4; i++) {
			var selectorShort = 'canvas[name="' + this.checkerTypes[i][0] + '"]';
			var len = $(selectorShort).length;
			
			if(len > 1) {
			   for(var j = 1; j < len; j++) {
				 var checkerID = $($(selectorShort)[j]).parent().attr('id'); 
				 notationArray[i][j - 1] = $($(selectorShort)[j]).parent().attr('id');
				}
			}
		}
		
		var boardObject = {};
		boardObject.oneRow = Board.oneRow;
		boardObject.italian = Board.italian;
		boardObject.cellbackgroundcurrent = Board.cellbackgroundcurrent;
		boardObject.colorName = Board.colorName;
		boardObject.isShowSettings = Board.isShowSettings;
		boardObject.currentCellSize = Board.currentCellSize;
		boardObject.lang = Board.lang;
		
		this.setCheckers(notationArray);	
	},
	
	
	getBoard: function() {
		var boardObject = {};
		if(localStorage["board"]) {
			boardObject = JSON.parse(localStorage["board"]);
		}	
		this.setBoard(boardObject);
	},
	
	setCheckers: function(notationArray) {
		for (var i = 0; i < 4; i++) {
			this.checkerTypes[i][1] = notationArray[i];
		}
		localStorage.setItem("position", JSON.stringify(this.checkerTypes));
	},
	
	showPosition: function() {
	    this.getBoard();
		//buildBoard();
		
	    if(!localStorage.position) { return false; }
		
		var notation = JSON.parse(localStorage["position"]);
		var isCheckers = false;
		for(j = 0; j < 4; j++) {
			var notationList = notation[j][1]
			if(!isCheckers) { isCheckers = notationList.length > 0; }
			for(i=0; i < notationList.length; i++) {
				menuChecker.name = notation[j][0];
				
				buildChecker($( ".celbl")[notationList[i] - 1])
			}
		}
		setBoardSize(Board.currentCellSize, 'tbl1')
		return isCheckers;
	}
} 
