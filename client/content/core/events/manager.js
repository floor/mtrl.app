import {
  createElement,
  createButton
} from 'mtrl'

export const initEventManager = (ui) => {
  const container = ui.eventManager

  // Create explanation and examples for event manager
  const managerExplanation = createElement({
    tag: 'div',
    class: 'event-explanation'
  })

  const explanationText = createElement({
    tag: 'p',
    class: 'event-explanation__text',
    text: '1The Event Manager provides a standardized way to handle DOM events and custom component events with built-in error handling and lifecycle management.'
  })

  managerExplanation.appendChild(explanationText)

  // Create event manager example
  const eventManagerExample = createElement({
    tag: 'div',
    class: 'event-example'
  })

  const exampleTitle = createElement({
    tag: 'h3',
    class: 'event-example__title',
    text: 'Basic Usage'
  })

  const exampleCode = createElement({
    tag: 'pre',
    class: 'event-example__code',
    text: `// Create an event manager for a component
const events = createEventManager(buttonElement);

// Register DOM event listeners
events.on('click', (e) => console.log('Clicked!'));
events.on('mouseenter', (e) => showTooltip());
events.on('mouseleave', (e) => hideTooltip());

// Emit custom component events
events.emit('activate', { detail: 'Button activated' });

// Forward DOM events to component events
events.forward('click', 'activate');

// Automatically clean up when component is destroyed
component.lifecycle.destroy = () => {
  events.destroy();
};`
  })

  const exampleDemo = createElement({
    tag: 'div',
    class: 'event-example__demo'
  })

  const demoButton = createButton({
    text: 'Try Me',
    variant: 'filled'
  })

  const eventLog = createElement({
    tag: 'div',
    class: 'event-log',
    html: '<div class="event-log__title">Event Log:</div><div class="event-log__content"></div>'
  })

  const logContent = eventLog.querySelector('.event-log__content')

  // Add interaction to the demo button
  demoButton.on('click', () => {
    const logEntry = createElement({
      tag: 'div',
      class: 'event-log__entry',
      text: `Click event at ${new Date().toLocaleTimeString()}`
    })
    logContent.appendChild(logEntry)

    // Keep only the last 5 entries
    if (logContent.childNodes.length > 5) {
      logContent.removeChild(logContent.firstChild)
    }
  })

  demoButton.element.addEventListener('mouseenter', () => {
    const logEntry = createElement({
      tag: 'div',
      class: 'event-log__entry',
      text: `Mouse enter at ${new Date().toLocaleTimeString()}`
    })
    logContent.appendChild(logEntry)

    if (logContent.childNodes.length > 5) {
      logContent.removeChild(logContent.firstChild)
    }
  })

  demoButton.element.addEventListener('mouseleave', () => {
    const logEntry = createElement({
      tag: 'div',
      class: 'event-log__entry',
      text: `Mouse leave at ${new Date().toLocaleTimeString()}`
    })
    logContent.appendChild(logEntry)

    if (logContent.childNodes.length > 5) {
      logContent.removeChild(logContent.firstChild)
    }
  })

  exampleDemo.appendChild(demoButton.element)
  exampleDemo.appendChild(eventLog)

  eventManagerExample.appendChild(exampleTitle)
  eventManagerExample.appendChild(exampleCode)
  eventManagerExample.appendChild(exampleDemo)

  container.appendChild(managerExplanation)
  container.appendChild(eventManagerExample)
}
