import { fetchJSON, renderProjects } from "../global.js";
const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');

const projectsTitle = document.querySelector('.projects-title');

if (projectsTitle) {
    projectsTitle.textContent = `${projects.length} Projects`;
}

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

let data = [1, 2, 3, 4, 5, 5];

let sliceGenerator = d3.pie();

let arcData = sliceGenerator(data);

let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

let colors = d3.scaleOrdinal(d3.schemeTableau10);

let svg = d3.select('svg');

arcData.forEach((d, idx) => {
    svg.append('path')
        .attr('d', arcGenerator(d))
        .attr('fill', colors(idx)); 
});