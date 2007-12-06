var gequakeBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gequakeBundle.createBundle("chrome://equake/locale/equake.properties");
var equakeMsgInterval = mystrings.GetStringFromName("equakenumber");

var gequakeOptions;
var equake_geo;

function equakeoptions_init() {
   gequakeOptions = new equakeOptions;
   gequakeOptions.loadOptions();
}

function equakeSetCharPref(name, value) {
	var prefservice = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
	var prefs = prefservice.getBranch("equake.");

	prefs.setCharPref(name, value);

	return true;
}

function equakeOptions() {
	this.ID_PrefService	= "@mozilla.org/preferences-service;1";
	this.PrefService	= Components.classes[this.ID_PrefService].getService(Components.interfaces.nsIPrefService).getBranch("");
}

function mapsSave()
{
	equake_geo = callMapsSave();
	equakeSetCharPref("geo",equake_geo);
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

function onMagChange(i)
{
  document.getElementById("equake.magval").disabled = !i.checked;
}

function chkIntValueMag(obj)
{
	var intValue = parseInt(obj.value);
	//validations
	if (!intValue || intValue == NaN || intValue<1 || intValue!=obj.value) 
	{
		//alert(equakenumber);
		obj.value=5;
		obj.focus();
	}
}

function chkIntValueMagIn(obj)
{
	var intValue = parseInt(obj.value);
	//validations
	if (!intValue || intValue == NaN || intValue<1 || intValue!=obj.value) 
	{
		//alert(equakenumber);
		obj.value=3;
		obj.focus();
	}
}

function chkIntValue()
{
	var obj	 = document.getElementById('equake.interval');
	var intValue = parseInt(obj.value);
	//validations
	if (!intValue || intValue == NaN || intValue<1 || intValue!=obj.value) 
	{
		alert(equakeMsgInterval);
		obj.value=5;
		obj.focus();
	}
}
   
equakeOptions.prototype = {

	saveOptions: function () {
		var equake_interval	 = document.getElementById('equake.interval');
		var equake_showday	 = document.getElementById('equake.showday');
		var equake_12clock	 = document.getElementById('equake.12clock');
		var equake_alert     = document.getElementById('equake.alert');
		var equake_status	   = document.getElementById('equake.status');		
		var equake_chkshakm	   = document.getElementById('equake.chkshakm');
		var equake_newtab	   = document.getElementById('equake.newtab');
		var equake_chkmag	   = document.getElementById('equake.chkmag');
		var equake_magval	   = document.getElementById('equake.magval');
		var equake_stat_str    = document.getElementById('equake.stat_str');
		var equake_shaketype   = document.getElementById('equake.shaketype');
		
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
		this.PrefService.setCharPref('equake.stat_str',equake_stat_str.value);
	},
	
	loadOptions: function() {
		var equake_interval	 = document.getElementById('equake.interval');
		var equake_showday	 = document.getElementById('equake.showday');
		var equake_12clock	 = document.getElementById('equake.12clock');
		var equake_alert     = document.getElementById('equake.alert');
		var equake_status	   = document.getElementById('equake.status');		
		var equake_chkshakm	   = document.getElementById('equake.chkshakm');
		var equake_newtab	   = document.getElementById('equake.newtab');
		var equake_chkmag	   = document.getElementById('equake.chkmag');
		var equake_magval	   = document.getElementById('equake.magval');
		var equake_stat_str    = document.getElementById('equake.stat_str');
		var equake_shaketype   = document.getElementById('equake.shaketype');
		var equake_maps		   = document.getElementById('equake.maps');
		var equake_mapsarea    = document.getElementById('equake.mapsarea');
		
		try
		{
			equake_interval.value		= this.PrefService.getIntPref('equake.interval');
		}
		catch (ignored)	{
		  this.PrefService.setIntPref('equake.interval',5); 
		  equake_interval.value=5;
    }
    
    try
		{
			equake_showday.checked		= this.PrefService.getBoolPref('equake.showday');
			equake_12clock.checked		= this.PrefService.getBoolPref('equake.12clock');
			equake_chkshakm.checked		= this.PrefService.getBoolPref('equake.chkshakm');
			equake_newtab.checked       = this.PrefService.getBoolPref('equake.newtab');
			equake_chkmag.checked		= this.PrefService.getBoolPref('equake.chkmag');
			equake_alert.value		    = this.PrefService.getIntPref('equake.alert');
			equake_status.value		    = this.PrefService.getIntPref('equake.status');
			equake_shaketype.value		= this.PrefService.getIntPref('equake.shaketype');
			equake_magval.value		    = this.PrefService.getCharPref('equake.magval');
			equake_stat_str.value		= this.PrefService.getCharPref('equake.stat_str');
			equake_geo 					= this.PrefService.getCharPref('equake.geo');
		}

		catch (ignored)	{
			equake_showday.checked=true;
			equake_12clock.checked=true;
			equake_chkshakm.checked=true;
			equake_newtab.checked=false;
			equake_chkmag.checked=false;
			equake_alert.value=0;
			equake_status.value=1;
			equake_magval=5;
			equake_stat_str.value="M %m, %l";
			equake_shaketype = 0;
			equake_geo=0;
		}

		onShakeChange(equake_alert.value);
		onStatusChange(equake_status.value);
		onMagChange(equake_chkmag);
		
		if (equake_geo==0)
			equake_maps.loadURI("chrome://equake/content/geo_disabled.htm?msg=Geofiltering is disabled. Please select a prestored area from the list above.");
		else
		{
			equake_maps.loadURI("http://www.freebookzone.com/equake/geomap.htm?geo="+equake_geo);
			equake_mapsarea.value=1;
		}
	}
}