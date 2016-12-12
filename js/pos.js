$(function() {
	if(temp === undefined && temp.length === 0) {
		return;
	}
	
	var notation = convertToArray(MRD(temp[0]));
	var  boardSet = JSON.parse(MRD(temp[1]));
	var oneRow, italian = false;
	var colorName = MRD(temp[4]).replace('cell', ''); 
	
	
	if(boardSet[1] % 10 == 0) { 
	   oneRow = boardSet[0]/(boardSet[1]/10);
	} else {
		italian = true; 
		oneRow =  boardSet[0]/((boardSet[1] - 1)/10);
	}

	var notationObj = {
		white: notation[0].toString(),
		whiteKing:  notation[1].toString(),
		black: notation[2].toString(),
		blackKing:notation[3].toString()
	};

	var properties = {
		title: MRD(temp[5]),
		id: 1,
		cellSize: temp[2], 
		oneRow: oneRow,
		notation: notationObj,
		colorName: colorName,
		italian: italian
	};

	$("#sent-position").showPosition(properties); 
});	