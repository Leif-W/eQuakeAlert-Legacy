var gequakeBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gequakeBundle.createBundle("chrome://equake/locale/equake.properties");
var equakenumber = mystrings.GetStringFromName("equakenumber");

var gequakeOptions;

function equakeoptions_init() {
  gequakeOptions = new equakeOptions;
	gequakeOptions.loadOptions();
}

function equakeOptions() {
	this.ID_PrefService	= "@mozilla.org/preferences-service;1";
	this.PrefService	= Components.classes[this.ID_PrefService].getService(Components.interfaces.nsIPrefService).getBranch("");
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
      document.getElementById("equake.chkshakm").disabled = false;
    else
      document.getElementById("equake.chkshakm").disabled = true;
}

function onMagChange(i)
{
  document.getElementById("equake.magval").disabled = !i.checked;
}

function chkIntValue()
{
	var equake_interval	 = document.getElementById('equake.interval');
	var intValue = parseInt(equake_interval.value);
	//validations
	if (!intValue || intValue == NaN || intValue<1) 
	{
		alert(equakenumber);
		equake_interval.value=5;
		equake_interval.focus();
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
		
	  	this.PrefService.setIntPref('equake.interval',equake_interval.value); 
	  	this.PrefService.setIntPref('equake.alert',equake_alert.value);
	 	this.PrefService.setIntPref('equake.status',equake_status.value);  	
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
			equake_magval.value		    = this.PrefService.getCharPref('equake.magval');
			equake_stat_str.value		= this.PrefService.getCharPref('equake.stat_str');
		}

		catch (ignored)	{
			equake_showday.checked=true;
			equake_12clock.checked=true;
			equake_chkshakm.checked=true;
			equake_newtab.checked=false;
			equake_chkmag.checked=false;
			equake_alert.value=0;
			equake_status.value=0;
			equake_magval=5;
			equake_stat_str.value="M %m, %l";

			/*this.PrefService.setBoolPref('equake.showday',equake_showday.checked);
			this.PrefService.setBoolPref('equake.12clock',equake_12clock.checked);
			this.PrefService.setBoolPref('equake.chkshakm',equake_chkshakm.checked);
			this.PrefService.setBoolPref('equake.chkmag',equake_chkmag.checked);		  
			this.PrefService.setIntPref('equake.alert', equake_alert.value);
			this.PrefService.setIntPref('equake.status', equake_status.value);
			this.PrefService.setCharPref('equake.magval',equake_magval);
			this.PrefService.setCharPref('equake.stat_str',equake_stat_str.value);*/
		}

		onShakeChange(equake_alert.value);
		onStatusChange(equake_status.value);
		onMagChange(equake_chkmag);
	}
}
