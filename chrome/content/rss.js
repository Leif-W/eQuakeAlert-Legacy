var gequakeBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gequakeBundle.createBundle("chrome://equake/locale/rss.properties");
var equakeinvaliddate = mystrings.GetStringFromName("equakeinvaliddate");
var equakepossiblyusgschanged0 = mystrings.GetStringFromName("equakepossiblyusgschanged0");
var equakenodata = mystrings.GetStringFromName("equakenodata");
function getOrigTxt(aNode)
{
		if(!aNode.hasChildNodes()) return "";
		var resultArray = new Array();
		var walker = aNode.ownerDocument.createTreeWalker(aNode, NodeFilter.SHOW_CDATA_SECTION | NodeFilter.SHOW_TEXT, null, false);
		while(walker.nextNode())
			resultArray.push(walker.currentNode.nodeValue);

		return resultArray.join('').replace(/^\s+|\s+$/g, "");
}

function fmtDate(oldDate) {
	tmpDate = oldDate.split(" ");
	if(tmpDate.length == 6 && tmpDate[3].length == 2) {
		if(tmpDate[3] < 70)
      tmpDate[3] = "20" + tmpDate[3];
    else
      tmpDate[3] = "19" + tmpDate[3];
	}
	newDate = new Date(tmpDate.join(" "));
	if(newDate == "Invalid Date")
		return null;
  else
		return newDate;
}

function rssFmt(feedXML) {
	this.feedXML = feedXML;

	this.title = null;
	this.link = null;
	this.description = null;
	this.items = new Array();

	switch(feedXML.documentElement.localName.toLowerCase())
	{
	 case "rss":
	 case "rdf":
	   this.parseFeed();
	   break;
	 default:
	   throw equakepossiblyusgschanged0;
	   break;  
  }
}

rssFmt.prototype.parseFeed = function() {
	var feedXML = this.feedXML;
	const nsIURIFixup = Components.interfaces.nsIURIFixup;
	const URIFixup = Components.classes["@mozilla.org/docshell/urifixup;1"].getService(nsIURIFixup);
	var i, j;
	var itemNodes = feedXML.getElementsByTagName("item");
	var item;
	for(i = 0; itemNodes.length > i; i++) {
		item = {title:"", link:"", content:""};

		for (j = itemNodes[i].firstChild; j!=null; j=j.nextSibling) {
			if (j.nodeType != j.ELEMENT_NODE) continue;
			switch(j.localName) {
				case "title":
					item.title = getOrigTxt(j);
					break;
				case "link":
					if (!item.link)
						item.link = this.link ? URIFixup.createFixupURI(this.link, nsIURIFixup.FIXUP_FLAG_NONE).resolve(getOrigTxt(j)) : getOrigTxt(j);
					break;
				case "description":
					if (!item.content)
						item.content = getOrigTxt(j);
					break;
			}
		}

		this.items.push(new rssItem(item.title, item.link, item.content));
	}
}

rssFmt.prototype.getDescription = function() {
	if (Boolean(this.description))
		return this.description;
  else
		return "";
}

rssFmt.prototype.getItems = function() {
	var items_array = this.items;
	return items_array;
}

function rssItem(title, link, content) {
	this.title = title;
	this.link = link;
	this.content = content;
}

rssItem.prototype.getTitle = function() {
	return this.title.replace(/<.*?>/g,'');
}

rssItem.prototype.getLink = function() {
	return this.link;
}

rssItem.prototype.getContent = function() {
	if(this.content)
    return this.content;
	else
    return equakenodata;
}
