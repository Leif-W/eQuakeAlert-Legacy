var equake_interval = 5;
var equake_showday = true;
var equake_12clock = true;
var equake_chkshakm = true;
var equake_newtab = false;
var equake_alert = 0;
var equake_chkmag = false;
var equake_magval = 0;
var firstrun=false;
var equake_timeout;

function equakeInit() {
	this.ID_PrefService	= "@mozilla.org/preferences-service;1";
	this.PrefService	= Components.classes[this.ID_PrefService].getService(Components.interfaces.nsIPrefService).getBranch("");
	equakeLoadPrefs();
	equakeUpdate();
	equakePrefObserver.register();
	return true;
}

function equakeClose() {
	equakePrefObserver.unregister();
	return true;
}

function equakeUpdate() {
	equakeCheck.getXML();
	equake_timeout = setTimeout("equakeUpdate()", equake_interval*60000);
	return;
}

/** Statusbar popup **/

function equakePopup(e) {
	var statusbar = document.getElementById("equake-display");
	var context = document.getElementById("equake-contextmenu");
	var x = e.clientX;
	var y = e.clientY;
	document.popupNode = statusbar;
	context.showPopup(statusbar, x, y, "bottomleft", "topleft");
}

/** Preferences **/

function equakeGetIntPref(name, defval) {
	var pref = defval;

	var prefservice = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
	var prefs = prefservice.getBranch("equake.");

	if(prefs.getPrefType(name) == prefs.PREF_INT)
		pref = prefs.getIntPref(name);

	return pref;
}

function equakeSetIntPref(name, value) {
	var prefservice = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
	var prefs = prefservice.getBranch("equake.");
	prefs.setIntPref(name, value);
	return true;
}

function equakeGetCharPref(name, defval) {
	var pref = defval;
	var prefservice = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
	var prefs = prefservice.getBranch("equake.");

	if(prefs.getPrefType(name) == prefs.PREF_STRING)
		pref = prefs.getCharPref(name);

	return pref;
}

function equakeSetCharPref(name, value) {
	var prefservice = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
	var prefs = prefservice.getBranch("equake.");

	prefs.setCharPref(name, value);

	return true;
}

function equakeGetBoolPref(name, defval) {
	var pref = defval;
	var prefservice = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
	var prefs = prefservice.getBranch("equake.");

	if(prefs.getPrefType(name) == prefs.PREF_STRING)
		pref = prefs.getBoolPref(name);

	return pref;
}

function equakeSetBoolPref(name, value) {
	var prefservice = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
	var prefs = prefservice.getBranch("equake.");

	prefs.setBoolPref(name, value);

	return true;
}

function equakeLoadPrefs() {

  equake_interval  = equakeGetIntPref("interval",equake_interval);
	try
		{
			equake_showday		= this.PrefService.getBoolPref('equake.showday');
			equake_12clock		= this.PrefService.getBoolPref('equake.12clock');
			equake_alert		= this.PrefService.getIntPref('equake.alert');
			equake_chkshakm		= this.PrefService.getBoolPref('equake.chkshakm');
			equake_newtab		= this.PrefService.getBoolPref('equake.newtab');
			equake_chkmag = this.PrefService.getBoolPref('equake.chkmag');
      equake_magval = parseFloat(this.PrefService.getCharPref('equake.magval'));
		}
	catch (ignored)	{
	    firstrun=true; 
		  this.PrefService.setBoolPref('equake.showday',true);
		  this.PrefService.setBoolPref('equake.12clock',true);
		  this.PrefService.setIntPref('equake.alert',0);
		  this.PrefService.setBoolPref('equake.chkshakm',true);
		  this.PrefService.setBoolPref('equake.newtab',false);
		  this.PrefService.setBoolPref('equake.chkmag',false);
      this.PrefService.setCharPref('equake.magval',"0");
		  
		   equake_showday	 = true;
	     equake_12clock	 = true;
	     equake_alert	 = 0;
	     equake_chkshakm = true;
	     equake_newtab = false;
	     equake_chkmag = false;
	     equake_magval = 0;
    }
	

  var m;
	m = document.getElementById("equake-interval");
  m.label="Interval: "+equake_interval+"min(s)";
  if (!firstrun)
  {
    var i;
    for (i=9;i>=0;i--)
    {
      m = document.getElementById("equake-item"+i);
      date=equakeGetCharPref("date_item" + i, "time");
      date=dateFormat(date, equake_12clock, 0, equake_showday);
      place=equakeGetCharPref("place_item" + i, "location");
      m.label=date+":- "+place;
    }
    m = document.getElementById("equake-display");
    m.label=place;
  }
  else
    firstrun=false;
  
	return;
}

var equakePrefObserver = {
	prefs: null,

	register: function() {
		var prefservice = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
		this.prefs = prefservice.getBranch("equake.");

		var internal = this.prefs.QueryInterface(Components.interfaces.nsIPrefBranchInternal);
		internal.addObserver("", this, false);
	},

	unregister: function() {
		if(!this.prefs)
			return;

		var internal = this.prefs.QueryInterface(Components.interfaces.nsIPrefBranchInternal);
		internal.removeObserver("", this);
	},

	observe: function(subject, topic, data) {
		if(topic != "nsPref:changed")
			return;
		
		if (data=="interval")
    {
		equakeLoadPrefs();

		if(equake_timeout != null)
			clearTimeout(equake_timeout);

		equakeUpdate();
		}
		else if(data.indexOf("_item")<0)
		  equakeLoadPrefs();
	}
}

function shake(j){
for (i=0;i,i<25;i++){
window.moveBy(0,j)
window.moveBy(j,0)
window.moveBy(0,-j)
window.moveBy(-j,0)
}
}

function getMag(strPlace, dec)
{
  var tmp=strPlace.substring(1,strPlace.indexOf(','))
  if (dec==0)
    return parseInt(tmp);
  else
    return parseFloat(tmp);
}

function getMagClass(strPlace)
{
intClass=getMag(strPlace, 1);
    if (intClass < 3)
      return "Micro";
    else if (intClass< 3.9)
      return "Minor";
    else if (intClass< 4.9)
      return "Light";
    else if (intClass< 5.9)
      return "Moderate";
    else if (intClass< 6.9)
      return "Strong";
    else if ( intClass< 7.9)
      return "Major";
    else(intClass> 7.9)
      return "Great";
}

function linkit(i)
{
    var strUrl;
    if (i==-1)
      strUrl="http://www.freebookzone.com/exec.php?cmd=firefox_addon";
    else
      strUrl=equakeGetCharPref("link_item" + i, "none");
      
    if (strUrl!="none") 
    {
      if (equake_newtab)
      {
        var newTab = getBrowser().addTab(strUrl);
        getBrowser().selectedTab = newTab;
      }
      else
      {
      	window._content.document.location = strUrl;
		    window.content.focus();
      }
    }
    else
      alert("n0 reC3nt dAta!");
}

function enc(str) 
{
  sig ="|:=" + b64_sha1(str);
  return sig;
}

function dateFormat(date, twelveHourClock, format, showday) {
	function padout(number) { return (number < 10) ? '0' + number : number; }
	date=fmtDate(date);
	var dayOfMonth = date.getDate();
	var year = date.getYear() + 1900;
	var day;
	switch (date.getDay()){
		case 0: day = "Sun"; break
		case 1: day = "Mon"; break
		case 2: day = "Tue"; break
		case 3: day = "Wed"; break
		case 4: day = "Thu"; break
		case 5: day = "Fri"; break
		case 6: day = "Sat"; break
	}

	var month, monthNum;
	monthNum = date.getMonth() + 1;
	switch (monthNum) {
		case 1: month = "Jan"; break
		case 2: month = "Feb"; break
		case 3: month = "Mar"; break
		case 4: month = "Apr"; break
		case 5: month = "May"; break
		case 6: month = "Jun"; break
		case 7: month = "Jul"; break
		case 8: month = "Aug"; break
		case 9: month = "Sep"; break
		case 10: month = "Oct"; break
		case 11: month = "Nov"; break
		case 12: month = "Dec"; break
	}

	var date_str;
	switch(format) {
		case 0:
		  if (showday)
		    date_str=day + ", ";
		  else
		    date_str="";
			date_str = date_str + month + " " + dayOfMonth;
			break
		case 1:
			date_str = monthNum + "/" + dayOfMonth;
			break
	}

	var hours = date.getHours();
  var minutes = padout(date.getMinutes());
  var seconds = padout(date.getSeconds());
	var adjhours, time_str;
	
	if(twelveHourClock) {
		adjhours = (hours == 0) ? 12 : ((hours < 13) ? hours : hours-12);
		time_str = adjhours + ":" + minutes + ((hours < 12) ? " AM" : " PM");
	} else {
		time_str = hours + ":" + minutes;
	}
	return date_str + " " + time_str;
}

/** Register global callbacks **/
window.addEventListener("load", equakeInit, false);
window.addEventListener("close", equakeClose, false);

var equakeCheck = {
	checking: false,
	httpReq: null,
	res: null,
	url: "",

	getXML: function(){
		if(this.checking) return;

  	this.url = "http://earthquake.usgs.gov/eqcenter/recenteqsww/catalogs/eqs7day-M2.5.xml";
		this.httpReq = new XMLHttpRequest();
		this.httpReq.onload = this.httpLoaded;
		this.httpReq.onreadystatechange = this.httpReadyStateChange;
		this.httpReq.open("GET", this.url);
		this.httpReq.setRequestHeader("User-Agent", "Mozilla/5.0 (eQuake)");
		this.httpReq.overrideMimeType("application/xml");
		try {
			this.httpReq.send(null);
		} catch(e) {
				//fail
			this.httpReq.abort();
			this.checking = false;
		}
	},
	
	httpReadyStateChange: function() {
	var status=-1;
		if(equakeCheck.httpReq.readyState == 4) {
			try {
				status=equakeCheck.httpReq.status;
			} catch(e) {
			  var id = document.getElementById("equake-display");
				id.label="No Connection";
			}
      if (status!=200)
      {
        var id = document.getElementById("equake-display");
        id.label="eQuake: "+status;
			}
		
		}
	},
	
	httpLoaded: function() {
		this.checking = false;
		
		var feed = new rssFmt(equakeCheck.httpReq.responseXML);
		var lastentry=equakeGetCharPref("equake-last","noentry");
    
 		var itemsSource = "";
		var items = feed.getItems();   
    var i=0;
    var link = items[i].getLink();
		var place = items[i].getTitle();
		var date = items[i].getContent();
		var id = document.getElementById("equake-display");
	  id.label = place;
    
    if (link+":"+place+date!=lastentry)
    {
      if (lastentry!="noentry") 
      {
        if (!equake_chkmag || getMag(place, 1)>=equake_magval)
        {
        switch(equake_alert)
        {
          case 0:
            if(equake_chkshakm)
              shake(getMag(place, 0));
            else
              shake(6);
            break;
          case 1:
            alert("Quake @ "+getMagClass(place)+", "+place+" on "+dateFormat(date, equake_12clock, 0, equake_showday));
            break;
          default:
            break;
        }
        }
      }
      
      equakeSetCharPref("equake-last",link+":"+place+date);

      for(i = 0; i<=9; i++) 
      {
        place = items[i].getTitle();
        date=items[i].getContent();
        link=items[i].getLink();
        equakeSetCharPref("date_item" + i, date);
        equakeSetCharPref("place_item" + i, place);
        equakeSetCharPref("link_item" + i, link);
      }
      equakeLoadPrefs();
    }

	}
}
