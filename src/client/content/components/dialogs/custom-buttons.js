import {
  createComponentsSectionLayout
} from '../../../config'

import {
  createLayout,
  createButton,
  createDialog
} from 'mtrl'

import {
  BUTTON_VARIANTS
} from 'mtrl/src/components/button'

export const initCustomButtons = (container) => {
  const title = 'Dialog with Custom Buttons'
  const description = 'Dialogs can have custom buttons with different variants and behaviors'
  const layout = createLayout(createComponentsSectionLayout({ title, description }), container).component

  // Create button to open dialog
  const openButton = createButton({
    text: 'Dialog with Custom Buttons',
    variant: 'filled'
  })

  // Status message element
  const statusMessage = document.createElement('div')
  statusMessage.classList.add('status-message')
  statusMessage.style.marginTop = '16px'
  statusMessage.style.padding = '8px'
  statusMessage.style.borderRadius = '4px'

  // Create dialog with custom buttons
  const dialog = createDialog({
    title: 'Save Changes?',
    content: '<p>Your changes will be lost if you don\'t save them.</p>',
    buttons: [
      {
        text: 'Discard',
        variant: BUTTON_VARIANTS.TEXT,
        closeDialog: true,
        onClick: () => {
          statusMessage.textContent = 'Changes discarded!'
          statusMessage.style.backgroundColor = '#ffcccc'
        }
      },
      {
        text: 'Cancel',
        variant: BUTTON_VARIANTS.OUTLINED,
        closeDialog: true,
        onClick: () => {
          statusMessage.textContent = 'Action cancelled'
          statusMessage.style.backgroundColor = '#e0e0e0'
        }
      },
      {
        text: 'Save',
        variant: BUTTON_VARIANTS.FILLED,
        closeDialog: true,
        onClick: () => {
          statusMessage.textContent = 'Changes saved successfully!'
          statusMessage.style.backgroundColor = '#ccffcc'
        }
      }
    ]
  })

  // Open dialog when button is clicked
  openButton.on('click', () => {
    dialog.open()
  })

  // Add button and status message to layout
  layout.body.appendChild(openButton.element)
  layout.body.appendChild(statusMessage)
}
