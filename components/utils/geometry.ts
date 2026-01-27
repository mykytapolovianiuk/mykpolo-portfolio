/**
 * Mathematical Geometry Utilities for 120-vertex Shape Generation
 * Generates precise polygon strings for perfect morphing animations
 */

interface ShapePaths {
  square: string;
  triangle: string;
  circle: string;
}

/**
 * Generate 120-vertex polygon strings for perfect shape morphing
 * All shapes use exactly 120 points to ensure silky-smooth transitions
 */
export function generateShapes(): ShapePaths {
  const N = 120; // Number of vertices for all shapes
  const points = [];
  
  // Generate circle using polar coordinates
  const circlePoints = [];
  for (let i = 0; i < N; i++) {
    // Start at top (-90 degrees) and go clockwise
    const theta = (i / N) * 2 * Math.PI - Math.PI / 2;
    const x = 50 + 50 * Math.cos(theta);
    const y = 50 + 50 * Math.sin(theta);
    circlePoints.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }
  
  // Generate square using perimeter walking (4 sides of 100 units each)
  const squarePoints = [];
  const perimeterStep = 400 / N; // Total perimeter = 400 units
  
  for (let i = 0; i < N; i++) {
    const distance = i * perimeterStep;
    
    let x, y;
    
    if (distance <= 100) {
      // Top side: (0,0) to (100,0)
      x = distance;
      y = 0;
    } else if (distance <= 200) {
      // Right side: (100,0) to (100,100)
      x = 100;
      y = distance - 100;
    } else if (distance <= 300) {
      // Bottom side: (100,100) to (0,100)
      x = 300 - distance;
      y = 100;
    } else {
      // Left side: (0,100) to (0,0)
      x = 0;
      y = 400 - distance;
    }
    
    squarePoints.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }
  
  // Generate triangle using 3 vertices distributed evenly
  const trianglePoints = [];
  const triangleVertices = [
    { x: 50, y: 0 },      // Top
    { x: 100, y: 100 },   // Bottom Right
    { x: 0, y: 100 }      // Bottom Left
  ];
  
  for (let i = 0; i < N; i++) {
    const segment = Math.floor(i / (N / 3));
    const localIndex = i % Math.floor(N / 3);
    const nextSegment = (segment + 1) % 3;
    
    const t = localIndex / Math.floor(N / 3);
    
    // Linear interpolation between current vertex and next vertex
    const startX = triangleVertices[segment].x;
    const startY = triangleVertices[segment].y;
    const endX = triangleVertices[nextSegment].x;
    const endY = triangleVertices[nextSegment].y;
    
    const x = startX + t * (endX - startX);
    const y = startY + t * (endY - startY);
    
    trianglePoints.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }
  
  return {
    square: `polygon(${squarePoints.join(', ')})`,
    triangle: `polygon(${trianglePoints.join(', ')})`,
    circle: `polygon(${circlePoints.join(', ')})`
  };
}

/**
 * Alternative implementation using parametric equations for even distribution
 */
export function generateShapesParametric(): ShapePaths {
  const N = 120;
  
  // Circle: Parametric form
  const circlePoints = Array.from({ length: N }, (_, i) => {
    const t = i / N;
    const theta = t * 2 * Math.PI - Math.PI / 2;
    const x = 50 + 50 * Math.cos(theta);
    const y = 50 + 50 * Math.sin(theta);
    return `${x.toFixed(2)}% ${y.toFixed(2)}%`;
  });
  
  // Square: Parametric perimeter traversal
  const squarePoints = Array.from({ length: N }, (_, i) => {
    const t = i / N;
    const perimeter = 4;
    const sideLength = 100;
    
    // Map t to perimeter segments
    const segment = t * perimeter;
    const localT = segment % 1;
    
    let x, y;
    if (segment < 1) {
      // Bottom side (moving right)
      x = localT * sideLength;
      y = 100;
    } else if (segment < 2) {
      // Right side (moving up)
      x = 100;
      y = 100 - localT * sideLength;
    } else if (segment < 3) {
      // Top side (moving left)
      x = 100 - localT * sideLength;
      y = 0;
    } else {
      // Left side (moving down)
      x = 0;
      y = localT * sideLength;
    }
    
    return `${x.toFixed(2)}% ${y.toFixed(2)}%`;
  });
  
  // Triangle: Parametric along three sides
  const trianglePoints = Array.from({ length: N }, (_, i) => {
    const t = i / N;
    const vertices = [
      { x: 50, y: 0 },      // Top
      { x: 100, y: 100 },   // Bottom Right
      { x: 0, y: 100 }      // Bottom Left
    ];
    
    // Distribute points across 3 sides
    const pointsPerSide = N / 3;
    const sideIndex = Math.floor(t * 3);
    const localT = (t * 3) % 1;
    
    const startVertex = vertices[sideIndex];
    const endVertex = vertices[(sideIndex + 1) % 3];
    
    const x = startVertex.x + localT * (endVertex.x - startVertex.x);
    const y = startVertex.y + localT * (endVertex.y - startVertex.y);
    
    return `${x.toFixed(2)}% ${y.toFixed(2)}%`;
  });
  
  return {
    square: `polygon(${squarePoints.join(', ')})`,
    triangle: `polygon(${trianglePoints.join(', ')})`,
    circle: `polygon(${circlePoints.join(', ')})`
  };
}

// Export the primary implementation
export default generateShapes;