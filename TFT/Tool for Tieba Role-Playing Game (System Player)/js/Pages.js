var cPage=null;
var bgDiv=document.getElementById("maskDiv");
var tipDiv=document.getElementById("tipDiv");
var tipBtnBox=document.getElementById('tipBtnBox');
var hValue=null;
var pageText=new PageText();
var tempText='';
var cHPage=1;
var helpText = {
	sertitle:"游戏服务器",
	ser:"这个功能还没有实现，是一个想法。如果玩家系统拥有<span class='redSpan'>自己的web</span>，可以填入这里，预期实现的功能是玩家不需要再手动将存档发送给系统，而是通过这里直接上传。",
	landtitle:"载入地形的说明",
	land:"在载入地形的时候，地形对应像素点的RGB值的<span class='redSpan'>((R值-128)*256)+G值</span>为<span class='yellowSpan'>海拔数值</span>。<span class='redSpan'>B值</span>则代表不同<span class='yellowSpan'>地形的代号</span>。注意你的图片不要太大，颜色种类不要太多，否则会很卡。",
	findtitle:"如何查找",
	find:"只要你查找的内容是上面列表中<span class='redSpan'>字符串的一部分</span>，则查找有效。这意味着你也可以使用颜色进行查找。如可以输入 255,0,0 来查找这个颜色的地形。需要注意的是，逗号是<span class='redSpan'>英文半角</span>。",
	cptitle:"中心点",
	cp:"区域的中心点代表了该区域的<span class='redSpan'>区域中心</span>，主要在<span class='redSpan'>按区域来进行游戏</span>的类型的游戏中起作用。在显示军队的时候，也是在这一点上显示。在区域地图中，这一点为（0,0,0），且周围要是一样的颜色。一个区域只能有一个中心点。",
	colortitle:"区域或国家的颜色",
	color:"颜色是区分区域及国家的<span class='redSpan'>唯一标识</span>。#000000(黑色)是禁用的，建议也不使用邻近色。#FFFFFF(白色)是还没有具体设定的区域可用的颜色，可以不唯一。每次改变颜色后，区域面积将不得不重新计算。",
	statetitle:"附属国",
	state:"如果这里选择的不是<span class='redSpan'>独立国家</span>的话，说明她是别的国家的附属国。",
	artitle:"区域的面积",
	ar:"数值为区域（此颜色）或国家在地图上所拥有的<span class='redSpan'>像素数</span>的总和。"
	
}
function PageText(){
	this.pageArea='<div style="width:100%;height:220px;float:left;OVERFLOW-Y: auto; OVERFLOW-X:hidden;">\
<div style="width:150px;height:200px;border: 1px solid black;float:left;">\
<div style="width:120px;height:120px;border: 1px solid black;margin:10px;">\
<canvas id="thec" data-from="pic" name="gameData2" height="120px" width="120px";/></div>\
图片使用<select id="thep" data-read="n" data-adj="1" data-from="picRes" data-to="pic" data-type="0" name="gameData2"><option>没有图片</option><option>按类型</option></select><br>\
点击音效<select data-read="n" data-adj="1" data-from="soundRes" data-to="sound" data-type="0" name="gameData2"><option>默认音效</option><option>按类型</option></select>\
</div>\
<div style="width:auto;height:200px;float:left;">\
<form action="" method="post" style="padding:0px;margin:0px;">\
 <table align="left" style="padding:0px;margin:0px;width:auto;">\
 <tr><td>名称：</td><td><input data-from="name" type="text" name="gameData2" size="40"/></td><td>颜色：</td><td><input type="color" data-from="color" name="gameData2" size="30"/></td><td><button data-text="color" name="help" type="button" >？？</button></td></tr>\
 <tr><td>类型：</td><td><select id="ctype" data-read="n" data-from="Types" data-type="1" data-to="type" name="gameData2"></select><button type="button" onclick="AddTypes(InfoType.IType.Areas)">添加</button></td><td>区域的中心点：</td><td><p style="color:#000000;text-align:left;float:left;padding:0px;margin:0px;" data-from="pos" name="gameData2">待定</p></td><td><button type="button" onclick="SetPos(InfoType.IType.Areas)">现在设定</button></td><td><button data-text="cp" name="help" type="button" >？？</button></td></tr>\
 <tr><td>所属国：</td><td><select data-read="n" data-from="Nations" data-type="0" data-to="belong" name="gameData2"><option   value= "0">无主</option></select></td><td>区域的面积：</td><td><p id="ar" style="color:#000000;text-align:left;float:left;padding:0px;margin:0px;" data-from="acreage" name="gameData2">未计算</p></td><td><button data-text="ar" name="help" type="button" >？？</button></td></tr>\
 </table>\
 </form>\
 </div>\
 </div>\
 '
 this.pageNation='<div style="width:100%;height:220px;float:left;OVERFLOW-Y: auto; OVERFLOW-X:hidden;">\
<div style="width:150px;height:200px;border: 1px solid black;float:left;">\
<div style="width:120px;height:80px;border: 1px solid black;margin:10px;">\
<canvas id="thec" data-from="pic" name="gameData2" height="80px" width="120px";/></div><br>\
国旗：<select id="thep" data-read="n" data-adj="1" data-from="picRes" data-to="nflag" data-type="0" name="gameData2"><option   value= "-1">没有国旗</option><option   value= "0">按类型</option></select>\
</div>\
<div style="width:auto;height:200px;float:left;">\
<form action="" method="post" style="padding:0px;margin:0px;">\
 <table align="left" style="padding:0px;margin:0px;width:auto;">\
 <tr><td>名称：</td><td><input data-from="name" type="text" name="gameData2" size="40"/></td><td>颜色：</td><td><input type="color" data-from="color" name="gameData2" size="30"/></td><td><button data-text="color" name="help" type="button" >？？</button></td></tr>\
 <tr><td>类型：</td><td><select id="ctype" data-read="n" data-from="Types" data-type="1" data-to="type" name="gameData2"></select><button type="button" onclick="AddTypes(InfoType.IType.Nations)">添加</button></td><td>是一个玩家：</td><td><input data-from="isplayer" type="checkbox" name="gameData2"/></td><td></td><td>已灭亡：</td><td><input data-from="destroyed" type="checkbox" name="gameData2"/></td></tr>\
 <tr><td>所属国：</td><td><select data-read="n" data-from="Nations" data-type="0" data-to="belong" name="gameData2"><option   value= "0">独立国家</option></select><button data-text="state" name="help" type="button" >？？</button></td><td>国土面积：</td><td><p id="ar" style="color:#000000;text-align:left;float:left;padding:0px;margin:0px;" data-from="acreage" name="gameData2">未计算</p></td><td><button data-text="ar" name="help" type="button" >？？</button></td></tr>\
 </table>\
 </form>\
 </div>\
 </div>'
 
 this.pageArmy='<div style="width:100%;height:220px;float:left;OVERFLOW-Y: auto; OVERFLOW-X:hidden;">\
<div style="width:150px;height:200px;border: 1px solid black;float:left;">\
<div style="width:120px;height:120px;border: 1px solid black;margin:10px;">\
<canvas id="thec" data-from="pic" name="gameData2" height="120px" width="120px";/></div>\
图片使用<select id="thep" data-read="n" data-adj="2" data-from="picRes" data-to="pic" data-type="0" name="gameData2"><option>没有图片</option><option>按类型</option><option>总指挥图</option></select><br>\
点击音效<select data-read="n" data-adj="1" data-from="soundRes" data-to="sound" data-type="0" name="gameData2"><option>默认音效</option><option>按类型</option></select>\
</div>\
<div style="width:auto;height:200px;float:left;">\
<form action="" method="post" style="padding:0px;margin:0px;">\
 <table align="left" style="padding:0px;margin:0px;width:auto;">\
 <tr><td>名称：</td><td><input data-from="name" type="text" name="gameData2" size="40"/></td><td>小图标：</td><td><select  data-read="n" data-adj="1" data-from="iconRes" data-to="icon" data-type="0" name="gameData2"><option>使用默认的</option><option>按类型</option></select>\</td></tr>\
 <tr><td>类型：</td><td><select id="ctype" data-read="n" data-from="Types" data-type="1" data-to="type" name="gameData2"></select><button type="button" onclick="AddTypes(InfoType.IType.Armys)">添加</button></td><td>位置：</td><td><p style="color:#000000;text-align:left;float:left;padding:0px;margin:0px;" data-from="pos" name="gameData2">待定</p></td><td><button type="button" onclick="SetPos(InfoType.IType.Armys)">设定</button></td></tr>\
 <tr><td>所属国：</td><td><select data-read="n" data-from="Nations" data-type="0" data-to="belong" name="gameData2"><option   value= "0">无主</option></select></td><td>总指挥：</td></tr>\
 <tr><td>已建立防御工事：</td><td><input data-from="buildedDefence" type="checkbox" name="gameData2"/></td></td></tr>\
  <tr><td>移动速度：</td><td></td><td>攻击范围：</td></tr>\
 </table>\
 </form>\
 </div>\
 </div>'
 
this.sPage1='<div style="height: 20%; width: 100%;"><p style="font-size:25px;color:#FF0000;text-align:center;padding:0px;margin:0px">读取后，你目前尚未保存的内容将被覆盖。</p></div>\
<div style="height: 70%; width: 100%;">\
<div style="height: 100%; width: 62%;float:left; ">\
<textarea id="ReadText" style="height: 80%; width: 100%;resize:none"></textarea>\
<button type="button" onclick="ReadFormTA()" style="height: 20%;text-align:center;">从上面的文本读取数据</button>\
</div>\
<div style="height: 100%; width: 36%;float:right;">\
<p id="ReadedFile" >可读取后缀为gm的文件，会覆盖当前的数据</p>\
<button type="button" onclick="openFile(event)" style="height: 20%;text-align:center;">从文件读取数据</button>\
</div>\
<hr style="width:1px;height:100%; "></hr><input type="file" onchange="changeFile(event)" name="filename" id="openfile" accept=".gm" style="display:none"/>\
</div>';

this.sPage2='<div style="height: 20%; width: 100%;"><p id="top_3" style="text-align:center;padding:0px;margin:0px">三种图片的尺寸要相同</p></div>\
<div style="height: 80%; width: 100%;">\
<div style="height: 100%; width: 45%;float:left;">\
<div class="ldiv">\
<p id="p2_0" style="color:#FF0000;text-align:left;float:left;padding:0px;margin:0px;">未读取</p>\
<button id="btn0" type="button" onclick="openImgFile(event)" >载入表层图片</button>\
</div>\
<div class="ldiv">\
<p id="p2_1" style="color:#FF0000;text-align:left;float:left;padding:0px;margin:0px;">未读取</p>\
<button id="btn1" type="button" onclick="openImgFile(event)" >载入区域并自动读取区域</button>\
<button id="hbtn1" type="button" onclick="openImgFile(event)" >载入区域但不自动读取</button>\
</div>\
<div class="ldiv">\
<p id="p2_2" style="color:#FF0000;text-align:left;float:left;padding:0px;margin:0px;">未读取</p>\
<button id="btn2" type="button" onclick="openImgFile(event)" >载入地形</button><button data-text="land" name="help" type="button" >？？</button>\
</div>\
<div class="ldiv">\
<p id="p2_3" style="color:#FF0000;text-align:left;float:left;padding:0px;margin:0px;">未读取</p>\
<button id="btn3" type="button" onclick="openImgFile(event)" >载入天气</button>\
</div>\
</div>\
<hr style="width:1px;height:100%;float:left "></hr>\
<div style="height: 100%; width: 50%;float:left;">\
<form action="" method="post" style="padding:0px;margin:0px;">\
 <table align="left" style="padding:0px;margin:0px;width:auto;">\
 <tr><td>游戏名称：</td><td><input data-from="gameName" type="text" name="gameData" size="40"/></td><td>游戏版本：</td><td><input type="text" data-from="gameVersion" name="gameData" size="30"/></td></tr>\
 <tr><td>游戏作者：</td><td><input data-from="gameAuthor" type="text" name="gameData" size="40"/></td><td>游戏中日期：</td><td><input type="text" data-from="gameDate" name="gameData" size="30"/></td></tr>\
 <tr><td>军队驻守方式：</td><td><select data-from="gameType" name="gameData"><option   value= "0">区域</option><option   value= "1"   >地图上任一点</option></select></td><td>玩家数：</td><td><input data-from="playerNum" type="number" name="gameData" min="1" max="1000" step="1"/></td></tr>\
 <tr><td>系统服务器：</td><td><input type="text" data-from="servicer" name="gameData" size="40"></td><td><button data-text="ser" name="help" type="button" >？？</button></td></tr>\
 <tr><td>音效音量：</td><td><input name="soundData" type="range" data-to="sound" max="1.0" min="0.0" step="0.1" onchange="changeV(event)"/></td><td id="soundt"></td></tr>\
 <tr><td>背景音1音量：</td><td><input name="soundData" type="range" data-to="BGM1" max="1.0" min="0.0" step="0.1" onchange="changeV(event)"/></td><td id="BGM1t"></td></tr>\
 <tr><td>背景音2音量：</td><td><input name="soundData" type="range" data-to="BGM2" max="1.0" min="0.0" step="0.1" onchange="changeV(event)"/></td><td id="BGM2t"></td></tr>\
 <tr><td>背景音3音量：</td><td><input name="soundData" type="range" data-to="BGM3" max="1.0" min="0.0" step="0.1" onchange="changeV(event)"/></td><td id="BGM3t"></td></tr>\
 </table>\
 </form>\
</div>\
</div>\
';

this.sPage3='<div style="width:20%;height:100%;border: 1px solid black;float:left">\
<select id="myList" name="list" size="25" data-type="Areas" style="width:100%;height:80%;border: 1px solid black;" onchange="SelectList(3)"></select>\
<button type="button" onclick="AddNewType(InfoType.IArea)" style="width: 80px;height:30px">添&nbsp;&nbsp;加</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onclick="DeleteType(InfoType.IArea)" style="height:30px;width: 80px;">删&nbsp;&nbsp;除</button><br />\
查找(颜色或名字)：<br><input id="find"style="background-color:gray;"></input><button type="button" onclick="FindInList(3)" >查找</button><button name="help" type="button" data-text="find" >？？</button>\
</div>\
<div style="width:79%;height:5%;border: 1px solid black;float:left"><button type="button" onclick="SwitchInnerPage(0)" >查看信息</button><button type="button" onclick="SwitchInnerPage(1)" >查看地图</button></div>\
<canvas id="pCanvas" style="width:79%;height:95%;border: 1px solid black;float:left;display:none" ></canvas>\
<div id="BigDiv" style="width:79%;height:95%;border: 1px solid black;float:left;OVERFLOW-Y: auto; OVERFLOW-X:hidden;">'
+ this.pageArea +
' <div style="position:relative;width:20%;height:58%;border: 1px solid black;top:0px;float:left;">此区域上的军队：<br><select size="25" id="ArmyInArea" style="width:100%;height:80%;border: 1px solid black;"></select><button type="button" onclick="unfinished()" >转到</button></div>\
 <div style="position:relative;width:79%;height:58%;border: 1px solid black;top:0px;float:left;"><div style="width:70%;height:98%;float:left;"><p style="height: 10%; width: 100%;margin:0px;padding:0px;">描述</p><textarea data-from="desc" name="gameData2" style="height: 80%; width: 99%;resize:none"></textarea><div style="width:100%;height:10%;">图片：<select  data-read="n" data-adj="1" data-from="picRes" data-to="descpic" data-type="0" name="gameData2"><option>没有图片</option><option>按类型</option></select>音效<select data-read="n" data-adj="1" data-from="soundRes" data-to="descsound" data-type="0" name="gameData2"><option>没有音效</option><option>按类型</option></select>\<button style="float:right" name="view" type="button" onclick="PreViewWindow(InfoType.IType.Areas)">预览</button></div></div><div style="width:30%;height:100%;float:left;"><p style="height: 10%; width: 99%;margin:0px;padding:0px;">自定义变量</p><textarea data-from="tempa" name="gameData2" style="height: 80%; width: 99%;resize:none"></textarea></div></div>\
</div>'

this.sPage6='<div style="width:20%;height:100%;border: 1px solid black;float:left">\
<select id="myList" data-from="Lands" data-from2="name" name="gameData3" size="25"   style="width:100%;height:90%;border: 1px solid black;" onchange="SelectList(6)"></select>\
查找：<input id="find"style="background-color:gray;"></input><button type="button" onclick="FindInList(3)" >查找</button>\
<br><p style="color:#000000;text-align:left;float:left;padding:0px;margin:0px;">总面积：</p><p id="ar" style="color:#000000;text-align:left;float:left;padding:0px;margin:0px;" name="gameData2"></p>\
</div>\
<canvas id="pCanvas" style="width:79%;height:100%;border: 1px solid black;float:left" ></canvas>'


this.sPage4='<div style="width:20%;height:100%;border: 1px solid black;float:left">\
<select id="myList" name="list" size="25" data-type="Nations"   style="width:100%;height:80%;border: 1px solid black; "  onchange="SelectList(4)"></select>\
<button type="button" onclick="AddNewType(InfoType.INation)" style="width: 80px;height:30px">添&nbsp;&nbsp;加</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onclick="DeleteType(InfoType.INation)" style="height:30px;width: 80px;">删&nbsp;&nbsp;除</button><br />\
查找：<br><input type="text" id="find"style="background-color:gray;"></input><button type="button" onclick="FindInList(4)" >查找</button>\
</div>\
<div style="width:79%;height:5%;border: 1px solid black;float:left"><button type="button" onclick="SwitchInnerPage(0)" >查看信息</button><button type="button" onclick="SwitchInnerPage(1)" >查看地图</button></div>\
<canvas id="pCanvas" style="width:79%;height:95%;border: 1px solid black;float:left;display:none" ></canvas>\
<div id="BigDiv" style="width:79%;height:95%;border: 1px solid black;float:left;OVERFLOW-Y: auto; OVERFLOW-X:hidden;">'
+this.pageNation+
'<div style="position:relative;width:20%;height:58%;border: 1px solid black;top:0px;float:left;">所拥有的区域：<br><select size="25" style="width:100%;height:80%;border: 1px solid black;"></select><button type="button" onclick="unfinished()" >转到</button></div>\
 <div style="position:relative;width:20%;height:58%;border: 1px solid black;top:0px;float:left;">所拥有的军队：<br><select size="25" style="width:100%;height:80%;border: 1px solid black;"></select><button type="button" onclick="unfinished()" >转到</button></div>\
 <div style="position:relative;width:59%;height:58%;border: 1px solid black;top:0px;float:left;"><div style="width:70%;height:98%;float:left;"><p style="height: 10%; width: 100%;margin:0px;padding:0px;">描述</p><textarea data-from="desc" name="gameData2" style="height: 80%; width: 99%;resize:none"></textarea><div style="width:100%;height:10%;">图片：<select data-read="n" data-adj="1" data-from="picRes" data-to="descpic" data-type="0" name="gameData2"><option>没有图片</option><option>按类型</option></select>音效<select data-read="n" data-adj="1" data-from="soundRes" data-to="descsound" data-type="0" name="gameData2"><option>没有音效</option><option>按类型</option></select>\<button style="float:right" name="view" type="button" onclick="PreViewWindow(InfoType.IType.Nations)">预览</button></div></div><div style="width:30%;height:100%;float:left;"><p style="height: 10%; width: 99%;margin:0px;padding:0px;">自定义变量</p><textarea data-from="tempa" name="gameData2" style="height: 80%; width: 99%;resize:none"></textarea></div></div>\
</div>'

this.sPage5='<div style="width:20%;height:100%;border: 1px solid black;float:left">\
<select id="myList" name="list" size="25" data-type="Armys"   style="width:100%;height:80%;border: 1px solid black;"  onchange="SelectList(5)" ></select>\
<button type="button" onclick="AddNewType(InfoType.IArmy)" style="width: 80px;height:30px">添&nbsp;&nbsp;加</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onclick="DeleteType(InfoType.IArmy)" style="height:30px;width: 80px;">删&nbsp;&nbsp;除</button><br />\
查找：<br><input type="text" id="find"style="background-color:gray;"></input><button type="button" onclick="FindInList(4)" >查找</button>\
</div>\
<div style="width:79%;height:5%;border: 1px solid black;float:left"><button type="button" onclick="SwitchInnerPage(0)" >查看信息</button><button type="button" onclick="SwitchInnerPage(1)" >查看地图</button></div>\
<canvas id="pCanvas" style="width:79%;height:95%;border: 1px solid black;float:left;display:none" ></canvas>\
<div id="BigDiv" style="width:79%;height:95%;border: 1px solid black;float:left;OVERFLOW-Y: auto; OVERFLOW-X:hidden;">'
+ this.pageArmy +
 '<div style="position:relative;width:20%;height:58%;border: 1px solid black;top:0px;float:left;">单位列表：<br><select size="25" id="ArmyInArea" style="width:100%;height:80%;border: 1px solid black;"></select><button type="button" onclick="unfinished()" >转到</button></div>\
 <div style="position:relative;width:79%;height:58%;border: 1px solid black;top:0px;float:left;"><div style="width:70%;height:98%;float:left;"><p style="height: 10%; width: 100%;margin:0px;padding:0px;">描述</p><textarea data-from="desc" name="gameData2" style="height: 80%; width: 99%;resize:none"></textarea><div style="width:100%;height:10%;">图片：<select data-read="n" data-adj="1" data-from="picRes" data-to="descpic" data-type="0" name="gameData2"><option>没有图片</option><option>按类型</option></select>音效<select data-read="n" data-adj="1" data-from="soundRes" data-to="descsound" data-type="0" name="gameData2"><option>没有音效</option><option>按类型</option></select>\<button style="float:right" name="view" type="button" onclick="PreViewWindow(InfoType.IType.Armys)">预览</button></div></div><div style="width:30%;height:100%;float:left;"><p style="height: 10%; width: 99%;margin:0px;padding:0px;">自定义变量</p><textarea data-from="tempa" name="gameData2" style="height: 80%; width: 99%;resize:none"></textarea></div></div>\
</div>'
this.sPage7='此处未来将创建单位，在军队中可以加入单位列表。此功能搭建成功后，RPG的帖游也不成问题了。'

this.sPageC='此处将接受玩家命令，命令系统将方便系统和玩家的互动。'
this.sPageX='此处在将来的版本中可以生成存档和信息，可以根据不同的玩家，给他们隐藏相应的信息，玩家甚至可以给假情报。目前只能先使用下面的破烂版：<br><button type="button" onclick="SaveAsFile(InfoType.IFile.allData,InfoType.IFile.gs)" >生成GS存档（破烂版）</button><textarea id="AllData" style="height: 80%; width: 100%;display:none;" readonly="readonly"></textarea>'
this.sPageK='此处未来将作为记录，甚至可以作为历史记录，并可以随时撤销步骤回到之前的状态。'

this.sPageD='<div style="height: 5%; width: 100%;"><p style="text-align:center;padding:0px;margin:0px">游戏默认效果设定</p></div>\
<div style="height:40%;width:100%;border: 1px solid black;"><form action="" method="post" style="padding:0px;margin:0px;">\
 <table align="left" style="padding:0px;margin:0px;width:auto;">\
 <tr><td>普通信息默认图片：</td><td><select data-from="defaultWindowPic0" res-from="picRes" type="text" name="gameEff"/><option value= "0">没有</option></td><td>正向信息默认图片：</td><td><select type="text" data-from="defaultWindowPic1" res-from="picRes" name="gameEff"/><option value= "0">没有</option></td><td>负向信息默认图片：</td><td><select type="text" data-from="defaultWindowPic2" res-from="picRes" name="gameEff"/><option value= "0">没有</option></td></tr>\
 <tr><td>普通信息默认音效：</td><td><select data-from="defaultWindowSound0" res-from="soundRes" type="text" name="gameEff"/><option value= "0">没有</option></td><td>正向信息默认音效：</td><td><select type="text" data-from="defaultWindowSound1" res-from="soundRes" name="gameEff"/><option value= "0">没有</option></td><td>负向信息默认音效：</td><td><select type="text" data-from="defaultWindowSound2" res-from="soundRes" name="gameEff"/><option value= "0">没有</option></td></tr>\
 <tr><td>区域选择默认音效：</td><td><select data-from="AreasClickSound" res-from="soundRes" type="text" name="gameEff"/><option value= "0">没有</option></td><td>军队选择默认音效：</td><td><select type="text" data-from="ArmysClickSound" res-from="soundRes" name="gameEff"/><option value= "0">没有</option></td><td>国家选择默认音效：</td><td><select type="text" data-from="NationsClickSound" res-from="soundRes" name="gameEff"/><option value= "0">没有</option></td></tr>\
 <tr><td>按钮点击默认音效：</td><td><select data-from="btnClickSound" res-from="soundRes" type="text" name="gameEff"/><option value= "0">没有</option></td><td>进军默认音效：</td><td><select data-from="ArmysMoveSound" res-from="soundRes" type="text" name="gameEff"/><option value= "0">没有</option></td></tr>\
 <tr><td>军队图标显示：</td><td><select data-from="defaultArmyIcon" name="gameData"><option   value= "0">正方形</option><option   value= "1"   >长方形</option></select></td></tr>\
 </table>\
 </form>\
 </div>\
<div style="height:54%;width:100%;border: 2px solid blue;">\
<div style="height:100%;width:33.1%;border: 1px solid black;float:left;"><div style="height: 10%; width: 100%;"><p style="text-align:center;padding:0px;margin:0px">背景音乐</p></div>\
<div style="width:100%;height:90%;border: 1px solid black;"><select id="BGMlist1" res-from="musicRes" name="gameEff2" size="25" data-e="1" data-from="musicList1" style="width:100%;height:85%;border: 1px solid black;"></select><button  onclick="setBGMList(event)" data-id="1" style="float:center">修&nbsp;&nbsp;改</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onclick="BGMtest(event)" data-id="BGMlist1" style="float:center">播放此列表</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onclick="BGMteststop(event)" data-id="1" style="float:center">暂停背景音乐</button></div></div>\
<div style="height:100%;width:33.1%;border: 1px solid black;float:left;"><div style="height: 10%; width: 100%;"><p style="text-align:center;padding:0px;margin:0px">背景音效1</p></div>\
<div style="width:100%;height:90%;border: 1px solid black;"><select id="BGMlist2" res-from="musicRes" name="gameEff2" size="25" data-e="2" data-from="musicList2" style="width:100%;height:85%;border: 1px solid black;"></select><button  onclick="setBGMList(event)" data-id="2" style="float:center">修&nbsp;&nbsp;改</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onclick="BGMtest(event)" data-id="BGMlist2" style="float:center">播放此列表</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onclick="BGMteststop(event)" data-id="2" style="float:center">暂停背景音乐</button></div></div>\
<div style="height:100%;width:33.1%;border: 1px solid black;float:left;"><div style="height: 10%; width: 100%;"><p style="text-align:center;padding:0px;margin:0px">背景音效2</p></div>\
<div style="width:100%;height:90%;border: 1px solid black;"><select id="BGMlist3" res-from="musicRes" name="gameEff2" size="25" data-e="3" data-from="musicList3" style="width:100%;height:85%;border: 1px solid black;"></select><button  onclick="setBGMList(event)" data-id="3" style="float:center">修&nbsp;&nbsp;改</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onclick="BGMtest(event)" data-id="BGMlist3" style="float:center">播放此列表</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onclick="BGMteststop(event)" data-id="3" style="float:center">暂停背景音乐</button></div></div>\
</div>'

this.sPageS='<div style="height: 20%; width: 100%;"><p style="font-size:25px;color:#009900;text-align:center;padding:0px;margin:0px">千万记得在离开前保存</p></div>\
<div style="height: 75%; width: 80%;float:left; ">\
<textarea id="AllData" style="height: 80%; width: 100%;resize:none" readonly="readonly"></textarea>\
<button type="button" onclick="CopyB()" style="height: 20%;text-align:center;">复制到剪切板</button>\
<button type="button" onclick="SaveAsFile(InfoType.IFile.allData,InfoType.IFile.gm)" style="position:relative;left:30%;height: 20%;text-align:center;color:#0000FF;">保存成GM文件</button>\
</div>';

this.sPageH="<div style='height: 10%; width: 100%;'><p style='font-size:25px;color:#990000;text-align:center;padding:0px;margin:0px'>帮助文档</p></div>\
<div id='helpTextDiv' style='height: 80%; width: 100%;border: 1px solid black;OVERFLOW-Y: auto; OVERFLOW-X:hidden;'></div>\
<div style='height: 9%; width: 100%;'><div id='btndiv' style='height: auto; width: auto;text-align:center;'></div></div>"

this.sPageR='<div style="width:49%;height:50%;border: 2px solid red;float:left;"><p style="width:100%;height:10%;text-align:center;padding:0px;margin:0px;color:red">图片</p><div style="width:45%;height:90%;border: 1px solid black;float:left">\
<select id="picResS" data-sele="-1" name="gameData3" size="25" data-ispic="1" data-from="picRes" data-from2="name"  style="width:100%;height:85%;border: 1px solid black;"  onchange="ShowRes(this)" ></select><button data-to="picRes"  data-ispic="1" type="button" onclick="addRes(this)" style="float:center">添&nbsp;&nbsp;加</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button data-to="picRes"  data-ispic="1" type="button" onclick="delRes(this)" style="float:center">删&nbsp;&nbsp;除</button>\
</div><div style="width:40%;height:40%;border: 1px solid black;float:left;margin:3% 0px 0px 5%"><canvas id="picRes" style="width:100%;height:100%;"/></div>\
<form action="" method="post" style="width:50%;height:auto;text-align:center;padding:0px;margin:0px;float:left;">\
 <table align="left" style="padding:0px;margin:0px;width:auto;">\
<tr><td>图片尺寸：</td><td><p style="padding:0px;margin:0px;" id="picResScale"></p></td></tr>\
<tr><td>图片大小：</td><td><p style="padding:0px;margin:0px;" id="picResSize"></p></td></tr>\
<tr><td>资源名称：</td><td><input type="text" size="20" id="picResName"></input></td></tr>\
<tr><td>类别标签：</td><td><input style="background-color:#CCCCCC" type="text" size="20" readonly="readonly" id="picResType"></input></td><td><button data-text="" name="setRes" data-to="picRes" type="button" onclick="SetRType(this)">设定</button></td></tr>\
</table>\
 </form>\
 </div>\
<div style="width:49%;height:50%;border: 2px solid blue;float:left;"><p style="width:100%;height:10%;text-align:center;padding:0px;margin:0px;color:blue">小图标</p>\
<div style="width:45%;height:90%;border: 1px solid black;float:left">\
<select id="iconResS" data-sele="-1" name="gameData3" size="25" data-ispic="1" data-from="iconRes" data-from2="name"  style="width:100%;height:85%;border: 1px solid black;"  onchange="ShowRes(this)" ></select><button data-to="iconRes"  data-ispic="1" type="button" onclick="addRes(this)" style="float:center">添&nbsp;&nbsp;加</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button data-to="iconRes"  data-ispic="1" type="button" onclick="delRes(this)" style="float:center">删&nbsp;&nbsp;除</button>\
</div><div name="armyDiv" style="width:60px;height:60px;border: 1px solid black;float:left;margin:20px 20px"><canvas id="iconRes" style="width:100%;height:100%;"/></div>\
<form action="" method="post" style="width:50%;height:auto;text-align:center;padding:0px;margin:0px;float:left;">\
 <table align="left" style="padding:0px;margin:0px;width:auto;">\
<tr><td>图片尺寸：</td><td><p style="padding:0px;margin:0px;" id="iconResScale"></p></td></tr>\
<tr><td>图片大小：</td><td><p style="padding:0px;margin:0px;" id="iconResSize"></p></td></tr>\
<tr><td>资源名称：</td><td><input type="text" size="20" id="iconResName"></input></td></tr>\
<tr><td>类别标签：</td><td><input style="background-color:#CCCCCC" type="text" size="20" readonly="readonly" id="iconResType"></input></td><td><button data-text="" name="setRes" data-to="iconRes" type="button" onclick="SetRType(this)">设定</button></td></tr>\
</table>\
 </form>\
 </div>\
<div style="width:49%;height:50%;border: 2px solid orange;float:left;"><p style="width:100%;height:10%;text-align:center;padding:0px;margin:0px;color:orange">音效</p><div style="width:45%;height:90%;border: 1px solid black;float:left">\
<select id="soundResS" data-sele="-1" name="gameData3" size="25" data-ispic="0" data-from="soundRes" data-from2="name"  style="width:100%;height:85%;border: 1px solid black;"  onchange="ShowRes(this)" ></select><button data-to="soundRes" data-ispic="0" type="button" onclick="addRes(this)" style="float:center">添&nbsp;&nbsp;加</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button data-to="soundRes"  data-ispic="0" type="button" onclick="delRes(this)" style="float:center">删&nbsp;&nbsp;除</button>\
</div><form action="" method="post" style="width:50%;height:auto;text-align:center;padding:0px;margin:0px;float:left;">\
 <table align="left" style="padding:0px;margin:0px;width:auto;">\
<tr><td>音效长度：</td><td><p style="padding:0px;margin:0px;" id="soundResScale"></p></td><td><button name="a" id="soundRes" type="button" onclick="soundtester(event)">试听</button></td></tr>\
<tr><td>音效大小：</td><td><p style="padding:0px;margin:0px;" id="soundResSize"></p></td></tr>\
<tr><td>资源名称：</td><td><input type="text" size="20" id="soundResName"></input></td></tr>\
<tr><td>类别标签：</td><td><input style="background-color:#CCCCCC" type="text" size="20" readonly="readonly" id="soundResType"></input></td><td><button data-text="" name="setRes" data-to="soundRes" type="button" onclick="SetRType(this)">设定</button></td></tr>\
</table>\
 </form>\
 </div>\
<div style="width:49%;height:50%;border: 2px solid green;float:left;"><p style="width:100%;height:10%;text-align:center;padding:0px;margin:0px;color:green">音乐</p><div style="width:45%;height:90%;border: 1px solid black;float:left">\
<select id="musicResS" data-sele="-1" name="gameData3" size="25" data-ispic="0" data-from="musicRes" data-from2="name"  style="width:100%;height:85%;border: 1px solid black;"  onchange="ShowRes(this)" ></select><button data-to="musicRes" data-ispic="0" type="button" onclick="addRes(this)" style="float:center">添&nbsp;&nbsp;加</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button data-to="musicRes"  data-ispic="1" type="button" onclick="delRes(this)" style="float:center">删&nbsp;&nbsp;除</button>\
</div><form action="" method="post" style="width:50%;height:auto;text-align:center;padding:0px;margin:0px;float:left;">\
 <table align="left" style="padding:0px;margin:0px;width:auto;">\
<tr><td>音乐长度：</td><td><p style="padding:0px;margin:0px;" id="musicResScale"></p></td><td><button name="a" id="musicRes" type="button" onclick="soundtester(event)">试听</button></td></tr>\
<tr><td>音乐大小：</td><td><p style="padding:0px;margin:0px;" id="musicResSize"></p></td></tr>\
<tr><td>资源名称：</td><td><input type="text" size="20" id="musicResName"></input></td></tr>\
<tr><td>类别标签：</td><td><input style="background-color:#CCCCCC" type="text" size="20" readonly="readonly" id="musicResType"></input></td><td><button data-text="" name="setRes" data-to="musicRes" type="button" onclick="SetRType(this)">设定</button></td></tr>\
</table>\
 </form>\
 </div>\
 <audio id="testsound" autoplay="autoplay"></audio>\
 <input type="file" onchange="addResf(event)" name="filename" id="addsound" accept=".mp3,.wav" style="display:none"/>\
 <input type="file" onchange="addResf(event)" name="filename" id="addpic" accept=".jpg,.png" style="display:none"/>\
'

this.sPageM='<div style="width:20%;height:100%;border: 1px solid red;float:left;">\
<p style="margin:2px;padding:0px"><input data-from="Show0" type="checkbox" name="gameDataT"  />表层图片</p>\
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
	if(showingImage.imgdata)document.getElementById("top_3").innerText="图片尺寸（像素）："+showingImage.imgdata.width+"×"+showingImage.imgdata.height;
	if(fileDatas.mapPath[0]!=null)
	{
		page2ps[0].innerText="已读取";
		page2ps[0].style="color:#009900;text-align:left;float:left;padding:0px;margin:0px;";
		
	}
	if(fileDatas.mapPath[2]!=null)
	{
		page2ps[2].innerText="已读取完毕，共有" + fileDatas.Lands.length + "种地形";
		page2ps[2].style="color:#009900;text-align:left;float:left;padding:0px;margin:0px;";
		
	}
	if(fileDatas.mapPath[1]!=null)
	{	
		page2ps[1].innerText="已读取完毕，共有" + fileDatas.Areas.length + "个区域";
		page2ps[1].style="color:#009900;text-align:left;float:left;padding:0px;margin:0px;";
	}else{

		page2ps[2].innerText="需要先读取区域图片"
		page2ps[3].innerText="需要先读取区域图片"
		document.getElementById("btn2").disabled=true;
		document.getElementById("btn3").disabled=true;
		
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



function AddNewType(type){
	var name=prompt("输入"+type.Name+"的名称","")
	if(IsError(name))return;
	if (name!=null && name!="")
	{
		var temp=null;
	switch(type.Id)
	{
		case 3:
		temp=new Area(name);
		if(arguments[2])temp.pos=arguments[2];
		if(arguments[1])temp.color=arguments[1];
		fileDatas.Areas.push(temp);
		break;
		case 4:
		temp=new Nation(name);
		fileDatas.Nations.push(temp);
		break;
		case 5:
		temp=new Army(name);
		if(arguments[2])temp.pos=arguments[2];
		if(arguments[1])temp.belong=arguments[1];
		fileDatas.Armys.push(temp);
	}
	closeWindow(null);
	turnPage(type.Id,document.getElementById("myList").selectedIndex);
	}

}

function AddTypes(type){
	var pName=type+"s";
	var name=prompt("输入新"+InfoType["I"+type].Name+"类型的名称","")
	if (name!=null && name!="")
	{
	if(IsError(name) || name=="默认" || name.replace(/(^\s*)|(\s*$)/g, "")=="")return;
	for(var i=0;i<fileDatas.Types.length;i++)
	{
		if(name==fileDatas.Types[i].data){
			alert(name+'已经存在！');
			return;
		}
	}
	fileDatas.Types.push(new Resources(name,pName));
	turnPage(InfoType["I"+type].Id,document.getElementById("myList").selectedIndex);
	}
}

function DeleteType(type){
	var list = document.getElementById("myList");
	if(list.selectedIndex!=-1)
	{
	if(confirm("确定要删除【" + list.options[list.selectedIndex].text + "】吗？"))
	{
		var temp=null;
		fileDatas[type.TName].splice(list.selectedIndex,1);
		
	turnPage(type.Id);
	}
	}

}

function ShowData(){
	var dataElements=document.getElementsByName("gameData");
	var i=0;
	var j=0;
	for(i=0;i<dataElements.length;i++)
	{
		if(dataElements[i].nodeName=="INPUT")dataElements[i].value=fileDatas[dataElements[i].getAttribute('data-from')];
		if(dataElements[i].nodeName=="SELECT")dataElements[i].options[fileDatas[dataElements[i].getAttribute('data-from')]].selected=true;
		dataElements[i].onchange=function(event){
			if(IsError(event.target.value))event.target.value=fileDatas[event.target.getAttribute('data-from')];
			else fileDatas[event.target.getAttribute('data-from')]=event.target.value;
		}
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
	var dataElements5=document.getElementsByName("armyDiv");
	for(i=0;i<dataElements5.length;i++)
	{
		if(fileDatas.defaultArmyIcon==1){dataElements5[i].style.height="45px";}
	}
	dataElements=document.getElementsByName("gameEff");
	for(i=0;i<dataElements.length;i++)
	{
		for(j=0;j<fileDatas[dataElements[i].getAttribute('res-from')].length;j++)
		{
			var op=new Option("",j+1);
			op.innerHTML=fileDatas[dataElements[i].getAttribute('res-from')][j].name;
			dataElements[i].add(op);
		}
		dataElements[i].selectedIndex=fileDatas[dataElements[i].getAttribute('data-from')]+1;
		dataElements[i].onchange=function(event){
			fileDatas[event.target.getAttribute('data-from')]=event.target.selectedIndex-1;
		}
	}
	dataElements=document.getElementsByName("gameEff2");
	for(i=0;i<dataElements.length;i++)
	{
		var arr=fileDatas[dataElements[i].getAttribute('data-from')].split(',');
		for(j=0;j<arr.length;j++)
		{
			if(arr[j]!=''){
			var op=new Option("",j);
			op.innerHTML=fileDatas[dataElements[i].getAttribute('res-from')][arr[j]].name;
			dataElements[i].add(op);
			}
		}
		
	}
	dataElements=document.getElementsByName("soundData");
	for(i=0;i<dataElements.length;i++)
	{
		var player=document.getElementById(dataElements[i].getAttribute('data-to'));
		var tex=document.getElementById(dataElements[i].getAttribute('data-to') + "t");
		dataElements[i].value=player.volume;
		tex.innerText=player.volume;
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
	document.getElementById("thep").onchange=null;
	if(select!=-1)
	{
	
	for(var i=0;i<dataElements.length;i++)
	{
		switch(dataElements[i].nodeName)
		{
		case "TEXTAREA":
		dataElements[i].value='';
		dataElements[i].value=fileDatas[type][select][dataElements[i].getAttribute('data-from')];
		dataElements[i].onchange=function(event){
			if(event.target.value==fileDatas[type][select][event.target.getAttribute('data-from')])return;
			if(IsError(event.target.value))event.target.value=fileDatas[type][select][event.target.getAttribute('data-from')];
			else fileDatas[type][select][event.target.getAttribute('data-from')]=event.target.value;
		}
		break;
		case "INPUT":
			if(dataElements[i].type=="text"){dataElements[i].value=fileDatas[type][select][dataElements[i].getAttribute('data-from')];
			dataElements[i].onchange=function(event){
				if(IsError(event.target.value))event.target.value=fileDatas[type][select][event.target.getAttribute('data-from')];
				else fileDatas[type][select][event.target.getAttribute('data-from')]=event.target.value;
			}}
			if(dataElements[i].type=="color"){dataElements[i].value=RGBtoHex(fileDatas[type][select][dataElements[i].getAttribute('data-from')]);
			dataElements[i].onchange=function(event){
				if(IsColorError(event.target.value,type,select))event.target.value=RGBtoHex(fileDatas[type][select][event.target.getAttribute('data-from')]);
				else {fileDatas[type][select][event.target.getAttribute('data-from')]=HextoRGB(event.target.value);fileDatas[type][select].acreage=0;if(type=="Area"){fileDatas[type][select].pos=0;fileDatas[type][select].borderp=null;fileDatas[type][select].borderp=new Array();}else{showingImage.RCNationsLayer();showingImage.ReadyForDraw()}}
			}}
			if(dataElements[i].type=="checkbox"){dataElements[i].checked=fileDatas[type][select][dataElements[i].getAttribute('data-from')];
		dataElements[i].onchange=function(event){
			fileDatas[type][select][event.target.getAttribute('data-from')]=event.target.checked;
		}
				
			}
			
			break;
			
		case "SELECT":
			if(dataElements[i].getAttribute('data-read')=='n')
			{	
				var num=1;
				if(dataElements[i].getAttribute('data-from')=="Types")
				{
					dataElements[i].add(new Option("默认",0));
					for(var j=0;j<fileDatas.Types.length;j++)
					if(fileDatas.Types[j].name==type)
					{
						var op=new Option("",num);
						op.innerHTML=fileDatas.Types[j].data;
						dataElements[i].add(op);
						num++;	
					}
				}else{

					for(var j=0;j<fileDatas[dataElements[i].getAttribute('data-from')].length;j++)
					{
						var op=new Option("",num);
						op.innerHTML=fileDatas[dataElements[i].getAttribute('data-from')][j].name;
						dataElements[i].add(op);
						num++;	
					}
				}
				dataElements[i].setAttribute('data-read','y');
			}
			if(dataElements[i].getAttribute('data-type')==0)
			{
			dataElements[i].selectedIndex=fileDatas[type][select][dataElements[i].getAttribute('data-to')]+1;
			dataElements[i].onchange=function(event){
				fileDatas[type][select][event.target.getAttribute('data-to')]=event.target.selectedIndex-1;
			}
			}
			else
			{
				dataElements[i].selectedIndex=0;
				for(var j=0;j<dataElements[i].options.length;j++)
				{
					if(dataElements[i].options[j].text==fileDatas[type][select][dataElements[i].getAttribute('data-to')]){dataElements[i].selectedIndex=j;break;}
				}
				dataElements[i].onchange=function(event){
					fileDatas[type][select][event.target.getAttribute('data-to')]=event.target.options[event.target.selectedIndex].text;
				}
			}
			if(dataElements[i].getAttribute('id')=="thep"){
			var thecanvas=document.getElementById("thec");
			FindAndDrawPic(dataElements[i].selectedIndex,thecanvas,dataElements[i].getAttribute('data-from'),type,parseInt(dataElements[i].getAttribute('data-adj')),select);
			dataElements[i].onchange=function(event){
				fileDatas[type][select][event.target.getAttribute('data-to')]=event.target.selectedIndex-1;
				FindAndDrawPic(event.target.selectedIndex,thecanvas,event.target.getAttribute('data-from'),type,parseInt(event.target.getAttribute('data-adj')),select);
			}
			}
			break;
			
		case "P":
		if(dataElements[i].getAttribute('data-from')=="pos")
		{
			if(type=="Armys" && fileDatas.gameType==0)
			{if(fileDatas[type][select].pos!=-1)dataElements[i].innerText = fileDatas.Areas[fileDatas[type][select].pos].name;}
			else dataElements[i].innerText= ((Math.floor(fileDatas[type][select].pos/4))%showingImage.imgWidth +"," + Math.floor((Math.floor(fileDatas[type][select].pos/4))/showingImage.imgWidth) );
			continue;
		}
		dataElements[i].innerText=fileDatas[type][select][dataElements[i].getAttribute('data-from')];
		break;
		}
		
		}
		
		
	}else{
		for(var i=0;i<dataElements.length;i++)
		{
			switch(dataElements[i].nodeName){
			case "TEXTAREA":dataElements[i].innerText='';break;
		    case "INPUT":
			if(dataElements[i].type=="text")dataElements[i].value='';
			if(dataElements[i].type=="color")dataElements[i].value="#FFFFFF";
			if(dataElements[i].type=="checkbox")dataElements[i].checked=false;
			break;
			
			
			case "SELECT":
				if(dataElements[i].getAttribute('data-read')=='n')
				{	
					var num=1;
					if(dataElements[i].getAttribute('data-from')=="Types")
					{
						dataElements[i].add(new Option("默认",0));
						for(var j=0;j<fileDatas.Types.length;j++)
						if(fileDatas.Types[j].name==type)
						{
							var op=new Option("",num);
							op.innerHTML=fileDatas.Types[j].data;
							dataElements[i].add(op);
							num++;	
						}
					}else{
						for(var j=0;j<fileDatas[dataElements[i].getAttribute('data-from')].length;j++)
						{
							var op=new Option("",num);
							op.innerHTML=fileDatas[dataElements[i].getAttribute('data-from')][j].name;
							dataElements[i].add(op);
							num++;	
						}
					}
					if(dataElements[i].getAttribute('id')=="thep"){
					var thecanvas=document.getElementById("thec");
					dataElements[i].onchange=function(event){
						FindAndDrawPic(event.target.selectedIndex,thecanvas,event.target.getAttribute('data-from'),type,parseInt(event.target.getAttribute('data-adj')),-1);
					}
					}
					dataElements[i].setAttribute('data-read','y');
				}
			break;
			
			case "P":
				if(dataElements[i].getAttribute('data-from')=="pos")
				{
					dataElements[i].innerText= "未选择";
				}
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


function ShowRes(event)
{
	var tempe;
	if(event.getAttribute('data-from')=="picRes")
	{
		var te=document.getElementsByTagName("button");
		for(var i=0;i<te.length;i++)
		if(event.selectedIndex==0 && te[i].getAttribute('data-to')=="picRes" && i!=0)te[i].disabled=true; else te[i].disabled=false; 
	}
	if(event.getAttribute('data-ispic')==1){
		var can=document.getElementById(event.getAttribute('data-from'));
		var canctx=can.getContext('2d');
		can.width=can.offsetWidth;
		can.height=can.offsetHeight;
		var img=new Image();
		img.src=fileDatas[event.getAttribute('data-from')][event.selectedIndex].data;
		img.onload=function(){
			var w,h;
			if(img.width>can.width)w=can.width;else w=img.width;
			if(img.height>can.height)h=can.height;else h=img.height;
			canctx.drawImage(img,0,0,w,h);
			tempe=document.getElementById(event.getAttribute('data-from') + "Scale");
			tempe.innerText= img.width + "×" + img.height;
			tempe=document.getElementById(event.getAttribute('data-from') + "Size");	
			tempe.innerText=img.src.length + "字节";
		}
		}else{
			var n=null;
			var taudio=document.getElementById("testsound");
			taudio.src=fileDatas[event.getAttribute('data-from')][event.selectedIndex].data;
			taudio.oncanplay=function(){
				tempe=document.getElementById(event.getAttribute('data-from') + "Scale");
				n=taudio.duration;
				n=n.toFixed(2);
				tempe.innerText=n + "秒"
				tempe=document.getElementById(event.getAttribute('data-from') + "Size");	
				tempe.innerText=taudio.src.length + "字节";
			}
		}
		if(event.getAttribute("data-sele")==-1)event.setAttribute("data-sele",event.selectedIndex);
		tempe=document.getElementById(event.getAttribute('data-from') + "Name");
		tempe.onchange=null;
		tempe.value=fileDatas[event.getAttribute('data-from')][event.selectedIndex].name;
		tempe.onchange=function(e){
			if(IsError(e.target.value) || e.target.value.replace(/(^\s*)|(\s*$)/g, "")=="")e.target.value=fileDatas[event.getAttribute('data-from')][event.getAttribute("data-sele")].name;
			else {fileDatas[event.getAttribute('data-from')][event.getAttribute("data-sele")].name=e.target.value;event.options[event.getAttribute("data-sele")].text=e.target.value}
		}
		tempe=document.getElementById(event.getAttribute('data-from') + "Type");
		tempe.onchange=null;
		tempe.value=fileDatas[event.getAttribute('data-from')][event.selectedIndex].type;
		tempe.onchange=function(e){
			if(IsError(e.target.value))e.target.value=fileDatas[event.getAttribute('data-from')][event.getAttribute("data-sele")].type;
			else fileDatas[event.getAttribute('data-from')][event.getAttribute("data-sele")].type=e.target.value;
		}
		event.setAttribute("data-sele",event.selectedIndex);
}

function addRes(event)
{
	var open=null;
	if(event.getAttribute('data-ispic')==1) open=document.getElementById("addpic"); else open=document.getElementById("addsound");
	open.setAttribute("data-to",event.getAttribute("data-to"))
	open.click()
}

function addResf(event)
{
	var objUrl = getObjectURL(event.target.files[0]);
	
	if(objUrl){
	ReadFileBase(event.target.files[0],event.target.getAttribute("data-to"),1);
	}
}

function delRes(event)
{
	var list = document.getElementById(event.getAttribute("data-to") + "S");
	if(list.selectedIndex!=-1)
	{
	if(confirm("确定要删除【" + list.options[list.selectedIndex].text + "】吗？"))
	{
		var temp=null;
		fileDatas[event.getAttribute("data-to")].splice(list.selectedIndex,1);
		
	turnPage(cPage);
	}
	}
}

function SetRType(event){
	var sele=document.getElementById(event.getAttribute('data-to') + "S");
	if(sele.selectedIndex!=-1)
	{
	var textbox=document.getElementById(event.getAttribute('data-to') + "Type");
	var picsrc=null;
	if(event.getAttribute('data-to')=="iconRes" || event.getAttribute('data-to')=="picRes"){picsrc=fileDatas[event.getAttribute('data-to')][sele.selectedIndex].data;}
	ShowWindow("设定资源【" + sele.options[sele.selectedIndex].text + "】的类别",-1,event.getAttribute('data-to') + "|" + sele.selectedIndex + "|" + textbox.value,0,picsrc);
	}
}
function soundtester(event)
{
	if(document.getElementById(event.target.getAttribute('id') + 'S').selectedIndex!=-1){
	var tester=document.getElementById('testsound');
	tester.src=fileDatas[event.target.getAttribute('id')][document.getElementById(event.target.getAttribute('id') + 'S').selectedIndex].data;}
}

function BGMtest(event)
{
	var selist=document.getElementById(event.target.getAttribute('data-id'));
	if(selist.options.length!=0){
		var num=selist.getAttribute('data-e');
		playBGM(num);
	}
}

function BGMteststop(event)
{
	var seid=event.target.getAttribute('data-id');
	var player=document.getElementById("BGM"+seid);
	player.pause();
}

function setBGMList(event)
{
	var seid=event.target.getAttribute('data-id');
	var player=document.getElementById("BGM"+seid);
	player.pause();
	ShowWindow(seid,-2,fileDatas["musicList"+seid],0,null,null);
	
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

function SetPos(type){
	var select=0;
	var picsrc=haveReadPic();
	if(cPage!='M'){select=document.getElementById('myList').selectedIndex;}else{if(selectArea!=-1)select=selectArea; else select=selectArmy;}
	if(select==-1){alert('未选择国家或军队。');return;}
	
	if(picsrc){
		ShowWindow("设定" + InfoType["I" + type].Name +"【"+ fileDatas[type+"s"][select].name +"】的位置",-3,type + "|" + select,0,picsrc)
	}else{
		alert('至少要先读取过一张图片。');
	}
}

function PreViewWindow(type){
	var select=-1;
	if(cPage=='M'){if(selectArea!=-1)select=selectArea; else if(selectArmy!=-1)select=selectArmy; else select=selectNation;}else select=document.getElementById('myList').selectedIndex;
	if(select!=-1){
	type+='s';
	ShowWindow(fileDatas[type][select].name,1,fileDatas[type][select].desc,0,FindAndReturnRes(fileDatas[type][select].descpic,"picRes",type,0,select),FindAndReturnRes(fileDatas[type][select].descsound,"soundRes",type,0,select));
	}
}