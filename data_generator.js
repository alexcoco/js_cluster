var DataGenerator = function(max, clusters, stdDev) {
  this.data = [];
  this.clusters = clusters;
  this.stdDev = stdDev;
  this.max = max;

  this.clusterMeans = [];
  for (var i = 0; i < clusters; i++) {
    this.clusterMeans.push(max.map(Util.randf));
  }

  this.nrand = function(mean) {
    return Util.nrand(mean, this.stdDev);
  }
}

DataGenerator.prototype.generate = function(count) {
  for (var i = 0; i < count; i++) {
    var k = Util.randi(this.clusterMeans.length);
    var means = this.clusterMeans[k];
    var features = means.map(this.nrand, this);
    
    for (var j = 0; j < features.length; j++) {
      features[j] = Util.clamp(features[j], 0, this.max[j]);
    };

    this.data.push(new Vector(features));
  }

  return this.data;
}
