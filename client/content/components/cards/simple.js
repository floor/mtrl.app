// src/client/content/components/cards/simple.js

import {
  createComponentsSectionLayout
} from '../../../layout'

import {
  fLayout
} from 'mtrl'

import { artworks } from './artwork-data'
import fCard, {
  createCardHeader,
  createCardContent,
  CARD_VARIANTS
} from 'mtrl/src/components/card'

/**
 * Initialize simple cards with minimal content
 * Demonstrates basic card structure with header and content
 *
 * @param {HTMLElement} container - The container element
 */
export const initSimpleCards = (container) => {
  const title = 'Simple Cards'
  const description = 'Basic cards with title and text content following MD3 specifications'

  const layout = fLayout(createComponentsSectionLayout({ title, description }), container).component

  // Create simple cards using the first three artworks
  artworks.slice(0, 2).forEach(artwork => {
    // Create card with proper aria attributes
    const card = fCard({
      variant: CARD_VARIANTS.FILLED,
      aria: {
        role: 'region',
        label: `Information about ${artwork.title}`
      }
    })

    // Create header with accessible tags
    const header = createCardHeader({
      title: artwork.title,
      subtitle: artwork.artist
    })

    // Create content with HTML instead of text
    // This is the key fix - using HTML instead of text
    const content = createCardContent({
      html: `<p>${artwork.description}</p>`,
      padding: true
    })

    // Assemble card
    card.setHeader(header)
    card.addContent(content)

    // Add to the grid
    layout.showcase.appendChild(card.element)
  })
}
