var Application = function(options) {
  this.timer = null;
  this.startTime = null;
  this.endTime = null;
  
  this.data = [];
  this.kmeans = null;

  // Set up canvas
  var canvas = document.getElementById(options.id);
  canvas.width =  options.max[0];
  canvas.height = options.max[1];
}

Application.prototype.start = function(options, callback) {
  // Initialize data generator
  var generator = new DataGenerator({
    max:      options.max,
    stdDev:   options.stdDev,
    clusters: options.clusters
  });

  // Generate data
  this.data = generator.generate(options.points);

  // Check time before starting
  this.startTime = new Date().getTime();

  // Set up kmeans
  this.kmeans = new KMeans(this.data, options.clusters);
  this.kmeans.init(options.initializer);

  // Set up renderer
  var renderer = new KMeansRenderer(canvas, this.kmeans);
  renderer.render();

  // Run clustering visualization
  var _this = this;
  var timer = setInterval(function() {
    _this.kmeans.tick();
    renderer.render();

    if (_this.kmeans.converged) {
      clearInterval(timer);
      _this.endTime = new Date().getTime();

      if (callback && typeof callback == 'function') {
        callback();
      }
    }
  }, options.interval);
}

Application.prototype.ticks = function() {
  return this.kmeans.ticks;
}

Application.prototype.duration = function() {
  return this.endTime - this.startTime;
}
