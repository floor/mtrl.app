// src/client/content/components/button/icons.ts
/**
 * Button icons showcase implementation
 * Demonstrates usage of various icon buttons with different states
 * @module src/client/content/components/button/icons
 */
import {
  createComponentsSectionStructure
} from '../../../../structure'
import {
  fLayout,
  fButton
} from 'mtrl'
import { iconDownload, iconBookmark, iconLike, iconSend } from '../../../../icons'

/**
 * Icon button definitions with their labels
 * @type {Array<{icon: string, label: string}>}
 */
const iconButtons = [
  { icon: iconLike, label: 'Like' },
  { icon: iconBookmark, label: 'Bookmark' }
]

/**
 * Button definitions with text and icons
 * @type {Array<{icon: string, label: string}>}
 */
const iconLabelButtons = [
  { icon: iconDownload, label: 'Download' },
  { icon: iconSend, label: 'Send' }
]

/**
 * Initializes icon button showcase
 * @param {HTMLElement} container - DOM element to render the showcase
 */
export const initIcons = (container) => {
  const title = 'Buttons icons'
  const structure = fLayout(createComponentsSectionStructure({ title }), container).component
  const states = ['enabled', 'disabled']
  const variants = ['filled', 'elevated']

  // Create icon-only buttons in enabled and disabled states
  iconButtons.forEach((buttonDef) => {
    states.forEach(state => {
      const disabled = state === 'disabled'
      const btn = fButton({
        icon: buttonDef.icon,
        iconSize: 'medium',
        ariaLabel: buttonDef.label
      })

      if (disabled) btn.disable()
      structure.showcase.appendChild(btn.element)
    })
  })

  // Create buttons with icons and text in different variants
  iconLabelButtons.forEach((buttonDef, i) => {
    const labelBtn = fButton({
      icon: buttonDef.icon,
      text: buttonDef.label,
      iconSize: 'medium',
      ariaLabel: buttonDef.label,
      variant: variants[i]
    })

    structure.showcase.appendChild(labelBtn.element)
  })
}
