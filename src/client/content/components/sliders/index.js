// src/client/content/components/sliders/index.js

import { contentLayout } from '../../../config'
import { createLayout } from 'mtrl'
import { initContinuous, initContinuous1000 } from './continuous'
import { initCentered } from './centered'
import { initRange } from './range'
import { initDiscrete, initDiscreteWithLabels } from './discrete'
import { initVertical } from './vertical'
import { initDisabled } from './disabled'
import { initEventsAPI } from './events-api'

export const createSlidersContent = (container) => {
  const info = {
    title: 'Slider',
    description: 'Let users make selections from a range of values'
  }

  container.classList.add('components')

  const layout = createLayout(contentLayout(info), container).component

  initContinuous(layout.body)
  initContinuous1000(layout.body)
  initCentered(layout.body)
  initRange(layout.body)
  initDiscrete(layout.body)
  initDiscreteWithLabels(layout.body)
  // initVertical(layout.body)
  initDisabled(layout.body)
  initEventsAPI(layout.body)
}
