var InfoType = {ICType:[11,110,10,1,100,0],IType:{Armys:"Army",Areas:"Area",Nations:"Nation",Lands:"Resources",Units:"Unit",Types:"Resources",Commands:"Command",picRes:"Resources",soundRes:"Resources",iconRes:"Resources",musicRes:"Resources",userAreasArguments:"Resources",userNationsArguments:"Resources",userArmysArguments:"Resources",userLandsArguments:"Resources",userUnitsArguments:"Resources"},IFile:{gm:"gm",gs:"gs",gc:"gc",allData:"AllData",readText:"ReadText"},IArea: {Id: 3,Name: '区域',TName:"Areas"},IArmy: {Id: 5,Name: '军队',TName:"Armys"},INation: {Id: 4,Name: '国家',TName:"Nations"},ILand: {Id: 6,Name: '地形',TName:"Lands"},IUnit:{id:7,Name:'单位',TName:"Units"}}

function Area(name){
	this.name=name
	this.color=arguments[1] ? arguments[1] : "255,255,255";
	this.type=arguments[2] ? arguments[2] : arguments[2]==0 ? arguments[2] : '';
	this.pos=-1;
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
	p2:"老实说，现在版本太低，实在是有点不想写这个说明书。因为现在这个版本功能还很有限。<br>\
	首先最重要一点：<p style='color:#FF0000;font-size:24px;margin:0px;padding:0px'>暂时不要使用删除军队、国家或者资源的功能！></p><p style='color:#FF0000;font-size:24px;margin:0px;padding:0px'>暂时不要使用删除军队、国家或者资源的功能！></p><p style='color:#FF0000;font-size:24px;margin:0px;padding:0px'>暂时不要使用删除军队、国家或者资源的功能！></p><br>\
	<p style='color:#888888;font-size:14px;margin:0px;padding:0px'>主要是因为我太懒，想早点发布，使用删除功能会引发一些BUG</p>\
	功能是在还太少，我又很懒。简单讲一下怎么用，就是在资源里面插入游戏资源，然后就可以在各栏目里面使用了。这是我目前<span style='color:#FF0000;font-size:18px;'>最得意的功能</span>，能够让你的帖游绘声绘色。<br>各栏目里有？？这个按钮的，代表一些提示，可以自己看看。<br>总之这算是个很简单的工具吧，摸着摸着很容易就能用。（我真是个不称职的制作者）而且，错误一般有提示，很容易就能搞清楚。",
	p3:"接下去要实现的功能：<h3>·解决移动端使用中的BUG（<span class='redSpan'>重要</span>）</h3><h3>·不同玩家受到不同信息（<span class='redSpan'>重要</span>）</h3><h3>·系统可以给玩家发送欺骗性信息（<span class='redSpan'>重要</span>）</h3><h3>·玩家能通过命令系统直接下达指令（<span class='redSpan'>重要</span>）</h3>\
	<h3>·把删除功能补上（<span class='redSpan'>重要</span>）</h3><h3>·自定义变量功能（<span class='redSpan'>重要</span>）</h3><h3>·自定义变量数据计算功能（<span class='redSpan'>重要但以后再说</span>）</h3>\
	<h3>·外交系统（<span class='redSpan'>重要</span>）</h3><h3>·自动保存功能</h3>先到这里吧，想起来再补充……",
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