const fs = require("fs");
const path = require("path");

// In angstroms
const covalentRadii = {
  H: 0.31,
  C: 0.76,
  N: 0.71,
  O: 0.66,
  F: 0.57,
};

const tolerance = 0.4;

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: node convertMoleculeToMatrix.js <path_to_input_file>");
  process.exit(1);
}

const fileContent = fs.readFileSync(filePath, "utf-8").trim();

const atoms = fileContent.split("\n").map((line) => {
  const [e, x, y, z] = line
    .split(",")
    .map((val, i) => (i === 0 ? val : parseFloat(val)));
  return { e, x, y, z };
});

const distance = (a, b) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

const n = atoms.length;
const adjacencyMatrix = Array.from({ length: n }, () => Array(n).fill(0));

for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    const r1 = covalentRadii[atoms[i].e];
    const r2 = covalentRadii[atoms[j].e];
    if (r1 && r2) {
      const bondLength = r1 + r2 + tolerance;
      if (distance(atoms[i], atoms[j]) <= bondLength) {
        adjacencyMatrix[i][j] = 1;
        adjacencyMatrix[j][i] = 1;
      }
    } else if (!r1) {
      console.error(`Unknown Covalent Radii: ${atoms[i].e}`);
      process.exit(1);
    } else if (!r2) {
      console.error(`Unknown Covalent Radii: ${atoms[j].e}`);
      process.exit(1);
    }
  }
}

adjacencyMatrix.forEach((row) => {
  console.log(row.join(" "));
});
