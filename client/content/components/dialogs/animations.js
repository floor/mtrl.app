import {
  createComponentsSectionLayout
} from '../../../layout'

import {
  fLayout,
  fButton,
  fDialog
} from 'mtrl'

import {
  DIALOG_ANIMATIONS
} from 'mtrl/src/components/dialog'

const createAnimationsDialog = (animation) => {
  const dialog = fDialog({
    title: `${animation.name} Animation`,
    content: `<p>This dialog uses the ${animation.name.toLowerCase()} animation style.</p>`,
    animation: animation.value,
    buttons: [
      {
        text: 'Close',
        variant: 'text',
        closeDialog: true
      }
    ]
  })
  dialog.open()
}

export const initAnimations = (container) => {
  const title = 'Dialog Animations'
  const description = 'Dialogs can use different animation styles when opening and closing'
  const layout = fLayout(createComponentsSectionLayout({ title, description }), container).component

  // Create a dialog for each animation type
  const animations = [
    { name: 'Scale', value: DIALOG_ANIMATIONS.SCALE },
    { name: 'Fade', value: DIALOG_ANIMATIONS.FADE },
    { name: 'Slide Up', value: DIALOG_ANIMATIONS.SLIDE_UP },
    { name: 'Slide Down', value: DIALOG_ANIMATIONS.SLIDE_DOWN }
  ]

  animations.forEach(animation => {
    // Create button to open dialog
    const openButton = fButton({
      text: `${animation.name} Animation`,
      variant: 'outlined'
    })

    // Open dialog when button is clicked
    openButton.on('click', () => {
      createAnimationsDialog(animation)
    })

    // Add button to layout with some margin
    openButton.element.style.marginRight = '8px'
    openButton.element.style.marginBottom = '8px'
    layout.body.appendChild(openButton.element)
  })
}
