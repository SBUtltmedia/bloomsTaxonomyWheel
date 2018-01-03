var show
var dial
var currentItem = 0;
var back
var sections = ["Remembering", "Understanding", "Applying", "Analyzing", "Creating", "Evaluating"];

var colors = [{
    style: "color: #F2777F"
}, {
    style: "color: #40C8F4"
}, {
    style: "color: #F6F08B"
}];
var globalData;
var coverElementId = "cover";
var backElementId = "back";
$(document).ready(function () {

    var frontElem = document.getElementById(coverElementId);
    dial = new kcRotateDial(frontElem);
    var backElem = document.getElementById(backElementId);
    //back=new kcRotateDial(backElem);      
    dial.onchange = function () {
        displayCategory()
            //displayClouds();
    }

    $('#' + coverElementId).on("mouseup mouseleave", function () {
        currentCoverRot = getRotationDegrees($('#' + coverElementId))
        dial.setDrag(false)
        var spec = parseInt(dial.deg / (360 / sections.length - 2));
        currentItem = (currentItem + spec) % 6;
        if (currentCoverRot) {
            //displayCategory()               
            displayClouds();
            currentBackRot = getRotationDegrees($('#' + backElementId))
            var backRotateDelta = 360 - (currentItem * 60)
            $('#' + backElementId).animateRotate(currentBackRot, backRotateDelta)

            $('#' + coverElementId).animateRotate(dial.deg, 0);
        }
    });
    displayCategory()



});



function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform") ||
        obj.css("-ms-transform") ||
        obj.css("-o-transform") ||
        obj.css("transform");
    if (matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    } else {
        var angle = 0;
    }
    return (angle < 0) ? angle + 360 : angle;
}

function displayCategory() {
    var displayItem = (currentItem + parseInt(dial.deg / (360 / sections.length - 2))) % 6;


    //console.log(spec,currentItem,getRotationDegrees($('#'+coverElementId)));   
    var displayEl = document.getElementById("displayLetter");
    show = sections[displayItem];
    if (typeof show != "undefined") {
        displayEl.innerHTML = show;

    }
}

function displayClouds() {
   
	 console.log(bloomData)
    $('#displayInfo').html("");
    var noun = bloomData.find(function (element) {
        return element.Action == show
    });
    //sections=Object.keys(noun);
    for (i in Object.keys(noun)) {
        var currentKey = Object.keys(noun)[i]
        var headerDiv = $('<div/>');
        headerDiv.attr("class", "header");
        headerDiv.html(currentKey)
        var contentDiv = $('<div/>')
        contentDiv.attr("class", "content");
         contentDiv.attr("id", currentKey.replace(" ","-"));
	var preTag=$('<pre/>');
	preTag.html(noun[currentKey])
        contentDiv.html(preTag)
        contentDiv.prepend(headerDiv);
        $('#displayInfo').append(contentDiv);
    }

}




$.fn.animateRotate = function (startAngle, endAngle, duration, easing, complete) {
    return this.each(function () {
        var elem = $(this);
        if (Math.abs(startAngle - endAngle) >= 180) {
            if (startAngle >= 180) {
                endAngle += 360
            } else {
                endAngle += 360
                endAngle %= 360;
            }
        }
        if (this.id == "back") console.log(startAngle, endAngle)


        $({
            deg: startAngle
        }).animate({
            deg: endAngle
        }, {
            duration: duration
            , easing: easing
            , step: function (now) {
                elem.css({
                    '-moz-transform': 'rotate(' + now + 'deg)'
                    , '-webkit-transform': 'rotate(' + now + 'deg)'
                    , '-o-transform': 'rotate(' + now + 'deg)'
                    , '-ms-transform': 'rotate(' + now + 'deg)'
                    , 'transform': 'rotate(' + now + 'deg)'
                });
            }
            , complete: function () {} || $.noop
        });
    });
};





/*
function animateRotate(from,to,item){
	from = parseInt(from);
	if(from <= 180){

		var myInterval2 = setInterval(function  () {            
				$(item).css('transform', 'rotate(' + from-- + 'deg)');;
				if(from <0)
				animateDone(myInterval2,item);
				},1);
	}
	else {
		var myInterval = setInterval(function () {
				$(item).css('transform', 'rotate(' + from++ + 'deg)');;
				if(from > 360)
				animateDone(myInterval,item);
				},1);
	}

}
*/
