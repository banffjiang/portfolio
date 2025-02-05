import { fetchJSON, renderProjects } from "../global.js";
const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');

const projectsTitle = document.querySelector('.projects-title');

if (projectsTitle) {
    projectsTitle.textContent = `${projects.length} Projects`;
}

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

let rolledData = d3.rollups(
    projects,
    (v) => v.length,
    (d) => d.year,
  );

let data = rolledData.map(([year, count]) => {
    return { value: count, label: year };
  });


let sliceGenerator = d3.pie().value((d) => d.value);

let arcData = sliceGenerator(data);

let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

let colors = d3.scaleOrdinal(d3.schemeTableau10);

let svg = d3.select('#projects-plot').attr('width', 400).attr('height', 400);

arcData.forEach((d, idx) => {
    svg.append('path')
        .attr('d', arcGenerator(d))
        .attr('fill', colors(idx)); 
});

let legend = d3.select('.legend');

data.forEach((d, idx) => {
    legend.append('li') 
          .attr('style', `--color:${colors(idx)}`) 
          .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`); 
});


