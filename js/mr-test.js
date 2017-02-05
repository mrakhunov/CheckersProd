var default65 = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789$#!";
var my65 = "QfmrOpHEeI1bivRoJ87SdUV2wgBhP549Gt0$DYukNMx3s!FZLlCXzcnWa#A6yqTjK"; //default65;
var my62 = my65.substr(0,62);
var border = [my65.substr(62, 1), my65.substr(63, 1), my65.substr(64, 1)];
var borderStr = border.toString();
var cdLen = my62.length;
var cd3 = [7, 19, 23];

var generateKey = function() {
	var isSmallEnough = function(value) {
		return value <=65;
	};
	var indx = 0;
	var key = "";
	var array = new Uint8Array(1000);
	while (key.length < 65){
		indx++
		if(indx === 5) {
			break;
		}
		window.crypto.getRandomValues(array);
		array = array.filter(isSmallEnough);
		var len = array.length;
		for(var i = 0; i < len; i++) {
			var ch = default65.charAt(array[i]);
			if(key.includes(ch)) {
				continue;
			} else {
				key += ch;
				if(key.length === 65) {
					my65 = key;
					return key;
				}
			}
		}
	}	
	return default65;
}

var getIndex = function () {
	var x = Math.random()*3;
	if (x < 1) return 0;
	else if (x > 2) return 2;
	else return 1;
}

var isBorder = function (str) {
	return borderStr.includes(str);
}

var MRE = function (txt) {
	var k = cd3[getIndex()];
	var r = k;
	var out = ""; 
	for (i=0; i<txt.length; i++){
	   var num = txt.charCodeAt(i);
	   num = num + k;
	   var tmp;
	   if(num < cdLen) {
		   tmp = my62.charAt(0) + my62.charAt(num);
	   } else if (num < (cdLen * cdLen)) {
		   var dec = Math.floor(num / cdLen);
		   tmp = my62.charAt(dec) + my62.charAt(num % cdLen);
		} else {
			var x = cdLen * cdLen;
			var cent =  Math.floor(num / x);
			var dec = Math.floor(num % x);
			var didg = Math.floor(dec % cdLen);
			dec = Math.floor(dec / cdLen);
			tmp = border[getIndex()] + my62.charAt(cent) + my62.charAt(dec) + my62.charAt(didg);
	    }
	   out += tmp;
	   if (k == cd3[0]) k = cd3[1];
	   else if (k ==cd3[1]) k = cd3[2]; 
	   else k = cd3[0]; 
	}
	return my62.charAt(r) + out;
};

var MRD = function (inTxt) {
	var left = inTxt.substr(1);
	var r = my62.indexOf(inTxt.substr(0,1));
	var num62;
	var pos = 2;
	var txt = "";
	var num = 0; 
	var i;
	for(i = 0; i < cd3.length; i++) {
		if( r === cd3[i]) {
			break;
		}
	}
	
	while (left.length >=2){
		if(isBorder(left.substr(0,1))) {
			pos = 4; 
			num62 = left.slice(1, pos);
			num = (my62.indexOf(num62.substr(0,1)) * 62 * 62 +  my62.indexOf(num62.substr(1,1)) * 62 + my62.indexOf(num62.substr(2,1))) - cd3[i];
		} else {
			pos = 2; 	 
			num62 = left.slice(0, pos);
			num = (my62.indexOf(num62.substr(0,1)) * 62 + my62.indexOf(num62.substr(1,1))) - cd3[i];
		}
		txt += String.fromCharCode(num);
		left = left.slice(pos);
		i++;
		if (i === 3 ) i = 0;
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
