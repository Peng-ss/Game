var div1 = document.getElementsByClassName('div1');
var div2 = document.getElementsByClassName('div2');
var div3 = document.getElementsByClassName('div3');
var button1=document.getElementsByClassName('button1');
var button2=document.getElementsByClassName('button2');
var span1=document.getElementsByClassName('span1');
var b=0;//整除10，发射一颗子弹
var kaiguan = 0;
var bullet;//子弹定时器
var x1,y1;//鼠标的位置
var feiji;//自己的飞机
var flag=0;
var grade=0;//分数
setInterval(function(){
	clear1();
	strike();
	strike1();
},10)
button1[0].onmousedown= function(){
	div1[0].style.backgroundImage='url("../images/background_1.png")';
	button1[0].style.display="none";
	var dj= setInterval(function(){
		diji();
		diji1();
		if (div3[0].style.display=="block") {
			clearInterval(dj);
		}
	},2000);
	feiji= document.createElement("img");
	feiji.style.display="block";
	feiji.src="../images/my.gif";
	feiji.style.marginTop ="580px";
	feiji.style.marginLeft="43%";
	div1[0].appendChild(feiji);
	span1[0].style.display="block";
	flag=1;
}
button2[0].onmousedown=function(){
	location.reload(true);  

}
div1[0].onmousemove =function(a){
	x1=a.clientX;
	y1=a.clientY;
	feiji.style.marginTop=y1-33+"px";
	feiji.style.marginLeft=x1-480-30+"px";
}
div1[0].onmouseover =function(e){
	kaiguan =1;
	if(kaiguan ==1)
	bullet=setInterval(function(){
		if (button1[0].style.display=='none' && span1[0].style.display=="block") {
			b++;
			if (b%15==0 && grade<300) {
				zidan(e);
			}
			else if (b%10==0 && grade>=300) {
				zidan(e)
			}
		}
	},50);	
}
div1[0].onmouseout = function(){
	kaiguan = 0;
	if (kaiguan==0) {
		clearInterval(bullet);
	}
}
function zidan(e){
	var y = 0;
	var x2=x1;
	var y2=y1;
	var bull = document.createElement('div');
	bull.style.width = "5px";
	bull.style.height = '10px';
	bull.style.borderRadius = '2.5px';
	bull.style.backgroundImage="url(../images/bullet1.png)";
	bull.style.position = "absolute";
	bull.style.left = x2+'px'; 
	bull.style.top = y2+y+'px';
	div1[0].appendChild(bull);
	var c=setInterval(function(){
		y--;
		bull.style.top = y2+y+'px';
		if (y+y2+10<=0) {
			clearInterval(c);
		}
	},3)
}
//没有遇到敌机的子弹清除
function clear1(){
	for (var i = 0; i <document.getElementsByTagName('div').length; i++) {
		if(document.getElementsByTagName('div')[i].offsetTop+10<=0){
			div1[0].removeChild(document.getElementsByTagName('div')[i]);
		}
	}
}
function diji(){
	if (flag==1) {
	var y3=0;
	var step = parseInt(3*Math.random()+1);
	var x3=Math.round(Math.random()*400+480)
	var enemy= document.createElement("img");
	enemy.className="img1";
	enemy.src ="../images/enemy1_fly_1.png";
	enemy.style.display="block";
	enemy.style.position = "absolute";
	enemy.style.left =x3+"px";
	enemy.style.top = y3-34+"px";
	div1[0].appendChild(enemy);
    var n=setInterval(function(){
		y3+=step;
		enemy.style.top=y3-34+"px";
		if (grade>=300) {
			y3+=1;
		}
		if (enemy.style.display == "none"|| y3>670) {
			clearInterval(n);
			div1[0].removeChild(enemy);//没有遇到敌机清除
		}
		},20);	
}
}
function diji1(){
	if (flag==1) {
	var y3=0;
	var step = (parseInt(3*Math.random()+1))/2;
	var x3=Math.round(Math.random()*350+480)
	var enemy= document.createElement("img");
	enemy.className="img2";
	enemy.src ="../images/enemy2_fly_1.png";
	enemy.style.display="block";
	enemy.style.position = "absolute";
	enemy.style.left =x3+"px";
	enemy.style.top = y3-34+"px";
	div1[0].appendChild(enemy);
    var n=setInterval(function(){
		y3+=step;
		enemy.style.top=y3-34+"px";
		if (grade>=300) {
			y3+=0.5;
		}
		if (enemy.style.display == "none"|| y3>670) {
			clearInterval(n);
			div1[0].removeChild(enemy);//没有遇到敌机清除
		}
		},20);	
}
}
//敌机1
function strike(){
	var bull=document.getElementsByTagName('div');
	var enemy=document.getElementsByClassName('img1');
	//子弹与敌机1相遇
	if (feiji.style.display =="block") {
		for (var i = 0; i < bull.length; i++) {
			for (var j = 0; j <enemy.length; j++) {
				if (bull[i].offsetLeft+5>enemy[j].offsetLeft&&bull[i].offsetLeft<enemy[j].offsetLeft+34) {
					if(bull[i].offsetTop<enemy[j].offsetTop+24){
						div1[0].removeChild(bull[i]);
						enemy[j].src="../images/enemy1_fly_3.gif";
						xiaoshi(enemy[j]);
						grade +=10;
						span1[0].innerHTML=grade+"分";
					}
				}
			}	
		}
	}
	//敌机1与自己飞机相遇
	for (var i = 0; i < enemy.length; i++) {
		if (feiji.offsetLeft+66>enemy[i].offsetLeft && feiji.offsetLeft<enemy[i].offsetLeft+34) {
			if (feiji.offsetTop<enemy[i].offsetTop+24) {
				feiji.src="../images/myover.gif";
				xiaoshi(feiji);
				div2[0].style.display="block";
				div2[0].innerHTML="游戏结束分数:"+grade;
				div3[0].style.display="block";
				span1[0].style.display="none";
			}	
		}
	}
}

//敌机2
function strike1(){
	var bull=document.getElementsByTagName('div');
	var enemy1=document.getElementsByClassName('img2');
	//子弹与敌机2相遇
	if (feiji.style.display =="block") {
		for (var i = 0; i < bull.length; i++) {
			for (var j = 0; j <enemy1.length; j++) {
				if (bull[i].offsetLeft+5>enemy1[j].offsetLeft&&bull[i].offsetLeft<enemy1[j].offsetLeft+46) {
					if(bull[i].offsetTop<enemy1[j].offsetTop+64){
						div1[0].removeChild(bull[i]);
						enemy1[j].src="../images/enemy2_fly_3.gif";
						xiaoshi(enemy1[j]);
						grade +=30;
						span1[0].innerHTML=grade+"分";
					}
				}
			}	
		}
	}
	//敌机2与自己飞机相遇
	for (var i = 0; i < enemy1.length; i++) {
		if (feiji.offsetLeft+66>enemy1[i].offsetLeft && feiji.offsetLeft<enemy1[i].offsetLeft+46) {
			if (feiji.offsetTop<enemy1[i].offsetTop+64) {
				feiji.src="../images/myover.gif";
				xiaoshi(feiji);
				div2[0].style.display="block";
				div2[0].innerHTML="游戏结束分数:"+grade;
				div3[0].style.display="block";
				span1[0].style.display="none";
			}	
		}
	}
}

//敌机被打中，消失
function xiaoshi(imgx){
	setTimeout(function(){
		imgx.style.display = "none";
	},300)
}
