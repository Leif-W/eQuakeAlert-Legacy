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

function mapsAdd(mode)
{
  var newAreaName = prompt("Enter a name for the new area: ");
  if (newAreaName!="" && newAreaName!=null)
  {
   $("equake.mapsarea").selectedItem = $("equake.mapsarea").appendItem(newAreaName, "","");
   if (mode!=-1)
    onAreaSwitch();
  }
  //$("equake.areadesign").hidden = false;
}

function callMapsDelete()
{
  var curIdx = $("equake.mapsarea").selectedIndex;
  if (curIdx==0)
  {
    alert("This region can't be deleted");
    return;
  }
  if(confirm("Do you want to delete region '"+$("equake.mapsarea").label+"'?"))
  {
  $("equake.mapsarea").removeItemAt(curIdx);
  if (curIdx>0)
    $("equake.mapsarea").selectedIndex = curIdx-1;
  else
    $("equake.mapsarea").selectedIndex = 0;
  onAreaSwitch($("equake.mapsarea").value);
  }
}

function callMapsSave()
{
//alert($("equake.mapsarea").value);
  if ($("equake.mapsarea").value=="")
    $("equake.mapsarea").selectedItem.value=equake_mapsBrowserScope().save();
  else
    if(confirm("Do you want to overwrite region '"+$("equake.mapsarea").label+"'?"))
      $("equake.mapsarea").selectedItem.value=equake_mapsBrowserScope().save();
    else
    {
      mapsAdd(-1);
      $("equake.mapsarea").selectedItem.value=equake_mapsBrowserScope().save();
    }
}

function callMapsFit()
{
  equake_mapsBrowserScope().fit();
}

/*
function callMapsCheck()
{
  equake_mapsBrowserScope().check();
}


function callMapsSet()
{
  var lat=prompt("Latitude: ");
  var lng=prompt("Longitude: ");
  equake_mapsBrowserScope().setPoint(lat, lng);
}
*/