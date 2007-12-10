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