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

    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');
    }

    nav.append(a);
}


document.body.insertAdjacentHTML(
    'afterbegin',
    
      <form>
        <label class="color-scheme">
          Theme:
          <select id="color-scheme-select">
            <option value="auto" selected>Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </form>
    
  );
  
  const select = document.querySelector('#color-scheme-select');
  
  select.addEventListener('input', function (event) {
    const selectedScheme = event.target.value;
    console.log('Color scheme changed to', selectedScheme);
  
    const root = document.documentElement;
  
    if (selectedScheme === 'auto') {
      root.style.removeProperty('color-scheme'); 
    } else {
      root.style.setProperty('color-scheme', selectedScheme);
    }
  });
  
