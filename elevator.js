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

function Graph() {
  this.vertices = [];
  this.edges = [];

  this.paths = [];

  this.minPath = function (start, end) {
    let firstPath = new Path;
    firstPath.vertices.push(start);
    firstPath.weight = start.distance;
    this.vertices.push(start);
    this.paths.push(firstPath);

    let loopGuard = 0;
    while(this.paths.length > 0) {
      console.log('paths:', this.paths.length);
      console.log('vertices:', this.vertices.length);
      // loopGuard++;
      if (loopGuard > 10000) {
        console.log('in a loop');
        return null;
      }
      let path = this.nextPath();
      console.log('path length:', path.edges.length);
      console.log('path weight:', path.weight);
      let vertex = path.vertices[path.vertices.length - 1];
      let edges = this.findEdges(vertex);
      let nonRepeats = edges.filter(edge => this.checkRepeat(edge.second));
      nonRepeats.forEach(edge => {
        this.edges.push(edge);
        this.vertices.push(edge.second);
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
        let singleVertex = JSON.parse(JSON.stringify(vertex));
        singleVertex.elevator = vertex.elevator + 1;
        singleVertex[item1] = vertex[item1] + 1;
        singleVertex.lowestFloor = this.getLowFloor(singleVertex);
        let edge = new Edge;
        edge.first = vertex;
        edge.second = singleVertex;
        edge.weight = -1;
        edges.push(edge);

        movable.forEach(item2 => {
          if (item1 !== item2) {
            let doubleVertex = JSON.parse(JSON.stringify(singleVertex));
            doubleVertex[item2] = vertex[item2] + 1;
            doubleVertex.lowestFloor = this.getLowFloor(doubleVertex);
            let edge = new Edge;
            edge.first = vertex;
            edge.second = doubleVertex;
            edge.weight = -2;
            edges.unshift(edge);
          }
        })
      }
      if (vertex.elevator !== vertex.lowestFloor + 1) {
        let singleVertex = JSON.parse(JSON.stringify(vertex));
        singleVertex.elevator = vertex.elevator - 1;
        singleVertex[item1] = vertex[item1] - 1;
        singleVertex.lowestFloor = this.getLowFloor(singleVertex);
        let edge = new Edge;
        edge.first = vertex;
        edge.second = singleVertex;
        edge.weight = 1;
        edges.push(edge);

        movable.forEach(item2 => {
          if (item1 !== item2) {
            let doubleVertex = JSON.parse(JSON.stringify(singleVertex));
            doubleVertex[item2] = vertex[item2] - 1;
            doubleVertex.lowestFloor = this.getLowFloor(doubleVertex);
            let edge = new Edge;
            edge.first = vertex;
            edge.second = doubleVertex;
            edge.weight = 2;
            edges.push(edge);
          }
        })
      }
    })

    return edges;
  }

  this.getLowFloor = function (vertex) {
    return Math.min(vertex.tc, vertex.tg, vertex.tc, vertex.pg, vertex.tc, vertex.sg, vertex.tc, vertex.mg, vertex.tc, vertex.rg) - 1;
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
      return vertex.distance !== oldVertex.distance ||
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
    let minIndex = 0;

    this.paths.forEach((path, index) => {
      if (path.weight < this.paths[minIndex].weight) {
        minIndex = index;
      }
    })

    return this.paths.splice(minIndex, 1)[0];
  }
}

let gameGraph = new Graph;
let initialState = new Vertex;
initialState.tg = 0;
initialState.pg = 0;
initialState.sg = 0;
initialState.mg = 3;
initialState.rg = 3;

initialState.tc = 0;
initialState.pc = 2;
initialState.sc = 2;
initialState.mc = 3;
initialState.rc = 3;

initialState.lowestFloor = -1;
initialState.elevator = 0;

let endState = new Vertex;
endState.tg = 4;
endState.pg = 4;
endState.sg = 4;
endState.mg = 4;
endState.rg = 4;

endState.tc = 4;
endState.pc = 4;
endState.sc = 4;
endState.mc = 4;
endState.rc = 4;

endState.lowestFloor = 3;
endState.elevator = 4;


initialState.distance = gameGraph.getDistance(initialState, endState);

console.log('initial state is:', initialState);
console.log('starting path finding');

let minimumPathLength = gameGraph.minPath(initialState, endState);

console.log('finished path finding');
console.log('min path steps is:', minimumPathLength);
