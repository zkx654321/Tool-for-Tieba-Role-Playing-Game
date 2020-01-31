var cPage=null;
var bgDiv=document.getElementById("maskDiv");
var tipDiv=document.getElementById("tipDiv");
var tipPic=document.getElementById("tipPic");
var tipBtnBox=document.getElementById('tipBtnBox');
var hValue=null;
var pageText=new PageText();
var tempText='';
var cHPage=1;
var helpText = {
	sertitle:"游戏服务器",
	ser:"这个功能还没有实现，是一个想法。如果玩家系统拥有<span class='redSpan'>自己的web</span>，可以填入这里，预期实现的功能是玩家不需要再手动将存档发送给系统，而是通过这里直接上传。",
	findtitle:"如何查找",
	find:"只要你查找的内容是上面列表中<span class='redSpan'>字符串的一部分</span>，则查找有效。这意味着你也可以使用颜色进行查找。如可以输入 255,0,0 来查找这个颜色的地形。需要注意的是，逗号是<span class='redSpan'>英文半角</span>。",
	cptitle:"中心点",
	cp:"区域的中心点代表了该区域的<span class='redSpan'>区域中心</span>，主要在<span class='redSpan'>按区域来进行游戏</span>的类型的游戏中起作用。在显示军队的时候，也是在这一点上显示。在区域地图中，这一点为（0,0,0），且周围要是一样的颜色。一个区域只能有一个中心点。",
	statetitle:"附属国",
	state:"如果这里选择的不是<span class='redSpan'>独立国家</span>的话，说明她是别的国家的附属国。",
	artitle:"区域的面积",
	ar:"数值为区域（此颜色）或国家在地图上所拥有的<span class='redSpan'>像素数</span>的总和。"
}
function PageText(){
	this.pageArea='<div style="width:100%;height:100%;float:left;">\
<div style="width:150px;height:200px;float:left;">\
<div style="width:120px;height:120px;border: 1px solid black;margin:10px;">\
<canvas id="thec" data-from="pic" name="gameData2" height="120px" width="120px";/></div>\
<button style="float:center" name="view" type="button" onclick="PreViewWindow(InfoType.IType.Areas)">详细信息</button>\
</div>\
<div style="width:80%;height:100%;float:left;background-color:lightgoldenrodyellow;OVERFLOW-Y: auto; OVERFLOW-X:hidden;">\
<p name="gameData2" data-from="name" data-type="text" data-fore="名称:" ></p>\
<p name="gameData2" data-from="type" data-type="text" data-fore="类型:" ></p>\
<p name="gameData2" data-from="color" data-type="color" data-fore="颜色:" ></p>\
<p name="gameData2" data-from="pos" data-type="point" data-fore="位置:" ></p>\
<p name="gameData2" data-from="belong" data-type="tag" data-tagnum="1" data-tagadj="1" data-0="无主" data-else="【$】" data-elseDF="Nations" data-fore="区域所有：" data-note="所属国"></p>\
<p id="ar" data-from="acreage" name="gameData2" data-type="text" data-fore="区域面积:">未计算</p>\
 </div>\
 </div>\
 '
 this.pageNation='<div style="width:100%;height:100%;float:left;">\
<div style="width:150px;height:200px;float:left;">\
<div style="width:120px;height:80px;border: 1px solid black;margin:10px;">\
<canvas id="thec" data-from="pic" name="gameData2" height="80px" width="120px";/></div><br>\
<button style="float:center" name="view" type="button" onclick="PreViewWindow(InfoType.IType.Nations)">详细信息</button>\
</div>\
<div style="width:80%;height:100%;float:left;background-color:lightgoldenrodyellow;OVERFLOW-Y: auto; OVERFLOW-X:hidden;">\
<p name="gameData2" data-from="name" data-type="text" data-fore="名称:" ></p>\
<p name="gameData2" data-from="type" data-type="text" data-fore="类型:" ></p>\
<p name="gameData2" data-from="color" data-type="color" data-fore="颜色:" ></p>\
<p name="gameData2" data-from="isplayer" data-type="tf" data-fore="是玩家:" ></p>\
<p name="gameData2" data-from="destroyed" data-type="tf" data-fore="已灭亡:" ></p>\
<p name="gameData2" data-from="belong" data-type="tag" data-tagnum="1" data-tagadj="1" data-0="该国家是独立国家" data-else="该国家是$的附属国" data-elseDF="Nations" data-fore="" data-note="所属国"></p>\
<p id="ar" data-from="acreage" name="gameData2" data-type="text" data-fore="国土面积:">未计算</p>\
 </div>\
 </div>'
 
 this.pageArmy='<div style="width:100%;height:100%;float:left;">\
<div style="width:150px;height:200px;float:left;">\
<div style="width:120px;height:120px;border: 1px solid black;margin:10px;">\
<canvas id="thec" data-from="pic" name="gameData2" height="120px" width="120px";/></div>\
<button style="float:center" name="view" type="button" onclick="PreViewWindow(InfoType.IType.Armys)">详细信息</button>\
</div>\
<div style="width:80%;height:100%;float:left;background-color:lightgoldenrodyellow;OVERFLOW-Y: auto; OVERFLOW-X:hidden;">\
<p name="gameData2" data-from="name" data-type="text" data-fore="名称:" ></p>\
<p name="gameData2" data-from="type" data-type="text" data-fore="类型:" ></p>\
<p name="gameData2" data-from="belong" data-type="tag" data-tagnum="1" data-tagadj="1" data-0="无主" data-else="【$】" data-elseDF="Nations" data-fore="所属国家：" data-note="所属国"></p>\
<p name="gameData2" data-from="pos" data-type="point" data-fore="位置:" ></p>\
<p name="gameData2" data-from="leader" data-type="text" data-fore="指挥官:" ></p>\
<p name="gameData2" data-from="buildedDefence" data-type="tf" data-fore="已建立防御工事:" ></p>\
<p name="gameData2" data-from="speed" data-type="text" data-fore="移动速度:" ></p>\
<p name="gameData2" data-from="range" data-type="text" data-fore="攻击范围:" ></p>\
 </div>\
 </div>'

this.sPage3='<div style="width:20%;height:100%;border: 1px solid black;float:left">\
<select id="myList" name="list" size="25" data-type="Areas" style="width:100%;height:90%;border: 1px solid black;" onchange="SelectList(3)"></select>\
查找(颜色或名字)：<br><input id="find"style="background-color:gray;"></input><button type="button" onclick="FindInList(3)" >查找</button><button name="help" type="button" data-text="find" >？？</button>\
</div>\
<div style="width:79%;height:5%;border: 1px solid black;float:left"><button type="button" onclick="SwitchInnerPage(0)" >查看信息</button><button type="button" onclick="SwitchInnerPage(1)" >查看地图</button></div>\
<canvas id="pCanvas" style="width:79%;height:95%;border: 1px solid black;float:left;display:none" ></canvas>\
<div id="BigDiv" style="width:79%;height:95%;border: 1px solid black;float:left;OVERFLOW-Y: auto; OVERFLOW-X:hidden;">'
+ this.pageArea + '</div>'

this.sPage6='<div style="width:20%;height:100%;border: 1px solid black;float:left">\
<select id="myList" data-from="Lands" data-from2="name" name="gameData3" size="25"   style="width:100%;height:90%;border: 1px solid black;" onchange="SelectList(6)"></select>\
查找：<input id="find"style="background-color:gray;"></input><button type="button" onclick="FindInList(3)" >查找</button>\
<br><p style="color:#000000;text-align:left;float:left;padding:0px;margin:0px;">总面积：</p><p id="ar" style="color:#000000;text-align:left;float:left;padding:0px;margin:0px;" name="gameData2"></p>\
</div>\
<canvas id="pCanvas" style="width:79%;height:100%;border: 1px solid black;float:left" ></canvas>'


this.sPage4='<div style="width:20%;height:100%;border: 1px solid black;float:left">\
<select id="myList" name="list" size="25" data-type="Nations"   style="width:100%;height:90%;border: 1px solid black; "  onchange="SelectList(4)"></select>\
查找：<br><input type="text" id="find"style="background-color:gray;"></input><button type="button" onclick="FindInList(4)" >查找</button>\
</div>\
<div style="width:79%;height:5%;border: 1px solid black;float:left"><button type="button" onclick="SwitchInnerPage(0)" >查看信息</button><button type="button" onclick="SwitchInnerPage(1)" >查看地图</button></div>\
<canvas id="pCanvas" style="width:79%;height:95%;border: 1px solid black;float:left;display:none" ></canvas>\
<div id="BigDiv" style="width:79%;height:95%;border: 1px solid black;float:left;OVERFLOW-Y: auto; OVERFLOW-X:hidden;">'
+this.pageNation+ '</div>'

this.sPage5='<div style="width:20%;height:100%;border: 1px solid black;float:left">\
<select id="myList" name="list" size="25" data-type="Armys"   style="width:100%;height:90%;border: 1px solid black;"  onchange="SelectList(5)" ></select>\
查找：<br><input type="text" id="find"style="background-color:gray;"></input><button type="button" onclick="FindInList(4)" >查找</button>\
</div>\
<div style="width:79%;height:5%;border: 1px solid black;float:left"><button type="button" onclick="SwitchInnerPage(0)" >查看信息</button><button type="button" onclick="SwitchInnerPage(1)" >查看地图</button></div>\
<canvas id="pCanvas" style="width:79%;height:95%;border: 1px solid black;float:left;display:none" ></canvas>\
<div id="BigDiv" style="width:79%;height:95%;border: 1px solid black;float:left;OVERFLOW-Y: auto; OVERFLOW-X:hidden;">'
+ this.pageArmy +'</div>'

this.sPage7='此处未来将创建单位，在军队中可以加入单位列表。此功能搭建成功后，RPG的帖游也不成问题了。'

this.sPageK='此处未来将作为记录，甚至可以作为历史记录，并可以随时撤销步骤回到之前的状态。'

this.sPageS='此处在以后的版本中功能是将命令发送给系统，甚至可以直接发送给系统的服务器（如果系统有的话）。';

this.sPageH="<div style='height: 10%; width: 100%;'><p style='font-size:25px;color:#990000;text-align:center;padding:0px;margin:0px'>帮助文档</p></div>\
<div id='helpTextDiv' style='height: 80%; width: 100%;border: 1px solid black;OVERFLOW-Y: auto; OVERFLOW-X:hidden;'></div>\
<div style='height: 9%; width: 100%;'><div id='btndiv' style='height: auto; width: auto;text-align:center;'></div></div>"

this.sPageM='<div style="width:20%;height:100%;border: 1px solid red;float:left;">\
<p style="margin:2px;padding:0px"><input data-from="Show0" type="checkbox" name="gameDataT"  />美化图片</p>\
<p style="margin:2px;padding:0px"><input data-from="Show1" type="checkbox" name="gameDataT"  />区域图片</p>\
<p style="margin:2px;padding:0px"><input data-from="Show2" type="checkbox" name="gameDataT"  />地形图片</p>\
<p style="margin:2px;padding:0px"><input data-from="Show3" type="checkbox" name="gameDataT"  />天气图片</p>\
<p style="margin:2px;padding:0px"><input data-from="ShowArmy" type="checkbox" name="gameDataT"  />显示军队</p>\
<p style="margin:2px;padding:0px"><input data-from="ShowCountry" type="checkbox" name="gameDataT"  />显示国家</p>\
<select data-from="ClickType" name="gameDataT"><option   value= "11">选择区域和军队</option><option   value= "110"   >选择国家和军队</option><option   value= "10"   >只选择军队</option><option   value= "1"   >只选择区域</option><option   value= "100"   >只选择国家</option><option   value= "0"   >只查看</option></select><br>\
<button type="button" onclick="showingImage.ResetIMG();" >归位图片</button>\
 </div>\
 <canvas id="pCanvas" style="display:none;"></canvas>\
 <div id="BigDiv" style="width:79.8%;height:100%;background:#AAAAAA;float:left;OVERFLOW-Y: auto; OVERFLOW-X:hidden;">\
 </div>\
'

this.sPage1='<div style="height: 20%; width: 100%;"><p style="font-size:25px;color:#FF0000;text-align:center;padding:0px;margin:0px">读取后，你目前尚未保存的内容将被覆盖。</p></div>\
<div style="height: 70%; width: 100%;">\
<div style="height: 100%; width: 62%;float:left; ">\
<textarea id="ReadText" style="height: 80%; width: 100%;resize:none"></textarea>\
<button type="button" onclick="ReadFormTA()" style="height: 20%;text-align:center;">从上面的文本读取数据</button>\
</div>\
<div style="height: 100%; width: 36%;float:right;">\
<p id="ReadedFile" >可读取后缀为gs的文件，会覆盖当前的数据</p>\
<button type="button" onclick="openFile(event)" style="height: 20%;text-align:center;">从文件读取数据</button>\
</div>\
<hr style="width:1px;height:100%; "></hr><input type="file" onchange="changeFile(event)" name="filename" id="openfile" accept=".gs" style="display:none"/>\
</div>';

this.sPage2='<div style="height: 20%; width: 100%;"><p id="top_3" style="text-align:center;padding:0px;margin:0px">游戏信息及设置</p></div>\
<div style="height: 80%; width: 100%;">\
<div style="height: 100%; width: 45%;float:left;">\
<div class="ldiv">\
<p id="p2_0" style="color:#FF0000;text-align:left;float:left;padding:0px;margin:0px;">此游戏没有美化图片</p>\
</div>\
<div class="ldiv">\
<p id="p2_1" style="color:#FF0000;text-align:left;float:left;padding:0px;margin:0px;">此游戏没有区域图片</p>\
</div>\
<div class="ldiv">\
<p id="p2_2" style="color:#FF0000;text-align:left;float:left;padding:0px;margin:0px;">此游戏没有地形图片</p>\
</div>\
<div class="ldiv">\
<p id="p2_3" style="color:#FF0000;text-align:left;float:left;padding:0px;margin:0px;">此游戏没有自动天气系统</p>\
</div>\
</div>\
<hr style="width:1px;height:100%;float:left "></hr>\
<div style="height: 100%; width: 50%;float:left;">\
<form action="" method="post" style="padding:0px;margin:0px;">\
 <table align="left" style="padding:0px;margin:0px;width:auto;">\
 <tr><td>游戏名称：</td><td><p data-from="gameName" type="text" name="gameData" /></td><td>版本：</td><td><p type="text" data-from="gameVersion" name="gameData" /></td></tr>\
 <tr><td>作者：</td><td><p data-from="gameAuthor" type="text" name="gameData" /></td></tr>\
 <tr><td>游戏中日期：</td><td><p data-from="gameDate" name="gameData"></p></td><td>玩家数：</td><td><p data-from="playerNum" type="number" name="gameData" min="1" max="1000" step="1"/></td></tr>\
 <tr><td>系统服务器：</td><td><p type="text" data-from="servicer" name="gameData" ></p></td><td><button data-text="ser" name="help" type="button" >？？</button></td></tr>\
 <tr><td>音效音量：</td><td><input name="soundData" type="range" data-to="sound" max="1.0" min="0.0" step="0.1" onchange="changeV(event)"/></td><td id="soundt"></td></tr>\
 <tr><td>背景音1音量：</td><td><input name="soundData" type="range" data-to="BGM1" max="1.0" min="0.0" step="0.1" onchange="changeV(event)"/></td><td id="BGM1t"></td></tr>\
 <tr><td>背景音2音量：</td><td><input name="soundData" type="range" data-to="BGM2" max="1.0" min="0.0" step="0.1" onchange="changeV(event)"/></td><td id="BGM2t"></td></tr>\
 <tr><td>背景音3音量：</td><td><input name="soundData" type="range" data-to="BGM3" max="1.0" min="0.0" step="0.1" onchange="changeV(event)"/></td><td id="BGM3t"></td></tr>\
 <tr><td><p style="color:#888888;font-size:14px;margin:0px;padding:0px">所使用编辑器信息：</p></td></tr>\
 <tr><td><p style="color:#888888;font-size:14px;margin:0px;padding:0px">名称：</p></td><td><p data-from="editName" name="gameData" style="color:#888888;font-size:14px;margin:0px;padding:0px"></p></td><td><p style="color:#888888;font-size:14px;margin:0px;padding:0px">版本：</p></td><td><p data-from="version" name="gameData" style="color:#888888;font-size:14px;margin:0px;padding:0px"></p></td></tr>\
 <tr><td><p style="color:#888888;font-size:14px;margin:0px;padding:0px">作者：</p></td><td><p data-from="author" name="gameData" style="color:#888888;font-size:14px;margin:0px;padding:0px"></p></td></tr>\
 <tr><td><p style="color:#888888;font-size:14px;margin:0px;padding:0px">发布日期：</p></td><td><p data-from="date" name="gameData" style="color:#888888;font-size:14px;margin:0px;padding:0px"></p></td></tr>\
 </table>\
 </form>\
</div>\
</div>\
';

}
function turnPage(num){
	var page="Page" + num; 
	cPage=num;
	canvas.style.display="none";
	upmesbox.style.display="none";
	mainBox.style.height="100%"
	mesBox.innerHTML=pageText["s"+page];
	ShowData();
	switch(page)
	{
		case 'Page2':CheckA();break;
		case 'Page3':ShowTPage(3,arguments[1]);break;
		case 'Page4':ShowTPage(4,arguments[1]);break;
		case 'Page5':ShowTPage(5,arguments[1]);break;
		case 'PageM':showingImage.ReadIcons();canvas.style.display="block";upmesbox.style.display="block";mainBox.style.height="35%";break;
		case 'Page6':SelectList(6);break;
		case 'PageX':
		case 'PageS':ReadFileDatas();break;
		case 'PageH':ReadPage();break;
	}
	BtnClick();
	EndSelect(-1,-1,-1);
}

function CheckA(){
	
	var page2ps = new Array(3)
	page2ps[0]=document.getElementById("p2_0");
	page2ps[1]=document.getElementById("p2_1");
	page2ps[2]=document.getElementById("p2_2");
	page2ps[3]=document.getElementById("p2_3");
	if(fileDatas.mapPath[0]!=null)
	{
		page2ps[0].innerText="美化图片已读取";
		page2ps[0].style="color:#009900;text-align:left;float:left;padding:0px;margin:0px;";
		
	}
	if(fileDatas.mapPath[2]!=null)
	{
		page2ps[2].innerText="区域图片已读取完毕，共有" + fileDatas.Lands.length + "种地形";
		page2ps[2].style="color:#009900;text-align:left;float:left;padding:0px;margin:0px;";
		
	}
	if(fileDatas.mapPath[1]!=null)
	{	
		page2ps[1].innerText="地形图片已读取完毕，共有" + fileDatas.Areas.length + "个区域";
		page2ps[1].style="color:#009900;text-align:left;float:left;padding:0px;margin:0px;";
	}else{

		page2ps[2].innerText="需要先读取区域图片"
		page2ps[3].innerText="需要先读取区域图片"
		
	}
}
function ShowTPage(num){
	var list = document.getElementById("myList");
	var tempA=new Array();
	switch(num)
	{

	case 3:
	tempA=fileDatas.Areas;
	break;
	case 4:
	tempA=fileDatas.Nations;
	break;
	case 5:
	tempA=fileDatas.Armys;
	for(var j=0;j<tempA.length;j++)
	{
		var op=new Option("",j);
		var belong='无主';
		if(tempA[j].belong!=-1)belong=fileDatas.Nations[tempA[j].belong].name;
		if(tempA[j].type!=-1)op.innerHTML=tempA[j].name + "("+belong+tempA[j].type+")";
		else op.innerHTML=tempA[j].name + "("+belong+")";
		list.add(op);
	}
	list.selectedIndex=arguments[1] ? arguments[1] : -1;
	SelectList(num);
	return;
	}
	for(var j=0;j<tempA.length;j++)
	{
		var op=new Option("",j);
		var rgb="255,255,255"
		if(tempA[j].color!='')rgb=tempA[j].color;
		if(num==3)op.innerHTML="<span style='font-weight:bold;color:rgb(" + rgb + ");'>■</span>" + tempA[j].name + "("+rgb+")"+((Math.floor(tempA[j].pos/4))%showingImage.imgdata2.width +"," + Math.floor((Math.floor(tempA[j].pos/4))/showingImage.imgdata2.width) ) ;
		if(num==4)op.innerHTML="<span style='font-weight:bold;color:rgb(" + rgb + ");'>■</span>" + tempA[j].name + "("+rgb+")"+ tempA[j].type;
		list.add(op);
	}
	list.selectedIndex=arguments[1] ? arguments[1] : -1;
	SelectList(num);
}

function FindInList(way){
	var inputbox=document.getElementById("find");
	turnPage(way)
	//--------------------------------------------------------------
	var list = document.getElementById("myList");
	if(inputbox.value!='')
	{var search = inputbox.value;
		for(var i=0;i<list.options.length;i++)
		{
			var val = list.options[i].text;
			if(val.indexOf(search)==-1){list.options.remove(i);i--;}
		}
	}
	
}

function ShowData(){
	var dataElements=document.getElementsByName("gameData");
	var i=0;
	var j=0;
	for(i=0;i<dataElements.length;i++)
	{
		/*if(dataElements[i].nodeName=="INPUT")dataElements[i].value=fileDatas[dataElements[i].getAttribute('data-from')];
		if(dataElements[i].nodeName=="SELECT")dataElements[i].options[fileDatas[dataElements[i].getAttribute('data-from')]].selected=true;
		dataElements[i].onchange=function(event){
			if(IsError(event.target.value))event.target.value=fileDatas[event.target.getAttribute('data-from')];
			else fileDatas[event.target.getAttribute('data-from')]=event.target.value;
		}*/
		if(dataElements[i].nodeName=="P")dataElements[i].innerText=fileDatas[dataElements[i].getAttribute('data-from')];
	}
	var dataElements3=document.getElementsByName("gameDataT");
	for(i=0;i<dataElements3.length;i++)
	{
		if(dataElements3[i].nodeName=="INPUT")
		{
		dataElements3[i].checked=tempDatas[dataElements3[i].getAttribute('data-from')];
		dataElements3[i].onchange=function(event){
			tempDatas[event.target.getAttribute('data-from')]=event.target.checked;
			EndSelect(-1,-1,-1);
		}
		}
		if(dataElements3[i].nodeName=="SELECT")
		{dataElements3[i].options[tempDatas[dataElements3[i].getAttribute('data-from')]].selected=true;
		dataElements3[i].onchange=function(event){
			tempDatas[event.target.getAttribute('data-from')]=event.target.selectedIndex;
			EndSelect(-1,-1,-1);
		}}
	}
	var dataElements4=document.getElementsByName("gameData3");
	for(i=0;i<dataElements4.length;i++)
	{
		if(dataElements4[i].nodeName=="SELECT")
		{
			for(j=0;j<fileDatas[dataElements4[i].getAttribute('data-from')].length;j++)
			{
			var op=new Option("",j);
			op.innerHTML=fileDatas[dataElements4[i].getAttribute('data-from')][j][dataElements4[i].getAttribute('data-from2')];
			dataElements4[i].add(op);
			}
		}
		
	}
}

function SelectList(num){
	var list=document.getElementById('myList');
	switch(num)
	{
		case 3:
		case 4:
		if(list.selectedIndex!=-1){
		if(fileDatas[list.getAttribute('data-type')][list.selectedIndex].acreage==-1 || document.getElementById('pCanvas').style.display=="block")drawinnerCanvas(2,list.selectedIndex,list.getAttribute('data-type')) ;
		}else{drawinnerCanvas(2,list.selectedIndex,list.getAttribute('data-type'))}
		case 5:
		ShowSelected(list.selectedIndex,list.getAttribute('data-type'));
		break;
		
		//drawinnerCanvas(2,list.selectedIndex,list.getAttribute('data-type'));
		//ShowSelected(list.selectedIndex,list.getAttribute('data-type'));
		case 6:
		drawinnerCanvas(3,list.selectedIndex,'Lands');
	}
	}

function ShowSelected(select,type){
	var dataElements=document.getElementsByName("gameData2");
	if(select!=-1)
	{
	
	for(var i=0;i<dataElements.length;i++)
	{
		switch(dataElements[i].nodeName)
		{
		
		case "P":
		switch(dataElements[i].getAttribute('data-type'))
		{
			case "text":
			dataElements[i].innerHTML=dataElements[i].getAttribute('data-fore') + fileDatas[type][select][dataElements[i].getAttribute('data-from')];
			if(dataElements[i].getAttribute('id')=='ar'){if(fileDatas[type][select].acreage!=-1)dataElements[i].innerHTML=dataElements[i].getAttribute('data-fore') + fileDatas[type][select].acreage; else dataElements[i].innerHTML="---"}
			break;
			case "color":
			dataElements[i].innerHTML=dataElements[i].getAttribute('data-fore') + "<span style='font-weight:bold;color:rgb(" + fileDatas[type][select][dataElements[i].getAttribute('data-from')] + ");'>███████</span>"
			break;
			case "tf":
			if(fileDatas[type][select][dataElements[i].getAttribute('data-from')])dataElements[i].innerHTML=dataElements[i].getAttribute('data-fore') + "是"; else dataElements[i].innerHTML=dataElements[i].getAttribute('data-fore') + "否"; 
			break;
			case "tag":
			var tagnum=parseInt(dataElements[i].getAttribute('data-tagnum'));
			var adj=parseInt(dataElements[i].getAttribute('data-tagadj'));
			tagnum=tagnum-1-adj;
			var val=parseInt(fileDatas[type][select][dataElements[i].getAttribute('data-from')])
			val=tagnum - val;
			if(val >= 0)
			{dataElements[i].innerHTML=dataElements[i].getAttribute('data-fore') + dataElements[i].getAttribute('data-' + val.toString());}
			else{
				var arr=dataElements[i].getAttribute('data-else').split('$');
				dataElements[i].innerHTML=dataElements[i].getAttribute('data-fore') + arr[0] + fileDatas[dataElements[i].getAttribute('data-elseDF')][fileDatas[type][select][dataElements[i].getAttribute('data-from')]].name + arr[1];
				}
			break;
			case "point":
			if(fileDatas[type][select][dataElements[i].getAttribute('data-from')]==-1){dataElements[i].innerText= dataElements[i].getAttribute('data-fore') + "未确定";return;}
			if(type=="Armys" && fileDatas.gameType==0) dataElements[i].innerText= dataElements[i].getAttribute('data-fore') + fileDatas.Areas[fileDatas[type][select][dataElements[i].getAttribute('data-from')]].name;
			else dataElements[i].innerText= dataElements[i].getAttribute('data-fore') + ((Math.floor(fileDatas[type][select].pos/4))%showingImage.imgWidth +"," + Math.floor((Math.floor(fileDatas[type][select].pos/4))/showingImage.imgWidth) );
			break;
		}
		
		break;
		}
		
		}
		
		
	}else{
		for(var i=0;i<dataElements.length;i++)
		{
			switch(dataElements[i].nodeName)
			{
			case "P":
					dataElements[i].innerHTML=dataElements[i].getAttribute('data-fore') + "未选择";
			break;
			}
		}
	}
	}



function SwitchInnerPage(num){
	var pCanvas=document.getElementById('pCanvas');
	var bigDiv=document.getElementById('BigDiv');
	if(num==0)
	{bigDiv.style.display='block';pCanvas.style.display='none';}
	else{pCanvas.style.display='block';bigDiv.style.display='none';}
	SelectList(parseInt(cPage));
}

function drawinnerCanvas(num,select,type){
	var pCanvas=document.getElementById('pCanvas');
	var pctx=pCanvas.getContext('2d');
	var ar=0;
	pCanvas.width=showingImage.imgWidth;
	pCanvas.height=showingImage.imgHeight;
	if(showingImage["imgdata" + num]!='')
	{
		
		uctx.putImageData(showingImage["imgdata" + num],0,0);
	var imgData=uctx.getImageData(0,0,showingImage.imgWidth,showingImage.imgHeight);

		switch(type)
		{
		case 'Lands':
			for (var i=0;i<imgData.data.length;i+=4)
		{
		if(imgData.data[i+3]!=0)
			if(select!=-1)if(imgData.data[i+2]==fileDatas[type][select].data){imgData.data[i+3]=255;ar++;} else imgData.data[i+3]=30; else imgData.data[i+3]=30;
			
			}
			
break;
		case 'Areas':
		var str;
		if(select!=-1)
		str=fileDatas[type][select].color;
		else str="255,255,255";

			for (var i=0;i<imgData.data.length;i+=4)
		{
		if(imgData.data[i+3]!=0)
			{
				if(select!=-1){
				
				
				var tstr=imgData.data[i] + "," +imgData.data[i+1] + ","+imgData.data[i+2];
				if(str==tstr && str!="255,255,255"){imgData.data[i+3]=255;ar++} else imgData.data[i+3]=30
				}else imgData.data[i+3]=30;
			}
			}
			if(select!=-1)fileDatas[type][select].acreage=ar;
			break;
			
			case 'Nations':
			var changelist=new Array();
			var str="255,255,255";
			if(select!=-1)
			str=fileDatas[type][select].color;
			var arr3=str.split(',');
			for(var j=0;j<fileDatas.Areas.length;j++)
			{
				if(fileDatas.Areas[j].belong!=-1){
					var arr=fileDatas.Areas[j].color.split(',');
					var arr2=fileDatas.Nations[fileDatas.Areas[j].belong].color.split(',');
					if(select!=-1){if(fileDatas.Nations[fileDatas.Areas[j].belong].belong==select){arr2[0]=arr3[0];arr2[1]=arr3[1];arr2[2]=arr3[2];}}
					for(var k=0;k<3;k++)
					{
						changelist.push(arr[k]);
						changelist.push(arr2[k]);
					}
					
				}
			}
			for (var i=0;i<imgData.data.length;i+=4)
					{
						var c=false;
						if(!(imgData.data[i]==0 && imgData.data[i+1]==0 && imgData.data[i+2]==0) && !(imgData.data[i]==255 && imgData.data[i+1]==255 && imgData.data[i+2]==255))
						{
						for(var h=0;h<changelist.length;h+=6)
						{
						if(imgData.data[i]==changelist[h] && imgData.data[i+1]==changelist[h+2] && imgData.data[i+2]==changelist[h+4])
						{
							imgData.data[i]=changelist[h+1];
							imgData.data[i+1]=changelist[h+3];
							imgData.data[i+2]=changelist[h+5];
							if(arr3[0]==changelist[h+1] && arr3[1]==changelist[h+3] && arr3[2]==changelist[h+5]){imgData.data[i+3]=255;ar++;} else imgData.data[i+3]=120;
							c=true;
							break;
						}
						}
						}
						if(!c){
							if(imgData.data[i]==255 && imgData.data[i+1]==255 && imgData.data[i+2]==255)
							{imgData.data[i]=255;imgData.data[i+1]=255;imgData.data[i+2]=255;imgData.data[i+3]=30;}
							else{imgData.data[i]=0;imgData.data[i+1]=0;imgData.data[i+2]=0;imgData.data[i+3]=30;}
							}
					}
						if(select!=-1)fileDatas[type][select].acreage=ar;
						break;
		}
		pctx.putImageData(imgData,0,0);

}
}

function FindAndDrawPic(index,can,fromres,type,adj,select){
	can.width=can.offsetWidth;
	can.height=can.offsetHeight;
	canvasctx=can.getContext('2d');
	canvasctx.clearRect(0,0,can.width,can.height);
	var timg=new Image();
	switch(index)
	{
		case 0:
		break;
		case 1:
		var found=-1;
		var ctype='默认';
		if(select!=-1)ctype=fileDatas[type][select].type; else ctype=document.getElementById('ctype').options[document.getElementById('ctype').selectedIndex].text;
		for(var i=0;i<fileDatas[fromres].length;i++)
		{
			if(fileDatas[fromres][i].type!="")
			{
				var arr=fileDatas[fromres][i].type.split(",");
				for(var k=0;k<arr.length;k++)
				{
					if(arr[k]!='')
					if(arr[k]==ctype){found=i;break;}
				}
				if(found!=-1){break;}
			}
		}
		
		if(found!=-1){
			timg.src=fileDatas[fromres][found].data;
			timg.onload=function(){
				var w,h;
				if(timg.width>can.width && can.getAttribute('id')!="IconCanvas")w=can.width;else w=timg.width;
				if(timg.height>can.height && can.getAttribute('id')!="IconCanvas")h=can.height;else h=timg.height;
				canvasctx.drawImage(timg,0,0,w,h);
				}
			
			}else{
		if(can.getAttribute('id')=="IconCanvas"){
		var w=60,h=60;
		if(fileDatas.defaultArmyIcon==1)h=45;
		canvasctx.beginPath();
		canvasctx.lineWidth="2";
		canvasctx.strokeStyle="black";
		canvasctx.font=h-15 + "px 宋体";
		canvasctx.fillStyle="#FFFFFF";
		canvasctx.fillRect(x,y,w,h);
		canvasctx.rect(x,y,w,h);
		canvasctx.fillStyle="#000000";
		canvasctx.fillText(fileDatas.Armys[j].name.substr(0, 1),x+Math.floor((w-h+15)/2),y+h-15,w);
		canvasctx.stroke();}}
		break;
		default:
		if(type=="Armys" && index==2){
			//尚未完成
			return;
		}else{
			var num=index-adj-1;
			
			timg.src=fileDatas[fromres][num].data;
			timg.onload=function(){
				var w,h;
				if(timg.width>can.width && can.getAttribute('id')!="IconCanvas")w=can.width;else w=timg.width;
				if(timg.height>can.height && can.getAttribute('id')!="IconCanvas")h=can.height;else h=timg.height;
				canvasctx.drawImage(timg,0,0,w,h);
				}
		}
	}
}


function ReadFileDatas()
{
	var textb=document.getElementById('AllData');
	textb.innerText="";
	var string=GetAllData();
	textb.innerText=string;
}

function CopyB(){
	var textb=document.getElementById('AllData');
	textb.select(); 
document.execCommand("Copy"); 
alert("复制完毕。");
}

function changeV(event){
	var player=document.getElementById(event.target.getAttribute('data-to'));
	var tex=document.getElementById(event.target.getAttribute('data-to') + "t");
	player.volume=event.target.value;
	tex.innerText=player.volume;
	}

//-------------------------------------------
function SaveAsFile(objId,fileType){
	var textb=document.getElementById(objId);
	if (isie){
    var winname = window.open('', '_blank', 'top=10000');
	var str='';
    winname.document.open('text/' + fileType, 'replace');
	str=textb.value;
	for(var i=0;i<tstr.length;i++)
	{
		str+=tstr.charCodeAt(i).toString(16) + " ";
	}
    winname.document.writeln(str);
    winname.document.execCommand('saveas','',fileDatas.gameName + fileDatas.lastEditDate + '.' + fileType);
    winname.close();}
    else{
        saveAs(textb,fileType);
    }
}

function saveAs(obj,fileType){//chrome,火狐等现代浏览器保存文本框内容
    var a=document.createElement('a');
	var tstr=obj.value;
	var str='';
	for(var i=0;i<tstr.length;i++)
	{
		str+=tstr.charCodeAt(i).toString(16) + " ";
	}
    a.setAttribute('href','data:text/' + fileType + ';UTF-8,'+str);
    a.setAttribute('download',fileDatas.gameName + fileDatas.lastEditDate + '.' + fileType);
    a.setAttribute('target','_blank');
    a.style.display="none";
    obj.parentNode.appendChild(a);
    a.click();
} 
//-----------------------------------------------
function ReadFormTA(){
	if(confirm("确定要读取上面的文本并覆盖当前游戏信息吗？")){
	var textb=document.getElementById('ReadText');
	var str=textb.value;
	ReadTextDatas(str);
	}
}

function openFile(event){
	if(confirm("确定要读取文件并覆盖当前游戏信息吗？")){
var opener2=document.getElementById('openfile');
opener2.click();
}
}
//GMopener.click
function changeFile(event){
	             
	var objUrl = getObjectURL(event.target.files[0]);

	if(objUrl){
	var reader=new FileReader();
	reader.readAsBinaryString(event.target.files[0],"UTF-8");
	reader.onload=function(e){
		var str="";
		var astr=e.target.result.split(" ");
		for(var i=0;i<astr.length;i++)
		{
			if(astr[i]!="")
			str+=String.fromCharCode(parseInt(astr[i],16));
		}
		ReadTextDatas(str);
	}
	}
}

function ReadPage(){
	var i=0;
	for(var name in HelpPageText)i++;
	var arr=HelpPageText.btntext.split("$");
	var str=arr[0] + cHPage + "/" + (i-1) + arr[1];
	document.getElementById('btndiv').innerHTML=str;
	document.getElementById('helpTextDiv').innerHTML=HelpPageText["p"+cHPage];
}

function PreViewWindow(type){
	var select=-1;
	if(cPage=='M'){if(selectArea!=-1)select=selectArea; else if(selectArmy!=-1)select=selectArmy; else select=selectNation;}else select=document.getElementById('myList').selectedIndex;
	if(select!=-1){
	type+='s';
	ShowWindow(fileDatas[type][select].name,1,fileDatas[type][select].desc,0,FindAndReturnRes(fileDatas[type][select].descpic,"picRes",type,0,select),FindAndReturnRes(fileDatas[type][select].descsound,"soundRes",type,0,select));
	}
}