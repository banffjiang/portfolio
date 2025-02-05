import { fetchJSON, renderProjects } from "../global.js";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

const projectsContainer = document.querySelector('.projects');
const projectsTitle = document.querySelector('.projects-title');
const searchInput = document.querySelector('.searchBar');
let projects = [];

fetchJSON('../lib/projects.json').then((data) => {
    projects = data; 
    renderProjects(projects, projectsContainer, 'h2');

    if (projectsTitle) {
        projectsTitle.textContent = `${projects.length} Projects`;
    }

    searchInput.addEventListener('change', (event) => {
        const query = event.target.value.toLowerCase();
        let filteredProjects = projects.filter((project) => {
            let values = Object.values(project).join('\n').toLowerCase();
            return values.includes(query);
        });

        renderProjects(filteredProjects, projectsContainer, 'h2');
    });

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
});
