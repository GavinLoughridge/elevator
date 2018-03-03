function Vertex() {
  this.tg = null;
  this.pg = null;
  this.sg = null;
  this.mg = null;
  this.rg = null;

  this.tm = null;
  this.pm = null;
  this.sm = null;
  this.mm = null;
  this.rm = null;

  this.lowestFloor = null;
  this.distance = null;
}

function Edge() {
  this.first = null;
  this.second = null;
  this.weight = null;
}

function gameGraph() {
  this.verticies = [];
  this.edges = [];

  this.paths = [];
  this.failures = [];

  this. minPath = function (start, end) {

    return path;
  }

  this.findEdges = function (vertex) {

    return edges;
  }

  this.checkFailure = function (vertex) {

    return failed;
  }

  this.getDistance = function (vertex) {

    return distance;
  }

  this.checkRepeat = function (vertex) {

    return repeat;
  }

  this.nextPath = function () {

    return path;
  }
}
