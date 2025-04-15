import {
  createComponentsSectionLayout
} from '../../../layout'

import {
  createLayout,
  createSelect
} from 'mtrl'

export const initBasicSelect = (container) => {
  const title = 'Basic Select'
  const layout = createLayout(createComponentsSectionLayout({ title }), container).component

  const formatOptions = [
    { id: 'bold', text: 'Bold' },
    { id: 'italic', text: 'Italic' },
    { id: 'underline', text: 'Underline' }
  ]

  const paragraphOptions = [
    { id: 'align-left', text: 'Align Left' },
    { id: 'align-center', text: 'Center' },
    { id: 'align-right', text: 'Align Right' }

  ]

  // Create a basic select component with all countries
  const filled = createSelect({
    label: 'Format',
    options: formatOptions
  })

  filled.element.style.maxWidth = '240px'

  // Add change event listener
  filled.on('change', (event) => {
    console.log(`Selected: ${event.value} (${event.text})`)
  })

  const outlined = createSelect({
    label: 'Paragraph',
    variant: 'outlined',
    options: paragraphOptions
  })

  outlined.element.style.maxWidth = '240px'

  // Add the select to the layout
  layout.body.appendChild(filled.element)
  layout.body.appendChild(outlined.element)

  return {
    filled,
    outlined,
    layout
  }
}
