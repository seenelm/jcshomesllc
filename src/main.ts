import './styles/style.css';
import { loadComponent } from './utils/loadComponent';

loadComponent('header', 'header-container');
loadComponent('hero', 'hero-container');
loadComponent('about', 'about-container');
loadComponent('projects', 'projects-container');

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="header-container"></div>
    <div id="hero-container"></div>
    <div id="about-container"></div>
    <div id="projects-container"></div>
  </div>
`;
