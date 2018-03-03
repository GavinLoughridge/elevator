# Summary:
  This problem comes from Advent of Code 2016, day 11: http://adventofcode.com/2016/day/11

  It is a more complex version of puzzle in which you need to get a dog, hen, and bag of seed across a river. Here we need to get a collection of microchips and radioactive generators up to the 4th floor of a building without any of the generators destroying any of the chips. You can read the specifics of which chips may be near which generators under what conditions in the Advent of Code link above.

  So far I have not developed a working solution, but my plan is to use a graph of game states and Dijkstra's algorithm. Since I do not have the entire game graph, I'll generate the game graph as I travers the vertices from the start to the finish.

  I'm not going to start using any weighting at first since all moves have weight 1. However, if I find my solution requires unreasonable time or memory then I'm planning to weight edges in terms of how much closer a move gets each item to it's desired end state.

  Below are the data structures and functions I'm planning to use.

## DATA STRUCTURES:
  These are the general data structures I think I will need to solve this problem.  

  Vertex  
    - object  
      - key = item, value = floor  
      - include lowest occupied floor (may or may not get used)  
      - include distance of all items from their destination (may or may not get used)  
  Edge  
    Edge.first  
      - start vertex  
    Edge.second  
      - end vertex  
    Edge.weight  
      - change in distance (may or may not get used)  
  Graph  
    Graph.Verticies  
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

## FUNCTIONS:  
  These are the general functions I think I will need to solve this problem.  
  Find Min Path  
    - given a starting vertex, find the shortest path to the end vertex  
    - input: start vertex, end vertex  
    - output: Path  
  Find Edges  
    - given a vertex, find all possible moves  
    - input: vertex  
    - output: array of edges  
  Check failure  
    - given a vertex, see if it results in failure  
    - input: vertex  
    - output: boolean  
  Check success  
    - given a vertex, see if it matches the end goal (may or may not use, will start with get distance instead)  
    - input: vertex  
    - output: boolean  
  Get distance  
    - given a vertex, see how close all items are from their destination (may or may not get used)  
    - input: Vertex  
    - output: integer  
  Check repeat  
    - given a vertex, see if it is already a part of this or another path  
    - input: vertex  
    - output: boolean  
  Pick next path  
    - after finishing work on a path, pick the next path to explore  
    - input: none  
    - output: index on paths  
