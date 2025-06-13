// src/client/content/components/textfields/index.js

import {
  createComponentsLayout
} from '../../../layout'

import {
  createLayout
} from 'mtrl'

import { createTextfieldShowcase } from './textfield'
import { initTextfieldVariants } from './variants'
import { initTextfieldDensity } from './density'
import { initLeadingIcons } from './leading-icons'
import { initTrailingIcons } from './trailing-icons'
import { initPrefix } from './prefix'
import { initSuffix } from './suffix'
import { initSupportingText } from './supporting-text'
import { initCombinedFeatures } from './combined-features'
import { initMultilineTextfield } from './multiline'

export const createTextfieldsContent = (container) => {
  const info = {
    title: 'Text Fields',
    description: 'Text fields let users enter and edit text'
  }

  const layout = createLayout(createComponentsLayout(info), container).component

  createTextfieldShowcase(layout.body)

  // Initialize all the textfield examples
  initTextfieldVariants(layout.body)
  initTextfieldDensity(layout.body)
  initLeadingIcons(layout.body)
  initTrailingIcons(layout.body)
  initPrefix(layout.body)
  initSuffix(layout.body)
  initSupportingText(layout.body)
  initCombinedFeatures(layout.body)
  initMultilineTextfield(layout.body)
}
