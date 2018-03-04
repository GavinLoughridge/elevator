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
}

function Path() {
  this.steps = 0;
  this.tail = null;
  this.weight = null;
}

function Graph() {
  this.vertices = {};

  this.paths = [];

  this.minPath = function (start, end) {
    let firstPath = new Path;
    firstPath.tail = start;
    firstPath.weight = 20;
    this.vertices[this.getHash(start)] = true;
    this.paths.push(firstPath);

    while(this.paths.length > 0) {
      let path = this.nextPath();
      console.log('paths:', this.paths.length);
      console.log('vertices:', this.vertices.length);
      console.log('path length:', path.edges.length);
      console.log('path weight:', path.weight);
      let vertex = path.tail;
      let steps = this.findSteps(vertex);
      let nonRepeats = steps.filter(step => this.checkRepeat(step.vertex));
      nonRepeats.forEach(step => {
        this.vertices[this.getHash(step.vertex)] = true;
      })
      let nonFails = nonRepeats.filter(step => this.checkFailure(step.vertex));
      nonFails.forEach(step => {
        let newPath = new Path;
        newPath.steps = path.steps + 1;
        newPath.tail = step.vertex;
        newPath.weight = path.weight + step.weight;
        if (newPath.weight === 0) {
          console.log('!! found shortest !!');
          console.log('total moves:', newPath.steps);
          console.log('full path:', newPath);
          return newPath.steps;
        }
        this.paths.push(newPath);
      })
    }

    console.log('failed while condition before solution found');
    return null;
  }

  this.floorMap = {
    'a': {
      'up': 'b',
      'down': 'z'
    },
    'b': {
      'up': 'c',
      'down': 'a'
    },
    'c': {
      'up': 'd',
      'down': 'b'
    },
    'd': {
      'down': 'c'
    }
  }

  this.findEdges = function (vertex) {
    let steps = [];
    let items = ['tg', 'tc','pg', 'pc','sg', 'sc','mg', 'mc','rg', 'rc'];
    let movable = items.filter(item => vertex[item] === vertex.elevator);
    movable.forEach(item1 => {
      if (vertex.elevator !== 'd') {
        let singleVertex = JSON.parse(JSON.stringify(vertex));
        singleVertex.elevator = this.floorMap[vertex.elevator]['up'];
        singleVertex[item1] = singleVertex.elevator;
        singleVertex.lowestFloor = this.getLowFloor(singleVertex);
        steps.push({vertex: singleVertex, weight: -1});

        movable.forEach(item2 => {
          if (item1 !== item2) {
            let doubleVertex = JSON.parse(JSON.stringify(singleVertex));
            doubleVertex[item2] = doubleVertex.elevator;
            doubleVertex.lowestFloor = this.getLowFloor(doubleVertex);
            steps.push({vertex: doubleVertex, weight: -2});
          }
        })
      }
      if (this.floorMap[vertex.elevator]['down'] !== vertex.lowestFloor) {
        let singleVertex = JSON.parse(JSON.stringify(vertex));
        singleVertex.elevator = this.floorMap[vertex.elevator]['down'];
        singleVertex[item1] = singleVertex.elevator;
        singleVertex.lowestFloor = this.getLowFloor(singleVertex);
        steps.push({vertex: singleVertex, weight: 1})

        movable.forEach(item2 => {
          if (item1 !== item2) {
            let doubleVertex = JSON.parse(JSON.stringify(singleVertex));
            doubleVertex[item2] = doubleVertex.elevator;
            doubleVertex.lowestFloor = this.getLowFloor(doubleVertex);
            steps.push({vertex: doubleVertex, weight: 2})
          }
        })
      }
    })

    return steps;
  }

  this.getLowFloor = function (vertex) {
    let floors = [vertex.tc, vertex.tg, vertex.tc, vertex.pg, vertex.tc, vertex.sg, vertex.tc, vertex.mg, vertex.tc, vertex.rg];

    if (floors.includes('a')) {
      return 'z';
    }
    if (floors.includes('b')) {
      return 'a';
    }
    if (floors.includes('c')) {
      return 'b';
    }
    return 'c'
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

  // this.getDistance = function (vertex, end) {
  //   return Math.abs(vertex.tg - end.tg) +
  //          Math.abs(vertex.pg - end.pg) +
  //          Math.abs(vertex.sg - end.sg) +
  //          Math.abs(vertex.mg - end.mg) +
  //          Math.abs(vertex.rg - end.rg) +
  //          Math.abs(vertex.tc - end.tc) +
  //          Math.abs(vertex.pc - end.pc) +
  //          Math.abs(vertex.sc - end.sc) +
  //          Math.abs(vertex.mc - end.mc) +
  //          Math.abs(vertex.rc - end.rc);
  // }

  this.checkRepeat = function (vertex) {
    return this.vertices[this.getHash(vertex)];
    // return this.vertices.every(oldVertex => {
    //   return vertex.distance !== oldVertex.distance ||
    //          vertex.elevator !== oldVertex.elevator ||
    //          vertex.tg !== oldVertex.tg ||
    //          vertex.pg !== oldVertex.pg ||
    //          vertex.sg !== oldVertex.sg ||
    //          vertex.mg !== oldVertex.mg ||
    //          vertex.rg !== oldVertex.rg ||
    //          vertex.tc !== oldVertex.tc ||
    //          vertex.pc !== oldVertex.pc ||
    //          vertex.sc !== oldVertex.sc ||
    //          vertex.mc !== oldVertex.mc ||
    //          vertex.rc !== oldVertex.rc;
    // })
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

  this.getHash = function (vertex) {
    return initialState.tg +
           initialState.pg +
           initialState.sg +
           initialState.mg +
           initialState.rg +
           initialState.tc +
           initialState.pc +
           initialState.sc +
           initialState.mc +
           initialState.rc +
           initialState.elevator;
  }
}

let gameGraph = new Graph;
let initialState = new Vertex;
initialState.tg = 'a';
initialState.pg = 'a';
initialState.sg = 'a';
initialState.mg = 'c';
initialState.rg = 'c';

initialState.tc = 'a';
initialState.pc = 'b';
initialState.sc = 'b';
initialState.mc = 'c';
initialState.rc = 'c';

initialState.lowestFloor = 'z';
initialState.elevator = 'a';

console.log('initial state is:', initialState);
console.log('starting path finding');

let minimumPathLength = gameGraph.minPath(initialState);

console.log('finished path finding');
console.log('min path steps is:', minimumPathLength);
