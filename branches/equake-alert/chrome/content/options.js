var $ = function(x) { return  document.getElementById(x); };
var gequakeBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gequakeBundle.createBundle("chrome://equake/locale/equake.properties");
var equakeMsgInterval = mystrings.GetStringFromName("equakenumber");

this.ID_PrefService	= "@mozilla.org/preferences-service;1";
this.PrefService	= Components.classes[this.ID_PrefService].getService(Components.interfaces.nsIPrefService).getBranch("");

var equake_interval;
var equake_showday;
var equake_12clock;
var equake_alert;
var equake_status;
var equake_chkshakm;
var equake_newtab;
var equake_chkmag;
var equake_magval;
var equake_stat_str;
var equake_shaketype;
var equake_maps;
var equake_mapsarea;
var equake_geo;
var equake_chkmagin;
var equake_chkmagout;
var equake_maginval;
var equake_magoutval;

function equakeoptions_init() 
{
	equake_interval	 = document.getElementById('equake.interval');
	equake_showday	 = document.getElementById('equake.showday');
	equake_12clock	 = document.getElementById('equake.12clock');
	equake_alert     = document.getElementById('equake.alert');
	equake_status	   = document.getElementById('equake.status');		
	equake_chkshakm	 = document.getElementById('equake.chkshakm');
	equake_newtab	   = document.getElementById('equake.newtab');
	equake_chkmag	   = document.getElementById('equake.chkmag');
	equake_magval	   = document.getElementById('equake.magval');
	equake_stat_str  = document.getElementById('equake.stat_str');
	equake_shaketype = document.getElementById('equake.shaketype');
	
	equake_maps		   = document.getElementById('equake.maps');
	equake_mapsarea  = document.getElementById('equake.mapsarea');
	equake_chkmagin	 = document.getElementById('equake.chkmagin');
	equake_chkmagout = document.getElementById('equake.chkmagout');
	equake_maginval	 = document.getElementById('equake.maginval');
	equake_magoutval = document.getElementById('equake.magoutval');
	
    try
	{
		equake_showday.checked  = this.PrefService.getBoolPref('equake.showday');
		equake_12clock.checked	= this.PrefService.getBoolPref('equake.12clock');
		equake_chkshakm.checked	= this.PrefService.getBoolPref('equake.chkshakm');
		equake_newtab.checked   = this.PrefService.getBoolPref('equake.newtab');
		equake_chkmag.checked		= this.PrefService.getBoolPref('equake.chkmag');
		equake_alert.value		  = this.PrefService.getIntPref('equake.alert');
		equake_status.value		  = this.PrefService.getIntPref('equake.status');
		equake_shaketype.value  = this.PrefService.getIntPref('equake.shaketype');
		equake_magval.value		  = this.PrefService.getCharPref('equake.magval');
		equake_stat_str.value		= this.PrefService.getCharPref('equake.stat_str');
		
		equake_chkmagin.checked		= this.PrefService.getBoolPref('equake.chkmagin');
		equake_chkmagout.checked		= this.PrefService.getBoolPref('equake.chkmagout');
		equake_maginval.value		  = this.PrefService.getCharPref('equake.maginval');
		equake_magoutval.value		  = this.PrefService.getCharPref('equake.magoutval');
		
		//variables
		equake_geo 					= this.PrefService.getCharPref('equake.geo');
		loadRegions(equake_geo);
		
		equake_mapsarea.selectedIndex = this.PrefService.getIntPref('equake.mapsarea');
    
    onAreaSwitch(equake_mapsarea.value);
	}

	catch (e)	{
		//objects
		//alert("catch");
		//alert("An exception occurred in the script. Error name: " + e.name + ". Error description: " + e.description + ". Error number: " + e.number + ". Error message: " + e.message);
		equake_showday.checked=true;
		equake_12clock.checked=true;
		equake_chkshakm.checked=true;
		equake_newtab.checked=false;
		equake_chkmag.checked=false;
		equake_alert.value=0;
		equake_status.value=1;
		equake_magval.value=5;
		equake_stat_str.value="M %m, %l";
		equake_shaketype.value = 0;
		equake_mapsarea.selectedIndex=-1;
		//variables
		equake_geoEnabled = false;
		equake_geo=0;
	}
	
	try
	{
		equake_interval.value = this.PrefService.getIntPref('equake.interval');
	}
	catch (ignored)	
	{
		this.PrefService.setIntPref('equake.interval',5); 
		equake_interval.value=5;
  }

	onShakeChange(equake_alert.value);
	onStatusChange(equake_status.value);
/*	alert(equake_mapsarea.selectedIndex);
	if (equake_mapsarea.selectedIndex!=-1)
	{
		loadMap(equake_geo);
		callEnable();
	}
	else
		callDisable();
*/
}

function loadRegions(equake_geo)
{
//alert(equake_geo);
if (equake_geo)
{
  temp = equake_geo.split('|');
  //alert(temp.length);
  for (i=0;i<temp.length;i++)
  {
  	var tmpRegion = temp[i].split("=");
  	$("equake.mapsarea").appendItem(tmpRegion[0],tmpRegion[1],"");
  }
}
}

function saveOptions () {
  this.PrefService.setIntPref('equake.interval',equake_interval.value);
  this.PrefService.setIntPref('equake.alert',equake_alert.value);
 	this.PrefService.setIntPref('equake.status',equake_status.value);
	this.PrefService.setIntPref('equake.shaketype',equake_shaketype.value);
  this.PrefService.setBoolPref('equake.showday',equake_showday.checked);
  this.PrefService.setBoolPref('equake.12clock',equake_12clock.checked);
  this.PrefService.setBoolPref('equake.chkshakm',equake_chkshakm.checked);
  this.PrefService.setBoolPref('equake.newtab',equake_newtab.checked);
 	this.PrefService.setBoolPref('equake.chkmag',equake_chkmag.checked);
 	this.PrefService.setCharPref('equake.magval',equake_magval.value);
 	this.PrefService.setBoolPref('equake.chkmagin',equake_chkmagin.checked);
 	this.PrefService.setCharPref('equake.maginval',equake_maginval.value); 	
 	this.PrefService.setBoolPref('equake.chkmagout',equake_chkmagout.checked);
 	this.PrefService.setCharPref('equake.magoutval',equake_magoutval.value);
 	
	this.PrefService.setCharPref('equake.stat_str',equake_stat_str.value);
	equakeSetIntPref("mapsarea",equake_mapsarea.selectedIndex);
	//variable
	if (equake_mapsarea.selectedIndex!=-1)
	{
	 var i=1;
	 var tmpItem;
	 equake_geo="";
	 while(tmpItem = equake_mapsarea.getItemAtIndex(i++))
	 {
	   equake_geo+=tmpItem.label+"="+tmpItem.value+"|";
   }
		equake_geo = equake_geo.substring(0, equake_geo.length-1)
		equakeSetCharPref("geo",equake_geo);
	}
}

function loadMap(geo)
{
	var uri = "http://www.freebookzone.com/equake/gmaps.htm?geo="+geo;
	$('equake.maps').loadURIWithFlags(uri, 256);
}

function onAreaSwitch(area)
{
	var uri = "http://www.freebookzone.com/equake/gmaps.htm";
	//callEnable();
	if (area==-1)
	{
    //Disabled
    uri="chrome://equake/content/geo_disabled.htm?msg=Location based (Geo-Filtering) alert is disabled, eQuake will alert you on earthquakes arround the world. If you want alerts only on a selected area, please choose one from the above list or add an new region and point that over in the map.";
    $('equake.chkmagin').disabled=true;
    $('equake.chkmagout').disabled=true;
    $('equake.chkmag').disabled=false;
    
    $('btnSaveRegion').disabled=true;
    $('btnDelRegion').disabled=true;
  }
  else if (area!="" && area!=null && area!=undefined)
  {
		uri+= "?geo="+area;
		refreshControls();
	}
	else
	{
     refreshControls();
  }
    
    $('equake.maps').loadURIWithFlags(uri, 256);

  onMagChange($('equake.magval'), equake_chkmag);
  onMagChange($('equake.maginval'), equake_chkmagin);
  onMagChange($('equake.magoutval'), equake_chkmagout);
}

function onMagChange(obj, i)
{
  if (i.disabled)
    obj.disabled = true;
  else
    obj.disabled = !i.checked;
}

function refreshControls()
{

	 	$('equake.chkmagin').disabled=false;
    $('equake.chkmagout').disabled=false;
    $('equake.chkmag').disabled=true;
    $('btnSaveRegion').disabled=false;
    $('btnDelRegion').disabled=false;


}

function equakeSetCharPref(name, value) {
	var prefservice = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
	var prefs = prefservice.getBranch("equake.");
	prefs.setCharPref(name, value);
	return true;
}

function equakeSetBoolPref(name, value) {
	var prefservice = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
	var prefs = prefservice.getBranch("equake.");
	prefs.setBoolPref(name, value);
	return true;
}

function equakeSetIntPref(name, value) {
	var prefservice = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
	var prefs = prefservice.getBranch("equake.");
	prefs.setIntPref(name, value);
	return true;
}

function onStatusChange(i)
{
    if (i==1)
      document.getElementById("equake.stat_str").disabled = false;
    else
      document.getElementById("equake.stat_str").disabled = true;
}

function onShakeChange(i)
{
    if (i==0)
	{
      document.getElementById("equake.chkshakm").disabled = false;
	  document.getElementById("equake.shaketype").disabled = false;
	}
    else {
      document.getElementById("equake.chkshakm").disabled = true;
	  document.getElementById("equake.shaketype").disabled = true;
	}
}

function chkIntValueMag(obj)
{
	var intValue = parseFloat(obj.value);
	//validations
	if (!intValue || intValue == NaN || intValue<1 ) 
	{
		//alert(equakenumber);
		obj.value=5;
		obj.focus();
	}
	else
	 obj.value=intValue;
}

function chkIntValueMagIn(obj)
{
	var intValue = parseFloat(obj.value);
	//validations
	if (!intValue || intValue == NaN || intValue<1) 
	{
		//alert(equakenumber);
		obj.value=3;
		obj.focus();
	}
	else
	 obj.value=intValue;
}

function chkIntValue()
{
	var obj	 = document.getElementById('equake.interval');
	var intValue = parseFloat(obj.value);
	//validations
	if (!intValue || intValue == NaN || intValue<1) 
	{
		//alert(equakeMsgInterval);
		obj.value=5;
		obj.focus();
	}
	else
	 obj.value=intValue;
}

function callDisable()
{
	equake_maps.loadURI("chrome://equake/content/geo_disabled.htm?msg=Geofiltering is disabled. Please select a prestored area from the list above.");
	equake_mapsarea.selectedIndex=-1; //disabled
	equake_chkmagin.disabled=true;
	equake_chkmagout.disabled=true;
	equake_maginval.disabled=true;
	equake_magoutval.disabled=true;
}

function callEnable()
{
	equake_chkmagin.disabled=false;
	equake_chkmagout.disabled=false;
	equake_maginval.disabled=false;
	equake_magoutval.disabled=false;
}