
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // Check for mobile devices based on both screen size and user agent
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
      const isMobileScreen = window.innerWidth < MOBILE_BREAKPOINT
      setIsMobile(isMobileDevice || isMobileScreen)
    }

    // Run initial check
    checkMobile()
    
    // Add event listener for resize
    window.addEventListener("resize", checkMobile, { passive: true })
    
    // Set up media query listener as backup
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    if (mql.addEventListener) {
      mql.addEventListener("change", checkMobile)
    } else {
      // Fallback for older browsers
      mql.addListener(checkMobile)
    }
    
    return () => {
      window.removeEventListener("resize", checkMobile)
      if (mql.removeEventListener) {
        mql.removeEventListener("change", checkMobile)
      } else {
        // Fallback for older browsers
        mql.removeListener(checkMobile)
      }
    }
  }, [])

  return isMobile
}
