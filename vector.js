var Vector = function(features) {
  this.features = [];
  for (var i in features) {
    this.features.push(features[i]);
  }
}

Vector.rand = function(max) {
  return new Vector(max.map(Util.randf));
}

Vector.prototype.distanceTo = function(v) {
  var dim = this.dim();
  if (dim != v.dim()) {
    throw new Exception('Vectors are not compatible');
  }

  var sum = 0.0
  if (dim === 2) {
    var dx = this.features[0] - v.features[0];
    var dy = this.features[1] - v.features[1];
    sum = dx*dx + dy*dy;
  } else {
    var i = 0;
    this.features.forEach(function(f) {
      var diff = f - v.features[i];
      sum += diff * diff;
      i++;
    });
  }

  return Math.sqrt(sum);
}

Vector.prototype.dim = function(i) {
  return i === undefined ? this.features.length : this.features[i];
}
