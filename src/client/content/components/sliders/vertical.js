import {
  createComponentsSectionLayout
} from '../../../layout'

import {
  createLayout,
  createSlider
} from 'mtrl'

import {
  SLIDER_ORIENTATIONS
} from 'mtrl/src/components/slider'

export const initVertical = (container) => {
  const title = 'Vertical slider'
  const layout = createLayout(createComponentsSectionLayout({ title }), container).component

  const slider = createSlider({
    min: 0,
    max: 100,
    value: 75,
    orientation: SLIDER_ORIENTATIONS.VERTICAL,
    showValue: true,
    // Format value as percentage
    valueFormatter: (value) => `${value}%`
  })

  layout.body.appendChild(slider.element)
}
