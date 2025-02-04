import { fetchJSON, renderProjects } from "../global.js";
const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');

const projectsTitle = document.querySelector('.projects-title');

if (projectsTitle) {

    projectsTitle.textContent = `${projects.length} Projects`;

}

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";


d3.select('svg').append('path').attr('d', arc).attr('fill', 'red');

let data = [1, 2];

let total = 0;

for (let d of data) {
  total += d;
}

let angle = 0;
let arcData = [];

for (let d of data) {
  let endAngle = angle + (d / total) * 2 * Math.PI;
  arcData.push({ startAngle: angle, endAngle });
  angle = endAngle;
}

let arcs = arcData.map((d) => arcGenerator(d));

arcs.forEach((arc, idx) => {
    d3.select('svg')
      .append('path')
      .attr('d', arc)
      .attr(colors[idx]) 
})

let colors = ['gold', 'purple'];
