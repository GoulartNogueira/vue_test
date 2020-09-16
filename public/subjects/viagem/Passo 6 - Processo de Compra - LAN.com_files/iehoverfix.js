/** JavaScript **/
ieHover = function() 
	{
	
	var ieULs = document.getElementById('nav').getElementsByTagName('ul');
	/** IE script to cover <select> elements with <iframe>s **/
	for (j=0; j<ieULs.length; j++) 
		{
		ieULs[j].innerHTML = ('<iframe style="position:absolute" src="about:blank" scrolling="no" frameborder="0"></iframe>' + ieULs[j].innerHTML);
		var ieMat = ieULs[j].firstChild;
		ieMat.style.width=(ieULs[j].offsetWidth+10)+"px";
		ieMat.style.height=(ieULs[j].offsetHeight+13)+"px";
		ieMat.style.left = "0px";
		ieMat.style.zindex="1";
		ieULs[j].style.zIndex="5";
		}
	/** IE script to change class on mouseover **/
	var ieLIs = document.getElementsByTagName('li');
	for (var i=0; i<ieLIs.length; i++) 
		if (ieLIs[i]) 
			{
			ieLIs[i].onmouseover=function() {this.className+=" iehover";}
			ieLIs[i].onmouseout=function() {this.className=this.className.replace(' iehover', '');}
			}


	}
	
function arregla_anchos()
	{
	/*var divs = document.getElementsByTagName('div');
	for (j=0; j<divs.length; j++)
        	{
        	divs[j].zIndex = "100";
        	if(divs[j].className == "menu")
                	{
                	if(document.all)
                		divs[j].style.top = (divs[j].offsetTop+17)+"px";
                	divs[j].style.width = divs[j].parentNode.offsetWidth+"px";
                	}
		
        	}
	*/
	/*if (document.all)
		ieHover();*/
	}
	

	
/*if (window.attachEvent) 
	window.attachEvent('onLoad', ieHover);*/

/** end **/
