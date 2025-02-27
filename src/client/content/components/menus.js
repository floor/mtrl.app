// src/client/content/components/menu.js

import {
  contentLayout
} from '../../config'

import {
  createElement,
  createLayout,
  createMenu,
  createButton
} from 'mtrl'

const moreIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
</svg>`

export const createMenusContent = (container, components) => {
  log.info('createButtonsContent', container)
  const info = {
    title: 'Menus',
    description: 'Display a list of choices on a temporary surface'
  }
  const layout = createLayout(contentLayout(info), container).component

  console.log('layout', layout)

  const ui = createLayout(createMenusLayout(components), layout.body).component
  initBasicMenu(ui)
  initNestedMenu(ui)
  initIconMenu(ui)
  initCustomMenu(ui)
}

// Basic menu example
export const initBasicMenu = (ui) => {
  const container = ui.basicMenu
  const button = createButton({
    text: 'Show Basic Menu',
    variant: 'filled'
  })

  const menu = createMenu({
    items: [
      { name: 'new', text: 'New File' },
      { name: 'open', text: 'Open...' },
      { type: 'divider' },
      { name: 'save', text: 'Save' },
      { name: 'save-as', text: 'Save As...' }
    ],
    openingButton: button // Pass the button reference to prevent closing issues
  })

  button.on('click', () => {
    menu.show().position(button.element)
  })

  menu.on('select', ({ name, text }) => {
    console.log(`Selected: ${name} (${text})`)
  })

  container.appendChild(button.element)
}

// Nested menu example
export const initNestedMenu = (ui) => {
  const container = ui.nestedMenu
  const button = createButton({
    text: 'Show Nested Menu',
    variant: 'tonal'
  })

  const menu = createMenu({
    items: [
      {
        name: 'format',
        text: 'Format',
        items: [
          { name: 'bold', text: 'Bold' },
          { name: 'italic', text: 'Italic' },
          { name: 'underline', text: 'Underline' }
        ]
      },
      {
        name: 'paragraph',
        text: 'Paragraph',
        items: [
          { name: 'align-left', text: 'Align Left' },
          { name: 'align-center', text: 'Center' },
          { name: 'align-right', text: 'Align Right' }
        ]
      },
      { type: 'divider' },
      { name: 'find', text: 'Find and Replace...' }
    ],
    openingButton: button // Pass the button reference
  })

  button.on('click', () => {
    menu.show().position(button.element)
  })

  menu.on('select', ({ name, text }) => {
    console.log(`Selected nested item: ${name} (${text})`)
  })

  container.appendChild(button.element)
}

// Icon menu example
export const initIconMenu = (ui) => {
  const container = ui.iconMenu
  const button = createButton({
    icon: moreIcon,
    variant: 'outlined'
  })

  const menu = createMenu({
    items: [
      { name: 'refresh', text: 'Refresh' },
      { name: 'settings', text: 'Settings' },
      { type: 'divider' },
      { name: 'keyboard', text: 'Keyboard shortcuts' },
      { name: 'help', text: 'Help' }
    ],
    openingButton: button // Pass the button reference
  })

  button.on('click', () => {
    menu.show().position(button.element)
  })

  menu.on('select', ({ name, text }) => {
    console.log(`Selected from icon menu: ${name} (${text})`)
  })

  container.appendChild(button.element)
}

// Custom menu with disabled items and different alignments
export const initCustomMenu = (ui) => {
  const container = ui.customMenu
  const button = createButton({
    text: 'Show Custom Menu',
    variant: 'elevated'
  })

  const menu = createMenu({
    items: [
      { name: 'share', text: 'Share', disabled: true },
      { name: 'download', text: 'Download' },
      { type: 'divider' },
      { name: 'rename', text: 'Rename' },
      { name: 'delete', text: 'Delete', disabled: true }
    ],
    openingButton: button // Pass the button reference
  })

  button.on('click', () => {
    console.log('click')
    menu.show().position(button.element, {
      align: 'center',
      vAlign: 'bottom'
    })
  })

  menu.on('select', ({ name, text }) => {
    console.log(`Selected from custom menu: ${name} (${text})`)
  })

  container.appendChild(button.element)
}

export const createMenusLayout = (components) => [
  // Basic Menu Section
  [createElement, { tag: 'section', class: 'mtrl-content__section' },
    [createElement, { tag: 'h2', class: 'mtrl-content__section-title', text: 'Basic Menu' }],
    [createElement, 'basicMenu', { class: 'mtrl-content__demo' }]
  ],

  // Nested Menu Section
  [createElement, { class: 'mtrl-content__section' },
    [createElement, { class: 'mtrl-content__section-title', text: 'Nested Menu' }],
    [createElement, 'nestedMenu', { class: 'mtrl-content__demo' }]
  ],

  // Icon Menu Section
  [createElement, { class: 'mtrl-content__section' },
    [createElement, { class: 'mtrl-content__section-title', text: 'Icon Menu' }],
    [createElement, 'iconMenu', { class: 'mtrl-content__demo' }]
  ],

  // Custom Menu Section
  [createElement, { class: 'mtrl-content__section' },
    [createElement, { class: 'mtrl-content__section-title', text: 'Custom Menu' }],
    [createElement, 'customMenu', { class: 'mtrl-content__demo' }]
  ]
]
