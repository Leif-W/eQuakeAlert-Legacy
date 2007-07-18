var gequakeOptions;

function equakeoptions_init() {
  gequakeOptions = new equakeOptions;
	gequakeOptions.loadOptions();
}

function equakeOptions() {
	this.ID_PrefService	= "@mozilla.org/preferences-service;1";
	this.PrefService	= Components.classes[this.ID_PrefService].getService(Components.interfaces.nsIPrefService).getBranch("");
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

equakeOptions.prototype = {
	
	saveOptions: function () {
		var equake_interval	 = document.getElementById('equake.interval');
		var equake_showday	 = document.getElementById('equake.showday');
		var equake_12clock	 = document.getElementById('equake.12clock');
		var equake_alert     = document.getElementById('equake.alert');
		  var equake_chkshakm	 = document.getElementById('equake.chkshakm');
		var equake_newtab	 = document.getElementById('equake.newtab');
		var equake_chkmag	 = document.getElementById('equake.chkmag');
		  var equake_magval	 = document.getElementById('equake.magval');

  	this.PrefService.setIntPref('equake.interval',equake_interval.value); 
  	this.PrefService.setBoolPref('equake.showday',equake_showday.checked);
  	this.PrefService.setBoolPref('equake.12clock',equake_12clock.checked);
  	this.PrefService.setIntPref('equake.alert',equake_alert.value);
      this.PrefService.setBoolPref('equake.chkshakm',equake_chkshakm.checked);
  	this.PrefService.setBoolPref('equake.newtab',equake_newtab.checked);
 	  this.PrefService.setBoolPref('equake.chkmag',equake_chkmag.checked);
 	    this.PrefService.setCharPref('equake.magval',equake_magval.value);
	},
	
	loadOptions: function() {
		var equake_interval		= document.getElementById('equake.interval');
		
		var equake_showday    = document.getElementById('equake.showday');
		var equake_12clock    = document.getElementById('equake.12clock');
		var equake_alert      = document.getElementById('equake.alert');
		  var equake_chkshakm   = document.getElementById('equake.chkshakm');
		var equake_newtab      = document.getElementById('equake.newtab');
		var equake_chkmag   = document.getElementById('equake.chkmag');
		  var equake_magval      = document.getElementById('equake.magval');

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
			equake_alert.value		= this.PrefService.getIntPref('equake.alert');			
			   onShakeChange(equake_alert.value);
			equake_chkshakm.checked		= this.PrefService.getBoolPref('equake.chkshakm');
			equake_newtab.checked     = this.PrefService.getBoolPref('equake.newtab');
			equake_chkmag.checked		= this.PrefService.getBoolPref('equake.chkmag');			
			equake_magval.value		= this.PrefService.getCharPref('equake.magval');		
         onMagChange(equake_chkmag);	
		}
		catch (ignored)	{
		  this.PrefService.setBoolPref('equake.showday',true);
		  this.PrefService.setBoolPref('equake.12clock',true);
		  this.PrefService.setIntPref('equake.alert',0);
		  this.PrefService.setBoolPref('equake.chkshakm',true);
		  this.PrefService.setBoolPref('equake.chkmag',false);
		  this.PrefService.setCharPref('equake.magval',"0");
		  
		  equake_showday.checked=true;
		  equake_12clock.checked=true;
		  equake_alert.value=0;
		  equake_chkshakm.checked=true;
		  equake_newtab.checked=false;
		  equake_chkmag.checked=false;
		  equake_magval=0;
		  
		  onShakeChange(equake_alert.value);
		  onMagChange(equake_chkmag);
    }
	}
}
