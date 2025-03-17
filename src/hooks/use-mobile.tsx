
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Check for mobile devices based on both screen size and user agent
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isMobileScreen = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(isMobileDevice || isMobileScreen);
    };

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    mql.addEventListener("change", checkMobile)
    
    // Initial check
    checkMobile();
    
    return () => mql.removeEventListener("change", checkMobile)
  }, [])

  return !!isMobile
}
