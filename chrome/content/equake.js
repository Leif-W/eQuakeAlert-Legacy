var gequakeBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gequakeBundle.createBundle("chrome://equake/locale/equake.properties");
var equakeinterval = mystrings.GetStringFromName("equakeinterval");
var equakemins = mystrings.GetStringFromName("equakemins");
var equakemicro = mystrings.GetStringFromName("equakemicro");
var equakeminor = mystrings.GetStringFromName("equakeminor");
var equakelight = mystrings.GetStringFromName("equakelight");
var equakemoderate = mystrings.GetStringFromName("equakemoderate");
var equakestrong = mystrings.GetStringFromName("equakestrong");
var equakemajor = mystrings.GetStringFromName("equakemajor");
var equakegreat = mystrings.GetStringFromName("equakegreat");
var equakesun = mystrings.GetStringFromName("equakesun");
var equakemon = mystrings.GetStringFromName("equakemon");
var equaketue = mystrings.GetStringFromName("equaketue");
var equakewed = mystrings.GetStringFromName("equakewed");
var equakethu = mystrings.GetStringFromName("equakethu");
var equakefri = mystrings.GetStringFromName("equakefri");
var equakesat = mystrings.GetStringFromName("equakesat");
var equakejan = mystrings.GetStringFromName("equakejan");
var equakefeb = mystrings.GetStringFromName("equakefeb");
var equakemar = mystrings.GetStringFromName("equakemar");
var equakeapr = mystrings.GetStringFromName("equakeapr");
var equakemay = mystrings.GetStringFromName("equakemay");
var equakejun = mystrings.GetStringFromName("equakejun");
var equakejul = mystrings.GetStringFromName("equakejul");
var equakeaug = mystrings.GetStringFromName("equakeaug");
var equakesep = mystrings.GetStringFromName("equakesep");
var equakeoct = mystrings.GetStringFromName("equakeoct");
var equakenov = mystrings.GetStringFromName("equakenov");
var equakedec = mystrings.GetStringFromName("equakedec");
var equakeequakeerror = mystrings.GetStringFromName("equakeequakeerror");
var equakenoconnection = mystrings.GetStringFromName("equakenoconnection");
var equakepm = mystrings.GetStringFromName("equakepm");
var equakeam = mystrings.GetStringFromName("equakeam");

var equake_interval = 5;
var equake_showday = true;
var equake_12clock = true;
var equake_alert = 0;
var equake_status = 1;
var equake_chkshakm = true;
var equake_newtab = false;
var equake_chkmag = false;
var equake_magval = 5;
var equake_stat_str="M %m, %l";
var ifModifiedSince =  new Date(0);
var reloadData=false;
var equake_shaketype;

var equake_dbidx=0;
var firstrun=false;
var equake_timeout;
var icon_timeout;
var equake_stat_popup=true;
var anim;
var animateYStart_=-100;
var animateY_ = 40;
var status=-1;

//Geo
var equake_geo="Asia=53.33087298301704,165.234375;65.6582745198266,176.484375;78.49055166160312,165.9375;78.76779175784321,113.90625;80.64703474739618,90;77.31251993823143,62.05078125;67.60922060496382,38.3203125;59.44507509904714,27.421875;46.55886030311719,37.08984375;39.774769485295465,24.43359375;13.923403897723347,43.59375;-7.362466865535738,103.7109375;-10.660607953624762,126.9140625;6.315298538330033,125.15625;28.92163128242129,132.1875|Africa=11.86735091145932,52.03125;-4.915832801313164,50.625;-27.059125784374054,50.625;-34.30714385628803,30.234375;-37.71859032558814,18.984375;-23.241346102386135,11.25;-4.915832801313164,10.546875;2.1088986592431382,0;2.1088986592431382,-17.578125;23.241346102386135,-20.390625;38.8225909761771,-4.921875;34.30714385628804,16.171875;35.460669951495305,35.15625;17.97873309555617,40.078125|Australia=0.3515602939922709,134.6484375;-2.811371193331128,157.1484375;-38.54816542304657,179.6484375;-48.224672649565186,169.453125;-43.06888777416961,152.9296875;-45.58328975600631,142.734375;-34.59704151614416,134.296875;-34.016241889667015,124.8046875;-34.88593094075315,113.5546875;-28.30438068296277,110.7421875;-22.268764039073965,112.5;-16.97274101999902,113.90625;-14.264383087562635,120.5859375;-11.867350911459308,127.6171875;-10.14193168613103,133.9453125|Europe=59.88893689676585,32.6953125;69.03714171275197,41.8359375;72.81607371878991,32.6953125;70.95969716686398,12.3046875;66.08936427047087,7.734375;67.87554134672945,-24.2578125;64.01449619484472,-29.1796875;54.77534585936447,-16.171875;45.336701909968106,-14.765625;35.746512259918504,-12.65625;37.71859032558813,4.921875;33.7243396617476,21.796875;41.50857729743935,28.828125;46.55886030311719,47.4609375;52.696361078274485,36.9140625|North America=81.20141954209073,-4.21875;83.9050579559856,-29.8828125;83.71554430601263,-76.9921875;80.76061470752451,-103.359375;74.30735341486246,-137.8125;70.37785394109224,-167.34375;51.83577752045248,-170.859375;52.26815737376817,-146.953125;12.211180191503997,-109.6875;6.664607562172585,-80.859375;25.79989118208833,-56.25;53.33087298301704,-49.921875;62.915233039476135,-34.453125;74.68325030051861,-11.25|South America=1.4061088354351594,-32.34375;-10.487811882056683,-27.0703125;-22.268764039073965,-34.8046875;-34.016241889667015,-43.9453125;-48.92249926375824,-51.6796875;-58.63121664342478,-66.796875;-52.908902047770255,-80.859375;-39.368279149160124,-80.5078125;-21.616579336740593,-78.046875;-10.487811882056683,-84.0234375;5.266007882805498,-85.78125;16.63619187839765,-74.8828125;17.644022027872722,-60.46875;7.710991655433229,-47.8125|Antartica=-84.8024737243345,168.75;-70.14036427207168,171.5625;-64.16810689799152,113.90625;-61.60639637138627,49.21875;-62.91523303947613,5.625;-64.77412531292872,-52.03125;-68.65655498475735,-119.53125;-70.61261423801925,-142.03125;-78.06198918665973,-161.71875;-85.1709701284095,-154.6875;-85.1709701284095,-60.46875;-84.8024737243345,1.40625;-84.54136107313407,73.125;-84.8024737243345,133.59375"; 
var equake_geoAreaIndex=0;
var equake_chkmagin;
var equake_chkmagout;
var equake_maginval;
var equake_magoutval;

var m;

function Angle2D(x1, y1, x2, y2)
{
   var dtheta,theta1,theta2;
   var TWOPI = Math.PI * 2;

   theta1 = Math.atan2(y1,x1);
   theta2 = Math.atan2(y2,x2);
   dtheta = theta2 - theta1;
   while (dtheta > Math.PI)
      dtheta -= TWOPI;
   while (dtheta < -Math.PI)
      dtheta += TWOPI;

   return(dtheta);
}


function equakeInit() {
	this.ID_PrefService	= "@mozilla.org/preferences-service;1";
	this.PrefService	= Components.classes[this.ID_PrefService].getService(Components.interfaces.nsIPrefService).getBranch("");
	equakeLoadPrefs();
	equakeUpdate(-1);
	equakePrefObserver.register();
	return true;
}

function equakeClose() {
	equakePrefObserver.unregister();
	return true;
}

function equakeUpdate(mode) 
{
	if(equake_timeout != null)
	 clearTimeout(equake_timeout);
	if (mode==-1)
	equakeCheck.getXML(-1);
  else
	equakeCheck.getXML(0);
	equake_timeout = setTimeout("equakeUpdate(0)", equake_interval*60000);
	return;
}

/** Statusbar popup menu **/
function equakePopup(e, statusbar) {
	//var statusbar = document.getElementById("equake-display");
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

function showPopup() {
  var notifier=document.getElementById("equake-notifier");
  notifier.style.right = (window.innerWidth - window.gBrowser.contentDocument.clientWidth) + 5 +"px";
  ClearAnimation();
  StartAnimation();
  notifier.hidden=false;
}

function ClearAnimation(){
  var notifier=document.getElementById("equake-notifier");
  notifier.style.bottom = animateY_ + "px";
  clearInterval(anim);
}
function StartAnimation() {
  var notifier=document.getElementById("equake-notifier");
  notifier.style.bottom = animateYStart_ + "px";
  anim = setInterval("Animate()", 15);
}

function Animate() {
  var notifier=document.getElementById("equake-notifier");
  var next = parseInt(notifier.style.bottom) + 5;
  if (next > animateY_) {
    clearInterval(anim);
    next = animateY_;
  }
  notifier.style.bottom = next + "px";
}

function equakeLoadPrefs() {
	try
	{
		equake_alert		= this.PrefService.getIntPref('equake.alert');
		equake_status		= this.PrefService.getIntPref('equake.status');
		equake_interval  	= this.PrefService.getIntPref('equake.interval');
		equake_dbidx 		= this.PrefService.getIntPref('equake.dbidx');
		equake_showday		= this.PrefService.getBoolPref('equake.showday');
		equake_12clock		= this.PrefService.getBoolPref('equake.12clock');
		equake_chkshakm		= this.PrefService.getBoolPref('equake.chkshakm');
		equake_newtab		= this.PrefService.getBoolPref('equake.newtab');
		equake_chkmag 		= this.PrefService.getBoolPref('equake.chkmag');
		equake_stat_popup 	= this.PrefService.getBoolPref('equake.stat_popup');
		equake_magval 		= this.PrefService.getCharPref('equake.magval');
		equake_stat_str		= this.PrefService.getCharPref('equake.stat_str');
		ifModifiedSince     = this.PrefService.getCharPref('equake.ifModifiedSince');
		equake_shaketype	= this.PrefService.getIntPref('equake.shaketype');
		 //Geo
		equake_geo =  this.PrefService.getCharPref('equake.geo');
		equake_geoAreaIndex = this.PrefService.getIntPref('equake.mapsarea');
		equake_chkmagin = this.PrefService.getBoolPref('equake.chkmagin');
    equake_chkmagout = this.PrefService.getBoolPref('equake.chkmagout');
    equake_maginval = this.PrefService.getCharPref('equake.maginval');
    equake_magoutval = this.PrefService.getCharPref('equake.magoutval');
	}
	catch (e)	{
		//alert("An exception occurred in the script. Error name: " + e.name + ". Error description: " + e.description + ". Error number: " + e.number + ". Error message: " + e.message);
    firstrun=true;
		this.PrefService.setBoolPref('equake.showday',equake_showday);
		this.PrefService.setBoolPref('equake.12clock',equake_12clock);
		this.PrefService.setBoolPref('equake.chkshakm',equake_chkshakm);
		this.PrefService.setBoolPref('equake.newtab',equake_newtab);
		this.PrefService.setBoolPref('equake.chkmag',equake_chkmag);
		this.PrefService.setIntPref('equake.interval',equake_interval);
		this.PrefService.setIntPref('equake.alert',equake_alert);
		this.PrefService.setIntPref('equake.status',equake_status);
		this.PrefService.setCharPref('equake.magval',equake_magval);
		this.PrefService.setCharPref('equake.stat_str',equake_stat_str);
		this.PrefService.setBoolPref('equake.stat_popup',equake_stat_popup);
		this.PrefService.setIntPref('equake.dbidx',equake_dbidx);
		this.PrefService.setIntPref('equake.shaketype',equake_shaketype);
		//Geo
		this.PrefService.setCharPref('equake.geo',equake_geo);
		this.PrefService.setIntPref('equake.mapsarea',equake_geoAreaIndex);
    this.PrefService.setBoolPref('equake.chkmagin',equake_chkmagin);                   
    this.PrefService.setBoolPref('equake.chkmagout',equake_chkmagout);
    this.PrefService.setCharPref('equake.maginval',equake_maginval);
    this.PrefService.setCharPref('equake.magoutval',equake_magoutval);
	}
	
	if (equake_interval<=0) equake_interval=1;

  var m_StatMsg;
  var m_StatIcn;
  var m_Interval;
  m_StatMsg = document.getElementById("equake-display");
  m_StatIcn = document.getElementById("equake-display-icon");
  
  m_Interval = document.getElementById("equake-interval");
  m_Interval.label=equakeinterval+": "+equake_interval+ " " + equakemins;

  if (!firstrun)
  {
    var i;
	
	for (i=9;i>=0;i--)
    {
      m = document.getElementById("equake-fitem"+i);
      date=equakeGetCharPref("fdate_item" + i, "");
	  if (date=="") continue;
	  m.setAttribute("hidden",false);
      date=dateFormat(date, equake_12clock, 0, equake_showday);
      place=equakeGetCharPref("fplace_item" + i, "location");
      m.label=date+":- "+place;
    }

  m = document.getElementById("equake-filter");	
  if (equake_chkmag || equake_chkmagin || equake_chkmagout)
  {
      m.setAttribute("hidden",false);
  }
  else
  {
      m.setAttribute("hidden",true);
  }

    for (i=9;i>=0;i--)
    {
      m = document.getElementById("equake-item"+i);
      date=equakeGetCharPref("date_item" + i, "");
	    if (date=="")  {
        continue;
      }
	    m.setAttribute("hidden",false);
      date=dateFormat(date, equake_12clock, 0, equake_showday);
      place=equakeGetCharPref("place_item" + i, "location");
      m.label=date+":- "+place;
    }
	
	if (place)
	{
    var str_Tmp=place.split(", ");
    var str_M=str_Tmp[0].slice(1);
    var str_L=str_Tmp[1];
    if (str_Tmp[2]) {
		str_L+=", "+str_Tmp[2];
	}
	m_StatMsg.label=equake_stat_str.replace("%m",str_M).replace("%l",str_L);
	}
	
  switch(equake_status)
  {
    case 0:
      m_StatMsg.setAttribute("hidden",true);
      m_StatIcn.setAttribute("hidden",false);
      break;
    case 1:
      m_StatMsg.setAttribute("hidden",false);
      m_StatIcn.setAttribute("hidden",true);
      break;
  }
    showPopup();
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
			
    if (data=="magval" || data=="chkmag") {
      reloadData=true;
      equake_timeout = setTimeout("equakeUpdate(0)", 1000);
    }
			
		if (data=="interval")   {
			equakeLoadPrefs();
			equakeUpdate(0);
		}
		else if(data.indexOf("_item")<0) {
			equakeLoadPrefs();
		}
	}
}

function maximize() /* Function to Maximise the Browser Windows */ 
{
    window.moveTo(0,0)
    window.resizeTo(screen.availWidth, screen.availHeight)
}

function iconUpdate(op) {
	m = document.getElementById("equake-display-icon");
    if (op==0) {
		m.src="chrome://equake/skin/earth.png";
	}
	else if (op==1)
	{
		m.src="chrome://equake/skin/qearth.png";
		
		if(icon_timeout != null)
			clearTimeout(icon_timeout);
		icon_timeout = setTimeout("iconUpdate(0)", 5 * 60000);
	}
}

function callShake(tmpMag)
{
	if (equake_shaketype==0)
		shakeItOld(tmpMag);
	else
		shakeIt(tmpMag);
}


function shake(mag) {
	iconUpdate(1);

	oldX=window.screenX;
	oldY=window.screenY;
	oldOutWidth=(window.outerWidth<=160)?screen.availWidth:window.outerWidth;
	oldOutHeight=(window.outerHeight<34)?screen.availHeight:window.outerHeight;

	if (oldX<-4 && oldY <-4) //minimized
	{
		oldX=-4;
		oldY=-4;
	}

	if (equake_shaketype==0)
		shakeItOld(mag);
	else
		shakeIt(mag);
	    
	//Back to Windows Old Settings    
	window.moveTo(oldX,oldY);
	window.resizeTo(oldOutWidth,oldOutHeight);
}

function getMag(strPlace, dec) {
  var tmp=strPlace.substring(1,strPlace.indexOf(','))
  if (dec==0)
    return parseInt(tmp);
  else
    return parseFloat(tmp);
}

function getMagClass(strPlace) {
intClass=getMag(strPlace, 1);
    if (intClass < 3)
      return equakemicro;
    else if (intClass< 3.9)
      return equakeminor;
    else if (intClass< 4.9)
      return equakelight;
    else if (intClass< 5.9)
      return equakemoderate;
    else if (intClass< 6.9)
      return equakestrong;
    else if ( intClass< 7.9)
      return equakemajor;
    else(intClass> 7.9)
      return equakegreat;
}

function linkit(i) {
    var strUrl;
    if (i==-1)
      strUrl="http://www.freebookzone.com/exec.php?cmd=firefox_addon";
	else if (i>=10)
	  strUrl=equakeGetCharPref("flink_item" + i%10, "none");
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
      alert("n0 reC3nt d@tA!");
}

function dateFormat(date, twelveHourClock, format, showday) {
	function padout(number) { return (number < 10) ? '0' + number : number; }
	date=fmtDate(date);
	var dayOfMonth = date.getDate();
	var year = date.getYear() + 1900;
	var day;
	switch (date.getDay()){
		case 0: day = equakesun; break
		case 1: day = equakemon; break
		case 2: day = equaketue; break
		case 3: day = equakewed; break
		case 4: day = equakethu; break
		case 5: day = equakefri; break
		case 6: day = equakesat; break
	}

	var month, monthNum;
	monthNum = date.getMonth() + 1;
	switch (monthNum) {
		case 1: month = equakejan; break
		case 2: month = equakefeb; break
		case 3: month = equakemar; break
		case 4: month = equakeapr; break
		case 5: month = equakemay; break
		case 6: month = equakejun; break
		case 7: month = equakejul; break
		case 8: month = equakeaug; break
		case 9: month = equakesep; break
		case 10:month = equakeoct; break
		case 11:month = equakenov; break
		case 12:month = equakedec; break
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
		time_str = adjhours + ":" + minutes + " " + ((hours < 12) ? equakeam : equakepm);
	} else {
		time_str = hours + ":" + minutes;
	}
	return date_str + " " + time_str;
}

function alertUser(getMagClassStr, place, date)
{
  switch(equake_alert)
  {
    		          case 0:
    		            //Alert now
    		            if(equake_chkshakm)
    		              shake(getMag(place, 0));
    		            else
    		              shake(5);
    		            break;
    		          case 1:
    		            alert("Quake @ "+getMagClassStr+", "+place+" on "+dateFormat(date, equake_12clock, 0, equake_showday));
    		            break;
    		          default:
    		            break;
}
}

/** Register global callbacks **/
window.addEventListener("load", equakeInit, false);
window.addEventListener("close", equakeClose, false);

var equakeCheck = {
	checking: false,
	httpReq: null,
	res: null,
	url: "",

	getXML: function(mode){
		if(this.checking) return;
		//this.checking = true;
    if (equake_dbidx==0)
	{
   //this.url = "http://earthquake.usgs.gov/eqcenter/recenteqsww/catalogs/eqs7day-M2.5.xml";
	 this.url = "http://earthquake.usgs.gov/eqcenter/catalogs/eqs7day-M2.5.xml";
	 //this.url = "http://earthquake.usgs.gov/eqcenter/catalogs/eqs7day-M2.5.xml.gz";
	}
  	else {
  	 //this.url = "http://earthquake.usgs.gov/eqcenter/recenteqsww/catalogs/eqs7day-M5.xml";
	 this.url = "http://earthquake.usgs.gov/eqcenter/catalogs/eqs7day-M5.xml";
	}

		this.httpReq = new XMLHttpRequest();
		this.httpReq.onload = this.httpLoaded;
		this.httpReq.onreadystatechange = this.httpReadyStateChange;
		this.httpReq.open("GET", this.url);
		this.httpReq.setRequestHeader("User-Agent", "Mozilla/5.0 (eQuake) http://www.freebookzone.com");
		this.httpReq.overrideMimeType("application/xml");
		if (mode!=-1)
		{
  		ifModifiedSince = equakeGetCharPref("ifModifiedSince", new Date(0));
  		this.httpReq.setRequestHeader("If-Modified-Since", ifModifiedSince);
		}
		try {
			this.httpReq.send(null);
		} catch(e) {
				//fail
			this.httpReq.abort();
			this.checking = false;
		}
	},
	
	httpReadyStateChange: function() {
		if(equakeCheck.httpReq.readyState == 4) {
			try {
				status=equakeCheck.httpReq.status;
			} catch(e) {
				var id = document.getElementById("equake-display");
				status=-1;
				//id.label=equakenoconnection;
			}
			
	    if (status==200) {
			ifModifiedSince = equakeCheck.httpReq.getResponseHeader("Last-Modified");
			ifModifiedSince = (ifModifiedSince) ? ifModifiedSince : new Date(0); // January 1, 1970
			equakeSetCharPref("ifModifiedSince",ifModifiedSince);
		  }
		  else if(status==304) {
			 return;
		  }
		  /*else
	    {
	        var id = document.getElementById("equake-display");
	        id.label=equakeequakeerror+": "+status;
		  }*/
		}
	},
	
	httpLoaded: function() {
	if (status!=200) return;
		var feed = new rssFmt(equakeCheck.httpReq.responseXML);
		var lastentry=equakeGetCharPref("equake-last","noentry");
    
 		var itemsSource = "";
		var items = feed.getItems();
		var i=0;
		var link = items[i].getLink();
		var place = items[i].getTitle();
		var date = items[i].getContent();
		var id = document.getElementById("equake-display");
		//Geo
		var newPolygon = new Array();
    var tempGeos = equake_geo.split('|');
    var geo_lat = items[i].getLat();
		var geo_lng = items[i].getLng();

	    if (link+":"+place+date!=lastentry)
	    {
	      if (lastentry!="noentry") 
	      {
	          if (equake_geoAreaIndex == 0) //GeoFilter Not Enabled
	          {
    	        if (!equake_chkmag || getMag(place, 1)>=equake_magval) //Magnitude Based Filter Checking
    	        {
    	          //Alert Now
      	        alertUser(getMagClass(place), place, date);
    	        }
    			    else
    			    {
    				    iconUpdate(1);
    			    }
            }
            else //Check whether the Quake is in the Selected Geography
            {              
              tempRegion = tempGeos[equake_geoAreaIndex-1].split("=");                  
              userRegion = tempRegion[1]; //Holds the Geo Points thats user has selected.
              
              temp = userRegion.split(';');
              
              for (i=0;i<temp.length;i++)
              { 
                newPolygon.push(temp[i]);
              }
              if (pnpoly(newPolygon.length, newPolygon, geo_lat, geo_lng)) /* The Quake is in the userselected area */
              {
              //Check the Magnitude Preference
                if (!equake_chkmagin || (equake_chkmagin && getMag(place, 1)>=equake_maginval))
                {
                  //Alert
                  alertUser(getMagClass(place), place, date);
                }
              }
              else
              {
              //Earthquake is Outside the user Selected Region
                if (equake_chkmagout && getMag(place, 1)>=equake_magoutval)
                {
                  //Alert
                  alertUser(getMagClass(place), place, date);
                }
                else if (!equake_chkmagout)
                {
                  //Filter Magnitude Disabled
                  //No action
                  ;
                }
              }
            } 
        }
      }
	      
	  if (reloadData==true || link+":"+place+date!=lastentry)
	  {
     equakeSetCharPref("equake-last",link+":"+place+date);
	    		  for(i = 0; i<=9; i++) 
	      {
			equakeSetCharPref("fdate_item" + i, "");
			equakeSetCharPref("fplace_item" + i, "");
			equakeSetCharPref("flink_item" + i, "");
	    equakeSetCharPref("date_item" + i, "");
	    equakeSetCharPref("place_item" + i, "");
	    equakeSetCharPref("link_item" + i, "");			
		  m = document.getElementById("equake-item"+i);
			m.setAttribute("hidden",true);
			m = document.getElementById("equake-fitem"+i);
			m.setAttribute("hidden",true);
		  }
		  
		  for(i = 0; i<=9; i++) 
	    {
	        place = items[i].getTitle();
	        date=items[i].getContent();
	        link=items[i].getLink();
	        equakeSetCharPref("date_item" + i, date);
	        equakeSetCharPref("place_item" + i, place);
	        equakeSetCharPref("link_item" + i, link);
	    }
		  
		  if (equake_chkmag || equake_chkmagin || equake_chkmagout)
		  {
			  i=0;
			  var j=0;
			  
			  do
			  {
  				if (!items[i]) break;
  				place = items[i].getTitle();
  				tmpgeo_lat = items[i].getLat();
		      tmpgeo_lng = items[i].getLng();
  				curMag = getMag(place, 1);
  				//alert("curMag="+curMag+" equake_magval="+equake_magval+" equake_maginval="+equake_maginval+"equake_magoutval="+equake_magoutval);
  				
  				if (equake_geoAreaIndex==0 && equake_chkmag && curMag>=equake_magval)
  				{
  				    //alert("equake_magval");
    					date=items[i].getContent();
    					link=items[i].getLink();
    					equakeSetCharPref("fdate_item" + j, date);
    					equakeSetCharPref("fplace_item" + j, place);
    					equakeSetCharPref("flink_item" + j++, link);				
  				}
  				else if (equake_chkmagin && curMag>=equake_maginval && pnpoly(newPolygon.length, newPolygon, tmpgeo_lat, tmpgeo_lng))
  				{
  				    //alert("equake_magvalin");
    					date=items[i].getContent();
    					link=items[i].getLink();
    					equakeSetCharPref("fdate_item" + j, date);
    					equakeSetCharPref("fplace_item" + j, place);
    					equakeSetCharPref("flink_item" + j++, link);				
          }
          else if (equake_chkmagout && curMag>=equake_magoutval && !pnpoly(newPolygon.length, newPolygon, tmpgeo_lat, tmpgeo_lng))
  				{
  				    //alert("equake_magvalout");
    					date=items[i].getContent();
    					link=items[i].getLink();
    					equakeSetCharPref("fdate_item" + j, date);
    					equakeSetCharPref("fplace_item" + j, place);
    					equakeSetCharPref("flink_item" + j++, link);				
          }
  				i++;
			  } while (j<9)
		  }
	    equakeLoadPrefs();		
		}
		this.checking = false;
	}
}

function pnpoly(n, polygon, x, y)
{
   var i;
   var angle=0;
   var p = [];
   p.x = x;
   p.y = y;
   var p1=[], p2=[];

   for (i=0;i<n;i++) {
      var tempGeos = polygon[i].split(',');
      p1.y = polygon[i].split(',')[1] - p.y;
      p1.x = polygon[i].split(',')[0] - p.x;
      p2.y = polygon[(i+1)%n].split(',')[1] - p.y;
      p2.x = polygon[(i+1)%n].split(',')[0] - p.x;            
      angle += Angle2D(p1.y,p1.x,p2.y,p2.x);
   }

   if (Math.abs(angle) < Math.PI)
      return(false);
   else
      return(true);
}