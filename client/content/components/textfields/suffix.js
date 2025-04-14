// src/client/content/components/textfields/leading-icons.js
import {
  createComponentsSectionLayout
} from '../../../layout'

import {
  fLayout,
  fTextfield
} from 'mtrl'

export const initSuffix = (container) => {
  const title = 'Textfields with suffix text'
  const layout = fLayout(createComponentsSectionLayout({ title }), container).component

  // Filled textfield with leading icon
  const filled = fTextfield({
    label: 'Weight',
    placeholder: 'Weight...',
    variant: 'filled',
    suffixText: 'lbs'
  })

  // Outlined textfield with leading icon
  const outlined = fTextfield({
    label: 'Weight',
    placeholder: 'Weight...',
    variant: 'outlined',
    suffixText: 'lbs'
  })

  // Add leading icon textfields to the layout
  layout.body.appendChild(filled.element)
  layout.body.appendChild(outlined.element)
}
