
import './styles/header.css';
import './styles/hero.css';
import './styles/whyus.css';
import './styles/about.css';
import './styles/style.css';


import { loadComponent } from './utils/loadComponent';

loadComponent('header', 'header-container');
loadComponent('hero', 'hero-container');
loadComponent('whyus', 'whyus-container');
loadComponent('about', 'about-container');
loadComponent('projects', 'projects-container');

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="header-container"></div>
    <div id="hero-container"></div>
    <div id="whyus-container"></div>
    <div id="about-container"></div>
    <div id="projects-container"></div>
  </div>
`;

window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 0);
  }
});