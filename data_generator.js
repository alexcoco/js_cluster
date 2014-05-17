var DataGenerator = function(options) {
  this.data         = [];
  this.max          = options.max;
  this.stdDev       = options.stdDev;
  this.clusters     = options.clusters;
  this.clusterMeans = [];

  // Generate random means for each feature in each cluster
  for (var i = 0; i < this.clusters; i++) {
    this.clusterMeans.push(this.max.map(Util.randf));
  }

  // Partially evaluated function for generating normally
  // distributed numbers with a fixed standard deviation
  this.nrand = function(mean) {
    return Util.nrand(mean, this.stdDev);
  }
}

DataGenerator.prototype.generate = function(count) {
  var stdDev = this.stdDev;

  for (var i = 0; i < count; i++) {
    // Randomly pick a cluster
    var k = Util.randi(this.clusters);
    
    // Generate normally distributed values around the cluster means
    var features = this.clusterMeans[k].map(this.nrand, this);
    
    this.data.push(new Vector(features));
  }

  return this.data;
}
