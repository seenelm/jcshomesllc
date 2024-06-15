import '../public/styles/header.css';
import '../public/styles/hero.css';
import '../public/styles/whyus.css';
import '../public/styles/about.css';
import '../public/styles/remodels.css';
import '../public/styles/style.css';

export async function loadComponent(componentId: string, containerId: string): Promise<void> {
  try {
    const response = await fetch(`/components/${componentId}.html`);
    if (!response.ok) {
      throw new Error(`Failed to fetch component ${componentId}: ${response.statusText}`);
    }
    const data = await response.text();
    const template = document.createElement('template');
    template.innerHTML = data.trim();
    const templateContent = (template.content.querySelector(`#${componentId}-template`) as HTMLTemplateElement).content.cloneNode(true);
    document.getElementById(containerId)!.appendChild(templateContent);
  } catch (error) {
    console.error(`Error loading component ${componentId}:`, error);
  }
}

const componentsToLoad = [
  { id: 'header', container: 'header-container' },
  { id: 'hero', container: 'hero-container' },
  { id: 'whyus', container: 'whyus-container' },
  { id: 'remodels', container: 'remodels-container'},
  { id: 'about', container: 'about-container' },
];

const loadedComponents = new Set<string>();

function lazyLoadComponents() {
  componentsToLoad.forEach(component => {
    const container = document.getElementById(component.container);
    if (container && container.getBoundingClientRect().top < window.innerHeight && !loadedComponents.has(component.id)) {
      loadComponent(component.id, component.container).then(() => {
        loadedComponents.add(component.id);
      });
    }
  });
}

window.addEventListener('scroll', lazyLoadComponents);
document.addEventListener('DOMContentLoaded', lazyLoadComponents);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="header-container"></div>
    <div id="hero-container"></div>
    <div id="whyus-container"></div>
    <div id="remodels-container"></div>
    <div id="about-container"></div>
  </div>
`;

window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 0);
  }
});
