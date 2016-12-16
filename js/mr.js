var my62 = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
<<<<<<< HEAD
var zero = ["A", "!", "$"];
=======
var zero = ["A", "!", "%"];
>>>>>>> origin/master
var cdLen = my62.length;
var cd3 = [7, 19, 23];

var getIndex = function () {
	var x = Math.random()*3;
	if (x < 1) return 0;
	else if (x > 2) return 2;
	else return 1;
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
		   tmp = my62.charAt(num);
	   } else {
		   var dec = Math.floor(num / cdLen);
		   if(dec < cdLen) {
				tmp = my62.charAt(dec) + my62.charAt(num % cdLen);
		   } else {
				var cent =  Math.floor(dec / cdLen);
				dec = my62.charAt(dec % cdLen);
				tmp = my62.charAt(cent) + my62.charAt(dec) + my62.charAt(num % cdLen);
		   }	
	   }
	   if(tmp.length < 2) tmp = zero[getIndex()]+tmp;
	   else if(tmp.length > 2) tmp = "!!";
	   out +=tmp;
	   if (k == cd3[0]) k = cd3[1];
	   else if (k ==cd3[1]) k = cd3[2]; 
	   else k = cd3[0]; 
	}
	return my62.charAt(r) + out;
};

var MRD = function (inTxt) {
	var left = inTxt.substr(1);
	var r = my62.indexOf(inTxt.substr(0,1));
	var pos = 2;
	var txt = "";
	var num = 0; 
	var i;
	for(i = 0; i < cd3.length; i++) {
		if( r === cd3[i]) {
			break;
		}
	}
	
	while (left.length >=pos){
		 var num62 = left.slice(0, pos);
		 if (num62 === "!!") {
			txt += "?"; 
		 } else {
<<<<<<< HEAD
			 var dec = (num62.substr(0,1) === "!" ||  num62.substr(0,1) === "$") ? 0 : my62.indexOf(num62.substr(0,1));
=======
			 var dec = (num62.substr(0,1) === "!" ||  num62.substr(0,1) === "%") ? 0 : my62.indexOf(num62.substr(0,1));
>>>>>>> origin/master
			 num = dec * 62 + my62.indexOf(num62.substr(1,1)) - cd3[i];
			 txt += String.fromCharCode(num);
		 }	 
		 
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
