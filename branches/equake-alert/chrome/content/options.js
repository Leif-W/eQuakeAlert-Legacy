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
	equake_chkshakm	   = document.getElementById('equake.chkshakm');
	equake_newtab	   = document.getElementById('equake.newtab');
	equake_chkmag	   = document.getElementById('equake.chkmag');
	equake_magval	   = document.getElementById('equake.magval');
	equake_stat_str    = document.getElementById('equake.stat_str');
	equake_shaketype   = document.getElementById('equake.shaketype');
	
	equake_maps		   = document.getElementById('equake.maps');
	equake_mapsarea    = document.getElementById('equake.mapsarea');
	equake_chkmagin	   = document.getElementById('equake.chkmagin');
	equake_chkmagout   = document.getElementById('equake.chkmagout');
	equake_maginval	   = document.getElementById('equake.maginval');
	equake_magoutval   = document.getElementById('equake.magoutval');
	
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
		equake_mapsarea.value		= this.PrefService.getIntPref('equake.mapsarea');
		//variables
		equake_geo 					= this.PrefService.getCharPref('equake.geo');
	}

	catch (ignored)	{
		//objects
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
		equake_mapsarea.value=-1;
		//variables
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
	onMagChange(equake_chkmag);
	if (equake_mapsarea.value!=-1)
	{
		loadMap(equake_geo);
		callEnable();
	}
	else
		callDisable();
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
	this.PrefService.setCharPref('equake.stat_str',equake_stat_str.value);
	equakeSetIntPref("mapsarea",equake_mapsarea.value);
	//variable
	if (equake_mapsarea.value!=-1)
	{
		equake_geo = callMapsSave();
		equakeSetCharPref("geo",equake_geo);
	}
}

function loadMap(geo)
{
	var uri = "http://www.freebookzone.com/equake/geomap.htm?geo="+geo;
	$('equake.maps').loadURI(uri);
}

function onAreaSwitch(area)
{
	var geo_asia='53.33087298301704,165.234375;65.6582745198266,176.484375;78.49055166160312,165.9375;78.76779175784321,113.90625;80.64703474739618,90;77.31251993823143,62.05078125;67.60922060496382,38.3203125;59.44507509904714,27.421875;46.55886030311719,37.08984375;39.774769485295465,24.43359375;13.923403897723347,43.59375;-7.362466865535738,103.7109375;-10.660607953624762,126.9140625;6.315298538330033,125.15625;28.92163128242129,132.1875';
	//var geo_def='11.523087506868512,128.671875;-0.3515602939922709,157.8515625;-9.79567758282973,156.09375;-25.79989118208832,159.609375;-47.75409797968002,149.765625;-37.99616267972812,134.296875;-37.71859032558814,121.640625;-36.87962060502676,108.6328125;-17.978733095556155,97.03125;9.102096738726456,91.7578125;13.239945499286312,87.5390625;33.7243396617476,88.2421875;25.48295117535531,122.6953125;11.523087506868512,128.671875;11.523087506868512,128.671875';
	var geo_afr="11.86735091145932,52.03125;-4.915832801313164,50.625;-27.059125784374054,50.625;-34.30714385628803,30.234375;-37.71859032558814,18.984375;-23.241346102386135,11.25;-4.915832801313164,10.546875;2.1088986592431382,0;2.1088986592431382,-17.578125;23.241346102386135,-20.390625;38.8225909761771,-4.921875;34.30714385628804,16.171875;35.460669951495305,35.15625;17.97873309555617,40.078125";
	var geo_aus='0.3515602939922709,134.6484375;-2.811371193331128,157.1484375;-38.54816542304657,179.6484375;-48.224672649565186,169.453125;-43.06888777416961,152.9296875;-45.58328975600631,142.734375;-34.59704151614416,134.296875;-34.016241889667015,124.8046875;-34.88593094075315,113.5546875;-28.30438068296277,110.7421875;-22.268764039073965,112.5;-16.97274101999902,113.90625;-14.264383087562635,120.5859375;-11.867350911459308,127.6171875;-10.14193168613103,133.9453125';
	var geo_eur='59.88893689676585,32.6953125;69.03714171275197,41.8359375;72.81607371878991,32.6953125;70.95969716686398,12.3046875;66.08936427047087,7.734375;67.87554134672945,-24.2578125;64.01449619484472,-29.1796875;54.77534585936447,-16.171875;45.336701909968106,-14.765625;35.746512259918504,-12.65625;37.71859032558813,4.921875;33.7243396617476,21.796875;41.50857729743935,28.828125;46.55886030311719,47.4609375;52.696361078274485,36.9140625';
	var geo_n_amer = '81.20141954209073,-4.21875;83.9050579559856,-29.8828125;83.71554430601263,-76.9921875;80.76061470752451,-103.359375;74.30735341486246,-137.8125;70.37785394109224,-167.34375;51.83577752045248,-170.859375;52.26815737376817,-146.953125;12.211180191503997,-109.6875;6.664607562172585,-80.859375;25.79989118208833,-56.25;53.33087298301704,-49.921875;62.915233039476135,-34.453125;74.68325030051861,-11.25';
	var geo_s_amer = '1.4061088354351594,-32.34375;-10.487811882056683,-27.0703125;-22.268764039073965,-34.8046875;-34.016241889667015,-43.9453125;-48.92249926375824,-51.6796875;-58.63121664342478,-66.796875;-52.908902047770255,-80.859375;-39.368279149160124,-80.5078125;-21.616579336740593,-78.046875;-10.487811882056683,-84.0234375;5.266007882805498,-85.78125;16.63619187839765,-74.8828125;17.644022027872722,-60.46875;7.710991655433229,-47.8125';
	var geo_antarctica = '-84.8024737243345,168.75;-70.14036427207168,171.5625;-64.16810689799152,113.90625;-61.60639637138627,49.21875;-62.91523303947613,5.625;-64.77412531292872,-52.03125;-68.65655498475735,-119.53125;-70.61261423801925,-142.03125;-78.06198918665973,-161.71875;-85.1709701284095,-154.6875;-85.1709701284095,-60.46875;-84.8024737243345,1.40625;-84.54136107313407,73.125;-84.8024737243345,133.59375';
	//53.33087298301704,165.234375;65.6582745198266,176.484375;78.49055166160312,165.9375;78.76779175784321,113.90625;77.157162522661,89.296875;73.22669969306126,70.3125;68.39918004344189,33.046875;54.57206165565852,24.609375;43.58039085560784,32.34375;26.43122806450644,39.375;0,83.671875;-12.554563528593656,103.359375;-13.923403897723334,125.859375;6.315298538330033,125.15625;28.92163128242129,132.1875
				  
	var uri = "http://www.freebookzone.com/equake/geomap.htm";
	callEnable();
	switch (parseInt(area))
	{
		case -1: //Disabled
			default:
			uri="chrome://equake/content/geo_disabled.htm?msg=Geofiltering is disabled. Please select a prestored area from the list above.";
			callDisable();
			break;
		case 0: //Default
			uri+= "?geo="+geo_def;
			callDisable();
			break;
		case 1: //Current
			uri+= "?geo="+equake_geo;
			break;
		case 2: //Africa
			uri+= "?geo="+geo_afr
			break;
		case 3: //Asia
			uri+= "?geo="+geo_asia
			break;
		case 4: //Australia
			uri+= "?geo="+geo_aus
			break;
		case 5: //Europe
			uri+= "?geo="+geo_eur
			break;
		case 6: //North America
			uri+= "?geo="+geo_n_amer
			break;		
		case 7: //South America
			uri+= "?geo="+geo_s_amer
			break;		
		case 8: //Antarctica
			uri+= "?geo="+geo_antarctica
			break;
	}
	//alert(uri);
	$('equake.maps').loadURI(uri);
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

function callDisable()
{
	equake_maps.loadURI("chrome://equake/content/geo_disabled.htm?msg=Geofiltering is disabled. Please select a prestored area from the list above.");
	equake_mapsarea.value=-1; //disabled
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