var KMeansRenderer = function(canvas, kmeans) {
  this.kmeans = kmeans;
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.colors = [];
  for (var i = 0; i < kmeans.clusters; i++) {
    this.colors.push(Util.randc());
  }
}

KMeansRenderer.prototype.render = function() {
  this.__clearCanvas();

  this.kmeans.datapoints.forEach(this.__renderDatapoint, this);
  this.kmeans.centers.forEach(this.__renderCenter, this);
}

KMeansRenderer.prototype.__clearCanvas = function() {
  this.context.fillStyle = '#fff';
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

KMeansRenderer.prototype.__renderDatapoint = function(datapoint) {
  var x = datapoint.datum.dim(0);
  var y = datapoint.datum.dim(1);
  this.__renderPoint(x, y, 2, this.colors[datapoint.cluster]);
}

KMeansRenderer.prototype.__renderCenter = function(center) {
  var x = center.dim(0);
  var y = center.dim(1);
  this.__renderPoint(x, y, 4, '#f00');
}

KMeansRenderer.prototype.__renderPoint = function(x, y, size, color) {
  this.context.beginPath();
  this.context.fillStyle = color;
  this.context.arc(x, y, size, 0, Util.TWO_PI);
  this.context.fill();
}
