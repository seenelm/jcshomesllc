import './style.css';

// Function to load HTML template and insert it into the DOM
async function loadComponent(componentId: string, containerId: string) {
  try {
    const response = await fetch(`src/components/${componentId}.html`);
    const data = await response.text();
    const template = document.createElement('template');
    template.innerHTML = data.trim();
    const templateContent = (template.content.querySelector(`#${componentId}-template`) as HTMLTemplateElement).content.cloneNode(true);
    document.getElementById(containerId)!.appendChild(templateContent);
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

loadComponent('header', 'header-container');
loadComponent('hero', 'hero-container');

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="header-container"></div>
    <div id="hero-container"></div>
  </div>
`;
