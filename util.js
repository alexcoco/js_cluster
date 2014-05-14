var Util = {
  TWO_PI: Math.PI*2,
  randb: function() {
    return Math.floor(Math.random() * 255);
  },
  randc: function() {
    return 'rgb(' + Util.randb() + ', '
                  + Util.randb() + ', '
                  + Util.randb() + ')';
  },
  randf: function(max) {
    return Math.random() * (max || 1);
  },
  randi: function(max) {
    return Math.floor(Util.randf(max));
  },
  nrand: function(mean, stdDev) {
    mean = mean || 0; stdDev = stdDev || 1;
    var a = Math.sqrt(-2 * Math.log(Math.random()));
    var b = Math.cos(2 * Math.PI * Math.random());
    return a * b * stdDev + mean;
  },
  sum: function(array) {
    array.reduce(function(a, b) { return a + b; }, 0);
  },
  clamp: function(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }
}
