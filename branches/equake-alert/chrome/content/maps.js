var $ = function(x) { return  document.getElementById(x); };

function equake_mapsBrowserScope(){
	var src = window.location.href;
	if (src == "chrome://equake/content/options.xul"){
	return $('equake.maps').contentWindow;
	}
	else{
	return mainWindow.content.wrappedJSObject.document.getElementById("equake.maps").contentWindow.frames.wrappedJSObject;
	}
}

function callMapsSave()
{
  return equake_mapsBrowserScope().save();
}

function callMapsFit()
{
  equake_mapsBrowserScope().fit();
}

function callMapsCheck()
{
  equake_mapsBrowserScope().check();
}

function callMapsSwitch(area)
{
	var geo_asia="11.523087506868512,128.671875;1,10";
	var uri = "http://www.freebookzone.com/equake/geomap.htm";
	switch (parseInt(area))
	{
		case -1: //Disabled
			uri="chrome://equake/content/geo_disabled.htm";
			break;
		case 0: //Current
		default:
			uri+= "?geo="+equake_geo;
			break;
		case 1: //Asia
			uri+= "?geo="+geo_asia
			break;
	}
	alert(uri);
	$('equake.maps').loadURI(uri);
}
