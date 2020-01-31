function IsError(str)//变量名@数据|数据...$（下一个变量...）数组中数据：数据名~数据¦
{
	if(str!=null){
	var e=false;
	var al=true;
	arguments[1] ? al=false : al=true;
	if(str.indexOf('|')!=-1)e=true;
	if(str.indexOf('@')!=-1)e=true;
	if(str.indexOf('$')!=-1)e=true;
	if(str.indexOf('~')!=-1)e=true;
	if(str.indexOf('¦')!=-1)e=true;
	if(str.indexOf('#')!=-1)e=true;
	if(e && al)alert('错误：不能出现"|@$~¦#"这些符号中的任意一个。');
	return e;
	}
	return false;
}

function IsColorError(color,type,select)
{
	if(color)
	{
		if(color=="#FFFFFF")
		{
		var e=false;
		if(color=="#000000")e=true;
		if(e){alert('错误：不能使用黑色。');return e;}
		var errnum=0;
		for(var i=0;i<fileDatas[type].length;i++)
		{
			if(color==RGBtoHex(fileDatas[type][i].color))
			{
				if(i==select)break;
				errnum=i;
				e=true;
				break;
			}
		}
		if(e){type=type.substr(0,type.length-1);alert('错误：'+ InfoType["I"+type].Name + "【" +fileDatas[type+"s"][errnum].name + '】已经使用这个颜色。');return e;}
		}
		return false;
	}
	
}

function ReadFileBase(file,savein,refresh){
	var f= new FileReader();
	f.readAsDataURL(file,"UTF-8");
	f.onload=function(e){
		var savename='';
		if(IsError(file.name,1) || file.name.replace(/(^\s*)|(\s*$)/g, "")=="")savename="未命名"+fileDatas[savein].length; else savename=file.name;
		fileDatas[savein].push(new Resources(e.target.result,savename));
		if(refresh==1)	turnPage(cPage);
		};
}

function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

function BtnClick(){
	var btns=document.getElementsByTagName("BUTTON");
	for(var i=0;i<btns.length;i++)
	{
		if(btns[i].name=="")btns[i].onmousedown=btnClickSound;
		if(btns[i].name=="help")btns[i].onclick=ShowHelp;
	}
}

function btnClickSound(){
	checkAndPlaySound("btnClickSound");
}
	
	function checkAndPlaySound(type){
		if(fileDatas[type] <= fileDatas.soundRes.length-1 && fileDatas[type]!=-1)
		if(fileDatas.soundRes[fileDatas[type]]!=undefined)
		soundPlayer.src=fileDatas.soundRes[fileDatas[type]].data;
	}
	
	function checkAndDrawUnder(pox,poy){

		if(fileDatas.mapPath[1])
		{
			if(!img2.src)img2.src=fileDatas.mapPath[1];
			ctx2.drawImage(img2,showingImage.imgX,showingImage.imgY,showingImage.imgWidth+pox,showingImage.imgHeight+poy, pox+Math.round(pox*(1-showingImage.imgScale.toFixed(1))),poy+Math.round(poy*(1-showingImage.imgScale.toFixed(1))),Math.round((showingImage.imgWidth+pox)*showingImage.imgScale.toFixed(1)),Math.round((showingImage.imgHeight+poy)*showingImage.imgScale.toFixed(1)));
		}
		if(fileDatas.mapPath[2])
		{
		if(!img3.src)img3.src=fileDatas.mapPath[2];
		ctx3.drawImage(img3,showingImage.imgX,showingImage.imgY,showingImage.imgWidth+pox,showingImage.imgHeight+poy, pox+Math.round(pox*(1-showingImage.imgScale.toFixed(1))),poy+Math.round(poy*(1-showingImage.imgScale.toFixed(1))),Math.round((showingImage.imgWidth+pox)*showingImage.imgScale.toFixed(1)),Math.round((showingImage.imgHeight+poy)*showingImage.imgScale.toFixed(1)));
		}
		ctx4.drawImage(img4,showingImage.imgX,showingImage.imgY,showingImage.imgWidth+pox,showingImage.imgHeight+poy, pox+Math.round(pox*(1-showingImage.imgScale.toFixed(1))),poy+Math.round(poy*(1-showingImage.imgScale.toFixed(1))),Math.round((showingImage.imgWidth+pox)*showingImage.imgScale.toFixed(1)),Math.round((showingImage.imgHeight+poy)*showingImage.imgScale.toFixed(1)));
		
	}

	function haveReadPic(){
		for(var i=0;i<4;i++)
		{
			if(fileDatas.mapPath[i])return true;
			if(i>=3)return false;
		}
	}
	
	function RGBtoHex(str){
		var srgb=str.split(',');
		str='#';
		for(var i=0;i<3;i++)
		{
		srgb[i]=parseInt(srgb[i]);
		srgb[i]=srgb[i].toString(16);
		if(srgb[i].length==1)srgb[i]="0"+srgb[i];
		str+=srgb[i]
		}
		return str;
	}
	
	function HextoRGB(str)
	{
		var r=parseInt(str.substr(1,2),16);
		var g=parseInt(str.substr(3,2),16);
		var b=parseInt(str.substr(5,2),16);
		var str=r+","+g+","+b;
		return str;
	}
	
	function GetAllData(){
		var now='';
		var string='';
		now=GetTimeString()
		if(fileDatas.creatDate=='')fileDatas.creatDate=now;
		fileDatas.lastEditDate=now;
		for(var name in fileDatas){
		if(fileDatas[name].constructor != Array){
			string += name + '@' + fileDatas[name] + '$';
			}else{
				string += name + '@';
				for(var i=0;i<fileDatas[name].length;i++)
				{
					if(name!="mapPath"){
				 for(var pName in fileDatas[name][i]){
					 if(pName!="borderp")
					 string += pName + '~' + fileDatas[name][i][pName] + '¦';
				 }string += "|";
				 }else{string += fileDatas[name][i] + '|'}
				}
				string += '$';
			}
		}
		return string;
	}
	
	function ReadTextDatas(str){
		ClearAll();
		var arr=str.split("$");
		var readed=0;
		var unknow=0;
		var timg=new Image(3);
		var btns=document.getElementsByTagName("button");
		canvas.style.cursor="wait";
		for(var i=0;i<btns.length;i++)btns.disabled=true;
		for(var i=0;i<arr.length;i++)
		{
			if(arr[i]!=""){
			var arr2=arr[i].split("@");
			if(fileDatas[arr2[0]] != undefined ){
			if(fileDatas[arr2[0]].constructor != Array){
				fileDatas[arr2[0]]=arr2[1];
				}else{
					if(arr2[0]!="mapPath"){
					var theClass=InfoType.IType[arr2[0]];
					var arr3=arr2[1].split("|");
					for(var j=0;j<arr3.length;j++){
						if(arr3[j]!=""){
						var theObj=new window[theClass];
						var arr4=arr3[j].split("¦");
						for(var k=0;k<arr4.length;k++)
						{
							var arr5=arr4[k].split("~");
							var r=/^-[0-9]*[1-9][0-9]*$/;
							if(r.test(arr5[1]))arr5[1]=parseInt(arr5[1]);
							var r=/^[0-9]*[1-9][0-9]*$/;
							if(r.test(arr5[1]))arr5[1]=parseInt(arr5[1]);
							theObj[arr5[0]]=arr5[1];
						}
						fileDatas[arr2[0]].push(theObj);
						}
					}
					}else{
						var arr3=arr2[1].split("|");
						for(var j=0;j<arr3.length;j++)
						{			
							if(arr3[j]=="undefined" || arr3[j]=="")
							fileDatas[arr2[0]][j]==undefined; else fileDatas[arr2[0]][j]=arr3[j];
						}
					}
				}
				readed++;}else unknow++;
				}
		}
		picIRu=CheckPics();
		picNum=0;
		playBGM(1);
		playBGM(2);
		playBGM(3);
		ReadPics(readed,unknow);
		
	}
	
	
	function GetTime(){
		var time=new Date();
		var string=time.getYear() + (time.getMonth() + 1) + time.getDay() + time.getHours() + time.getMinutes() + time.getSeconds();
		return string;
	}
	
	function GetTimeString(){
		var time=new Date();
		var string=time.getFullYear() + "年" + (time.getMonth() + 1) + "月" + time.getDate() + "日" + time.getHours() + "时" + time.getMinutes() + "分" + time.getSeconds() + "秒";
		return string;
	}
	
	function isIE()//判断浏览器类型
	{ 
	  if(!!window.ActiveXObject || "ActiveXObject" in window) 
	    return true; 
	  else 
	    return false; 
	} 
	
	function ClearAll()
	{
		fileDatas=null;
		fileDatas=new FileDatas();
		showingImage=null;
		showingImage=new ShowingImage();
	}
	
	function CheckPics()
	{
		var iru=[0,0,0,0];
		for(var i=0;i<4;i++)
		{
			if(fileDatas.mapPath[i])iru[i]=1;
		}
		return iru;
	}
	
	var picIRu=[0,0,0,0];
	var picNum=0;
	function ReadPics(readed,unknow)
	{
		if(fileDatas.mapPath[picNum]){
		showingImage.imgObj.src=fileDatas.mapPath[picNum];
		showingImage.ResetIMG();
		var error=false;
		var num=picNum;

		showingImage.imgObj.onload=function(){
			showingImage.imgObj.onload=null;
			picNum++;
			if(haveReadPic())
			{
			if(showingImage.imgWidth==0)showingImage.imgWidth=showingImage.imgObj.naturalWidth;
			if(showingImage.imgHeight==0)showingImage.imgHeight=showingImage.imgObj.naturalHeight;
			if(showingImage.imgWidth!=showingImage.imgObj.naturalWidth || showingImage.imgHeight!=showingImage.imgObj.naturalHeight)error=true;
			}else{showingImage.imgWidth=showingImage.imgObj.naturalWidth;showingImage.imgHeight=showingImage.imgObj.naturalHeight;}
			if(error)
			{
				alert("错误：图片尺寸必须全部相同。");
				ClearAll();
				return;
			}
			
			underCanvasDraw(showingImage.imgObj);
			switch(num)
			{
				case 0:
				
				break;
				case 1:
			showingImage.imgdata2=uctx.getImageData(0,0,showingImage.imgObj.width,showingImage.imgObj.height);
			break;
			case 2:
			showingImage.imgdata3=uctx.getImageData(0,0,showingImage.imgObj.width,showingImage.imgObj.height);
			case 3:
			}
			if(picNum>=4)
			{
			picNum=0;
			canvas.style.cursor="default";
			alert("读取结束，一共成功读取了" + readed + "个数据。" + unknow + "个数据无法被识别。");
			var btns=document.getElementsByTagName("button");
			for(var i=0;i<btns.length;i++){btns.disabled=false;}}
			else{ReadPics(readed,unknow)}
		}}else{if(picNum>=4){
			picNum=0;
			canvas.style.cursor="default";
			alert("读取结束，一共成功读取了" + readed + "个数据。" + unknow + "个数据无法被识别。");
			var btns=document.getElementsByTagName("button");
			for(var i=0;i<btns.length;i++){btns.disabled=false;}
			return;
			}picNum++;ReadPics(readed,unknow);}
	}
	
	function playBGM(num){
		if(fileDatas["musicList" + num]!='')
		{
			var arr=fileDatas["musicList" + num].split(',');
			if(!document.getElementById("BGM"+num).src){document.getElementById("BGM"+num).src=fileDatas.musicRes[arr[0]].data;document.getElementById("BGM"+num).setAttribute('data-playing',0);}
			document.getElementById("BGM"+num).play();
		}
	}
	
	function playList(player){
		var num=player.getAttribute('id').substr(player.getAttribute('id').length-1,1);
		var arr=fileDatas["musicList" + num].split(',');
		var playing = parseInt(player.getAttribute('data-playing'))+1;
		player.setAttribute('data-playing',playing);
		if(arr[playing]!='' && arr[playing]<fileDatas.musicRes.length)
		player.src=fileDatas.musicRes[arr[playing]].data; else {playing=0;player.setAttribute('data-playing',playing);document.getElementById("BGM"+num).src=fileDatas.musicRes[arr[0]].data;}
		player.play();
	}
	
	function PlayTheClickSound(type,select)
	{
		var typename=type+"s";
		
		if(fileDatas[typename][select].sound==-1)return false;
		else if(fileDatas[typename][select].sound==0)
		{
			var found=-1;
			for(var i=0;i<fileDatas.soundRes.length;i++)
			{
				if(fileDatas.soundRes[i].type!="")
				{
					var arr=fileDatas.soundRes[i].type.split(",");
					for(var k=0;k<arr.length;k++)
					{
						if(arr[k]!='')
						if(arr[k]==fileDatas[typename][select].type){found=i;break;}
					}
					if(found!=-1){break;}
				}
			}
			if(found!=-1){soundPlayer.src=fileDatas.soundRes[found].data;return true;} else return false;
		}
		else 
		soundPlayer.src=fileDatas.soundRes[fileDatas[typename][select].sound-1].data;
		return true;
	}
	
	function FindAndReturnRes(index,fromres,type,adj,select)
	{
		switch(index)
		{
			case -1:
			return null;
			break;
			case 0:
			var found=-1;
			var ctype=fileDatas[type][select].type;
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
				return fileDatas[fromres][found].data;
				}else {return null}
			break;
			default:
				var num=index-adj-1;
				return fileDatas[fromres][num].data;
			}
		}