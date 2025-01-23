
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
