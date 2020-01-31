function ShowWindow(title,num,str,mesType){//mesType：0普通，1正面，2反面
var result=null;
var can=document.getElementById('tipCanvas');
var canctx=can.getContext('2d');
document.getElementById('tipMesBox').innerHTML=str;
bgDiv.style.display="block";
tipDiv.style.display="block";
can.width=can.offsetWidth;
can.height=can.offsetHeight;
tipPic=new Image();
if(title!='')document.getElementById('tipTitleBox').innerText=title;
var readpicnum=0;
if(fileDatas["defaultWindowPic" + mesType.toString()]!=-1)readpicnum=fileDatas["defaultWindowPic" + mesType.toString()];
	tipPic.src = arguments[4] ? arguments[4] : fileDatas.picRes[readpicnum].data;
	arguments[5] ? soundPlayer.src=arguments[5] : checkAndPlaySound("defaultWindowSound" + mesType.toString());

tipPic.onload=function(){
	var w=0,h=0,x=0;
	if(tipPic.width>can.width)w=can.width;else w=tipPic.width;
	if(tipPic.height>can.height)h=can.height;else h=tipPic.height;
	if(w==tipPic.width && h==tipPic.height){x=(can.width/2) - (w/2);} else {x=0;}
	canctx.drawImage(tipPic,x,0,w,h);
	if(num==-3){
		var t=0;
		if(arr[0]=="Armys" && fileDatas.gameType==0){t=1;}
		pInt=self.setInterval("ReDrawPCanvas(tipPic," + t + ","+w+","+h+","+x+")",150);
	}
	}


			switch(num)
			{
				case -3:
				var arr=str.split("|");
				arr[0]+='s';
				tempText=arr[0];
				if(fileDatas.gameType==0 && arr[0]=="Armys"){
					document.getElementById('tipMesBox').innerHTML='<p style="position:relative;height:3%;width:20%;left:40%;top:0%;margin:0px;padding:0px;">已经设定中心点的区域：</p><select id="poslist" size="25" style="margin:0px;padding:0px;position:relative;height:80%;width:30%;left:40%;top:10%;border: 1px solid black;" ></select>'
					for(var i=0;i<fileDatas.Areas.length;i++)
					{
						if(fileDatas.Areas[i].pos!=-1)
						{var op=new Option("",i);
						op.innerText=fileDatas.Areas[i].name;
						document.getElementById("poslist").add(op);}
					}
					if(document.getElementById("poslist").options.length==0){alert('区域模式下，至少要先有一个已经有中心点的区域。');closeWindow(false);return;}else document.getElementById("poslist").selectedIndex=0;
					tipBtnBox.innerHTML="<button style='position:relative;height:90%;width:25%;left:12.5%;top:5%;font-size:100%;color:#0000FF' onclick='closePWindow(true,1,tempText," + arr[1] +")'>确定</button>\
					<button style='position:relative;height:90%;width:25%;left:37.5%;top:5%;font-size:100%;color:#FF0000' onclick='closeWindow(false)'>取消</button>"
				}else{
					document.getElementById('tipMesBox').innerHTML='x坐标：<input id="posR1" style="width:600px;" type="range" max="10" min="1" step="1" onchange="changeP(1)"/><p id="tp1" ></p>\
 y坐标：<input id="posR2" style="width:600px;" type="range" max="10" min="1" step="1" onchange="changeP(2)"/><p id="tp2" ></p>'
 document.getElementById('posR1').max=showingImage.imgWidth;
 document.getElementById('posR2').max=showingImage.imgHeight;
 document.getElementById('posR1').value=((Math.floor(fileDatas[arr[0]][arr[1]].pos/4))%showingImage.imgWidth);
 document.getElementById('posR2').value=(Math.floor((Math.floor(fileDatas[arr[0]][arr[1]].pos/4))/showingImage.imgWidth));
 if(fileDatas[arr[0]][arr[1]].pos==-1){document.getElementById('tp1').document.innerText=-1;document.getElementById('tp2').document.innerText=-1;}else{document.getElementById('tp1').innerText=((Math.floor(fileDatas[arr[0]][arr[1]].pos/4))%showingImage.imgWidth);document.getElementById('tp2').innerText=(Math.floor((Math.floor(fileDatas[arr[0]][arr[1]].pos/4))/showingImage.imgWidth))}
 tipBtnBox.innerHTML="<button style='position:relative;height:90%;width:25%;left:12.5%;top:5%;font-size:100%;color:#0000FF' onclick='closePWindow(true,2,tempText," + arr[1] +")'>确定</button>\
 <button style='position:relative;height:90%;width:25%;left:37.5%;top:5%;font-size:100%;color:#FF0000' onclick='closeWindow(false)'>取消</button>"
				}
				
				break;
				case -2:
				document.getElementById('tipTitleBox').innerText="设定第" + title + "个背景音频列表。";
				var arr=str.split(",");
				document.getElementById('tipMesBox').innerHTML='<p style="position:relative;height:3%;width:20%;left:10%;top:0%;margin:0px;padding:0px;">音乐音频：</p><select id="se1" size="25" style="margin:0px;padding:0px;position:relative;height:80%;width:30%;left:10%;top:10%;border: 1px solid black;" ></select>\
				<p style="position:absolute;height:3%;width:20%;left:55%;top:0%;margin:0px;padding:0px;">已选择音频：</p><select id="se2" size="25" style="margin:0px;padding:0px;position:relative;height:80%;width:30%;left:25%;top:10%;border: 1px solid black;" ></select>\
				<button id="toleft" style="position:absolute;height:30px;width:30px;left:45%;top:20%;margin:0px;padding:0px;">></button><button id="toright" style="position:absolute;height:30px;width:30px;left:45%;top:60%;margin:0px;padding:0px;"><</button>'
				for(var i=0;i<fileDatas.musicRes.length;i++)
				{
					var op=new Option("",i);
					op.innerText=fileDatas.musicRes[i].name;
					document.getElementById("se1").add(op);
				}
				for(var j=0;j<arr.length;j++){
					if(arr[j])
					{var op=new Option("",arr[j]);
					op.innerText=fileDatas.musicRes[arr[j]].name;
					document.getElementById("se2").add(op);
					}
				}
			document.getElementById("toleft").onclick=function(){if(document.getElementById("se1").selectedIndex!=-1){var op=new Option('',document.getElementById("se1").options[document.getElementById("se1").selectedIndex].value);op.innerText=document.getElementById("se1").options[document.getElementById("se1").selectedIndex].text;document.getElementById("se2").add(op);}}
				document.getElementById("toright").onclick=function(){if(document.getElementById("se2").selectedIndex!=-1){var justs=document.getElementById("se2").selectedIndex; document.getElementById("se2").remove(document.getElementById("se2").selectedIndex);if(justs<document.getElementById("se2").options.length)document.getElementById("se2").selectedIndex=justs;}}
				tempText='';
				tipBtnBox.innerHTML="<button style='position:relative;height:90%;width:25%;left:12.5%;top:5%;font-size:100%;color:#0000FF' onclick='closeMWindow(true," +title+")'>确定</button>\
				<button style='position:relative;height:90%;width:25%;left:37.5%;top:5%;font-size:100%;color:#FF0000' onclick='closeWindow(false)'>取消</button>"
				break;
				case -1:
				var arr=str.split("|");
				var arr2=arr[2].split(",");
				document.getElementById('tipMesBox').innerHTML='<p style="position:relative;height:3%;width:20%;left:10%;top:0%;margin:0px;padding:0px;">所有类别：</p><select id="se1" size="25" style="margin:0px;padding:0px;position:relative;height:80%;width:30%;left:10%;top:10%;border: 1px solid black;" ></select>\
				<p style="position:absolute;height:3%;width:20%;left:55%;top:0%;margin:0px;padding:0px;">已选择类别：</p><select id="se2" size="25" style="margin:0px;padding:0px;position:relative;height:80%;width:30%;left:25%;top:10%;border: 1px solid black;" ></select>\
				<button id="toleft" style="position:absolute;height:30px;width:30px;left:45%;top:20%;margin:0px;padding:0px;">></button><button id="toright" style="position:absolute;height:30px;width:30px;left:45%;top:60%;margin:0px;padding:0px;"><</button>'
				for(var i=0;i<fileDatas.Types.length;i++)
				{
					var op=new Option("",i);
					op.innerText=fileDatas.Types[i].data;
					var notOneOf=true;
					for(var j=0;j<arr2.length;j++){	
						if(op.innerText==arr2[j])notOneOf=false;
					}
					if(notOneOf)document.getElementById("se1").add(op); else document.getElementById("se2").add(op);
				}
				
				document.getElementById("toleft").onclick=function(){if(document.getElementById("se1").selectedIndex!=-1){var op=new Option("",document.getElementById("se2").options.length);op.innerText=document.getElementById("se1").options[document.getElementById("se1").selectedIndex].text;document.getElementById("se2").add(op);document.getElementById("se1").remove(document.getElementById("se1").selectedIndex);}}
				document.getElementById("toright").onclick=function(){if(document.getElementById("se2").selectedIndex!=-1){var op=new Option("",document.getElementById("se1").options.length);op.innerText=document.getElementById("se2").options[document.getElementById("se2").selectedIndex].text;document.getElementById("se1").add(op);document.getElementById("se2").remove(document.getElementById("se2").selectedIndex);}}
				tempText=arr[0] + "|";
				tipBtnBox.innerHTML="<button style='position:relative;height:90%;width:25%;left:12.5%;top:5%;font-size:100%;color:#0000FF' onclick='closeRWindow(true," +arr[1]+")'>确定</button>\
				<button style='position:relative;height:90%;width:25%;left:37.5%;top:5%;font-size:100%;color:#FF0000' onclick='closeWindow(false)'>取消</button>"
				break;
				case 0:
				var arr=str.split("|");
				var arr2=arr[3].split(",");
				tempText=arr[3];
				if(fileDatas.gameType==1)apos=arr[6]; else apos=arr[7];
				document.getElementById('tipMesBox').innerHTML="<p>你想要在" + "<span style='font-weight:bold;color:rgb(" + arr[3] +");'>■</span>" + arr[0]+","+arr[1] +  "("+ arr[2] +")" + "这一点上……</p>\
				<button id='tempbtn1' style='height:30%;width:20%;left:20%;top:20%;font-size:100%' onclick='AddNewType(InfoType.IArea,tempText," + arr[6] + ")'>新建一个区域</button>\
				<button style='height:30%;width:20%;left:60%;top:20%;font-size:100%' onclick='AddNewType(InfoType.IArmy,"+arr[5]+","+apos+")'>新建一个军队</button>\
				<button style='height:30%;width:20%;left:60%;top:20%;font-size:100%' onclick='unfinished()'>添加一个标记</button>\
				";
				if(arr[4]=='0')document.getElementById('tempbtn1').disabled=true;
				tipBtnBox.innerHTML="<button style='position:relative;height:90%;width:25%;left:37.5%;top:5%;font-size:100%' onclick='closeWindow(null)'>取消</button>"
				break;
				case 1:
				tipBtnBox.innerHTML="<button style='position:relative;height:90%;width:25%;left:37.5%;top:5%;font-size:100%' onclick='closeWindow(null)'>OK</button>"
		break;
				case 2:
				tipBtnBox.innerHTML="<button style='position:relative;height:90%;width:25%;left:12.5%;top:5%;font-size:100%;color:#0000FF' onclick='closeWindow(true)'>是</button>\
				<button style='position:relative;height:90%;width:25%;left:37.5%;top:5%;font-size:100%;color:#FF0000' onclick='closeWindow(false)'>否</button>"
		break;
				case 3:
		tipBtnBox.innerHTML="<button style='position:relative;height:90%;width:25%;left:12.5%;top:5%;font-size:100%;' onclick='closeWindow(null)'>OK</button>\
		<button name=" + arguments[6] + "style='position:relative;height:90%;width:25%;left:37.5%;top:5%;font-size:100%;color:#00FF00'>帮助</button>"
		break;
				case 4:
		tipBtnBox.innerHTML="<button style='position:relative;height:90%;width:15%;left:12.5%;top:5%;font-size:100%;color:#0000FF' onclick='closeWindow(true)'>是</button>\
		<button style='position:relative;height:90%;width:15%;left:20%;top:5%;font-size:100%;color:#FF0000' onclick='closeWindow(false)'>否</button>\
		<button name=" + arguments[6] + "style='position:relative;height:90%;width:15%;left:37.5%;top:5%;font-size:100%;color:#00FF00'>帮助</button>"
		break;
				default:
			}
	BtnClick();
	return result;
}

function ShowHelp(event){
	var idname=event.target.getAttribute('data-text');
	ShowWindow(helpText[idname+"title"],1,helpText[idname],0);
}



function closeWindow(num){
	bgDiv.style.display="none";
	tipDiv.style.display="none";
	hValue=num;
	if(pInt){clearInterval(pInt);pInt=null;}
}

var pInt=null;
function ReDrawPCanvas(timg,num,w,h,x){
	var can=document.getElementById('tipCanvas');
	var canctx=can.getContext('2d');
	canctx.clearRect(0,0,w,h);
	canctx.drawImage(timg,x,0,w,h);
	canctx.lineWidth=3;
	canctx.strokeStyle="red";
	if(num==1){
		var p=fileDatas.Areas[document.getElementById("poslist").options[document.getElementById("poslist").selectedIndex].value].pos;
		var px=Math.floor((Math.floor(p/4))%showingImage.imgWidth);
		var py=Math.floor((Math.floor(p/4))/showingImage.imgWidth);	
	}else{
			var px=parseInt(document.getElementById('tp1').innerText);
			var py=parseInt(document.getElementById('tp2').innerText);
	}
	px*=can.width/showingImage.imgWidth;
	py*=can.height/showingImage.imgHeight;
	px=Math.round(px);
	py=Math.round(py);
	canctx.beginPath();
	canctx.moveTo(px-25,py);
	canctx.lineTo(px+25,py);
	canctx.moveTo(px,py-25);
	canctx.lineTo(px,py+25);
	canctx.stroke();
}

function closePWindow(num,val,type,select){
	if(val==1)val=document.getElementById("poslist").options[document.getElementById("poslist").selectedIndex].value; else val=((parseInt(document.getElementById('tp2').innerText)*showingImage.imgWidth)*4 + parseInt(document.getElementById('tp1').innerText) * 4);
	fileDatas[type][select].pos=val;
	bgDiv.style.display="none";
	tipDiv.style.display="none";
	hValue=num;
	if(pInt){clearInterval(pInt);pInt=null;}
	ShowSelected(select,type);
}

function closeRWindow(num,index){
	for(var i=0;i<document.getElementById("se2").options.length;i++)
	{
		if(i==0)tempText+=document.getElementById("se2").options[i].text + ",";
		else if(i!=document.getElementById("se2").options.length-1)tempText+=document.getElementById("se2").options[i].text + ","; else tempText+=document.getElementById("se2").options[i].text;
	}
	var arr=tempText.split("|");
	fileDatas[arr[0]][index].type=arr[1];
	var tempe=document.getElementById(arr[0] + "Type");
	tempe.value=fileDatas[arr[0]][index].type;
	bgDiv.style.display="none";
	tipDiv.style.display="none";
	hValue=num;
}

function closeMWindow(num,index){
	for(var i=0;i<document.getElementById("se2").options.length;i++)
	{
		if(i==0)tempText+=document.getElementById("se2").options[i].value + ",";
		else if(i!=document.getElementById("se2").options.length-1)tempText+=document.getElementById("se2").options[i].value + ","; else tempText+=document.getElementById("se2").options[i].value;
	}
	fileDatas["musicList" + index]=tempText;
	bgDiv.style.display="none";
	tipDiv.style.display="none";
	hValue=num;
	turnPage(cPage);
}

function changeP(num){
	var tp=document.getElementById('tp' + num);
	var rangep=document.getElementById('posR' + num);
	tp.innerText=rangep.value;
}