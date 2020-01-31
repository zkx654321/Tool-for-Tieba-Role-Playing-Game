function ShowingImage(){
	this.cx=0;
	this.cy=0;
	this.clickT=0;
	this.imgObj = new Image();
	this.imgObj2 = new Image();
	this.imgObj3 = new Image();
	this.iconImgs=new Array();
	this.imgNum = 0;
	this.imgX = 0;
	this.imgY=0;
	this.imgScale=1;
	this.imgdata='';//当前显示
	this.imgdata2='';//区域
	this.imgdata3='';//地形
	this.imgdata4='';//国家
	this.imgdataArmy='';
	this.imgdataArmyB='';
	this.imgWidth=0;
	this.imgHeight=0;
	this.ReadImgInfo0=function ReadImgInfo0(){
		if(!mann)
		{
		var tempAreas=fileDatas.Areas;
		for (var i=0;i<this.imgdata2.data.length;i+=4)
  {
	  if(this.imgdata2.data[i+3]!=0){
	  var cstring;
		var thea=-1;
	  cstring=this.imgdata2.data[i]+","+this.imgdata2.data[i+1]+","+this.imgdata2.data[i+2];
	  if(cstring!="0,0,0" && cstring!="255,255,255"){
		  var newa=true;
	for(var j=0;j<tempAreas.length;j++) if(tempAreas[j].color==cstring){newa=false;thea=j;break;}
	  if(newa){tempAreas.push(new Area("未命名区域"+tempAreas.length,cstring));thea=tempAreas.length-1;}
	  if(thea!=-1 && (this.checkUp(i,cstring) || this.checkDown(i,cstring) || this.checkRight(i,cstring) || this.checkLeft(i,cstring))){fileDatas.Areas[thea].borderp.push(i);}
	  }else if(cstring=="0,0,0"){
		  var b=this.CheckP(i);
		  if(!b){alert('错误：0,0,0的点不能出现在区域的边缘。在' + (Math.floor(i/4))%this.imgdata2.width + ','+ Math.floor((Math.floor(i/4))/this.imgdata2.width) );return;}
		  for(var j=0;j<tempAreas.length;j++) if(tempAreas[j].color==b){tempAreas[j].pos=i;break;}
		  }
		  }
	  }
	  fileDatas.Areas= tempAreas;

  }
	}
	
	this.ReadImgInfo1=function ReadImgInfo1(){
			for (var i=0;i<this.imgdata3.data.length;i+=4)
	  {
		  if(this.imgdata3.data[i+3]!=0){
		 
			  var newa=true;
		for(var j=0;j<fileDatas.Lands.length;j++) if(fileDatas.Lands[j].data==this.imgdata3.data[i+2]){newa=false;break;}
		  if(newa)fileDatas.Lands.push(new Resources(this.imgdata3.data[i+2],"未命名地形"+this.imgdata3.data[i+2]));
		  
			  }
		  }
		}
	
	this.CBorder=function(){
		var tempimg=new Image();
		var str=this.RegetImgObj();
		if(str){
			tempimg.src=str;
		tempimg.onload=function(){
		underCanvasDraw(tempimg);
		showingImage.imgdata=uctx.getImageData(0,0,tempimg.width,tempimg.height);
    if(selectArea!=-1)showingImage.FindBorder(selectArea,fileDatas.Areas[selectArea].color);
	showingImage.ReadyForDraw();
}
		}else{showingImage.imgObj.src='';ctx.clearRect(0,0,canvas.width,canvas.height);}
		/*for(var k=0;k<fileDatas.Areas.length;k++)
		for (var i=0;i<fileDatas.Areas[k].borderp.length;i++){
			var j=fileDatas.Areas[k].borderp[i];
			var srgb=fileDatas.Areas[k].color.split(',');
			this.imgdata.data[j]=srgb[0]
			this.imgdata.data[j+1]=srgb[1]
			this.imgdata.data[j+2]=srgb[2]
		}*/
	}
	
	this.ABorder=function(){
		uctx.clearRect(0,0,ucanvas.width,ucanvas.height);
		uctx.putImageData(showingImage.imgdataArmyB,0,0);
		if(selectArmy!=-1)
		{
			var fnum=0;
			if(fileDatas.gameType==0)
			for(var i=selectArmy-1;i>-1;i--)
			{
				if(fileDatas.Armys[i].pos==fileDatas.Armys[selectArmy].pos)fnum++;
			}
			
			var w=60,h=60;
			if(fileDatas.defaultArmyIcon==1)h=45;
			uctx.beginPath();
			uctx.lineWidth="4";
			uctx.strokeStyle="red";
			if(fileDatas.gameType==1){
			uctx.rect(((Math.floor(fileDatas.Armys[selectArmy].pos/4))%showingImage.imgWidth),(Math.floor((Math.floor(fileDatas.Armys[selectArmy].pos/4))/showingImage.imgWidth)) ,w,h);
			}else{if(fileDatas.Armys[selectArmy].pos!=-1)uctx.rect(((Math.floor(fileDatas.Areas[fileDatas.Armys[selectArmy].pos].pos/4))%showingImage.imgWidth)+fnum*20,(Math.floor((Math.floor(fileDatas.Areas[fileDatas.Armys[selectArmy].pos].pos/4))/showingImage.imgWidth))+fnum*20,w,h);}
			uctx.stroke();
		}
		this.imgdataArmy=uctx.getImageData(0,0,ucanvas.width,ucanvas.height);
	}
	
	this.DrawBorder=function(area){
		
				for (var i=0;i<fileDatas.Areas[area].borderp.length;i++){
					var j=fileDatas.Areas[area].borderp[i];
					
					this.imgdata.data[j]=0
					this.imgdata.data[j+1]=0
					this.imgdata.data[j+2]=0
					
			}
		}
	

this.FindBorder=function(area,string){

	if(fileDatas.Areas[area].borderp.length==0){
		for (var i=0;i<this.imgdata2.data.length;i+=4)
	{
		var str=this.imgdata2.data[i]+","+this.imgdata2.data[i+1]+","+this.imgdata2.data[i+2];
		if(str==string)
		if(this.checkUp(i,string) || this.checkDown(i,string) || this.checkRight(i,string) || this.checkLeft(i,string))
		fileDatas.Areas[area].borderp.push(i);

		
	}
	}
	
		this.DrawBorder(area);
		
		
	/*this.SearchRight(num,string);
	this.SearchLeft(num,string);
	this.SearchUp(num,string);
	this.SearchDown(num,string);
	*/
}
/*
this.SearchUp=function(num,string){
	if(this.checkUp(num,string))
	{
		this.imgdata.data[num]=0
		this.imgdata.data[num+1]=0
		this.imgdata.data[num+2]=0
	}else{
		this.SearchUp(num-this.imgdata.width*4,string)
	}
	this.SearchRight(num,string);
	this.SearchLeft(num,string);
	}
this.SearchDown=function(num,string){
		if(this.checkDown(num,string))
		{
			this.imgdata.data[num]=0
			this.imgdata.data[num+1]=0
			this.imgdata.data[num+2]=0
		}else{
			this.SearchDown(num+this.imgdata.width*4,string)
		}
		this.SearchRight(num,string);
		this.SearchLeft(num,string);
		}
this.SearchRight=function(num,string){
	if(this.checkRight(num,string))
	{
		this.imgdata.data[num]=0
		this.imgdata.data[num+1]=0
		this.imgdata.data[num+2]=0
	}else{
		this.SearchRight(num+4,string)
	}
}
this.SearchLeft=function(num,string){
	if(this.checkLeft(num,string))
	{
		this.imgdata.data[num]=0
		this.imgdata.data[num+1]=0
		this.imgdata.data[num+2]=0
	}else{
		this.SearchLeft(num-4,string)
	}

}
*/
this.checkRight=function(num,string){
			var tstring=''
			var p=Math.floor(num/4)
			if(p%this.imgdata2.width==this.imgdata2.width-1)return true;
			tstring=this.imgdata2.data[num+4]+","+this.imgdata2.data[num+5]+","+this.imgdata2.data[num+6]
			if((tstring!=string && tstring!="0,0,0") || this.imgdata2.data[num+7]==0)return true;
			return false;
		}
		this.checkLeft=function(num,string){
			var tstring=''
			var p=Math.floor(num/4)
			if(p%this.imgdata2.width==0)return true;
			tstring=this.imgdata2.data[num-4]+","+this.imgdata2.data[num-3]+","+this.imgdata2.data[num-2]
			if((tstring!=string && tstring!="0,0,0") || this.imgdata2.data[num-1]==0)return true;
			return false;
		}
		this.checkUp=function(num,string){
			var tstring=''
			var p=Math.floor(num/4)
			var w=this.imgdata2.width*4
			if(Math.floor(p/this.imgdata2.width)==0)return true;
			tstring=this.imgdata2.data[num-w]+","+this.imgdata2.data[num-w+1]+","+this.imgdata2.data[num-w+2]
			if((tstring!=string && tstring!="0,0,0") || this.imgdata2.data[num-w+3]==0)return true;
			return false;
		}
		this.checkDown=function(num,string){
			var tstring=''
			var p=Math.floor(num/4)
			var w=this.imgdata2.width*4
			if(Math.floor(p/this.imgdata2.width)==this.imgdata2.height-1)return true;
			tstring=this.imgdata2.data[num+w]+","+this.imgdata2.data[num+w+1]+","+this.imgdata2.data[num+w+2]
			if((tstring!=string && tstring!="0,0,0") || this.imgdata2.data[num+w+3]==0)return true;
			return false;
		}
		
this.CheckP=function CheckP(num){
	var tstring=new Array(4);
	var p=Math.floor(num/4)
	var w=this.imgdata2.width*4
	if(p%this.imgdata2.width==0)return null;
	if(p%this.imgdata2.width==this.imgdata2.width-1)return null;
	if(Math.floor(p/this.imgdata2.width)==0)return null;
	if(Math.floor(p/this.imgdata2.width)==this.imgdata2.height-1)return null;
	tstring[0]=this.imgdata2.data[num-4]+","+this.imgdata2.data[num-3]+","+this.imgdata2.data[num-2]
	tstring[1]=this.imgdata2.data[num+4]+","+this.imgdata2.data[num+5]+","+this.imgdata2.data[num+6]
	tstring[2]=this.imgdata2.data[num-w]+","+this.imgdata2.data[num-w+1]+","+this.imgdata2.data[num-w+2]
	tstring[3]=this.imgdata2.data[num+w]+","+this.imgdata2.data[num+w+1]+","+this.imgdata2.data[num+w+2]
	if(tstring[0]!=tstring[1] || tstring[1]!=tstring[2] || tstring[2]!=tstring[3])return null;
	return tstring[0];
}
/*this.DrawBorder=function DrawBorder(area,draw){
	var str=''
	if(draw){
		for(var i=0;i<area.borderp.length;i++)
		{
			this.imgdata.data[area.borderp[i]]=0
			this.imgdata.data[area.borderp[i]+1]=0
			this.imgdata.data[area.borderp[i]+2]=0
		}
	}
	
}*/
this.ReadyForDraw=function ReadyForDraw(){
	if(showingImage.imgdata)
	{
	uctx.putImageData(showingImage.imgdata,0,0);
	this.imgObj.src=ucanvas.toDataURL();
	if((tempDatas.ShowCountry || selectNation!=-1) && showingImage.imgdata4!=''){
		uctx.putImageData(showingImage.imgdata4,0,0);
	this.imgObj2.src=ucanvas.toDataURL();
	}
	if(tempDatas.ShowArmy && showingImage.imgdataArmy!=''){
		uctx.putImageData(showingImage.imgdataArmy,0,0);
	this.imgObj3.src=ucanvas.toDataURL();
	}
	}
}

this.RegetImgObj=function()
{
	var str;
	for(var i=0;i<4;i++)
	{
		str="Show" + i.toString();
		if(tempDatas[str])if(fileDatas.mapPath[i])return fileDatas.mapPath[i];
		if(i>=3)return null;
	}
}

this.ResetIMG=function()
{
	showingImage.imgX=0;
	showingImage.imgY=0;
	showingImage.imgScale=1.0;
}


this.RCNationsLayer=function RCNationsLayer(){
		if(haveReadPic() && showingImage.imgdata2!=''){
		var changelist=new Array();
		var belonglist=new Array();
		for(var j=0;j<fileDatas.Areas.length;j++)
		{
			if(fileDatas.Areas[j].belong!=-1){
				belonglist.push(fileDatas.Areas[j].belong);
				var arr=fileDatas.Areas[j].color.split(',');
				var arr2=fileDatas.Nations[fileDatas.Areas[j].belong].color.split(',');
				if(selectNation!=-1)if(fileDatas.Nations[fileDatas.Areas[j].belong].belong==selectNation)arr2=fileDatas.Nations[selectNation].color.split(',');
				for(var k=0;k<3;k++)
				{
					changelist.push(arr[k]);
					changelist.push(arr2[k]);
				}
				
			}
		}
		uctx.putImageData(showingImage.imgdata2,0,0);
		this.imgdata4=uctx.getImageData(0,0,ucanvas.width,ucanvas.height);
			for (var i=0;i<this.imgdata4.data.length;i+=4)
		{
var c=false;
			for(var h=0;h<changelist.length;h+=6)
			{
			if(this.imgdata4.data[i]==changelist[h] && this.imgdata4.data[i+1]==changelist[h+2] && this.imgdata4.data[i+2]==changelist[h+4])
			{
				this.imgdata4.data[i]=changelist[h+1];
				this.imgdata4.data[i+1]=changelist[h+3];
				this.imgdata4.data[i+2]=changelist[h+5];
				if(belonglist[h/6]==selectNation)this.imgdata4.data[i+3]=180; else this.imgdata4.data[i+3]=120;
				c=true;
				break;
			}
			
			}

	if(!c){
		if(this.imgdata4.data[i]==255 && this.imgdata4.data[i+1]==255 && this.imgdata4.data[i+2]==255)
		{this.imgdata4.data[i+3]=0;}
		else{this.imgdata4.data[i]=0;this.imgdata4.data[i+1]=0;this.imgdata4.data[i+2]=0;this.imgdata4.data[i+3]=80;}
		}
		}
	}
	}
	
	this.ReadIcons=function(){
		this.iconImgs=null;
		this.iconImgs=new Array();
		var w=60,h=60;
		if(fileDatas.defaultArmyIcon==1)h=45;
		for(var i=0;i<fileDatas.iconRes.length;i++)
		{
			var timg=new Image();
			timg.src=fileDatas.iconRes[i].data;
			this.iconImgs.push(timg);
		}
		if(haveReadPic())
		{
		uctx.clearRect(0,0,ucanvas.width,ucanvas.height);
		for(var j=0;j<fileDatas.Armys.length;j++)
		{
			var fnum=0;
			if(fileDatas.gameType==0)
			for(var i=j-1;i>-1;i--)
			{
				if(fileDatas.Armys[i].pos==fileDatas.Armys[j].pos)fnum++;
			}
			
			var co=5;
			co += j*5;
			co=co.toString(16);
			while(co.length<6)
			{co="0"+co;}
			co="#" + co;
			uctx.fillStyle=co;
			if(fileDatas.gameType==1){
				uctx.fillRect((Math.floor(fileDatas.Armys[j].pos/4))%showingImage.imgWidth,Math.floor((Math.floor(fileDatas.Armys[j].pos/4))/showingImage.imgWidth) ,w,h);
				}else{if(fileDatas.Armys[j].pos!=-1)uctx.fillRect((Math.floor(fileDatas.Areas[fileDatas.Armys[j].pos].pos/4))%showingImage.imgWidth+fnum*20,Math.floor((Math.floor(fileDatas.Areas[fileDatas.Armys[j].pos].pos/4))/showingImage.imgWidth)+fnum*20 ,w,h);}
		}
		this.imgdataArmy=uctx.getImageData(0,0,ucanvas.width,ucanvas.height);
		/*for (var i=0;i<this.imgdataArmy.data.length;i+=4)
		{
			if(this.imgdata4.data[i]==255 && this.imgdata4.data[i+1]==255 && this.imgdata4.data[i+2]==255)
			{this.imgdata4.data[i+3]=0;}
		}*/
		uctx.putImageData(showingImage.imgdataArmy,0,0);
		img4.src=ucanvas.toDataURL();
		uctx.clearRect(0,0,ucanvas.width,ucanvas.height);
		this.imgdataArmy='';
		for(var j=0;j<fileDatas.Armys.length;j++)
			{
				if(fileDatas.gameType==0 && fileDatas.Armys[j].pos==-1){continue;}
				var fnum=0;
				if(fileDatas.gameType==0)
				for(var i=j-1;i>-1;i--)
				{
					if(fileDatas.Armys[i].pos==fileDatas.Armys[j].pos)fnum++;
				}
				
				var x=0,y=0;
				if(fileDatas.gameType==1)
				{x=((Math.floor(fileDatas.Armys[j].pos/4))%showingImage.imgWidth);y=(Math.floor((Math.floor(fileDatas.Armys[j].pos/4))/showingImage.imgWidth))}else{x=(Math.floor(fileDatas.Areas[fileDatas.Armys[j].pos].pos/4))%showingImage.imgWidth+fnum*20;y=Math.floor((Math.floor(fileDatas.Areas[fileDatas.Armys[j].pos].pos/4))/showingImage.imgWidth)+fnum*20;}
				if(fileDatas.Armys[j].icon==-1){
					uctx.beginPath();
					uctx.lineWidth="2";
					uctx.strokeStyle="black";
					uctx.font=h-15 + "px 宋体";
					uctx.fillStyle="#FFFFFF";
					uctx.fillRect(x,y,w,h);
					uctx.rect(x,y,w,h);
					uctx.fillStyle="#000000";
					uctx.fillText(fileDatas.Armys[j].name.substr(0, 1),x+Math.floor((w-h+15)/2),y+h-15,w);
					uctx.stroke();
				}else if(fileDatas.Armys[j].icon==0){
					var found=-1;
					for(var i=0;i<fileDatas.iconRes.length;i++)
					{
						if(fileDatas.iconRes.type!="")
						{
							var arr=fileDatas.iconRes[i].type.split(",");
							for(var k=0;k<arr.length;k++)
							{
								if(arr[k]==fileDatas.Armys[j].type){found=i;break;}
							}
							if(found!=-1){break;}
						}
					}
					if(found!=-1){uctx.drawImage(this.iconImgs[found],x,y,w,h);}else{
					uctx.beginPath();
					uctx.lineWidth="2";
					uctx.strokeStyle="black";
					uctx.font=h-15 + "px 宋体";
					uctx.fillStyle="#FFFFFF";
					uctx.fillRect(x,y,w,h);
					uctx.rect(x,y,w,h);
					uctx.fillStyle="#000000";
					uctx.fillText(fileDatas.Armys[j].name.substr(0, 1),x+Math.floor((w-h+15)/2),y+h-15,w);
					uctx.stroke();}
				} else {uctx.drawImage(this.iconImgs[fileDatas.Armys[j].icon-1],x,y,w,h);}
				
				if(fileDatas.Armys[j].belong==-1)uctx.fillStyle="#000000"; else uctx.fillStyle=RGBtoHex(fileDatas.Nations[fileDatas.Armys[j].belong].color);
				uctx.fillRect(x,y,20,20);
				
			}		
		this.imgdataArmy=uctx.getImageData(0,0,ucanvas.width,ucanvas.height);
		this.imgdataArmyB=uctx.getImageData(0,0,ucanvas.width,ucanvas.height);
		}
	}
//类尾---------------------------------
}


/**/