var dial
var firstStop
var sections = ['Knowledge','Comprehension','Application','Analysis','Synthesis','Evaluation'];
 var colors=[{style: "color: #F2777F"},{style: "color: #40C8F4"},{style: "color: #F6F08B"}];
var globalData;
$( document ).ready(function() {

                var elem=document.getElementById("spin-ball");
                dial= kcRotateDial(elem);
                var elem2=document.getElementById("hollaBack");
                dial.onchange=function(){
displayCategory()               
}

                $(dial).mouseup(function()  {animateRotate(dial.deg,0)});
                $(window).mouseleave(function()  {animateRotate(dial.deg,0)});

displayCategory()

});






$.getJSON( "miller.json", function( data ) {
		globalData = data;
		loadWheelData(data);
		displayClouds()
		});

loadWheelData = function(data) {

}

var kcRotateDial=function(elem){
	//var output=this;
	var output = elem;
	//Preventing elem to being selected on IE
	if(document.all && !window.opera) elem.setAttribute("unselectable","on");
	//Public Properties
	output.rad=0;
	output.deg=0;
	output.per=0;
	output.fullRad=0;
	output.fullDeg=0;
	output.fullPer=0;
	output.spin=0;
	output.clock=false;
	//Private properties
	var drag=false;
	var pos=[];
	var size=[];
	var axis=[];
	var cursor=[];
	var rad=0;
	var lastRad=0;
	var lastPer=0;
	var lastFullRad=0;
	var maxRad=6.283185307179586;
	var maxDeg=360;
	var maxPer=100;
	var Dx=[];
	var Dy=[];

	//Public Methods
	output.onchange=function(){};
	output.isMoving=function(){return drag};
	function setRotate(d){
//displayCategory()
displayClouds();
//console.log(globalData[show]);
$("#spin-ball").animate(

		{deg: d}, //End/Final Angle/Degree
		{ //Determines 'steps' of rotation
step: function(now, fx){
//console.log(output.deg);
fx.start = output.deg;

if (fx.start <= 180) {
//console.log(now);
//setAngle(now);
}
else {

output.clock=false;
//console.log(elem.clock + " blah");
//setAngle(now);
}
}
});
}  

output.setAngle =function(now){

	$("#spin-ball").css({

			'-webkit-transform': 'rotate(' + now + 'deg)',
			'-moz-transform': 'rotate(' + now + 'deg)',
			'-ms-transform': 'rotate(' + now + 'deg)',
			'-o-transform': 'rotate(' + now + 'deg)',
			'ransform': 'rotate(' + now + 'deg)'

			});

}


function getRotationDegrees(obj) {
	var matrix = obj.css("-webkit-transform") ||
		obj.css("-moz-transform")    ||
		obj.css("-ms-transform")     ||
		obj.css("-o-transform")      ||
		obj.css("transform");
	if(matrix !== 'none') {
		var values = matrix.split('(')[1].split(')')[0].split(',');
		var a = values[0];
		var b = values[1];
		var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
	} 
	else { var angle = 0; }
	//return matrix;
	return (angle < 0) ? angle +=360 : angle;
}

//Private Methods
function preventDefault(e){
	//prevent event's default action
	if(window.event) e=window.event;
	if(e.preventDefault){e.preventDefault()}else{e.returnValue=false};
}
function getPos(elem){
	//get the position [left,top] relative to whole document (in a very complicated, annoying way)
	var tmp=elem;
	var left=tmp.offsetLeft; //tmp.offset().left;
	var top=tmp.offsetTop;
	//console.log(tmp.offsetParent);
	while (tmp=tmp.offsetParent){
		//console.log(tmp.offsetParent);
		left += tmp.offsetLeft; //Adding to left all the relative offsets for each of the parents
	}
	tmp=elem;
	while(tmp=tmp.offsetParent) top+=tmp.offsetTop; //Adding to top all the relative offsets for each of the parents
	return [left,top];
}


function getSize(elem){
	//return the size [width,height] of the element
	return [elem.offsetWidth,elem.offsetHeight];
}
function getAxis(elem){
	//return the center point [left,top] of the element
	return [getPos(elem)[0]+getSize(elem)[0]/2,getPos(elem)[1]+getSize(elem)[1]/2];
}
function getCursorPos(e){
	//return the cursor's position [x,y]
	var cursorPos;
	if(window.event) e=window.event;
	if(e.clientX) cursorPos=[e.clientX,e.clientY];
	if(e.pageX) cursorPos=[e.pageX,e.pageY];
	try{if(e.targetTouches[0]) cursorPos=[e.targetTouches[0].pageX,e.targetTouches[0].pageY];}catch(err){};
	return cursorPos;
}
function getAngle(e){
	//getting rotation angle by Arc Tangent 2
	var rad;
	pos=getPos(elem);
	size=getSize(elem);
	axis=getAxis(elem);
	cursor=getCursorPos(e);
	rad=Math.atan2(cursor[1]-axis[1],cursor[0]-axis[0]); //MATHS, just go with it
	//correct the 90° of difference starting from the Y axis of the element
	rad+=maxRad/4; //Fixing side effect of rotate

	//transform opposite angle negative value, to possitive
	if(rad<0) rad+=maxRad;
	return rad;
}
function setDrag(e,bool){
	//set or unset the drag flag
	if(bool){
		preventDefault(e);
		rad=getAngle(e);
		drag=true;
	}else{
		lastRad = 0;
		drag=false;
	}//output.onchange();

}
function rotate(e){
	//Rotate the element
	if(drag){
		//setting control variables
		var cursorRad;
		var relativeRad;
		var rotationRad;
		cursorRad=getAngle(e);
		relativeRad=cursorRad-rad;
		var rotationRad=lastRad+relativeRad;
		if(rotationRad<0) rotationRad=maxRad;
		if(rotationRad>maxRad) rotationRad=0;
		rad=cursorRad;

		//applying rotation to element
		elem.style.MozTransform="rotate("+rotationRad+"rad)";
		elem.style.WebkitTransform="rotate("+rotationRad+"rad)";
		elem.style.OTransform="rotate("+rotationRad+"rad)";
		elem.style.MsTransform="rotate("+rotationRad+"rad)";
		//rotation Matrix for IExplorer
		if(document.all && !window.opera){
			var iecos = Math.cos(cursorRad);
			var iesin = Math.sin(cursorRad);
			Dx[0]=-(size[0]/2)*iecos + (size[1]/2)*iesin + (size[0]/2);
			Dx[1]=-(size[0]/2)*iesin - (size[1]/2)*iecos + (size[1]/2);
			if(navigator.appVersion.toLowerCase().match("msie 8.0"))
				elem.style.filter  ="progid:DXImageTransform.Microsoft.Matrix(M11="+iecos+", M12="+-iesin+", M21="+iesin+", M22="+iecos+", Dx="+Dx[0]+", Dy="+Dx[1]+", SizingMethod=auto expand)";
			elem.style.msFilter="progid:DXImageTransform.Microsoft.Matrix(M11="+iecos+", M12="+-iesin+", M21="+iesin+", M22="+iecos+", Dx="+Dx[0]+", Dy="+Dx[1]+", SizingMethod=auto expand)";

		}
		//assigning values to public properties
		output.rad=rotationRad;
		output.deg=maxDeg*output.rad/(2*Math.PI);
		output.per=(output.rad*maxPer)/maxRad;

		if((lastPer<=100 && lastPer>=60) && (output.per>=0 && output.per<=30)) output.spin++;
		if((lastPer<=30 && lastPer>=0) && (output.per>=60 && output.per<=100)) output.spin--;

		output.fullRad=output.rad+(maxRad*output.spin);
		output.fullDeg=output.deg+(maxDeg*output.spin);
		output.fullPer=output.per+(maxPer*output.spin);

		//if(lastFullRad<output.fullRad) output.clock=true;
		//if(lastFullRad>output.fullRad) output.clock=false;

		lastRad= rotationRad;
		if(lastRad <=180) output.clock=true;
		if(lastRad > 180) output.clock=false;

		lastPer=output.per;
		lastFullRad=output.fullRad;
		output.onchange();

	}
}

//Listen events
elem.onmousedown=function(e){setDrag(e,true);}
document.onmouseup=function(e){ setRotate(0);setDrag(e,false);}
document.onmousemove=function(e){rotate(e);}
try{elem.addEventListener('touchstart',function(e){setDrag(e,true);})}catch(err){}
try{document.addEventListener('touchend',function(e){ setRotate(0);setDrag(e,false);})}catch(err){}
try{document.addEventListener('touchmove',function(e){rotate(e)})}catch(err){}

//EXP
return output;

}

function displayCategory()
{

  var spec = parseInt(dial.deg/(360/sections.length-2));
                var displayEl = document.getElementById("displayLetter");
                show = sections[spec];
		if(typeof show!="undefined"){
                displayEl.innerHTML = show;

}
}

function displayClouds() {
                show = globalData[show];
                var word_array = [];
                var word_array2 = [];
                for (i=0; i<show["nouns"].length; i++)
                {
                        word_array[i] = {};
                        word_array[i].text = show["nouns"][i];
                        word_array[i].weight =  3;
                        word_array[i].html = colors[Math.floor(Math.random() * 3) + 0];
                }

                $("#cloud").html("");
                console.log(word_array);
                $("#cloud").jQCloud(word_array, {
width: 450,
height: 300
});

for (i=0; i<show["verbs"].length; i++)
{
        word_array2[i] = {};
        word_array2[i].text = show["verbs"][i];
        word_array2[i].weight =  3;
        word_array2[i].html = colors[Math.floor(Math.random() * 3) + 0];
} 

$("#cloud2").html("");
$("#cloud2").jQCloud(word_array2, {
width: 450,
height: 300
});
}


function animateRotate(from,to){
        from = parseInt(from);
        if(from <= 180){

                var myInterval2 = setInterval(function  () {            
                                dial.setAngle(from--);
                                if(from <0)
                                clearInterval(myInterval2);
                                },1);
        }
        else {
                var myInterval = setInterval(function () {
                                dial.setAngle(from++);
                                if(from > 360)
                                clearInterval(myInterval);
                                },1);
        }

}


