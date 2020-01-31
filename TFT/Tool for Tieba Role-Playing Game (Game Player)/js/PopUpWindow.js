function ShowWindow(title,num,str,mesType){//mesType：0普通，1正面，2反面
var result=null;
if(title!='')document.getElementById('tipTitleBox').innerText=title;
var readpicnum=0;
if(fileDatas["defaultWindowPic" + mesType.toString()]!=-1)readpicnum=fileDatas["defaultWindowPic" + mesType.toString()];
	tipPic.src = arguments[4] ? arguments[4] : fileDatas.picRes[readpicnum].data;
	arguments[5] ? soundPlayer.src=arguments[5] : checkAndPlaySound("defaultWindowSound" + mesType.toString());

tipPic.onload=function(){
	document.getElementById('tipMesBox').innerHTML=str;
		bgDiv.style.display="block";
		tipDiv.style.display="block";

			switch(num)
			{
				case -2:

				break;
				case -1:

				break;
				case 0:
				
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

	}

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