export async function loadComponent(componentId: string, containerId: string): Promise<void> {
  try {
    // Adjust the path as necessary to match your project structure
    const response = await fetch(`/src/components/${componentId}.html`);
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
