// src/client/content/components/badges/standard.js

import {
  createComponentsSectionLayout
} from '../../../config'

import {
  createLayout,
  createBadge
} from 'mtrl'

import {
  BADGE_COLORS,
  BADGE_VARIANTS
} from 'mtrl/src/components/badge'

export const initStandard = (container) => {
  const title = 'Standard Badges with Different Colors'
  const layout = createLayout(createComponentsSectionLayout({ title }), container).component

  const badgeContainer = document.createElement('div')
  badgeContainer.style.display = 'flex'
  badgeContainer.style.gap = '24px'
  badgeContainer.style.marginBottom = '20px'

  // Create badges with different colors
  const colors = Object.values(BADGE_COLORS)

  colors.forEach(color => {
    const wrapper = document.createElement('div')
    wrapper.style.position = 'relative'
    wrapper.style.display = 'flex'
    wrapper.style.flexDirection = 'column'
    wrapper.style.alignItems = 'center'
    wrapper.style.gap = '8px'

    const badge = createBadge({
      variant: BADGE_VARIANTS.LARGE,
      label: '1',
      color,
      standalone: true
    })

    const label = document.createElement('span')
    label.textContent = color
    label.style.fontSize = '12px'

    wrapper.appendChild(badge.element)
    wrapper.appendChild(label)
    badgeContainer.appendChild(wrapper)
  })

  layout.body.appendChild(badgeContainer)
}
