
/*function resize_canvas(){              
	canvas.width  = window.innerWidth*2;
	canvas.height = window.innerHeight*1.5;
	canvas2.width  = window.innerWidth*2;
	canvas2.height = window.innerHeight*1.5;
	canvas3.width  = window.innerWidth*2;
	canvas3.height = window.innerHeight*1.5;
	}*/
	//canvas.width=document.body.clientWidth*2 +6
	function resize_canvas(){              
		canvas.width  = bigBox.offsetWidth*2;
		canvas.height = bigBox.offsetHeight*1.24;
		canvas2.width  = canvas.width;
		canvas2.height = canvas.height;
		canvas3.width  = canvas.width;
		canvas3.height = canvas.height;
		canvas4.width  = canvas.width;
		canvas4.height = canvas.height;
		}
function underCanvasDraw(imgObj){
	ucanvas.width=imgObj.width;
	ucanvas.height=imgObj.height;
	uctx.drawImage(imgObj, 0, 0,ucanvas.width ,ucanvas.height); 
}
function reDrawCanvas(isloading){
		if(isloading){
		showingImage.imgObj.onload = function(){ 
			showingImage.imgObj.onload=null;
			var error=false;
			if(haveReadPic())
			{
				if(showingImage.imgWidth!=showingImage.imgObj.naturalWidth || showingImage.imgHeight!=showingImage.imgObj.naturalHeight)error=true;
				if(error)
				{
					showingImage.ReadyForDraw();
					alert("错误：图片尺寸必须全部相同。");
				}
			}else{showingImage.imgWidth=showingImage.imgObj.naturalWidth;showingImage.imgHeight=showingImage.imgObj.naturalHeight;}
			if(!error){
			var num=imgReading.getAttribute("id");
			num= num.substr(num.length-1,1);
			underCanvasDraw(showingImage.imgObj);
			//ctx.drawImage(showingImage.imgObj,showingImage.imgX,showingImage.imgY,showingImage.imgObj.width+pox,showingImage.imgObj.height+poy, pox,poy,(showingImage.imgObj.width+pox)*showingImage.imgScale ,(showingImage.imgObj.height+poy)*showingImage.imgScale);
			fileDatas.mapPath[num]=ucanvas.toDataURL();
			imgReading.innerText="正在读取数据……10%";
			//---------------------------------------
			switch(num)
			{
				case '0':
				
				break;
				case '1':
			showingImage.imgdata2=uctx.getImageData(0,0,showingImage.imgObj.width,showingImage.imgObj.height);
			imgReading.innerText="正在读取数据……30%";
			showingImage.ReadImgInfo0();
			break;
			case '2':
			showingImage.imgdata3=uctx.getImageData(0,0,showingImage.imgObj.width,showingImage.imgObj.height);
			imgReading.innerText="正在读取数据……30%";
			showingImage.ReadImgInfo1();
			case '3':
			}
			 
			}turnPage(cPage); }; 
		}else{
			if(cPage=='M')
			{
			if(showingImage.RegetImgObj())
			{
			var pox=0;
			var poy=0;
			resize_canvas();
			if(showingImage.imgX<0){pox=-showingImage.imgX}
			if(showingImage.imgY<0){poy=-showingImage.imgY}
			checkAndDrawUnder(pox,poy);
			//ctx.drawImage(showingImage.imgObj, 0, 0,showingImage.imgObj.width ,showingImage.imgObj.height); 
			ctx.drawImage(showingImage.imgObj,showingImage.imgX,showingImage.imgY,showingImage.imgObj.width+pox,showingImage.imgObj.height+poy, pox+Math.round(pox*(1-showingImage.imgScale.toFixed(1))),poy+Math.round(poy*(1-showingImage.imgScale.toFixed(1))),Math.round((showingImage.imgObj.width+pox)*showingImage.imgScale.toFixed(1)),Math.round((showingImage.imgObj.height+poy)*showingImage.imgScale.toFixed(1)));
			if(tempDatas.ShowCountry || selectNation!=-1)
			{
				ctx.drawImage(showingImage.imgObj2,showingImage.imgX,showingImage.imgY,showingImage.imgObj.width+pox,showingImage.imgObj.height+poy, pox+Math.round(pox*(1-showingImage.imgScale.toFixed(1))),poy+Math.round(poy*(1-showingImage.imgScale.toFixed(1))),Math.round((showingImage.imgObj.width+pox)*showingImage.imgScale.toFixed(1)),Math.round((showingImage.imgObj.height+poy)*showingImage.imgScale.toFixed(1)));
			}
			if(tempDatas.ShowArmy)
			{
				ctx.drawImage(showingImage.imgObj3,showingImage.imgX,showingImage.imgY,showingImage.imgObj.width+pox,showingImage.imgObj.height+poy, pox+Math.round(pox*(1-showingImage.imgScale.toFixed(1))),poy+Math.round(poy*(1-showingImage.imgScale.toFixed(1))),Math.round((showingImage.imgObj.width+pox)*showingImage.imgScale.toFixed(1)),Math.round((showingImage.imgObj.height+poy)*showingImage.imgScale.toFixed(1)));
			}
			//showingImage.imgObj.width*showingImage.imgScale,showingImage.imgObj.height*showingImage.imgScale
			 //ctx.putImageData(showingImage.imgdata,showingImage.imgX,showingImage.imgY,pox,poy,(showingImage.imgObj.width+pox)*showingImage.imgScale,(showingImage.imgObj.height+poy)*showingImage.imgScale);
			 clickAnimation();
			 }
			 }
			 
		}
		//mesBox.innerText=showingImage.imgX+"||"+showingImage.imgY+"||"+showingImage.imgObj.width+"||"+showingImage.imgObj.height+"||"+showingImage.imgObj.width*showingImage.imgScale+"||"+showingImage.imgObj.height*showingImage.imgScale+"||"+showingImage.imgScale;

	}
	
	
	canvas.onmousedown=function(event){
		if(event.button==0){
	var posX=event.offsetX
	var posY=event.offsetY
	var movingNum=0;
	  canvas.onmousemove=function(event){
		  movingNum++;
		  if(movingNum>=5)canvas.onclick=null;
	        canvas.style.cursor="move";
	        var posX1=event.offsetX;
			var posY1=event.offsetY;
	        var x=posX1-posX;
	        var y=posY1-posY;
	        posX=posX1;
			posY=posY1;
	        showingImage.imgX-=Math.round(x);
	        showingImage.imgY-=Math.round(y);
	    }
	window.onmouseup=function(){
		setTimeout(function(){canvas.onclick=SelectedPoint;},100);
		canvas.onmousemove=null;
			//canvas.addEventListener("mousemove",mouseMoving);
	       canvas.style.cursor="default";
	    }
	}
	    }
	
	canvas.addEventListener("mousemove",mouseMoving)
	
	function mouseMoving(event){
		if(haveReadPic()){
		var X=canvas.width-6
		var Y=canvas.height-6
		var posX1=event.offsetX*Math.round(X/bigBox.offsetWidth);
		var posY1=event.offsetY*Math.round(Y/Math.round(bigBox.offsetHeight*0.62));
		X=Math.round(Math.round((event.offsetX + showingImage.imgX)/showingImage.imgScale.toFixed(1))*Math.round(X/bigBox.offsetWidth));
		Y=Math.round(Math.round((event.offsetY + showingImage.imgY)/showingImage.imgScale.toFixed(1))*Math.round(Y/Math.round(bigBox.offsetHeight*0.62)));
		var tdata=ctx4.getImageData(posX1,posY1,1,1);
		var rgb=tdata.data[0]+","+tdata.data[1]+","+tdata.data[2];
		var thep=-1;
		var belong='无主';
		if(rgb!="0,0,0" && rgb!="255,255,255" && tempDatas.ShowArmy)
		{
			thep='';
			var thea=RGBtoHex(rgb);
			thea=thea.substr(1);
			thea=parseInt(thea,16);
			thea=parseInt((thea/5)-1);
			if(fileDatas.Armys[thea].belong!=-1)belong=fileDatas.Nations[fileDatas.Armys[thea].belong].name;
			if(fileDatas.gameType==1) thep = (Math.floor(fileDatas.Armys[thea].pos/4))%showingImage.imgWidth + "," + Math.floor(Math.floor(fileDatas.Armys[thea].pos/4))/showingImage.imgWidth; else thep= fileDatas.Areas[fileDatas.Armys[thea].pos].name;
			upmesbox.innerText = fileDatas.Armys[thea].name + "(" +belong +")" + "位于" + "【" + thep + "】";
			return;
		}
		tdata=ctx2.getImageData(posX1,posY1,1,1);
		rgb=tdata.data[0]+","+tdata.data[1]+","+tdata.data[2];
		var alti='';
		var land='';
		if(fileDatas.mapPath[2])
		{
		tdata=ctx3.getImageData(posX1,posY1,1,1);
		alti="|高度：" + ((tdata.data[0]-128)*256 + tdata.data[1]).toString();
		for(var i=0;i<fileDatas.Lands.length;i++)
		{
		if(fileDatas.Lands[i].data==tdata.data[2])
		{land="|地形：" + fileDatas.Lands[i].name;break;}
		}
		}
		/*亮度计算方法:0.3*r + 0.6*g + 0.1 * b > 128)*/
		if(rgb!="0,0,0" && rgb!="255,255,255")
			{
			for(var j=0;j<fileDatas.Areas.length;j++) 
			if(fileDatas.Areas[j].color==rgb)
			{
				thep=j;
				break;
				}
			if(thep!=-1){
			if(fileDatas.Areas[thep].belong!=-1)belong=fileDatas.Nations[fileDatas.Areas[thep].belong].name;
			upmesbox.innerText= fileDatas.Areas[thep].name+"("+belong+")"+X+","+Y +  alti + land ; 
			}else{//upmesbox.innerText=  X+","+Y+ alti +  land + ","+showingImage.imgX+","+showingImage.imgY+","+showingImage.imgScale.toFixed(1);
			upmesbox.innerText=  X+","+Y+ alti +  land;
				}
				}else{//upmesbox.innerText=  X+","+Y+ alti +  land + ","+showingImage.imgX+","+showingImage.imgY+","+showingImage.imgScale.toFixed(1);
			upmesbox.innerText=  X+","+Y+ alti +  land;
				}
		}
		
	}
	
	canvas.onwheel=function(event){
		var d=event.deltaY;
		if (d>0)
		{if(showingImage.imgScale>=0.3)showingImage.imgScale-=0.1;}
		else{if(showingImage.imgScale<=5)showingImage.imgScale+=0.1;}
		mouseMoving(event);
	}

canvas.oncontextmenu=function(event){
			event.preventDefault();
	if(haveReadPic())
	{
		var X=canvas.width-6
		var Y=canvas.height-6
		var posX1=event.offsetX*Math.round(X/bigBox.offsetWidth);
		var posY1=event.offsetY*Math.round(Y/Math.round(bigBox.offsetHeight*0.62));
		X=Math.round(Math.round((event.offsetX + showingImage.imgX)/showingImage.imgScale.toFixed(1))*Math.round(X/bigBox.offsetWidth));
		Y=Math.round(Math.round((event.offsetY + showingImage.imgY)/showingImage.imgScale.toFixed(1))*Math.round(Y/Math.round(bigBox.offsetHeight*0.62)));
		var tdata=ctx2.getImageData(posX1,posY1,1,1);
		var str=tdata.data[0]+","+tdata.data[1]+","+tdata.data[2];
			if(str!="0,0,0" && str!="255,255,255")
			{
				var newa='1';
				var be=-1;
				var thep=-1;
			for(var j=0;j<fileDatas.Areas.length;j++) 
			{
		if(fileDatas.Areas[j].color==str){thep=j;newa='0';be=fileDatas.Areas[j].belong;break;}
			}
			}
		}        

}

canvas.onclick=SelectedPoint;
var selectArea=-2;
var selectArmy=-1;
var selectNation=-2;
function SelectedPoint(event){
	canvas.style.cursor="wait";
	var X=canvas.width-6
	var Y=canvas.height-6
	var posX1=event.offsetX*Math.round(X/bigBox.offsetWidth);
	var posY1=event.offsetY*Math.round(Y/Math.round(bigBox.offsetHeight*0.62));
	var dtype=null;
	showingImage.cx=posX1;
	showingImage.cy=posY1;
	showingImage.clickT=10;
	if(showingImage.RegetImgObj() && tempDatas.ShowArmy && InfoType.ICType[tempDatas.ClickType]%100 > 5){
		var tdata=ctx4.getImageData(posX1,posY1,1,1);
		var str=tdata.data[0]+","+tdata.data[1]+","+tdata.data[2];
		var thep=-1;
		if(str!="0,0,0" && str!="255,255,255")
		{
		dtype="Army";
		str=RGBtoHex(str);
		str=str.substr(1);
		str=parseInt(str,16);
		thep=str/5-1;
		if(thep==-1)dtype=null; else
		if(thep!=-1 && thep!=selectArmy)
		{
		
		if(!PlayTheClickSound(dtype,thep))checkAndPlaySound(dtype + "sClickSound");
		EndSelect(-1,thep,-1);
		}
		
		}
	}
	//-------------------------------------
		if(showingImage.imgdata2!='' && InfoType.ICType[tempDatas.ClickType]%10 == 1 && !dtype){
		var tdata=ctx2.getImageData(posX1,posY1,1,1);
		var str=tdata.data[0]+","+tdata.data[1]+","+tdata.data[2];
		var thep=-1;
		if(str!="0,0,0" && str!="255,255,255")
		{
		dtype="Area";
		for(var j=0;j<fileDatas.Areas.length;j++) 
		{
	
		if(fileDatas.Areas[j].color==str)
		{
			thep=j;
			break;
			}
			}
			if(thep==-1){dtype=null;}else
		if(thep!=-1 && thep!=selectArea)
		{
		
		if(!PlayTheClickSound(dtype,thep))checkAndPlaySound(dtype + "sClickSound");
		EndSelect(thep,-1,-1);
		}
		}
		}
		//----------------------------------------     
		if(showingImage.imgdata2!='' && InfoType.ICType[tempDatas.ClickType]/100 >= 1 && !dtype){
		var tdata=ctx2.getImageData(posX1,posY1,1,1);
		var str=tdata.data[0]+","+tdata.data[1]+","+tdata.data[2];
		var thep=-1;
		if(str!="0,0,0" && str!="255,255,255")
		{
		dtype="Nation";
		for(var j=0;j<fileDatas.Areas.length;j++) 
		{
			
		if(fileDatas.Areas[j].color==str)
		{
			if(fileDatas.Areas[j].belong!=-1)
			{
			thep=fileDatas.Areas[j].belong;
			break;
			}
			}
			
			}
			if(thep==-1){dtype=null;}else
		if(thep!=selectNation)
		{
		if(!PlayTheClickSound(dtype,thep))checkAndPlaySound(dtype + "sClickSound");
		EndSelect(-1,-1,thep);
		}
		
		}
		
		}
		//----------------------------------------
		if(!dtype){EndSelect(-1,-1,-1);}   
		ShowData_CanvaPage(dtype);
		canvas.style.cursor="default";	
	}
	
	function clickAnimation(){
		if(showingImage.clickT>0)
		{
		ctx.strokeStyle="#FF0000";
		ctx.lineWidth=3;
		ctx.beginPath();
		ctx.arc(showingImage.cx,showingImage.cy,10*showingImage.clickT,0,360);
		ctx.moveTo(showingImage.cx+8*showingImage.clickT,showingImage.cy);
		ctx.arc(showingImage.cx,showingImage.cy,8*showingImage.clickT,0,360);
		ctx.stroke();
		showingImage.clickT--;
		}
	}
	
	function ShowData_CanvaPage(dtype){
		var bigdiv=document.getElementById("BigDiv");
		if(dtype){
			bigdiv.style.background="white";
		bigdiv.innerHTML=pageText["page"+dtype];
		BtnClick();
		var selectType="select" + dtype;
		var thep=window[selectType];
		dtype+='s';
		if(dtype=="Nations" || dtype=="Areas"){
			if(fileDatas[dtype][thep].acreage==-1){drawinnerCanvas(2,thep,dtype);}
		}
		ShowSelected(thep,dtype);
		}else{bigdiv.innerHTML='';bigdiv.style.background="#AAAAAA";}
	}
	
	function EndSelect(a,b,c){
		if(haveReadPic()){
		if(a!=selectArea){selectArea=a;}
		showingImage.CBorder();
		if(b!=selectArmy){selectArmy=b;showingImage.ABorder();}
		if(c!=selectNation){selectNation=c;showingImage.RCNationsLayer();}
		}
		showingImage.ReadyForDraw();
	}
	
/*
	*/