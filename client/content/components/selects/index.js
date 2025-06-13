// src/client/content/components/textfields/index.js

import {
  createComponentsLayout
} from '../../../layout'

import {
  createLayout
} from 'mtrl'

import { initBasicSelect } from './basic'
import { initDensitySelect } from './density'
import { initLongMenu } from './long'
import { initSubmenu } from './submenu'

export const createTextfieldsContent = (container) => {
  const info = {
    title: 'Selects',
    description: 'A dropdown component that allows users to select from multiple options.'
  }

  const layout = createLayout(createComponentsLayout(info), container).component

  // Initialize all the textfield examples
  initBasicSelect(layout.body)
  initDensitySelect(layout.body)
  initSubmenu(layout.body)
  initLongMenu(layout.body)
}
