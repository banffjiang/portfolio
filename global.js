// console.log('IT’S ALIVE!');

// function $$(selector, context = document) {
//   return Array.from(context.querySelectorAll(selector));
// }


// const $$ = (selector) => Array.from(document.querySelectorAll(selector));


// const navLinks = $$("nav a");

// const currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname
//   );

// currentLink?.classList.add('current');

// Step 1: Array of pages with URLs and titles
let pages = [
    { url: 'index.html', title: 'Home' },
    { url: 'projects/index.html', title: 'Projects' },
    { url: 'contact/index.html', title: 'Contact' },
    { url: 'cv/index.html', title: 'CV' },
    { url: 'https://github.com/banffjiang', title: 'GitHub' }
  ];
  

  const ARE_WE_HOME = document.documentElement.classList.contains('home');
  

  let nav = document.createElement('nav');
  document.body.prepend(nav);
  

  let navLinks = [];
  

  for (let p of pages) {
    let url = p.url;
    let title = p.title;
  

    url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;
  

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
  

    navLinks.push(a);
  

    if (!a.host === location.host) {
      a.target = '_blank';
    }
  

    nav.append(a);
  }
  

  let currentLink = navLinks.find(
    (a) => a.host === location.host && a.pathname === location.pathname
  );
  
  currentLink?.classList.add('current');
  