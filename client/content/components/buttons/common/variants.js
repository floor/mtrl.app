// src/client/content/components/button/variants.js

import { capitalize } from '../../../../core/utils'

import {
  createComponentSection
} from '../../../../layout'

import {
  createLayout,
  createButton
} from 'mtrl'

export const initVariants = (container) => {
  const title = 'Buttons Variants'
  const layout = createLayout(createComponentSection({ title }), container).component

  const variants = ['filled', 'tonal', 'elevated', 'outlined', 'text']
  variants.forEach(variant => {
    const text = capitalize(variant)
    const btn = createButton({
      text: `${text} button`,
      variant,
      ripple: true,
      parent: layout.showcase
    })
    // btn.element.addEventListener('click', () => log.info('native button clicked'))
    // btn.on('click', () => log.info('component button clicked'))
  })
}
