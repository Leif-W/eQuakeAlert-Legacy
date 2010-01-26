var xccDrawPolygon = Class.create({
							   
	initialize: function(map,options) 
	{
		this.options = options;
		this.map = map;
		this.myPoints = new Array();
		this.pointMarkers = new Array();
		this.polylines = new Array();
		this.lineCenterMarkers = new Array();
		this.lastHoverdMarker = null;
		this.myPolygon = null;
		
		this.mapClickEvent = GEvent.addListener(this.map,"click",this.checkClick.bind(this));
		GEvent.addListener(this.map,"singlerightclick",this.mapRightClick.bind(this));
	},
	
	checkClick : function (overlay,point)
	{
		if(overlay == null)
		{
			this.setNextPoint(point);
		}
	},
	
	setNextPoint : function (point)
	{
		this.myPoints.push(point);
		this.drawNextLine();
		this.setNextMarker();
	},
	
	drawNextLine : function ()
	{
		if(this.myPoints.length > 1)
		{
			this.polylines.push(new GPolyline([
				this.myPoints[this.myPoints.length-2],
				this.myPoints[this.myPoints.length-1]
			], this.options.lineColor, this.options.lineWeight, this.options.lineOpacity));
			this.polylines[this.polylines.length - 1].myNumber = this.polylines.length - 1;
			this.map.addOverlay(this.polylines[this.polylines.length - 1]);
		}
	},
	
	setNextMarker : function ()
	{
		var lineMarker = new GMarker(this.myPoints[this.myPoints.length-1],{draggable: true, icon: this.options.iconPoints});
		
		lineMarker.myClass = this;
		lineMarker.nextLine = null;
		lineMarker.prevLine = null;
		//lineMarker.myNumber = this.pointMarkers.length;
		lineMarker.myPointNumber = this.myPoints.length-1;
		
		this.addMarkerEvents(lineMarker);		
		
		this.pointMarkers.push(lineMarker);
		this.map.addOverlay(lineMarker);
		this.redrawPolygon();
	},
	
	markerDragStart : function ()
	{
		this.nextLine = null;
		this.prevLine = null;
		// hole die naechste polyline
		for(var a=0;a < this.myClass.polylines.length;a++)
		{
			if(this.myClass.polylines[a].getVertex(0).equals(this.getPoint()))
			{
				this.nextLine = this.myClass.polylines[a];
				this.nextLineNumber = a;
			}
			else if(this.myClass.polylines[a].getVertex(1).equals(this.getPoint()))
			{
				this.prevLine = this.myClass.polylines[a];
				this.prevLineNumber = a;
			}
		}
				
		// hole pointNumber
		for(var b = 0; b<this.myClass.myPoints.length;b++)
		{
			if(this.myClass.myPoints[b].equals(this.getPoint()))
			{
				this.myPointNumber = b;
				b=10000000000;
			}
		}
		
		this.myClass.removeLineCenterMarkers();
	},
	
	markerDrag : function ()
	{
		if(this.nextLine != null)
		{
			this.myClass.map.removeOverlay(this.nextLine);		
			this.nextLine = new GPolyline([
				this.getPoint(),
				this.nextLine.getVertex(1)
			], this.myClass.options.lineColor, this.myClass.options.lineWeight,this.myClass.options.lineOpacity);
			this.myClass.map.addOverlay(this.nextLine);
		}
		
		if(this.prevLine != null)
		{
			this.myClass.map.removeOverlay(this.prevLine);
			this.prevLine = new GPolyline([
				this.prevLine.getVertex(0),
				this.getPoint()
			], this.myClass.options.lineColor, this.myClass.options.lineWeight,this.myClass.options.lineOpacity);
			this.myClass.map.addOverlay(this.prevLine);
		}
		
		this.myClass.myPoints = this.myClass.myPoints;
		this.myClass.myPoints[this.myPointNumber] = this.getPoint();
		this.myClass.redrawPolygon();
	},
	
	markerDragEnd : function ()
	{
		if(this.nextLine != null)
		{
			this.myClass.polylines[this.nextLineNumber] = this.nextLine;
		}
		if(this.prevLine != null)
		{
			this.myClass.polylines[this.prevLineNumber] = this.prevLine;
		}
		
		this.myClass.myPoints[this.myPointNumber] = this.getPoint();
		this.myClass.redrawPolygon();
	},
	
	markerMouseOver : function ()
	{
		this.nextLine = null;
		this.prevLine = null;
		
		// hole die naechste polyline
		// dupllicate, muss noch gefixet werden ist gleich wie bei der methode markerDragStart
		for(var a=0;a < this.myClass.polylines.length;a++)
		{
			if(this.myClass.polylines[a].getVertex(0).equals(this.getPoint()))
			{
				this.nextLine = this.myClass.polylines[a];
				this.nextLineNumber = a;
			}
			else if(this.myClass.polylines[a].getVertex(1).equals(this.getPoint()))
			{
				this.prevLine = this.myClass.polylines[a];
				this.prevLineNumber = a;
			}
		}
		
		
		// hole pointNumber
		for(var b = 0; b<this.myClass.myPoints.length;b++)
		{
			if(this.myClass.myPoints[b].equals(this.getPoint()))
			{
				this.myPointNumber = b;
				b=10000000000;
			}
		}
		
		this.myClass.removeLineCenterMarkers();
		
		
		// Einstellungen für die naechste Linie
		if(this.nextLine != null)
		{
			this.myClass.createTempMarker(this,this.nextLine,this.nextLineNumber,"next");
		}
		
		// Einstellungen für die vorige Linie
		
		if(this.prevLine != null)
		{
			this.myClass.createTempMarker(this,this.prevLine,this.prevLineNumber,"prev");
		}
	},
	
	removeLineCenterMarkers : function ()
	{
		for(var a=0;a<this.lineCenterMarkers.length;a++)
		{
			this.lineCenterMarkers[a].remove();
		}
	},
	
	addMarkerEvents : function (xmarker)
	{
		GEvent.addListener(xmarker,"dragstart",this.markerDragStart);
		GEvent.addListener(xmarker,"dragend",this.markerDragEnd);
		GEvent.addListener(xmarker,"drag",this.markerDrag);
		GEvent.addListener(xmarker,"mouseover",this.markerMouseOver);
	},
	
	mapRightClick: function (point,src,overlay)
	{
		if(overlay.myPointNumber)
		{
			this.removePoint(overlay);
		}
	},
	
	refreshPolylines : function ()
	{
  	this.polylines = null;
		this.polylines = new Array();

		for(var i = 1; i<this.myPoints.length; i++)
		{
			this.polylines.push(new GPolyline([
				this.myPoints[i-1],
				this.myPoints[i]
			], this.options.lineColor, this.options.lineWeight, this.options.lineOpacity));
			this.polylines[this.polylines.length - 1].myNumber = this.polylines.length - 1;
			this.map.addOverlay(this.polylines[this.polylines.length - 1]);
		}
  },
  
	refreshPointMarkers : function ()
	{
	  this.pointMarkers = null;
		this.pointMarkers = new Array();
		for(var i = 0; i<this.myPoints.length; i++)
		{
			var lineMarker = new GMarker(this.myPoints[i],{draggable: true, icon: this.options.iconPoints});
			lineMarker.myClass = this;
		  lineMarker.nextLine = null;
		  lineMarker.prevLine = null;
		  lineMarker.myPointNumber = i;
		  this.pointMarkers.push(lineMarker);
		  this.addMarkerEvents(lineMarker);		
		  this.pointMarkers.push(lineMarker);
		  this.map.addOverlay(lineMarker);
    }	
  },  

	removePoint : function (marker)
	{
		// hole pointNumber
		for(var b = 0; b<this.myPoints.length;b++)
		{
			if(this.myPoints[b].equals(marker.getPoint()))
			{
				marker.myPointNumber = b;
				b=10000000000;
			}
		}
		
		// remove point 
		this.myPoints.splice(marker.myPointNumber,1);
		
		for(var i = 0; i<this.pointMarkers.length;i++)
		{
			if(this.pointMarkers[i] == marker)
			{
				this.pointMarkers.splice(i,1);
			}
		}
		
		// remove previous polylines
		for(var i = 0; i<this.polylines.length;i++)
		{
			this.map.removeOverlay(this.polylines[i]);
		}
		
		// refresh polylines
    this.refreshPolylines();
		this.removeLineCenterMarkers();
		this.map.removeOverlay(marker);
		this.redrawPolygon();
	},
	
	redrawPolygon : function ()
	{
		if(this.myPoints.length > 2)
		{
			if(this.myPolygon != null)
			{
				this.map.removeOverlay(this.myPolygon);
			}
			
			this.myPolygon = new GPolygon(this.myPoints, this.options.polygonColor, 0, 1, this.options.polygonColor, this.options.polygonOpacity);
			this.map.addOverlay(this.myPolygon);
		}
	},
	
	createTempMarker : function (parentMarker,myLine,myLineNumber,position)
	{
		var lineCenterMarker = new GMarker(myLine.getBounds().getCenter(),{draggable: true, icon: this.options.iconGhostPoints});
		lineCenterMarker.myClass = this;
		lineCenterMarker.myLine = myLine;
		lineCenterMarker.myLineNumber = myLineNumber;
		lineCenterMarker.markerPointNumber = parentMarker.myPointNumber;
		lineCenterMarker.myPosition = position;
		
		GEvent.addListener(lineCenterMarker,"dragstart",function () {
			
			this.prevLineTMP = new GPolyline([
				this.myLine.getVertex(0),
				this.getPoint()
			], this.myClass.options.lineColor, this.myClass.options.lineWeight,this.myClass.options.lineOpacity);
			
			this.nextLineTMP = new GPolyline([
				this.getPoint(),
				this.myLine.getVertex(1)
			], this.myClass.options.lineColor, this.myClass.options.lineWeight,this.myClass.options.lineOpacity);
			
			this.myClass.map.addOverlay(this.nextLineTMP);
			this.myClass.map.addOverlay(this.prevLineTMP);
			
			this.myLine.remove();
			this.myClass.polylines.splice(this.myLineNumber,1);
			
			var tmpPoint = this.myClass.myPoints[this.markerPointNumber];
			if(this.myPosition == "next")
			{
				this.myClass.myPoints.splice(this.markerPointNumber,1,tmpPoint,this.getPoint());	
			}
			else
			{
				this.myClass.myPoints.splice(this.markerPointNumber,1,this.getPoint(),tmpPoint);
			}
						
			this.myClass.redrawPolygon();
		});
		
		GEvent.addListener(lineCenterMarker,"drag",function () {
			
			this.myClass.map.removeOverlay(this.nextLineTMP);
			this.myClass.map.removeOverlay(this.prevLineTMP);
			
			this.prevLineTMP = new GPolyline([
				this.prevLineTMP.getVertex(0),
				this.getPoint()
			], this.myClass.options.lineColor, this.myClass.options.lineWeight,this.myClass.options.lineOpacity);
			
			this.nextLineTMP = new GPolyline([
				this.getPoint(),
				this.nextLineTMP.getVertex(1)
			], this.myClass.options.lineColor, this.myClass.options.lineWeight,this.myClass.options.lineOpacity);
			
			this.myClass.map.addOverlay(this.nextLineTMP);
			this.myClass.map.addOverlay(this.prevLineTMP);
			
			if(this.myPosition == "next")
			{
				this.myClass.myPoints.splice(this.markerPointNumber + 1,1,this.getPoint());	
			}
			else
			{
				this.myClass.myPoints.splice(this.markerPointNumber,1,this.getPoint());	
			}
			this.myClass.redrawPolygon();
		});
		
		GEvent.addListener(lineCenterMarker,"dragend",function () {
			
			this.myClass.polylines.push(this.nextLineTMP);
			this.myClass.polylines.push(this.prevLineTMP);
			
			var lineMarker = new GMarker(this.getPoint(),{draggable: true, icon: this.myClass.options.iconPoints});
	
			lineMarker.myClass = this.myClass;
			lineMarker.nextLine = null;
			lineMarker.prevLine = null;
			lineMarker.myNumber = this.myClass.pointMarkers.length;
			lineMarker.myPointNumber = this.myClass.myPoints.length-1;
			
			this.myClass.addMarkerEvents(lineMarker);
			
			this.myClass.pointMarkers.push(lineMarker);
			this.myClass.map.addOverlay(lineMarker);
						
			if(this.myPosition == "next")
			{
				this.myClass.myPoints.splice(this.markerPointNumber + 1,1,this.getPoint());	
			}
			else
			{
				this.myClass.myPoints.splice(this.markerPointNumber,1,this.getPoint());	
			}
			this.myClass.redrawPolygon();
		});
		
		this.map.addOverlay(lineCenterMarker);
		this.lineCenterMarkers.push(lineCenterMarker);
	},
	
	getPoints : function ()
	{
		return this.myPoints;
	},
	
	stopDrawing : function ()
	{
	 alert("stop");
		GEvent.removeListener(this.mapClickEvent);
	}
	
});