import {
  createComponentsSectionLayout
} from '../../../layout'

import {
  createStructure,
  createSlider
} from 'mtrl'

import {
  SLIDER_COLORS
} from 'mtrl/src/components/slider'

export const initRange = (container) => {
  const title = 'Range slider'
  const layout = createStructure(createComponentsSectionLayout({ title }), container).component

  const slider = createSlider({
    min: 0,
    max: 1000,
    value: 200,
    secondValue: 800,
    range: true,
    color: SLIDER_COLORS.SECONDARY
  })
  // btn.on('click', () => components.logEvent(`${variant} button clicked`))
  layout.body.appendChild(slider.element)
}
