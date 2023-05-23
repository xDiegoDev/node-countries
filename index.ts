import * as fs from "fs";

// Define the Country interface
interface Country {
  name: string;
  population: number;
  area: number;
  density: number;
}

let content = fs.readFileSync("countries.txt", "utf8");

let lines = content.split("\n");
let countries: Country[] = [];

for (let line of lines) {
  // Split line into name and remaining parts
  let match = line.match(/^([^\d]*)(\d.*)$/);

  if (!match) {
    console.warn(`Skipping line: "${line}"`);
    continue;
  }

  let name = match[1].trim(); // trim() is used to remove any leading/trailing whitespace
  let rest = match[2];

  let [population, area] = rest
    .split(/\s+/)
    .map((str) => parseInt(str.replace(/,/g, ""), 10)); // number 10 is used to indicate decimal numbers should be used. radix
  let density = population / area;

  countries.push({ name, population, area, density });
}

// Sort countries by density
countries.sort((a, b) => b.density - a.density);

// Prepare content for the CSV file
let csvContent = "Name,Population,Area,Density\n";
for (let country of countries) {
  csvContent += `${country.name},${country.population},${country.area},${country.density}\n`;
}

// Write content to CSV file
fs.writeFileSync("countries.csv", csvContent);
