'use strict'

$(document).ready(init);

var api = 'http://api.wunderground.com/api/df45a7cd0539b861/'


function init() {
	gW();
	var track;
	var gainNode;
	var caveB = 0;
	var bass =0;
	var violin = 0;
	var kick = 0;
	var hipitch = 0;
	var snap = 0;
	var hihat = 0;
	

	var myAudio;
	myAudio = new AudioContext();
	myAudio.crossOrigin = 'anonymous';



	$('.star').mousedown(start)


	function start() {
		if (caveB === 0) {
		gainNode = myAudio.createGain();
		var caveStory = new Audio();
		caveStory.src = 'cavestory.wav';
		caveStory.autoplay = true;
		caveStory.loop = true;
		document.body.appendChild(caveStory);
		caveB = 1


		var source = myAudio.createMediaElementSource(caveStory);
		gainNode.connect(myAudio.destination);
		source.connect(gainNode);
		}



		document.body.addEventListener('mousemove', calcPos)
		document.body.addEventListener('mouseup', stopMove)
	}

	function calcPos(event){
		runVolume(event.y)
	}

	function runVolume(y) {
		var pos = 1 - (y/1000)
		var volume = 1 - (y/700)
		gainNode.gain.value= volume;
		$('.star').css('bottom',pos*850+'px')
	}

	function stopMove(event) {
		document.body.removeEventListener('mousemove',calcPos)

	}


	function gW() {


		var url = api+'astronomy/q/autoip.json'
		$.get(url)
		.done(function(data){
			var x = data.sun_phase.sunrise.hour
			if (x.length === 1) {var x ="0"+x}
			var y = data.sun_phase.sunrise.minute
			$('#rise').text(x+':'+y)

			var a = data.sun_phase.sunset.hour
			if (a.length === 1) {var a ="0"+a}
			var b = data.sun_phase.sunset.minute
			$('#set').text(a+':'+b)

		})
		.fail(function(data){
			console.log(data)
		});
	}
			
	
}