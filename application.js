var Application = function(params) {
  this.params = params;
}

Application.prototype.start = function() {
  var params = this.params;

  // Generate points
  var generator = new DataGenerator(params.max, params.clusters, params.stdDev);
  var points = generator.generate(params.points);

  // Set up kmeans
  var kmeans = new KMeans(points, params.clusters);
  kmeans.init(params.initializer);

  var before = new Date().getTime();
  // Set up canvas
  var canvas = document.createElement('canvas');
  canvas.width = params.max[0];
  canvas.height = params.max[1];
  document.body.appendChild(canvas);

  // Set up renderer
  var renderer = new KMeansRenderer(canvas, kmeans);
  renderer.render();

  // Run clustering visualization
  var timer = setInterval(function() {
    kmeans.tick();
    renderer.render();

    if (kmeans.converged) {
      clearInterval(timer);
      console.log('Converged after ' + kmeans.ticks + ' iterations');
      console.log((new Date().getTime() - before) + ' millis');
    }
  }, params.interval);
}
