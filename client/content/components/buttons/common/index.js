// src/client/content/components/button/index.js

import {
  contentLayout
} from '../../../../layout'

import {
  createLayout
} from 'mtrl'

import { initVariants } from './variants'
import { initDisabled } from './disabled'
import { initIcons } from './icons'

export const createButtonsContent = (container) => {
  const info = {
    title: 'Buttons',
    description: 'Let users take action and make choices with one tap'
  }

  const layout = createLayout(contentLayout(info), container).component

  initVariants(layout.body)
  initDisabled(layout.body)
  initIcons(layout.body)
}
