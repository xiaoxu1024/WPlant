export default {
  isMobile() {
    const userAgent = navigator.userAgent.toLowerCase()
    return /mobile|android|iphone|ipad|ipod/i.test(userAgent)
  }
}