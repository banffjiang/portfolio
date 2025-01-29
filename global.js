
let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/index.html', title: 'Projects' },
    { url: 'contact/index.html', title: 'Contact' },
    { url: 'cv/index.html', title: 'CV' },
    { url: 'https://github.com/banffjiang', title: 'GitHub' }
];

const ARE_WE_HOME = document.documentElement.classList.contains('home');

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;

    if (!ARE_WE_HOME && !url.startsWith('http')) {
        url = '../' + url;
    }

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;

    // Highlight the current page link
    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');
    }

    nav.append(a);
}

document.body.insertAdjacentHTML(
    'afterbegin', 
    `
    <label class="color-scheme">
      Theme:
      <select id="color-scheme-switch">
        <option value="auto" selected>Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
    `
  );

const select = document.querySelector('#color-scheme-switch');

select.addEventListener('input', function (event) {
  console.log('Color scheme changed to', event.target.value);


  document.documentElement.style.setProperty('color-scheme', event.target.value);
});

const savedTheme = localStorage.getItem('color-scheme') || 'auto';
document.documentElement.style.setProperty('color-scheme', savedTheme);
select.value = savedTheme;


select.addEventListener('input', function (event) {
  const theme = event.target.value;
  localStorage.setItem('color-scheme', theme); 
});


export async function fetchJSON(url) {
  try {
      // Fetch the JSON file from the given URL
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    console.log(response);

    const data = await response.json();
    return data;


  } catch (error) {
      console.error('Error fetching or parsing JSON data:', error);
  }
}


export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  if (!(containerElement instanceof HTMLElement)) {
      console.error('Invalid container element:', containerElement);
      return;
  }

  containerElement.innerHTML = '';

  for (let i = 0; i < projects.length; i++) {
      const project = projects[i];

      const article = document.createElement('article');

      article.innerHTML = `
          <${headingLevel}>${project.title}</${headingLevel}>
          <img src="${project.image}" alt="${project.title || 'Untitled Project'}">
          <p>${project.description}</p>
      `;

      containerElement.appendChild(article);
  }
}


export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}