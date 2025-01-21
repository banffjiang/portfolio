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
  
  // Check if we're on the home page
  const ARE_WE_HOME = document.documentElement.classList.contains('home');
  
  // Create the <nav> element
  let nav = document.createElement('nav');
  document.body.prepend(nav);
  
  let navLinks = [];
  
  for (let p of pages) {
    let url = p.url;
    let title = p.title;
  
    // Prepend '../' for non-home pages (relative URLs)
    url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;
  
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
  
    // Check if it's an external link
    if (a.host !== location.host) {
      a.target = '_blank';
    }
  
    // Push the link to the navLinks array
    navLinks.push(a);
  
    // Add the link to the <nav> element
    nav.append(a);
  }
  
  // Highlight the current page link
  let currentLink = navLinks.find(
    (a) => a.host === location.host && a.pathname === location.pathname
  );
  currentLink?.classList.add('current');
  