import {
  createComponentsSectionLayout
} from '../../../layout'

import {
  fLayout,
  fSlider
} from 'mtrl'

import {
  SLIDER_COLORS
} from 'mtrl/src/components/slider'

export const initDiscrete = (container) => {
  const title = 'Slider with tick marks'
  const layout = fLayout(createComponentsSectionLayout({ title }), container).component

  const slider = fSlider({
    min: 0,
    max: 5,
    value: 2,
    step: 1,
    ticks: true,
    color: SLIDER_COLORS.TERTIARY
  })

  layout.body.appendChild(slider.element)
}

export const initDiscreteWithLabels = (container) => {
  const title = 'Slider with tick marks and labels'
  const layout = fLayout(createComponentsSectionLayout({ title }), container).component

  const slider = fSlider({
    min: 0,
    max: 5,
    value: 2,
    step: 1,
    ticks: true,
    tickLabels: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent', 'Outstanding']
    // color: SLIDER_COLORS.TERTIARY
  })

  layout.body.appendChild(slider.element)
}
