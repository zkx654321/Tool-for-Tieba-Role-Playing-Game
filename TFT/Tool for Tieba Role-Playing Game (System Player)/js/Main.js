
var imgReading;
var mann=false;
var mesBox = document.getElementById("MessageBox");
var mainBox = document.getElementById("MainBox");
var bigBox = document.getElementById("winDiv");
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext('2d');  
var canvas2 = document.getElementById("AreaCanvas");
var ctx2 = canvas2.getContext('2d'); 
var img2=new Image();
var canvas3 = document.getElementById("LandCanvas");
var ctx3 = canvas3.getContext('2d'); 
var img3=new Image();
var canvas4 = document.getElementById("ArmyCanvas");
var ctx4 = canvas4.getContext('2d'); 
var img4=new Image();
var upmesbox=document.getElementById("upCanvas")
var ucanvas=document.getElementById("underCanvas");
var uctx=ucanvas.getContext('2d'); 
var opener=document.getElementById('openimg');
var soundPlayer=document.getElementById("sound");
var showingImage=new ShowingImage();
var fileDatas=new FileDatas();
var tempDatas=new ShowCanvaDatas();
var isie=isIE();
var xmlDoc=null;
var imgString='';
var int;

function FileDatas(path){
	//编辑器---------------------------------------------------------
	//编辑器开发人员可以自行修改这里的内容-----------------------------
	this.editName='国策帖游辅助器系统端';
	this.version='v0.3';
	this.author='百灵青鸳';
	this.date='2019/02/05';
	//用户设定--------------------------------------------------------
	this.btnClickSound=1;
	this.AreasClickSound=0;
	this.ArmysClickSound=2;
	this.NationsClickSound=0;
	this.ArmysMoveSound=0;
	this.defaultWindowPic0=0;
	this.defaultWindowPic1=0;
	this.defaultWindowPic2=0;
	this.defaultWindowSound0=0;
	this.defaultWindowSound1=0;
	this.defaultWindowSound2=0;
	this.defaultArmyIcon=0;
	this.musicList1='';
	this.musicList2='';
	this.musicList3='';
	//游戏------------------------------------------------------------------
	this.gameName='在这里输入游戏名称';
	this.gameDate='输入游戏中的日期';
	this.gameVersion="v1.0";
	this.gameAuthor="在这里输入游戏作者，而不是编辑器作者";
	this.creatDate='';
	this.lastEditDate='';
	this.gameType=1;//0=区域，1=任一点
	this.playerNum=4;
	this.servicer='http://www.';


	//this.showNationsPellucidity=50;
	//游戏内容-------------------------------------------------------------------
	this.mapPath=new Array(3);
	this.Areas=new Array();
	this.userAreasArguments=new Array();
	this.Nations=new Array();
	this.userNationsArguments=new Array();
	this.Armys=new Array();
	this.userArmysArguments=new Array();
	this.Lands=new Array();
	this.userLandsArguments=new Array();
	this.Units=new Array();
	this.userUnitsArguments=new Array();
	//------------------------------------------------------------------------
	this.Types=new Array();
	this.Commands=new Array();
	//资源--------------------------------------------------------------------
	this.picRes=new Array();
	this.soundRes=new Array();
	this.iconRes=new Array();
	this.musicRes=new Array();
	
}
function ShowCanvaDatas(){
	//------------------------------------
	this.Show0=true;
	this.Show1=true;
	this.Show2=true;
	this.Show3=true;
	this.ShowArmy=true;
	this.ShowCountry=false;
	this.ClickType=0;//100=国家。10=军队。1=区域。11=区域和军队；110=国家和军队；10=只选择军队；1=只选择区域；100=只选择国家；0=只查看
}
	//------------------------------
	
function openImgFile(event){
	var str=event.target.getAttribute("id");
imgReading = str.substr(str.length-1,1);
if(str.substr(0,1)=='h')mann=true;else mann=false;

imgReading = document.getElementById("p2_" +imgReading);
	
opener.click();

}
//opener.click
function changePic(event){
	
	var objUrl = getObjectURL(opener.files[0]);
	
	if(objUrl){
	if(showingImage.imgObj.src==objUrl){return false;}
	imgReading.style="color:#FF0000;text-align:left;float:left;padding:0px;margin:0px";
	imgReading.innerText="正在读取数据……5%";
	
	showingImage.imgObj.src=objUrl;
	showingImage.ResetIMG();
	reDrawCanvas(true);
	return true;
	}
}

window.onload=function(){
	mesBox.innerHTML="\
	<p  style='color:red;text-align:center;font-size:24px;margin:2px;padding:0px'>" +fileDatas.editName + "（" + fileDatas.version + "）" + "</p>\
	<p  style='color:#888888;text-align:center;font-size:14px;margin:0px;padding:0px'>制作者："+ fileDatas.author +"</p>\
	<p  style='color:#888888;text-align:center;font-size:14px;margin:0px;padding:0px'>"+ fileDatas.date +"</p>\
	<p>这个程序分为系统端和玩家端。开源，免费，用于帖游系统和玩家更灵活的，可视化的进行游戏，提高游戏体验。<br>\
	虽然不太可能有人这么做吧……不过说一下，此程序完全免费，不可倒卖！但是建立在此程序基础上创建的新程序在遵循规则的情况下可以用于商用。<br>\
	制作这个程序也是为了帖游吧的伙伴们开心，因为文字游戏是我童年美好的记忆。<br>\
	希望大家喜欢，并可以指出Bug或者给出新功能建议。我个人所做的一系列新版本都将会是免费开源的，当前此版本为【0.3之无尽BUG版】，就连已知的大量BUG我都还没恢复（而且知道怎么恢复）。<br>\
	点击下方的按钮进行操作，可以先查看帮助。<br><span style='color:#FF0000;font-size:20px;'>Have Fun!</span></p>\
	<p style='color:#0000FF;text-align:center;font-size:24px;margin:0px;padding:0px'>--------------------------------------------开发规则---------------------------------------------------------</p>\
	<p>在此程序上开发的程序，必须也是开源的，并且使用相同的版权规则，保留之前各版本所有作者的信息。例如：百灵青鸳（v0.3），xxx（v0,4），xxx（v0.4 加强版）等等……<br>\
	为了您和其他开发者的权益，请标注好您所编写的代码段落，日期等。因为代码一个人写嘛……所以也是一团糟。( ^_^ ！)\
	<br>如果用于商用（无论你基于此开发的程序是否还是帖游辅助器，或者变成游戏、数据处理器等等），须与之前的所有作者商议盈利所得的分配问题，并按商议结果将盈利所得分配给之前的作者。</p>"
	GetDefaultRes();
	BtnClick();
	//UseTest();//当您测试的时候，没有可用于读取的游戏，可以使用这个函数,它在Test.js里面。
	int==self.setInterval("reDrawCanvas(false)",50);
	document.getElementById("BGM1").volume=0.8;
	document.getElementById("BGM2").volume=0.5;
	document.getElementById("BGM3").volume=0.5;
	PreRead();
	document.title=fileDatas.editName + "（" + fileDatas.version + "）";

}

function unfinished(){
	alert("功能正在制作中，敬请期待。" + (arguments[0] ? arguments[0] : ""));
}