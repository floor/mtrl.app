import {
  createContentSection
} from '../../../layout'

import {
  fLayout,
  fChips,
  createElement,
  addClass,
  removeClass
} from 'mtrl'

export const createResponsiveLayout = (container) => {
  console.log('aaqcreateResponsiveLayout', container)
  const layout = fLayout(createContentSection({
    title: 'Responsive Layout',
    description: 'Layout that adapts to different screen sizes. Use the chips to toggle between different layouts.',
    class: 'theme-colors'
  }), container).getAll()

  // Create a responsive container
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
    responsiveContainer.appendChild(box)
  }

  // Default to stack layout
  addClass(responsiveContainer, 'layout--stack')

  // Create layout with containers for controls and responsive demo
  const mainLayout = fLayout([
    ['controlsContainer', { class: 'layout-demo__controls' },
      [fChips, 'layoutChipSet', {
        scrollable: false,
        multiSelect: false,
        class: 'layout-chip-set',
        label: 'Select Layout',
        onChange: (values) => {
          layoutChangeHandler(values[0])
        }
      }]
    ]
  ], layout.body)

  // Extract chip set component
  const { layoutChipSet } = mainLayout.component

  // Define layout options
  const layoutOptions = [
    { text: 'Stack', value: 'layout--stack' },
    { text: 'Row', value: 'layout--row' },
    { text: 'Grid', value: 'layout--grid' }
  ]

  // Current layout tracking
  let currentLayout = 'layout--stack'

  const layoutChangeHandler = (layout) => {
    if (!layout) return

    // Prevent update if layout hasn't changed
    if (layout !== currentLayout) {
      // Remove existing layout classes
      removeClass(responsiveContainer, 'layout--stack layout--row layout--grid')
      // Add the selected layout class
      addClass(responsiveContainer, layout)
      // Update current layout
      currentLayout = layout
    }
  }

  // Add chips to chip set
  layoutOptions.forEach(option => {
    layoutChipSet.addChip({
      text: option.text,
      value: option.value,
      variant: 'filter',
      selectable: true,
      selected: option.value === currentLayout
    })
  })

  // Add the responsive container after the controls
  layout.body.appendChild(responsiveContainer)
}
