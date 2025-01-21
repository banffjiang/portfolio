let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'contact/', title: 'Contact' },
    { url: 'cv/', title: 'CV' },
    { url: 'https://github.com/banffjiang', title: 'GitHub' }
  ];
  
  // Check if we're on the home page
  const ARE_WE_HOME = document.documentElement.classList.contains('home');
  
  // Create the <nav> element
  let nav = document.createElement('nav');
  document.body.prepend(nav);
  
  for (let p of pages) {
    let url = p.url;
    let title = p.title;
  
    // Prepend '../' for non-home pages (relative URLs)
    url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;
  
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
  
    // Highlight the current page link
    if (a.host === location.host && a.pathname === location.pathname) {
      a.classList.add('current');
    }
  
    nav.append(a);
  }
  