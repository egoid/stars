'use strict'

$(document).ready(init);

var api = 'http://api.wunderground.com/api/df45a7cd0539b861/'


function init() {

	gW()

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