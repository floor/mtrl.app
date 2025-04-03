import {
  createLayout,
  createElement,
  createButton
} from 'mtrl'

import { createContentSection } from '../../../layout/content'

export const createThemeColors = (container) => {
  console.log('createThemeColors', container)
  const layout = createLayout(createContentSection({
    title: 'Theme Colors',
    description: 'Theme colors provide semantic meaning and are used consistently across components. Use these tokens to maintain visual consistency and accessibility.',
    class: 'theme-demo'
  }), container).getAll()

  const body = layout.body

  console.log('body', layout.body)

  // Create semantic color tokens with comprehensive neutral colors
  const semanticColors = [
    // Primary colors
    { name: 'primary', label: 'Primary' },
    { name: 'on-primary', label: 'On Primary' },
    { name: 'primary-container', label: 'Primary Container' },
    { name: 'on-primary-container', label: 'On Primary Container' },

    // Secondary colors
    { name: 'secondary', label: 'Secondary' },
    { name: 'on-secondary', label: 'On Secondary' },
    { name: 'secondary-container', label: 'Secondary Container' },
    { name: 'on-secondary-container', label: 'On Secondary Container' },

    // Tertiary colors
    { name: 'tertiary', label: 'Tertiary' },
    { name: 'on-tertiary', label: 'On Tertiary' },
    { name: 'tertiary-container', label: 'Tertiary Container' },
    { name: 'on-tertiary-container', label: 'On Tertiary Container' },

    // Error colors
    { name: 'error', label: 'Error' },
    { name: 'on-error', label: 'On Error' },

    // Surface colors with title
    { name: 'title-neutrals', label: 'Neutral Colors', type: 'title' },

    // Basic surface
    { name: 'surface', label: 'Surface' },
    { name: 'on-surface', label: 'On Surface' },
    { name: 'on-surface-variant', label: 'On Surface Variant' },

    // Surface variants
    { name: 'surface-dim', label: 'Surface Dim' },
    { name: 'surface-bright', label: 'Surface Bright' },

    // Surface container system
    { name: 'surface-container-lowest', label: 'Container Lowest' },
    { name: 'surface-container-low', label: 'Container Low' },
    { name: 'surface-container', label: 'Container' },
    { name: 'surface-container-high', label: 'Container High' },
    { name: 'surface-container-highest', label: 'Container Highest' },

    // Outline colors
    { name: 'outline', label: 'Outline' },
    { name: 'outline-variant', label: 'Outline Variant' }
  ]

  // Create container for theme colors
  const themeColorsGrid = createElement({
    tag: 'div',
    class: 'color-theme-grid'
  })

  // Function to create color section title
  const createSectionTitle = (label) => {
    const titleElement = createElement({
      tag: 'div',
      class: 'theme-color-section-title',
      text: label
    })
    return titleElement
  }

  semanticColors.forEach(color => {
    // If this is a section title, render it differently
    if (color.type === 'title') {
      themeColorsGrid.appendChild(createSectionTitle(color.label))
      return
    }

    // Create a color box with the semantic color
    const colorSwatch = createElement({
      tag: 'div',
      class: 'theme-color-swatch',
      style: `background-color: var(--mtrl-sys-color-${color.name});`
    })

    // Create color info container
    const colorInfo = createElement({
      tag: 'div',
      class: 'theme-color__info'
    })

    // Color label
    const colorLabel = createElement({
      tag: 'span',
      class: 'theme-color__label',
      text: color.label
    })

    // Color value
    const colorValue = createElement({
      tag: 'span',
      class: 'theme-color__value',
      text: `var(--mtrl-sys-color-${color.name})`
    })

    // Determine appropriate text color
    let textColor
    if (color.name.startsWith('on-')) {
      const baseColor = color.name.substring(3)
      colorSwatch.style.backgroundColor = `var(--mtrl-sys-color-${baseColor})`
      textColor = `var(--mtrl-sys-color-${color.name})`
    } else {
      const hasMatchingOnColor = semanticColors.some(c => c.name === `on-${color.name}`)
      if (hasMatchingOnColor) {
        textColor = `var(--mtrl-sys-color-on-${color.name})`
      } else if (color.name.startsWith('surface') || color.name === 'outline' || color.name === 'outline-variant') {
        // All surface and outline variants use on-surface for text
        textColor = 'var(--mtrl-sys-color-on-surface)'
      } else {
        textColor = '#fff'
      }
    }

    colorLabel.style.color = textColor
    colorValue.style.color = textColor

    colorInfo.appendChild(colorLabel)
    colorInfo.appendChild(colorValue)
    colorSwatch.appendChild(colorInfo)
    themeColorsGrid.appendChild(colorSwatch)
  })

  body.appendChild(themeColorsGrid)
}
