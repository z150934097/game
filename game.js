function game(){
	this.letterArr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];//字母
	this.heartArr=["./img/100.gif","img/100.gif","img/100.gif","img/100.gif","img/100.gif","img/100.gif","img/100.gif","img/100.gif","img/100.gif",]//生命值图片(0~10)
	this.letterLength=4;//同时下落的个数(游戏难度)
	this.speed=5;//下落速度
	this.score=0;//分数
	this.die=10;//死掉的次数
	this.step=1;//关卡数
	this.stepNum=10;//定义过关满足的分数
	this.randArr=[];//存放当前屏幕上有的字母
	this.span=[]//存放span
	this.width=document.documentElement.clientWidth;//游戏尺寸(浏览器宽度)
	this.height=document.documentElement.clientHeight;//游戏尺寸(浏览器高度)
	window.that=this;//全局指针
}
game.prototype={
	play:function(){
		this.createEle(this.letterLength);
		this.move();
		this.key();
	},
	key:function(){
		var that=this;
		var nowScore=0;
		document.onkeydown=function(e){
			var ev=e||window.event;
			var l=String.fromCharCode(ev.keyCode);
			for (var i = 0; i < that.span.length; i++) {
				if(l==that.span[i].innerHTML){
					animate(that.span[i],{opacity:0},200,function(){
						this.style.display="none";
					})
					that.span.splice(i,1);
					that.randArr.splice(i,1);
					that.createEle(1);
					var score=document.getElementsByClassName('message')[0].getElementsByTagName('span')[0];
					score.innerHTML=++that.score;
					nowScore++;
					if(nowScore%that.stepNum==0){
						nowScore=0;
						that.again();
					}
					break;
				}
			};
		}
	},
	again:function(){
		var step=document.getElementsByClassName('message')[0].getElementsByTagName('span')[2];
		step.innerHTML=++that.step;
		clearInterval(that.t);
		for (var i = 0; i < that.span.length; i++) {
			that.span[i].style.display="none";
		};
		that.span.splice(0,that.span.length);
		that.randArr.splice(0,that.randArr.length);
		that.letterLength++;
		that.speed++;
		that.stepNum+=5;
		if(that.letterLength>10){
			that.letterLength=10;
		}
		if(that.speed>10){
			that.speed=10;
		}
		alert("恭喜过关! 下一关");
		this.createEle(that.letterLength);
		that.move();
		//that.t=setInterval(that.move2,60);
	},
	move:function(){
		var that=this;
		that.t=setInterval(that.move2,60);
	},
	move2:function(){
		for (var i = 0; i < that.span.length; i++) {
			var tops=that.span[i].offsetTop+that.speed;
			that.span[i].style.top=tops+"px";
			if(tops>that.height){
				that.span[i].style.display="none";
				//document.removeChile('span');
				that.span.splice(i,1);
				that.randArr.splice(i,1);
				that.createEle(1);
				var die=document.getElementsByClassName('message')[0].getElementsByTagName('span')[1];
				die.innerHTML=--that.die;
				var dieImg=document.getElementsByTagName('img')[1];
				dieImg.src=that.heartArr[that.die-1];//生命递减,图片切换
				if(that.die==0){
					alert("游戏结束!"+that.score+"分!");
					location.reload([]);//页面重载
				}
				break;
			}
		};
	},
	createEle:function(num){
		var arr=this.rand(num);
		for (var i = 0; i < arr.length; i++) {
			var span=document.createElement("span");
			span.style.cssText="position:absolute;height:80px;width:80px;font-size:30px;font-family:Arial;color:rgba(255,255,255,0);top:"+(-100*Math.random()-100)+"px;left:"+(50+Math.random()*(this.width-100))+"px;background: url(img/"+arr[i]+".png) no-repeat center center;background-size:80px 80px;";
			span.innerHTML=arr[i];
			document.body.appendChild(span);
			this.span.push(span);
		};
	},
	rand:function(num){//随机取数不重复
		var arr=[];//创建时使用一次,之后不再使用
		for (var i = 0; i < num; i++) {
			var randNum=Math.floor(this.letterArr.length*Math.random());
			while(this.randCheck(this.letterArr[randNum],this.randArr)){
				randNum=Math.floor(this.letterArr.length*Math.random());
			}
			arr.push(this.letterArr[randNum]);
			this.randArr.push(this.letterArr[randNum]);
		};
		return arr;
	},
	randCheck:function(val,arr){
		for (var i = 0; i < arr.length; i++) {
			if(arr[i]==val){
				return true;
			}
		};
		return false;
	}
}
