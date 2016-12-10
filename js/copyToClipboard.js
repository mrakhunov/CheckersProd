var textToClipboard = function () {
	this.copyToClipboard = function(txtSelector) {	
	  var copyText = document.querySelector(txtSelector);
	  window.getSelection().removeAllRanges();  	
	  var range = document.createRange();  
	  range.selectNode(copyText);  
	  window.getSelection().addRange(range);
	  try {  
		var successful = document.execCommand('copy');  
		var msg = successful ? 'successful' : 'unsuccessful';  
	  } catch(err) {
			var er = err;
	  }finally {
		  window.getSelection().removeAllRanges();  
	  }
	};
	 
	//});
};
