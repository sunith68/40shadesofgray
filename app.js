let timedom=document.getElementById('time');
let tabledom=document.getElementById('table');
let bestdom=document.getElementById('bestTime');
let timebar=document.getElementById("mainTime");
let rulebar=document.getElementById('instructions');
let lbdom=document.getElementById('leaderBoard');
let difficultybar=document.getElementById('difficulty');
let tablebar=document.getElementById('otable');
let easydom=document.getElementById('easy');
let mediumdom=document.getElementById('medium');
let harddom=document.getElementById('hard');
let biglbdom=document.getElementById('bigleaderboard');
let lbbtndom=document.getElementById('lbbutton');
let lbhomedom=document.getElementById('lbhome');
let best=0;
let arr=[];
let s=0;
let ms=0;
let t;
let lvl;
let lbnum;
let row;
let column;
let size;
let nextValue=1;
var sound= new Audio();
sound.src="sound.mp3";
function assignarr(arr,n) {
	let temp,rand;
	for (var i = 0; i < n; i++) {
		arr[i]=i+1;
		}
	for (var i = n-1; i >= 0; i--) {
		rand= Math.floor(Math.random() * i);
		temp=arr[i];
		arr[i]=arr[rand];
		arr[rand]=temp;
	}
}
//time functions
function timer(){
	t=setInterval(run ,10);
}
function run(){
	timedom.textContent=s + ' : ' + (ms<10?'0'+ ms:ms);
	ms++;
	if(ms==100){
		s++;
		ms=0;
	}
}
function revealtime(){
	return(s + ' : ' + (ms<10?'0'+ ms:ms));
}
function convertTime(w){
	var s1=parseInt(w/100);
	var ms1=w%100
	return(s1 + ' : ' + (ms1<10?'0'+ ms1:ms1));
}
function timerStop(){
	clearInterval(t);
	ms--;	
}
function timerReset(){
	clearInterval(t);
	t=false;
	ms=0;
	s=0;
	run();
	ms--;
}
function setBest(){
	bestdom.textContent=convertTime(localStorage.getItem(lvl+0));
}
//time functions end here
function shades(gray,n){
	var s=((n*2)-gray)*parseInt((170/(n*2)));
	return(`rgb(${s},${s},${s})`)
}
function createTable(r,c,n){
	assignarr(arr,n);
	var tab='';
	var k=0;
	for (var i=0;i<r;i++){
		tab+='<tr>';
		for(var j=0;j<c;j++){
			tab+=`<td class="num" style='background-color:${shades(arr[k],20)}'>`+ arr[k]+`</td>`;
			k++;
		}
		tab+='</tr>';

	}

	tabledom.innerHTML=(tab);
	var t=`tablestyle table${n}`
	tabledom.setAttribute('class',t);
}

function display(){
	let numtile=document.querySelectorAll('.num');
	Array.from(numtile).forEach(function(f) {f.parentNode.removeChild(f);});
	var distemp=`<div class="aftergame">Your time is </br> ${revealtime()} </br><div class='newGame'>New Game</div><div class='lvlbtn'>Change Level</div></div>`;
	tabledom.innerHTML=distemp;
	restartGame();
	levelbutton();
}

function restartGame(){
	var newgamedom=document.querySelectorAll('.newGame');
	newgamedom.forEach(function(c){
		c.addEventListener('click',function(e){
			sound.play();
			startGame(row,column,size);
			timerReset();
		})
	})
}

function startGame(r,c,n){
		createTable(r,c,n);
		nextValue=1;
	let numtile=document.querySelectorAll('.num');
	numtile.forEach(function(clk){
		clk.addEventListener('click',function(e){
			sound.play();
			var x=parseInt(e.srcElement.textContent);
			if(x==nextValue){
				if (x<=n) {
					x+=n;
					e.srcElement.style.backgroundColor=shades(x,n);
				}
				else{
					x=null;
				}
				e.srcElement.textContent=x;
				nextValue++;
			}
			if(nextValue==2){
				timer();		
			}
				
			if(nextValue==(2*n)-1){
				timerStop();
				lboard((s*100 + ms));
				display();
				setBest();
			}		
		})
	})
}

function hide(){
	timebar.style.display='none';
	rulebar.style.display='none';
	lbdom.style.display='none';
	tablebar.style.display='none';
	biglbdom.style.display='none';
	lbhomedom.style.display='none';
}
//leaderboard functions
function lbdisplay(){
	lbdom.innerHTML='Leaderboard';
 	lbnum=0;
	for (var i = 0; i <5;i++){
		if(localStorage.getItem(lvl+i)!==null){
			lbnum++;
		}
	}
	for ( i = 0; i < lbnum; i++) {
			var q=lvl+i;
			lbdom.innerHTML+=`<div class='score'>`+convertTime(localStorage.getItem(q))+ `</div>`;
	}
}
function lboard(p){
	var scores=[];
	var i;
	for (i = 0;i<lbnum ; i++) {
		    scores[i]=parseInt(localStorage.getItem(lvl+i));	
	}
	if(localStorage.getItem(lvl+4)==null){
		scores[lbnum]=p;
		scores.sort((y,z)=>y - z);
		for (var j=0; j<=lbnum; j++) {
				if(j!=lbnum){
					localStorage.removeItem(lvl+j);
				}
				localStorage.setItem(lvl+j,scores[j]);	
		}		
		lbdisplay();
	}
	else{
		if(localStorage.getItem(lvl+4)>p)
		{
			scores[4]=p;
			scores.sort((y,z)=>y - z);
			for (var j=0; j<=4; j++) {
					localStorage.removeItem(lvl+j)
					localStorage.setItem(lvl+j,scores[j]);	
			}
		lbdisplay();
		}
	}
}
function addscore(lvl,i){
	if(localStorage.getItem(lvl+i)!==null){	
		console.log(3);
		return(`<td class='score'>`+convertTime(localStorage.getItem(lvl+i))+ `</td>`);
	}
	else{
		return(`<td class='score'></td>`);
	}				
}
function completelb(){
	hide();	
	difficultybar.style.display='none';
	biglbdom.style.display='';
	lbhomedom.style.display='';
	console.log(1)
	biglbdom.innerHTML='';
	biglbdom.innerHTML+=`<th colspan='3' id='lbtxt'>Leaderboard</th><tr><td class='lbcat'>Easy</td><td class='lbcat'>Medium</td><td class='lbcat'>Hard</td></tr>`;
	for(var i=0;i<5;i++){
		console.log(2);
		biglbdom.innerHTML+=`<tr>`;
		biglbdom.innerHTML+=addscore('e',i)+addscore('m',i)+addscore('h',i);
		biglbdom.innerHTML+='</tr>';
	}
}
function lbbtn(){
	lbbtndom.addEventListener('click',function(h){
		sound.play();
		completelb();	
	})
}
//leaderboard functions ends here

//level functions
function chooselevel(){
	easydom.addEventListener('click',function(){
		sound.play();
		level1();
		assignlevel(row,column,size);
	})
	mediumdom.addEventListener('click',function(){
		sound.play();
		level2();
		assignlevel(row,column,size);
	})
	harddom.addEventListener('click',function(){
		sound.play();
		level3();
		assignlevel(row,column,size);
	})
}
function showlevel(){
	difficultybar.style.display='none';
	timebar.style.display='block';
	rulebar.style.display='block';
	lbdom.style.display='block';
	tablebar.style.display='block';
}
function assignlevel(r,c,n){	
	showlevel();
	startGame(r,c,n);
	restartGame();
	lbnum=0;
	lbdisplay();
	setBest();
	timerReset();
}
function level1(){
	row=3;
	column=4;
	size=12;
	lvl='e';
}
function level2(){
	row=4;
	column=5;
	size=20;
	lvl='m';
}
function level3(){
	row=5;
	column=6;
	size=30;
	lvl='h';
}
function levelbutton(){
	var lvlbtndom=document.querySelectorAll('.lvlbtn');
	lvlbtndom.forEach(function(c){
		c.addEventListener('click',function(e){
			sound.play();
			hide();
			chooselevel();
			difficultybar.style.display='block';
		})
	})
}
//level functions end here
hide();
chooselevel();
levelbutton();
lbbtn();


