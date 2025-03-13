// src/client/content/components/dialogs/index.js

import { contentLayout } from '../../../config'
import { createLayout } from 'mtrl'
import { initBasic } from './basic'
import { initSizes } from './sizes'
import { initCustomButtons } from './custom-buttons'
import { initConfirmation } from './confirmation'
import { initFullscreen } from './fullscreen'
import { initFormDialog } from './form-dialog'
import { initAnimations } from './animations'
import { initFooterAlignments } from './footer-alignments'

export const createDialogsContent = (container) => {
  const info = {
    title: 'Dialog',
    description: 'Display a popup dialog for focused user interactions'
  }

  container.classList.add('components')

  const layout = createLayout(contentLayout(info), container).component

  initBasic(layout.body)
  initSizes(layout.body)
  initCustomButtons(layout.body)
  initConfirmation(layout.body)
  initFullscreen(layout.body)
  initFormDialog(layout.body)
  initAnimations(layout.body)
  initFooterAlignments(layout.body)
}
