var KMeans = function(data, clusters) {
  this.data = data;
  this.clusters = clusters;
  this.centers = [];
  this.datapoints = [];
  this.converged = false;
  this.ticks = 0;
  this.lastSignature = null;
}

KMeans.Datapoint = function(datum, cluster) {
  this.datum = datum;
  this.cluster = cluster;
}

KMeans.prototype.init = function(method) {
  this.__initDatapoints();

  switch (method.toLowerCase()) {
  case 'forgy':
    this.__forgyInit();
    break;
  case 'random':
    this.__randInit();
    break;
  default:
    throw new Exception('Unknown initialization method ' + method);
  }
  
  this.lastSignature = this.__clusterSignature();
  this.__updateCenters();
}

KMeans.prototype.__initDatapoints = function() {
  var _this = this;
  this.data.forEach(function(datum) {
    var datapoint = new KMeans.Datapoint(datum, -1);
    _this.datapoints.push(datapoint);
  });
}

KMeans.prototype.__forgyInit = function() {
  var last = this.data.length;

  for (var i = 0; i < this.clusters; i++) {
    var index = Math.floor(Math.random() * last);
    var tmp = this.data[last-1];

    this.centers.push(this.data[index]);
    this.data[last-1] = this.data[index];
    this.data[index] = tmp;
    last--;
  }

  this.__assignClusters();
}

KMeans.prototype.__randInit = function() {
  var _this = this;
  this.datapoints.forEach(function(datapoint) {
    datapoint.cluster = Math.floor(Math.random() * _this.clusters);
  });
}

KMeans.prototype.__nearestCluster = function(v) {
  var shortestDist = Infinity;
  var nearestCluster = -1;
  var i = 0;
  this.centers.forEach(function(center) {
    var dist = v.distanceTo(center);

    if (dist < shortestDist) {
      shortestDist = dist;
      nearestCluster = i;
    }

    i++;
  });
  return nearestCluster;
}

KMeans.prototype.__assignClusters = function() {
  var _this = this;
  this.datapoints.forEach(function(datapoint) {
    var cluster = _this.__nearestCluster(datapoint.datum);
    datapoint.cluster = cluster;
  });
}

KMeans.prototype.__updateCenters = function() {
  var clusters = [];
  for (var i = 0; i < this.clusters; i++) {
    clusters.push([]);
  }
  
  this.datapoints.forEach(function(datapoint) {
    clusters[datapoint.cluster].push(datapoint.datum);
  });

  this.centers = clusters.map(this.__findCenter, this);
}

KMeans.prototype.__findCenter = function(cluster) {
  if (cluster.length == 0) {
    return this.data[Math.floor(Math.random() * this.data.length)];
  }

  var dim = cluster[0].dim();
  var sums = [];
  for (var i = 0; i < dim; i++) {
    sums.push(0);
  }

  cluster.forEach(function(v) {
    for (var j = 0; j < dim; j++) {
      sums[j] += v.dim(j);
    }
  });
  
  return new Vector(sums.map(function(sum) {
    return sum / cluster.length;
  }));
}

KMeans.prototype.tick = function() {
  if (this.converged) return;
  this.ticks++;

  this.__assignClusters();
  this.__updateCenters();
  this.__verifyConvergence();
}

KMeans.prototype.__clusterSignature = function() {
  var clusters = this.datapoints.map(function(d) {
    return d.cluster;
  });

  return clusters.join('');
}

KMeans.prototype.__verifyConvergence = function() {
  var signature = this.__clusterSignature();

  this.converged = this.lastSignature === signature;
  this.lastSignature = signature;
}
