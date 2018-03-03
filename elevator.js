/*
  STRUCTURE:
  Vertex
    - object
      - key = item, value = floor
      - include lowest ocupide floor (may or may not get used)
  Edge
    Edge.first
      - start vertex
    Edge.second
      - end vertex
    Edge.weight
      - sum of the upward movement of all items (may or may not get used)
  Graph
    Verticies
      - array of Vertices
    Graph.edges
      - array of Edges
  Path
    Path.edges
      - array of Edges
    Path.vertices
      - array of vertices
    Path.weight
      - sum of the weights of all edges
  Paths
    - array of paths (ordered by size)
  Failures
    - array of vertices that are known to fail

  FUNCTIONS:
  Find Edges
    - given a vertex, find all possible moves
    - input: vertex
    - output: array of checked edges
  Check failure
    - given a vertex, see if it results in failure
    - input: vertex
    - output: boolean
  Check sucess
    - given a vertex, see if it matches the end goal
    - input: vertex
    - output: boolean
  Check repeat
    - given a vertex, see if it is already a part of this or another path
    - input: vertex
    - output: boolean
  Pick next path
    - after finishing work on a path, pick the next path to explore
    - input: none
    - output: index on paths
*/
