/**
 * Campus Routing & Pathfinding Engine
 * Graph network representing the actual roadways, pedestrian avenues,
 * and building access portals from the Akshaya Institutional Campus Plan.
 */

const CAMPUS_GRAPH_NODES = {
  // Northern Entry Boulevard
  N_GATE: { id: "N_GATE", x: 445, y: 115, name: "Main Entrance Gate & Security Outpost" },
  N_PARKING_2W: { id: "N_PARKING_2W", x: 470, y: 220, name: "Two Wheeler Parking Avenue" },
  N_PARKING_4W: { id: "N_PARKING_4W", x: 495, y: 320, name: "Four Wheeler Parking Avenue" },
  N_NORTH_BEND: { id: "N_NORTH_BEND", x: 440, y: 395, name: "North Junction (Transformer & Ball Badminton)" },

  // Northwest Utility & Pre-incubation
  N_QUAD_NW: { id: "N_QUAD_NW", x: 235, y: 465, name: "Northwest Quad Junction (Thalir & Recreation)" },
  N_QUAD_NE: { id: "N_QUAD_NE", x: 435, y: 465, name: "Northeast Quad Junction (Store & Office)" },

  // West Sports & Perimeter Road
  N_WEST_RD: { id: "N_WEST_RD", x: 155, y: 600, name: "West Sports Avenue (Volleyball, Kabaddi, Cricket)" },
  N_WEST_SW: { id: "N_WEST_SW", x: 155, y: 760, name: "Southwest Perimeter Junction" },

  // Quadrangle Perimeters & Entrances
  N_QUAD_W: { id: "N_QUAD_W", x: 195, y: 635, name: "Arts & Science Block Entrance" },
  N_ADMIN_CIRCLE: { id: "N_ADMIN_CIRCLE", x: 505, y: 615, name: "Central Admin Roundabout & Campus Temple" },
  N_ADMIN_ENTRY: { id: "N_ADMIN_ENTRY", x: 420, y: 615, name: "Main Block Grand Portico & Admin Entry" },
  N_COURTYARD: { id: "N_COURTYARD", x: 300, y: 625, name: "Central Quad Courtyard & Basketball Court" },
  N_QUAD_SW: { id: "N_QUAD_SW", x: 205, y: 780, name: "Southwest Quad Avenue (Principal ACAS)" },
  N_QUAD_S: { id: "N_QUAD_S", x: 300, y: 780, name: "South Quad Avenue (A Block & Library)" },
  N_QUAD_SE: { id: "N_QUAD_SE", x: 460, y: 780, name: "Southeast Quad Junction & Cafeteria" },

  // East Campus (Food Court, Hostels, Auditorium)
  N_FOOD_COURT_ENTRY: { id: "N_FOOD_COURT_ENTRY", x: 550, y: 780, name: "Food Court & ATM Entrance" },
  N_GIRLS_HOSTEL_ENTRY: { id: "N_GIRLS_HOSTEL_ENTRY", x: 670, y: 780, name: "Girls Hostel Gateway" },
  N_AUDITORIUM_ENTRY: { id: "N_AUDITORIUM_ENTRY", x: 585, y: 880, name: "Auditorium Main Portico" },

  // South Campus (Playground, E Block, Workshops, Boys Hostel)
  N_PLAYGROUND_ENTRY: { id: "N_PLAYGROUND_ENTRY", x: 360, y: 800, name: "Main Playground North Gate" },
  N_E_BLOCK_ENTRY: { id: "N_E_BLOCK_ENTRY", x: 440, y: 840, name: "E Block Main Entrance (Mech/Civil/EEE)" },
  N_SOUTH_RD: { id: "N_SOUTH_RD", x: 400, y: 940, name: "South Avenue (Workshop & Training Centre)" },
  N_COE_ENTRY: { id: "N_COE_ENTRY", x: 485, y: 945, name: "Centres of Excellence Entry" },
  N_BOYS_HOSTEL_ENTRY: { id: "N_BOYS_HOSTEL_ENTRY", x: 235, y: 900, name: "Boys Hostel Main Gate" }
};

// Road and Pathway Connections (Graph Edges)
// Distances are estimated in meters based on the campus plan scale (~0.65m per map unit)
const CAMPUS_EDGES = [
  // Entrance boulevard
  { from: "N_GATE", to: "N_PARKING_2W", dist: 70, road: "Campus Boulevard" },
  { from: "N_PARKING_2W", to: "N_PARKING_4W", dist: 65, road: "Campus Boulevard" },
  { from: "N_PARKING_4W", to: "N_NORTH_BEND", dist: 60, road: "North Entry Drive" },

  // North ring & connections
  { from: "N_NORTH_BEND", to: "N_QUAD_NE", dist: 50, road: "North Campus Ring Road" },
  { from: "N_NORTH_BEND", to: "N_QUAD_NW", dist: 130, road: "Power House & Pre-incubation Way" },
  { from: "N_QUAD_NW", to: "N_QUAD_NE", dist: 130, road: "North Academic Corridor" },

  // West side avenue
  { from: "N_QUAD_NW", to: "N_WEST_RD", dist: 90, road: "West Sports Promenade" },
  { from: "N_WEST_RD", to: "N_QUAD_W", dist: 35, road: "Arts & Science West Gate" },
  { from: "N_WEST_RD", to: "N_WEST_SW", dist: 105, road: "West Sports Promenade" },
  { from: "N_WEST_SW", to: "N_QUAD_SW", dist: 35, road: "Southwest Link Road" },

  // Quadrangle loop and courtyard access
  { from: "N_QUAD_NE", to: "N_ADMIN_CIRCLE", dist: 100, road: "East Campus Drive" },
  { from: "N_ADMIN_CIRCLE", to: "N_ADMIN_ENTRY", dist: 55, road: "Main Block Grand Portico Drive" },
  { from: "N_ADMIN_ENTRY", to: "N_COURTYARD", dist: 80, road: "Central Academic Archway Walkway" },
  { from: "N_COURTYARD", to: "N_QUAD_NW", dist: 110, road: "North Courtyard Corridor" },
  { from: "N_COURTYARD", to: "N_QUAD_W", dist: 70, road: "Arts & Science Courtyard Walk" },
  { from: "N_COURTYARD", to: "N_QUAD_S", dist: 100, road: "South Courtyard Walkway" },

  // East drive to South Quad
  { from: "N_ADMIN_CIRCLE", to: "N_QUAD_SE", dist: 110, road: "East Campus Avenue" },
  { from: "N_QUAD_SE", to: "N_QUAD_S", dist: 105, road: "A Block & Library Promenade" },
  { from: "N_QUAD_S", to: "N_QUAD_SW", dist: 65, road: "A Block West Walkway" },

  // Food Court & Auditorium branches
  { from: "N_QUAD_SE", to: "N_FOOD_COURT_ENTRY", dist: 60, road: "Food Court Avenue" },
  { from: "N_FOOD_COURT_ENTRY", to: "N_GIRLS_HOSTEL_ENTRY", dist: 80, road: "Girls Hostel Access Road" },
  { from: "N_FOOD_COURT_ENTRY", to: "N_AUDITORIUM_ENTRY", dist: 70, road: "Auditorium Promenade" },
  { from: "N_QUAD_SE", to: "N_AUDITORIUM_ENTRY", dist: 100, road: "Auditorium South Drive" },

  // Southern Engineering & Sports connections
  { from: "N_QUAD_SE", to: "N_E_BLOCK_ENTRY", dist: 45, road: "E Block North Walk" },
  { from: "N_QUAD_S", to: "N_PLAYGROUND_ENTRY", dist: 35, road: "Playground North Avenue" },
  { from: "N_PLAYGROUND_ENTRY", to: "N_E_BLOCK_ENTRY", dist: 55, road: "Sports & Engineering Link" },
  { from: "N_E_BLOCK_ENTRY", to: "N_SOUTH_RD", dist: 75, road: "Mechanical & Civil Avenue" },
  { from: "N_SOUTH_RD", to: "N_COE_ENTRY", dist: 55, road: "Centres of Excellence Link" },
  { from: "N_PLAYGROUND_ENTRY", to: "N_SOUTH_RD", dist: 95, road: "Playground East Road" },

  // Boys Hostel and Workshop connections
  { from: "N_QUAD_SW", to: "N_BOYS_HOSTEL_ENTRY", dist: 85, road: "Boys Hostel Walkway" },
  { from: "N_WEST_SW", to: "N_BOYS_HOSTEL_ENTRY", dist: 100, road: "Southwest Hostel Road" },
  { from: "N_BOYS_HOSTEL_ENTRY", to: "N_SOUTH_RD", dist: 110, road: "Workshop & Boys Hostel Road" }
];

class CampusRouter {
  constructor() {
    this.nodes = CAMPUS_GRAPH_NODES;
    this.edges = CAMPUS_EDGES;
    this.adjacencyList = new Map();
    this.buildGraph();
  }

  buildGraph() {
    for (const nodeId in this.nodes) {
      this.adjacencyList.set(nodeId, []);
    }

    this.edges.forEach(edge => {
      // Undirected graph (bidirectional walking paths)
      this.adjacencyList.get(edge.from).push({
        node: edge.to,
        dist: edge.dist,
        road: edge.road
      });
      this.adjacencyList.get(edge.to).push({
        node: edge.from,
        dist: edge.dist,
        road: edge.road
      });
    });
  }

  /**
   * Find shortest path using Dijkstra's Algorithm
   */
  findShortestPath(startNodeId, endNodeId) {
    if (!this.nodes[startNodeId] || !this.nodes[endNodeId]) {
      return null;
    }

    if (startNodeId === endNodeId) {
      const node = this.nodes[startNodeId];
      return {
        path: [startNodeId],
        points: [{ x: node.x, y: node.y }],
        totalDistance: 0,
        walkingMinutes: 0,
        steps: [
          {
            instruction: `You are already at ${node.name}`,
            dist: 0,
            road: "Arrival",
            icon: "check-circle",
            point: { x: node.x, y: node.y }
          }
        ]
      };
    }

    const distances = {};
    const previous = {};
    const previousEdge = {};
    const unvisited = new Set(Object.keys(this.nodes));

    for (const nodeId in this.nodes) {
      distances[nodeId] = Infinity;
    }
    distances[startNodeId] = 0;

    while (unvisited.size > 0) {
      // Get unvisited node with smallest distance
      let current = null;
      let minDistance = Infinity;
      for (const nodeId of unvisited) {
        if (distances[nodeId] < minDistance) {
          minDistance = distances[nodeId];
          current = nodeId;
        }
      }

      if (current === null || distances[current] === Infinity) {
        break; // Unreachable nodes
      }

      if (current === endNodeId) {
        break; // Destination reached!
      }

      unvisited.delete(current);

      const neighbors = this.adjacencyList.get(current) || [];
      for (const neighbor of neighbors) {
        if (!unvisited.has(neighbor.node)) continue;

        const alt = distances[current] + neighbor.dist;
        if (alt < distances[neighbor.node]) {
          distances[neighbor.node] = alt;
          previous[neighbor.node] = current;
          previousEdge[neighbor.node] = neighbor;
        }
      }
    }

    if (distances[endNodeId] === Infinity) {
      return null; // No path found
    }

    // Reconstruct Path
    const path = [];
    let curr = endNodeId;
    while (curr) {
      path.unshift(curr);
      curr = previous[curr];
    }

    const points = path.map(id => ({ x: this.nodes[id].x, y: this.nodes[id].y }));
    const totalDistance = Math.round(distances[endNodeId]);
    const walkingMinutes = Math.max(1, Math.round(totalDistance / 75)); // Average walking speed ~75m/min

    // Generate Turn-by-Turn Directions
    const steps = this.generateDirections(path, previousEdge);

    return {
      path,
      points,
      totalDistance,
      walkingMinutes,
      steps
    };
  }

  /**
   * Calculate turn directions based on vectors between path nodes
   */
  generateDirections(path, previousEdge) {
    const steps = [];
    const len = path.length;

    if (len <= 1) return steps;

    for (let i = 0; i < len - 1; i++) {
      const u = this.nodes[path[i]];
      const v = this.nodes[path[i + 1]];
      const edge = this.adjacencyList.get(path[i]).find(e => e.node === path[i + 1]);
      const dist = edge ? edge.dist : Math.round(Math.hypot(v.x - u.x, v.y - u.y) * 0.65);
      const road = edge ? edge.road : "Campus Pathway";

      let instruction = "";
      let icon = "arrow-up";

      if (i === 0) {
        instruction = `Start from ${u.name} and proceed along ${road}`;
        icon = "map-pin";
      } else {
        const prev = this.nodes[path[i - 1]];
        // Calculate bearing change
        const v1x = u.x - prev.x;
        const v1y = u.y - prev.y;
        const v2x = v.x - u.x;
        const v2y = v.y - u.y;

        const angle1 = Math.atan2(v1y, v1x);
        const angle2 = Math.atan2(v2y, v2x);
        let diff = (angle2 - angle1) * (180 / Math.PI);
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;

        if (diff > 35 && diff < 140) {
          instruction = `Turn right onto ${road}`;
          icon = "corner-up-right";
        } else if (diff < -35 && diff > -140) {
          instruction = `Turn left onto ${road}`;
          icon = "corner-up-left";
        } else if (Math.abs(diff) >= 140) {
          instruction = `Take a sharp turn towards ${road}`;
          icon = "refresh-cw";
        } else {
          instruction = `Continue straight along ${road}`;
          icon = "arrow-up";
        }
      }

      steps.push({
        instruction: `${instruction} (${dist}m)`,
        dist,
        road,
        icon,
        fromNode: path[i],
        toNode: path[i + 1],
        point: { x: u.x, y: u.y }
      });
    }

    const lastNode = this.nodes[path[len - 1]];
    steps.push({
      instruction: `Arrive at destination: ${lastNode.name}`,
      dist: 0,
      road: "Destination",
      icon: "check-circle",
      point: { x: lastNode.x, y: lastNode.y }
    });

    return steps;
  }

  /**
   * Find closest entrance node for a given location or coordinate
   */
  findNearestNode(coords) {
    let closestNode = null;
    let minDist = Infinity;

    for (const nodeId in this.nodes) {
      const node = this.nodes[nodeId];
      const d = Math.hypot(node.x - coords.x, node.y - coords.y);
      if (d < minDist) {
        minDist = d;
        closestNode = nodeId;
      }
    }
    return closestNode;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CampusRouter, CAMPUS_GRAPH_NODES, CAMPUS_EDGES };
}
