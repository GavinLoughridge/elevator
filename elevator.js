function Vertex() {
  this.tg = null;
  this.pg = null;
  this.sg = null;
  this.mg = null;
  this.rg = null;

  this.tc = null;
  this.pc = null;
  this.sc = null;
  this.mc = null;
  this.rc = null;

  this.elevator = null;

  this.lowestFloor = null;
  this.distance = null;
}

function Edge() {
  this.first = null;
  this.second = null;
  this.weight = null;
}

function Path() {
  this.edges = [];
  this.vertices = [];
  this.weight = null;
}

function gameGraph() {
  this.verticies = [];
  this.edges = [];

  this.paths = [];

  this.minPath = function (start, end) {
    let firstPath = new Path;
    firstPath.vertices.push(start);
    firstPath.weight = this.getDistance(start);
    this.vertices.push(start);
    this.paths.push(firstPath);

    let loopGuard = 0;
    while(true) {
      if (loopGuard > 1000) {
        console.log('in a loop');
        return null;
      }
      let path = this.nextPath;
      let vertex = path.vertices[path.vertices.length - 1];
      let edges = this.findEdges(vertex);
      let nonRepeats = edges.filter(edge => this.checkRepeat(edge.second));
      nonRepeats.forEach(edge => {
        this.edges.push(edge);
        this.verticies.push(edge.second);
      })
      let nonFails = nonRepeats.filter(edge => this.checkFailure(edge.second));
      nonFails.forEach(edge => {
        let newPath = JSON.parse(JSON.stringify(path));
        newPath.edges.push(edge);
        newPath.vertices.push(edge.second);
        newPath.weight += edge.weight;
        if (newPath.weight === 0) {
          console.log('!! found shortest !!');
          newPath.edges.forEach(edge => {
            console.log('- move start -');
            console.log(edge.first);
            console.log('- move end -');
            console.log(edge.second);
          })
          console.log('total moves:', newPath.edges.length);
          return newPath.edges.length;
        }
        this.paths.push(newPath);
      })
    }

    console.log('failed while condition before solution found');
    return null;
  }

  this.findEdges = function (vertex) {
    let edges = [];
    let items = ['tg', 'tc','pg', 'pc','sg', 'sc','mg', 'mc','rg', 'rc'];
    let movable = items.filter(item => vertex[item] === vertex.elevator);
    movable.forEach(item1 => {
      if (vertex.elevator !== 3) {
        let newVertex = JSON.parse(JSON.stringify(vertex));
        newVertex.elevator = vertex.elevator + 1;
        newVertex[item1] = vertex[item1] + 1;
        edge.first = vertex;
        edge.second = newVertex;
        edge.weight = 1;
        edges.push(edge);

        movable.forEach(item2 => {
          if (item1 !== item2) {
            let newVertex = JSON.parse(JSON.stringify(newVertex));
            newVertex[item2] = vertex[item2] + 1;
            edge.first = vertex;
            edge.second = newVertex;
            edge.weight = 2;
            edges.unshift(edge);
          }
        })
      }
      if (vertex.elevator !== 0) {
        let newVertex = JSON.parse(JSON.stringify(vertex));
        newVertex.elevator = vertex.elevator - 1;
        newVertex[item1] = vertex[item1] - 1;
        let edge = new Edge;
        edge.first = vertex;
        edge.second = newVertex;
        edge.weight = -1;
        edges.push(edge);

        movable.forEach(item2 => {
          if (item1 !== item2) {
            let newVertex = JSON.parse(JSON.stringify(newVertex));
            newVertex[item2] = vertex[item2] - 1;
            edge.first = vertex;
            edge.second = newVertex;
            edge.weight = -2;
            edges.push(edge);
          }
        })
      }
    })

    return edges;
  }

  this.checkFailure = function (vertex) {
    return (vertex.tc === vertex.tg     ||
           (vertex.tc !== vertex.pg     &&
            vertex.tc !== vertex.sg     &&
            vertex.tc !== vertex.mg     &&
            vertex.tc !== vertex.rg))
            &&
           (vertex.pc === vertex.pg     ||
           (vertex.pc !== vertex.tg     &&
            vertex.pc !== vertex.sg     &&
            vertex.pc !== vertex.mg     &&
            vertex.pc !== vertex.rg))
            &&
           (vertex.sc === vertex.sg     ||
           (vertex.sc !== vertex.pg     &&
            vertex.sc !== vertex.tg     &&
            vertex.sc !== vertex.mg     &&
            vertex.sc !== vertex.rg))
            &&
           (vertex.mc === vertex.mg     ||
           (vertex.mc !== vertex.pg     &&
            vertex.mc !== vertex.tg     &&
            vertex.mc !== vertex.sg     &&
            vertex.mc !== vertex.rg))
            &&
           (vertex.rc === vertex.rg     ||
           (vertex.rc !== vertex.pg     &&
            vertex.rc !== vertex.tg     &&
            vertex.rc !== vertex.sg     &&
            vertex.rc !== vertex.mg))
  }

  this.getDistance = function (vertex, end) {
    return Math.abs(vertex.tg - end.tg) +
           Math.abs(vertex.pg - end.pg) +
           Math.abs(vertex.sg - end.sg) +
           Math.abs(vertex.mg - end.mg) +
           Math.abs(vertex.rg - end.rg) +
           Math.abs(vertex.tc - end.tc) +
           Math.abs(vertex.pc - end.pc) +
           Math.abs(vertex.sc - end.sc) +
           Math.abs(vertex.mc - end.mc) +
           Math.abs(vertex.rc - end.rc);
  }

  this.checkRepeat = function (vertex) {
    return this.vertices.every(oldVertex => {
      return vertex.distance !== oldvertex.distance ||
             vertex.elevator !== oldVertex.elevator ||
             vertex.tg !== oldVertex.tg ||
             vertex.pg !== oldVertex.pg ||
             vertex.sg !== oldVertex.sg ||
             vertex.mg !== oldVertex.mg ||
             vertex.rg !== oldVertex.rg ||
             vertex.tc !== oldVertex.tc ||
             vertex.pc !== oldVertex.pc ||
             vertex.sc !== oldVertex.sc ||
             vertex.mc !== oldVertex.mc ||
             vertex.rc !== oldVertex.rc;
    })
  }

  this.nextPath = function () {
    return this.paths.shift();
  }
}
