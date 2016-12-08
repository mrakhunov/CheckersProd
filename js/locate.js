var Locate = {
lang: 'us',
english: {
	pageTitle: "Mikhail Rakhunov's Checkers Builder",
	menuCheckerTitle: 'To put this checker on the Board click to the checker,and click to any empty sell on the Board',
	menuBasketTitle:  'To remove checker from the Board put it here',
	linkHideSettings: 'Hide settings',
	linkShowSettings: 'Show settings',
	menuLabelCheckerSize: 'Board Size:',
	menuLabelBoardType: 'Board Type:',
	menuLabelBoardColor: 'Board Color:',
	btnLblClearPosition: 'Clear Position',
	btnLblStartPosition: 'Start Position',
	btnLblSendPosition: 'Generate URL',
	optionTextItalian: 'Italian', 
	optionTextColors:  ['Blue','Brown', 'Gray', 'Green'],
	notationTypeTitle: 'Notation:',
	notationType: 'Chess Notation',
	notationShow: 'Show Notation',
	flagTitleEn: 'English',
    flagTitleRu: 'Russian',
	modalWindowTitle: 'Send URL To Friend...',
	modalWindowPositionTitle: 'Click to add Title...',
	modalWindowButtons: ['Close'],
	modalWindowLink: 'Preview in new window',
	checkerNames:[["wch", "White"], ["wkng", "White King"], ["bch", "Black"], ["bkng", "Black King"]]
	
},
russian: {
	pageTitle: "Строитель шашечных диаграмм гроссмейстера Рахунова",
	menuCheckerTitle: 'Чтобы поставить эту шашку на доску, кликни на шашку и кликни на клетку доски',
	menuBasketTitle:  'Чтобы снять шашку с доски, кликни на шашку на доске и кликни сюда',
	linkHideSettings: 'Спрятать опции',
	linkShowSettings: 'Показать опции',
	menuLabelCheckerSize: 'Размер доски:',
	menuLabelBoardType: 'Тип шашек:',
	menuLabelBoardColor: 'Цвет доски:',
	btnLblClearPosition: 'Отчистить доску',
	btnLblStartPosition: 'Начальная позиция',
	btnLblSendPosition: 'Сгенерировать веб-линк',
	optionTextItalian: 'Итальянские',
	optionTextColors:  ['Голубой','Коричневый', 'Серый', 'Зелёный'],
    notationTypeTitle: 'Нотация:',
	notationType: 'Шахматная',
	notationShow: 'Показать',
    flagTitleEn: 'Английский язык',
    flagTitleRu: 'Русский язык',
	modalWindowTitle: 'Пошли линк другу...',	
	modalWindowPositionTitle: 'Кликни, чтобы заполнить название позиции...',
	modalWindowLink: 'Предварительный просмотр в новом окне',
	modalWindowButtons: ['Закрыть'],
	checkerNames:[["wch", "Белые"], ["wkng", "Белые дамки"], ["bch", "Черные"], ["bkng", "Черные дамки"]]
	
},

current: {},

setLang: function (lang) { 
    Board.lang = lang;
	this.lang = lang;
	this.current = {},
	this.current = lang === 'ru'? this.russian : this.english;
	$('title').text(this.current.pageTitle);
	$('.out').attr('title',this.current.menuCheckerTitle); 
	$('#menu-bsk').attr('title',this.current.menuBasketTitle);
	$('#lbl-checker-size').text(this.current.menuLabelCheckerSize);
	$('#lbl-board-type').text(this.current.menuLabelBoardType);
	
	var txt = $('#settings').css('display') ==='none' ? this.current.linkShowSettings : this.current.linkHideSettings;
	$('#settingbtn').text(txt);
	
	$('#startposition').text(this.current.btnLblClearPosition);
	$('#send-pos').find('span.ui-button-text').text(this.current.btnLblSendPosition);	
	$('#option-txt-it').text(this.current.optionTextItalian);
	$('#lbl-board-color').text(this.current.menuLabelBoardColor);
	var options = $('#color').children();
	var optionsLength = options.length;
	for (var i = 0; i < optionsLength; i++) {
		$($(options)[i]).text(this.current.optionTextColors[i]);
	}
	$('fieldset > legend').text(this.current.notationTypeTitle);
	$($('fieldset > div > label')[0]).text(this.current.notationShow);
	$($('fieldset > div > label')[1]).text(this.current.notationType);
	$($(".flags-icons")[0]).attr('title',this.current.flagTitleEn);
    $($(".flags-icons")[1]).attr('title',this.current.flagTitleRu);	
	
}

}