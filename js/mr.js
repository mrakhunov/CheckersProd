var MRE = function (txt) {
	var k = 3;
	var r = Math.random()*3;
	if (r < 1) k = 3;
	else if (r > 2) k = 7;
	else k = 5;
	r = k;
	var out = ""; 
	for (i=0; i<txt.length; i++){
	   num = txt.charCodeAt(i);
	   tmp=String(num *k);
	   if(tmp.length < 2) out = "000"+tmp;
	   else if (tmp.length < 3) tmp = "00"+tmp;
	   else if (tmp.length < 4) tmp = "0"+tmp;
	   out +=tmp;
	   if (k == 3) k = 5;
	   else if (k == 5) k = 7; 
	   else k = 3; 
	}
	return String(r) + out;
};

var MRD = function (inTxt) {
	var left = inTxt.substr(1);
	var r = inTxt.substr(0,1);
	var pos = 4;
	var txt = "";
	var num = 0; 
	k = Number(r);

	while (left.length >=pos){
	 num =  Number(left.slice(0, pos))/k;
	 txt += String.fromCharCode(num);
	 
	 left = left.slice(pos);
	 k += 2;
	 if (k > 7) k = 3; 
	}
	return txt; 
};

var MREn = function (numArray) {
    var newArray = [];
	var k = 13;
	var r = Math.random()*3;
	if (r < 1) k = 13;
	else if (r > 2) k = 17;
	else k = 19;
	r = k;
	
	for (var i = 0; i < numArray.length; i++){
	  var nbr = parseInt(numArray[i]);
	   newArray[i] = nbr + k;
	   if (k == 13) k = 17;
	   else if (k == 17) k = 19; 
	   else k = 13; 
	}
	newArray[newArray.length] = r;
	return newArray;
};

var MRDn = function (inNumArray) {
	var newArray = [];
	
	if(inNumArray.length === 0) {
		return newArray;
	}
	
	var r = inNumArray[inNumArray.length - 1];
	var k = r;
	for (var i = 0; i < inNumArray.length - 1; i++){
	   newArray[i] = inNumArray[i] - k;
	   if (k == 13) k = 17;
	   else if (k == 17) k = 19; 
	   else k = 13; 
	}
	
	return newArray; 
};

var convertToArray = function(notationStr) { 
    var notationArr = JSON.parse(notationStr);
	var stringArr = [];
	notationArr.forEach(function(el, indx) {
		var str =  MRDn(el).toString();
		stringArr.push(str);
	});
	return stringArr;
};
