import * as React from "react"

export function useIsIOS() {
  const [isIOS, setIsIOS] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Check if the device is running iOS
    const checkIsIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase()
      return /iphone|ipad|ipod/.test(userAgent)
    }
    
    setIsIOS(checkIsIOS())
  }, [])

  return isIOS
}
