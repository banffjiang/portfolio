import { fetchJSON, renderProjects } from "../global.js";
let query = '';
let searchInput = document.querySelector('.searchBar');
searchInput.addEventListener('input', (event) => {
    // update query value
    query = event.target.value;
    let filteredProjects = projects.filter((project) => {
        let values = Object.values(project).join('\n').toLowerCase();
        return values.includes(query.toLowerCase());
    });
    
    renderProjects(filteredProjects, projectsContainer, 'h2');
    renderPieChart(filteredProjects); 
});

const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');
renderPieChart(projects); 
const projectsTitle = document.querySelector('.projects-title');

if (projectsTitle) {
  projectsTitle.textContent = `${projects.length} Projects`;
}



function renderPieChart(projectsGiven) {
  let newRolledData = d3.rollups(
    projectsGiven,
    (v) => v.length,
    (d) => d.year,
  );

  let newData = newRolledData.map(([year, count]) => {
    return { value: count, label: year };
  });

  let newSliceGenerator = d3.pie().value((d) => d.value);
  let newArcData = newSliceGenerator(newData);

  let newArcGenerator = d3.arc().innerRadius(0).outerRadius(50);

  let colors = d3.scaleOrdinal(d3.schemeTableau10);

  let newSvg = d3.select('svg');
  newSvg.selectAll('path').remove();
  d3.select('.legend').selectAll('li').remove();

  newArcData.forEach((d, idx) => {
    newSvg.append('path')
        .attr('d', newArcGenerator(d))
        .attr('fill', colors(idx)); 
  });

  let legend = d3.select('.legend');
  newData.forEach((d, idx) => {
    legend.append('li')
        .attr('style', `--color:${colors(idx)}`)
        .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
  });
}

let selectedIndex = -1;

let svg = d3.select('svg'); 

svg.selectAll('path').remove();

arcs.forEach((arc, i) => {
  svg
    .append('path')
    .attr('d', arc)
    .attr('fill', colors(i))
    .on('click', () => {
      selectedIndex = selectedIndex === i ? -1 : i; 

      svg
        .selectAll('path')
        .attr('class', (_, idx) => (idx === selectedIndex ? 'selected' : ''));

      legend
        .selectAll('li')
        .attr('class', (_, idx) => (idx === selectedIndex ? 'selected' : ''));

      if (selectedIndex === -1) {
        renderProjects(projects, projectsContainer, 'h2');
      } else {
        let selectedYear = newData[selectedIndex].label; 
        let filteredProjects = projects.filter(project => project.year === selectedYear);
        renderProjects(filteredProjects, projectsContainer, 'h2');
      }
    });
});


