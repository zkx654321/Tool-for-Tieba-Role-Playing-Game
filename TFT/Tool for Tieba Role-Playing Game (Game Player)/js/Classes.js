var InfoType = {ICType:[11,110,10,1,100,0],IType:{Armys:"Army",Areas:"Area",Nations:"Nation",Lands:"Resources",Units:"Unit",Types:"Resources",Commands:"Command",picRes:"Resources",soundRes:"Resources",iconRes:"Resources",musicRes:"Resources",userAreasArguments:"Resources",userNationsArguments:"Resources",userArmysArguments:"Resources",userLandsArguments:"Resources",userUnitsArguments:"Resources"},IFile:{gm:"gm",gs:"gs",gc:"gc",allData:"AllData",readText:"ReadText"},IArea: {Id: 3,Name: '区域',TName:"Areas"},IArmy: {Id: 5,Name: '军队',TName:"Armys"},INation: {Id: 4,Name: '国家',TName:"Nations"},ILand: {Id: 6,Name: '地形',TName:"Lands"},IUnit:{id:7,Name:'单位',TName:"Units"}}

function Area(name){
	this.name=name
	this.color=arguments[1] ? arguments[1] : "255,255,255";
	this.type=arguments[2] ? arguments[2] : arguments[2]==0 ? arguments[2] : '';
	this.pos=0;
	this.borderp=new Array();
	this.belong=-1;
	this.acreage=-1;
	this.pic=0;//-1=没有图片，0=按类型，大于1相应减去1为序号
	this.sound=0;//-1=默认音效，0=按类型，大于1相应减去1为序号
	this.tempa='此功能暂时未完成，暂时使用字符代替。';
	//------------------------------------------
	this.desc='在这里输入描述，下方设定图片，玩家可以在玩家查看描述将会看到弹出窗口。';
	this.descpic=0;
	this.descsound=0;
	this.userArguments="";
	
}

function Army(name){
	this.name=name;
	this.pos=arguments[1] ? arguments[1] : arguments[1]==0 ? arguments[1] : -1;
	this.type=arguments[2] ? arguments[2] : '';
	this.belong=-1;
	this.leader='';
	this.icon=0;//-1=使用默认的，0=按类型，大于1相应减去1为序号
	this.pic=0;//-1=没有图片，0=按类型，1=按总指挥，大于2相应减去2为序号
	this.sound=0;
	this.speed=100;
	this.range=50;
	//------------------------------------------
	this.buildedDefence=false;
	this.nextCommand=new Command();
	this.tempa='此功能暂时未完成，暂时使用字符代替。'
	//------------------------------------------
	this.desc='在这里输入描述，下方设定图片，玩家可以在玩家查看描述将会看到弹出窗口。';
	this.descpic=0;
	this.descsound=0;
	this.userArguments="";
}

function Nation(name){
	this.name=name;
	this.color=arguments[1] ? arguments[1] : '255,255,255';
	this.type=arguments[2] ? arguments[2] : arguments[2]==0 ? arguments[2] : '';
	this.nflag=-1;//-1=没有国旗，0=按类型，大于1相应减去1为序号
	this.sound=0;
	this.belong=-1;
	this.acreage=-1;
	this.isplayer=true;
	this.destroyed=false;
	this.tempa='此功能暂时未完成，暂时使用字符代替。'
	//------------------------------------------
	this.desc='在这里输入描述，下方设定图片，玩家可以在玩家查看描述将会看到弹出窗口。';
	this.descpic=0;
	this.descsound=0;
	this.userArguments="";
}

function Unit(name){
	this.name=name;
	this.type=arguments[1] ? arguments[1] : '';
	this.pic=0;//-1=没有图片，0=按类型，1=按总指挥，大于2相应减去2为序号
	this.speed=100;
	this.range=50;
	this.leader=false;
	//------------------------------------------
	this.list1title='备用列表1';
	this.list2title='备用列表2';
	this.list3title='备用列表3';
	this.list1=new Array();
	this.list2=new Array();
	this.list3=new Array();
	//------------------------------------------
	this.desc='在这里输入描述，下方设定图片，玩家可以在玩家查看描述将会看到弹出窗口。';
	this.descpic=0;
	this.descsound=0;
	this.userArguments="";
}

function Resources(data,name){
	this.name=name;
	this.data=data;
	this.type=arguments[2] ? arguments[2] : '';
}

function Command(name){
	this.name=name
	this.des=arguments[3] ? arguments[3] : '描述';
	this.type=arguments[2] ? arguments[2] : '';
	this.data=arguments[4] ? arguments[4] : '';
	this.scri=arguments[5] ? arguments[5] : '';
}

function MessageWindow(name){
	this.name=name;
	this.title='title';
	this.string='';//str
	this.mesType=0;//mesType
	this.windowType=0;//num
	this.pic=0;
	this.sound=0
	this.helpWindow='';
}


	var HelpPageText = {
		btntext:"<button type='button' onclick='fPage()'>上一页</button>$<button type='button' onclick='nPage()'>下一页</button>",
		p1:"首先感谢您的使用！<br>\
		本程序被创建的最主要原因，就是我（百灵青鸳）对于文字游戏的热爱。一时间也写不出这么多话，可以看第二页了。",
		p2:"老实说，现在版本太低，实在是有点不想写这个说明书。<br>\
		功能是在还太少，我又很懒。目前这个版本的帖游辅助器玩家端，只能够查看系统发来的存档，以及播放BGM和音效而已（当然也是系统设定的）。",
		p3:"接下去要实现的功能：<h3>·解决移动端使用中的BUG（<span class='redSpan'>重要</span>）</h3><h3>·玩家能通过命令系统直接下达指令（<span class='redSpan'>重要</span>）</h3>\
		<h3>·外交系统（<span class='redSpan'>重要</span>）</h3><h3>·军队系统（<span class='redSpan'>重要</span>）</h3><h3>·历史知识系统</h3>\
		<h3>·战术推荐系统</h3><h3>·自动保存功能</h3>……",
		p4:"<p  style='color:palevioletred;text-align:center;font-size:48px;margin:2px;padding:0px'>大家能一起玩贴游是一种缘分</p>\
		<p  style='color:palevioletred;text-align:center;font-size:48px;margin:2px;padding:0px'>正好新春发布此版本，祝大家新年快乐</p>\
		<p  style='color:plum;text-align:center;font-size:72px;margin:2px;padding:0px'>Let's Rock & Roll</p>",
			p5:"<p  style='font-size:24px;margin:2px;padding:0px'>欢迎报告Bug，提各种建议，或仅仅是交朋友。<br>百度账号：zkx654321（百灵青鸳）<br>联系方式：QQ406501707</p>"
	}


function fPage(){
	cHPage-=1;
	var i=0;
	for(var name in HelpPageText)i++;
	if(cHPage==0)cHPage=i-1;
	turnPage(cPage);
}

function nPage(){
	cHPage+=1;
	var i=0;
	for(var name in HelpPageText)i++;
	if(cHPage>=i)cHPage=1;
	turnPage(cPage);
}