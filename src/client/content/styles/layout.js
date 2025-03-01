// src/client/content/styles/layout.js

import {
  contentLayout
} from '../../config'

// Import utility functions for layout examples
import { setupGridInteractions, setupResponsiveDemo, setupCardInteractions } from './layout-utils'

import {
  createLayout,
  createElement,
  createButton
} from 'mtrl'

// Function to initialize interactive layout examples
const initializeInteractiveLayouts = (ui) => {
  if (ui.gridLayout) {
    const gridContainer = ui.gridLayout.querySelector('.grid-layout')
    if (gridContainer) {
      // Setup grid interaction if the utils are loaded
      if (typeof setupGridInteractions === 'function') {
        setupGridInteractions(gridContainer)
      }
    }
  }

  if (ui.responsiveLayout) {
    const responsiveContainer = ui.responsiveLayout.querySelector('.responsive-layout')
    if (responsiveContainer) {
      // Setup responsive demo if the utils are loaded
      if (typeof setupResponsiveDemo === 'function') {
        setupResponsiveDemo(responsiveContainer)
      }
    }
  }

  if (ui.cardLayout) {
    const cardContainer = ui.cardLayout.querySelector('.card-layout')
    if (cardContainer) {
      // Setup card interactions if the utils are loaded
      if (typeof setupCardInteractions === 'function') {
        setupCardInteractions(cardContainer)
      }
    }
  }
}

export const createLayoutContent = (container) => {
  log.info('createLayoutContent', container)
  const info = {
    title: 'Layout',
    description: 'Structured arrangements of components with responsive behavior'
  }
  const layout = createLayout(contentLayout(info), container).component

  console.log('layout', layout)
  const ui = createLayout(createLayoutsLayout(), layout.body).component
  console.info('ui', ui)

  initBasicLayoutExample(ui.basicLayout)
  initResponsiveLayoutExample(ui.responsiveLayout)
  initGridLayoutExample(ui.gridLayout)
  initCardLayoutExample(ui.cardLayout)
  initSplitLayoutExample(ui.splitLayout)

  // Initialize interactive elements after creating all layout components
  initializeInteractiveLayouts(ui)
}

const initBasicLayoutExample = (container) => {
  const basicLayoutContainer = createElement({
    class: 'layout-demo basic-layout'
  })

  // Create header
  const header = createElement({
    tag: 'header',
    class: 'layout-demo__header',
    text: 'Header'
  })

  // Create main area with sidebar and content
  const main = createElement({
    tag: 'main',
    class: 'layout-demo__main'
  })

  const sidebar = createElement({
    tag: 'aside',
    class: 'layout-demo__sidebar',
    text: 'Sidebar'
  })

  const content = createElement({
    tag: 'section',
    class: 'layout-demo__content',
    text: 'Main Content'
  })

  main.appendChild(sidebar)
  main.appendChild(content)

  // Create footer
  const footer = createElement({
    tag: 'footer',
    class: 'layout-demo__footer',
    text: 'Footer'
  })

  // Append elements to the container
  basicLayoutContainer.element.appendChild(header)
  basicLayoutContainer.element.appendChild(main)
  basicLayoutContainer.element.appendChild(footer)

  container.appendChild(basicLayoutContainer.element)
}

const initResponsiveLayoutExample = (container) => {
  const responsiveContainer = createElement({
    class: 'layout-demo responsive-layout'
  })

  // Create example content
  for (let i = 1; i <= 4; i++) {
    const box = createElement({
      tag: 'div',
      class: 'layout-demo__box',
      text: `Item ${i}`
    })
    responsiveContainer.element.appendChild(box)
  }

  // Create buttons to toggle different responsive layouts
  const controls = createElement({
    tag: 'div',
    class: 'layout-demo__controls'
  })

  const layoutOptions = [
    { text: 'Stack', class: 'stack' },
    { text: 'Row', class: 'row' },
    { text: 'Grid', class: 'grid' }
  ]

  layoutOptions.forEach(option => {
    const button = createButton({
      text: option.text,
      variant: 'outlined'
    })

    button.on('click', () => {
      // Remove existing layout classes
      responsiveContainer.element.classList.remove('stack', 'row', 'grid')
      // Add the selected layout class
      responsiveContainer.element.classList.add(option.class)
    })

    controls.appendChild(button.element)
  })

  // Default to stack layout
  responsiveContainer.element.classList.add('stack')

  container.appendChild(responsiveContainer.element)
  container.appendChild(controls)
}

const initGridLayoutExample = (container) => {
  const gridContainer = createElement({
    class: 'layout-demo grid-layout'
  })

  // Create a 3x3 grid
  for (let i = 1; i <= 9; i++) {
    const gridItem = createElement({
      tag: 'div',
      class: 'layout-demo__grid-item',
      text: `${i}`
    })
    gridContainer.element.appendChild(gridItem)
  }

  // Create buttons to toggle different grid configurations
  const controls = createElement({
    tag: 'div',
    class: 'layout-demo__controls'
  })

  const gridOptions = [
    { text: '3-Column', class: 'columns-3' },
    { text: '2-Column', class: 'columns-2' },
    { text: 'Dense', class: 'dense' },
    { text: 'Auto-fit', class: 'auto-fit' }
  ]

  gridOptions.forEach(option => {
    const button = createButton({
      text: option.text,
      variant: 'outlined'
    })

    button.on('click', () => {
      // Remove existing grid classes
      gridContainer.element.classList.remove('columns-3', 'columns-2', 'dense', 'auto-fit')
      // Add the selected grid class
      gridContainer.element.classList.add(option.class)
    })

    controls.appendChild(button.element)
  })

  // Default to 3-column grid
  gridContainer.element.classList.add('columns-3')

  container.appendChild(gridContainer.element)
  container.appendChild(controls)
}

const initCardLayoutExample = (container) => {
  const cardContainer = createElement({
    class: 'layout-demo card-layout'
  })

  // Create 3 cards with different content
  const cardContents = [
    {
      title: 'Card 1',
      content: 'Fixed height card with some content'
    },
    {
      title: 'Card 2',
      content: 'This card has more content to demonstrate how the layout handles different content lengths across cards in the same container.'
    },
    {
      title: 'Card 3',
      content: 'Another card with different content length'
    }
  ]

  cardContents.forEach(cardData => {
    const card = createElement({
      tag: 'div',
      class: 'layout-demo__card'
    })

    const cardHeader = createElement({
      tag: 'div',
      class: 'layout-demo__card-header',
      text: cardData.title
    })

    const cardContent = createElement({
      tag: 'div',
      class: 'layout-demo__card-content',
      text: cardData.content
    })

    card.appendChild(cardHeader)
    card.appendChild(cardContent)
    cardContainer.element.appendChild(card)
  })

  // Create buttons to toggle different card layouts
  const controls = createElement({
    tag: 'div',
    class: 'layout-demo__controls'
  })

  const cardOptions = [
    { text: 'Equal Height', class: 'equal-height' },
    { text: 'Auto Height', class: 'auto-height' },
    { text: 'Masonry', class: 'masonry' }
  ]

  cardOptions.forEach(option => {
    const button = createButton({
      text: option.text,
      variant: 'outlined'
    })

    button.on('click', () => {
      // Remove existing card layout classes
      cardContainer.element.classList.remove('equal-height', 'auto-height', 'masonry')
      // Add the selected card layout class
      cardContainer.element.classList.add(option.class)
    })

    controls.appendChild(button.element)
  })

  // Default to equal height
  cardContainer.element.classList.add('equal-height')

  container.appendChild(cardContainer.element)
  container.appendChild(controls)
}

const initSplitLayoutExample = (container) => {
  const splitContainer = createElement({
    class: 'layout-demo split-layout'
  })

  // Create left panel
  const leftPanel = createElement({
    tag: 'div',
    class: 'layout-demo__panel layout-demo__panel--left',
    text: 'Left Panel'
  })

  // Create right panel
  const rightPanel = createElement({
    tag: 'div',
    class: 'layout-demo__panel layout-demo__panel--right',
    text: 'Right Panel'
  })

  splitContainer.element.appendChild(leftPanel)
  splitContainer.element.appendChild(rightPanel)

  // Create buttons to toggle different split layouts
  const controls = createElement({
    tag: 'div',
    class: 'layout-demo__controls'
  })

  const splitOptions = [
    { text: '50/50', class: 'split-50-50' },
    { text: '30/70', class: 'split-30-70' },
    { text: '70/30', class: 'split-70-30' },
    { text: 'Stack (Mobile)', class: 'split-stack' }
  ]

  splitOptions.forEach(option => {
    const button = createButton({
      text: option.text,
      variant: 'outlined'
    })

    button.on('click', () => {
      // Remove existing split layout classes
      splitContainer.element.classList.remove('split-50-50', 'split-30-70', 'split-70-30', 'split-stack')
      // Add the selected split layout class
      splitContainer.element.classList.add(option.class)
    })

    controls.appendChild(button.element)
  })

  // Default to 50/50 split
  splitContainer.element.classList.add('split-50-50')

  container.appendChild(splitContainer.element)
  container.appendChild(controls)
}

export const createLayoutsLayout = () => [
  // Basic Layout Section
  [createElement, 'section', { class: 'mtrl-content__section' },
    [createElement, 'h2', { class: 'mtrl-content__section-title', text: 'Basic Layout Structure' }],
    [createElement, 'p', { class: 'mtrl-content__description', text: 'A standard layout with header, sidebar, main content, and footer.' }],
    [createElement, 'basicLayout', { id: 'basicLayout' }]
  ],

  // Responsive Layout Section
  [createElement, 'section', { class: 'mtrl-content__section' },
    [createElement, 'h2', { class: 'mtrl-content__section-title', text: 'Responsive Layout' }],
    [createElement, 'p', { class: 'mtrl-content__description', text: 'Layout that adapts to different screen sizes. Use the buttons to toggle between different layouts.' }],
    [createElement, 'responsiveLayout', { id: 'responsiveLayout' }]
  ],

  // Grid Layout Section
  [createElement, 'section', { class: 'mtrl-content__section' },
    [createElement, 'h2', { class: 'mtrl-content__section-title', text: 'Grid Layout' }],
    [createElement, 'p', { class: 'mtrl-content__description', text: 'CSS Grid-based layout with various configurations.' }],
    [createElement, 'gridLayout', { id: 'gridLayout' }]
  ],

  // Card Layout Section
  [createElement, 'section', { class: 'mtrl-content__section' },
    [createElement, 'h2', { class: 'mtrl-content__section-title', text: 'Card Layout' }],
    [createElement, 'p', { class: 'mtrl-content__description', text: 'Layout for displaying card-based content with different options for handling card heights.' }],
    [createElement, 'cardLayout', { id: 'cardLayout' }]
  ],

  // Split Layout Section
  [createElement, 'section', { class: 'mtrl-content__section' },
    [createElement, 'h2', { class: 'mtrl-content__section-title', text: 'Split Layout' }],
    [createElement, 'p', { class: 'mtrl-content__description', text: 'Two-panel layout with adjustable split ratios.' }],
    [createElement, 'splitLayout', { id: 'splitLayout' }]
  ]
]
