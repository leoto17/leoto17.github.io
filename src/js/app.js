var game = true;

$(document).ready(function() {
	var turn = -1;
	$('.vertical-center').slick({
		dots: true,
		vertical: true,
		centerMode: true,
	});
	var luckyNumbers = generateNumbers();
	console.log(luckyNumbers);
	$('body').keydown(function(e) {
		if(game){
			switch(e.keyCode) {
				case 32://SPACE
					if(turn < 74){
						turn++;
						newNumber(luckyNumbers[turn]);
					}else{
						game = false;
						$('div#popup2.popupBase').fadeIn(1000);
					}
				break;
				case 82://R
					replayNumber(luckyNumbers[turn]);
					rePaintItem(luckyNumbers[turn]);
				break;
				case 116://F5
					restart();
					return false;
				break;
			}
		}
    });
});

function newNumber(soundId){
	var sound = new Audio('src/sounds/LotteryBall.wav');
	sound.play();
	setTimeout(function() {
		$('#slick-slide-control0'+soundId).click();
		paintItem(soundId);
		sound = new Audio('src/sounds/'+soundId+'.wav');
		sound.play();
	}, 750);
}

function replayNumber(soundId){
	var sound = new Audio('src/sounds/'+soundId+'.wav');
	sound.play();
}

function generateNumbers() {
	var list = [];
	var rng = new RNG(Math.floor(Math.random() * (100 - 10)) + 10);
	while(list.length < 75){
		var random = ((rng.nextInt()) % 75) + 1;
		while(list.indexOf(random) != -1){
			random = ((rng.nextInt()) % 75) + 1;
		}
		list.push(random);
	}
	game = false;
	$('div#popup1.popupBase').fadeIn(1000);
	return list;
}

function paintItem(itemId){
	$('div#'+itemId+'.item').css('background-color','#5275d2');
	$('div#'+itemId+'.item').css('color','white');
	$('div#'+itemId+'.item').css('border-color','white');
}

function rePaintItem(itemId){
	$('div#'+itemId+'.item').css('background-color','white');
	setTimeout(function() {
		$('div#'+itemId+'.item').css('background-color','#5275d2');
	}, 500);
}

function openInstructions(){
	game = false;
	$('div#popup3.popupBase').fadeIn(1000);
}

function closeModal(modalId){
	game = true;
	$('div#popup'+modalId+'.popupBase').fadeOut(800);
}

function restart(){
	var answer = confirm("La página se recargará y se perderán los datos de la partida actual. ¿Desea continuar?");
	if(answer == true){
		location.reload();
	}
}

function RNG(seed) {
	this.m = 0x80000000;
	this.a = 1103515245;
	this.c = 12345;
	this.state = seed ? seed : Math.floor(Math.random() * (this.m-1));
}
RNG.prototype.nextInt = function() {
	this.state = (this.a * this.state + this.c) % this.m;
	return this.state;
}