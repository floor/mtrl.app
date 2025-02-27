// src/client/app.js
import { createRouter } from './core/router'
import { createLayout, createMenu } from 'mtrl'
import { navigation, layout, themesMenu } from './config'
import { createEventManager, setupErrorBoundary } from './core/events'
import {
  updateDrawerItems,
  toggleDrawer,
  setupRailNavigation,
  initializeRoutes,
  cleanupDrawer
} from './core/navigation'

window.log = console

// SVG icons remain the same
const darkModeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
</svg>`

const lightModeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="5"/>
  <line x1="12" y1="1" x2="12" y2="3"/>
  <line x1="12" y1="21" x2="12" y2="23"/>
  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
  <line x1="1" y1="12" x2="3" y2="12"/>
  <line x1="21" y1="12" x2="23" y2="12"/>
  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
</svg>`

const toggleDarkMode = (button) => {
  console.log('toggleDarkMode')
  const currentTheme = document.body.getAttribute('data-theme-mode')
  const isDarkMode = currentTheme !== 'dark'
  // Toggle theme
  document.body.setAttribute('data-theme-mode', isDarkMode ? 'dark' : 'light')
  // Update icon based on current theme
  const icon = isDarkMode ? lightModeIcon : darkModeIcon
  button.setIcon(icon)

  return isDarkMode
}

const selectTheme = (theme) => {
  // const currentTheme = document.body.getAttribute('data-theme')

  // Toggle theme
  document.body.setAttribute('data-theme', theme)

  return theme
}

/**
 * Creates the application with proper lifecycle management
 * @param {Object} options - Application configuration options
 * @returns {Object} Application instance with lifecycle methods
 */
const createApp = (options = {}) => {
  let layoutInstance = null
  let eventManager = null
  let router = null
  let themeMenu = null // Store menu reference
  let isInitialized = false
  let readyCallbacks = []

  const initializeLayout = () => {
    log.info('Starting layout initialization')
    try {
      layoutInstance = createLayout(layout, document.body)
      return layoutInstance
    } catch (error) {
      log.error('Failed to initialize layout:', error)
      throw error
    }
  }

  const setupRouter = (ui) => {
    router = createRouter({
      onError: (error) => {
        log.error('Navigation failed:', error)
      },
      ui
    })

    initializeRoutes(router, ui)
    return router
  }

  const initInterface = (ui) => {
    document.body.classList.add('mtrl-app')
    selectTheme('ocean')

    ui.toggleDarkmode.on('click', () => {
      toggleDarkMode(ui.toggleDarkmode)
    })

    // Create the menu with proper configuration
    themeMenu = createMenu({
      items: themesMenu,
      openingButton: ui.moreMenu
    })

    document.body.appendChild(themeMenu.element)

    // Set up the click event handler for the more menu button
    ui.moreMenu.on('click', () => {
      console.log('click', ui.moreMenu.element)

      // Show the menu first
      themeMenu.show()

      // Then position it using the DOM element
      if (ui.moreMenu.element) {
        themeMenu.position(ui.moreMenu.element)
      } else {
        log.error('Missing moreMenu element for positioning')
      }
    })

    // Set up theme selection handler
    themeMenu.on('select', ({ name }) => {
      console.log(`Selected theme: ${name}`)
      selectTheme(name)
      themeMenu.hide()
    })
  }

  const initializeEvents = (ui) => {
    log.info('Initializing events')
    eventManager = createEventManager(ui)

    // Setup rail navigation and store cleanup function
    const cleanupRail = setupRailNavigation(ui.rail, ui.nav, router, navigation)
    if (cleanupRail) {
      eventManager.addCleanup(() => {
        cleanupRail()
        cleanupDrawer(ui.nav) // Add drawer cleanup
      })
    }

    // Add cleanup for theme menu
    eventManager.addCleanup(() => {
      if (themeMenu) {
        themeMenu.destroy()
        themeMenu = null
      }
    })

    // Initially hide drawer
    toggleDrawer(ui.nav, false)

    initInterface(ui)
  }

  /**
   * Handles initial navigation based on URL
   * @param {Object} ui - UI components
   */
  const handleInitialRoute = (ui) => {
    // Handle initial route
    const { pathname } = window.location
    const route = router.parsePath(pathname)

    if (route.section !== 'home') {
      // Update rail selection
      ui.rail?.setActive(route.section)

      // Show drawer with section items regardless of subsection
      if (navigation[route.section]) {
        const items = navigation[route.section].map(item => ({
          ...item,
          section: route.section
        }))
        // Clear any existing handlers before updating
        cleanupDrawer(ui.nav)
        updateDrawerItems(ui.nav, items, router)
        toggleDrawer(ui.nav, true)

        // If there's a subsection, set it as active in drawer
        if (route.subsection) {
          ui.nav?.setActive(route.subsection)
        }
      }

      // Navigate to initial route
      router.navigate(route.section, route.subsection, { noHistory: true })
    }
  }

  /**
   * Main initialization function that runs when DOM is ready
   */
  const initialize = () => {
    if (isInitialized) return
    isInitialized = true

    try {
      log.info('Starting initialization')
      layoutInstance = initializeLayout()
      const ui = layoutInstance.component

      if (!ui) {
        throw new Error('Layout initialization failed - UI component is undefined')
      }

      // Setup router before initializing events
      router = setupRouter(ui)
      initializeEvents(ui)
      setupErrorBoundary()
      handleInitialRoute(ui)

      // Execute any callbacks registered before initialization
      readyCallbacks.forEach(callback => {
        try {
          callback({
            layout: layoutInstance,
            router,
            ui
          })
        } catch (error) {
          log.error('Error in ready callback:', error)
        }
      })
      readyCallbacks = [] // Clear the callbacks

      log.info('App initialization complete')
    } catch (error) {
      log.error('Initialization failed:', error)
      throw error
    }
  }

  /**
   * Checks if DOM is ready and initializes app
   */
  const initWhenReady = () => {
    // If document is already complete, initialize immediately
    if (document.readyState === 'complete') {
      initialize()
    } else {
      // Otherwise wait for DOMContentLoaded
      document.addEventListener('DOMContentLoaded', initialize)

      // Fallback for older browsers
      window.addEventListener('load', () => {
        if (!isInitialized) {
          initialize()
        }
      })
    }
  }

  // Start the initialization process
  initWhenReady()

  // Return the app interface
  return {
    /**
     * Register a callback to be executed when app is ready
     * @param {Function} callback - Function to call when ready
     */
    onReady (callback) {
      if (typeof callback !== 'function') {
        return
      }

      if (isInitialized) {
        // If already initialized, execute immediately
        callback({
          layout: layoutInstance,
          router,
          ui: layoutInstance?.component
        })
      } else {
        // Otherwise queue for later execution
        readyCallbacks.push(callback)
      }
    },

    /**
     * Clean up all resources used by the app
     */
    destroy: () => {
      eventManager?.cleanup()
      router?.destroy()
      layoutInstance?.destroy()
      layoutInstance = null
      router = null
      isInitialized = false
    },

    /**
     * Check if the app has been initialized
     * @returns {boolean} Whether app is initialized
     */
    isInitialized: () => isInitialized,

    /**
     * Get the layout instance
     * @returns {Object} Layout instance
     */
    getLayout: () => layoutInstance,

    /**
     * Get a component by name
     * @param {string} name - Component name
     * @returns {Object} The requested component
     */
    getComponent: (name) => layoutInstance?.get(name),

    /**
     * Get the router instance
     * @returns {Object} Router instance
     */
    getRouter: () => router
  }
}

// Initialize app safely
let app
try {
  app = createApp({
    onError: (error) => {
      log.error('Application error:', error)
    }
  })

  // Make app available globally
  // window.app = app

  // Example of using the onReady API
  app.onReady(({ router, ui }) => {
    log.info('App is ready, performing post-initialization tasks')
    // Any additional setup that should happen after initialization
  })
} catch (error) {
  log.error('Failed to create app:', error)
}

export default createApp
