

  L.GeolocateMarker = L.Class.extend({
    
    includes: L.Mixin.Events,
    
    options: {
  		s:0,
  		d:'increase'
  	},


  	initialize: function(latlng, map, options) {
  		L.Util.setOptions(this, options);
  		this._latlng = latlng;
  		this._canvas = null;
  		this._verticalOffset = 50;
  		this._horizontalOffset = 50;
  		this._map = map;
  		this.onAdd(this._map);
  	},


  	onAdd: function(map) {
  	  var me = this;
  		this._map = map;
  		var canvas = this._canvas = document.createElement('canvas');
  		canvas.setAttribute('height','100');
  		canvas.setAttribute('width','100');

  		canvas.style.position = "absolute";
  		var ctx = this._ctx = canvas.getContext('2d');
      
      setInterval(function(){
        me.drawCanvas()
      }, 40);
  		
  		map._panes.markerPane.appendChild(this._canvas);
      L.DomEvent.addListener(this._canvas, 'click', this._onMouseClick, this);
			
  		map.on('viewreset', this._reset, this);
  		this._reset();
  	},
  	
  	
  	drawCanvas: function() {
  	  if (this.options.d == "increase") {
        this.options.s ++;
      } else {
        this.options.s --;
      }
      
  	  var ctx = this._ctx;
  	  
  	  ctx.clearRect(0,0,100,100);
      
      ctx.beginPath();
      ctx.fillStyle = "rgba(7,78,174,0.5)";
      ctx.arc(50, 50, this.options.s, 0, Math.PI*2, true); 
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(7,78,174,0.9)";
      ctx.stroke();
      ctx.closePath();
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(50, 50, 7, 0, Math.PI*2, true); 
      ctx.closePath();
      
      var grd = ctx.createRadialGradient(160,120,0, 160,120,7);
      grd.addColorStop(0, "#8ED6FF");
      grd.addColorStop(1, "#004CB3");
      ctx.fillStyle = grd;
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#333333";
      ctx.stroke();
      ctx.fill();
      
      
      if (this.options.s>30) {
        this.options.d="decrease";
      } else if (this.options.s<7) {
        this.options.d="increase";
      }
  	},


  	onRemove: function(map) {
  	  map._panes.markerPane.removeChild(this._canvas);
  		map.off('viewreset', this._reset, this);
  	},


  	getLatLng: function() {
  		return this._latlng;
  	},


  	setLatLng: function(latlng) {
  		this._latlng = latlng;
  		this._reset();
  	},


  	_reset: function() {
  		var pos = this._map.latLngToLayerPoint(this._latlng).round();
  		var canvas = this._canvas;
  		
  		canvas.style.left = pos.x-this._horizontalOffset + 'px';
  		canvas.style.top = pos.y-this._verticalOffset + 'px';
  	},
  	

  	_onMouseClick: function(e) {
  		L.DomEvent.stopPropagation(e);
  		L.DomEvent.preventDefault(e);
  		this.fire(e.type);
  	}

  });