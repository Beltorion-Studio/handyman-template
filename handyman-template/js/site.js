// Selectors
const SELECTOR = {
  header: '[bo-elements="header"]',
  hero: '[bo-elements="hero"]',
  contactCta: '[bo-elements="contact-cta"]',
  mobileMenuButton: '[bo-elements="mobile-menu-button"]',
  mobileMenu: '[bo-elements="mobile-menu"]',
  mobileMenuContainer: '[bo-elements="mobile-menu-container"]',
  mobileMenuLink: '[bo-elements="mobile-menu-link"]',
  reviews: '[bo-elements="reviews"]',
  reviewsTrack: '[bo-elements="reviews-track"]',
  reviewsPrev: '[bo-elements="reviews-prev"]',
  reviewsNext: '[bo-elements="reviews-next"]',
}

// Utility
function qs(root, sel) {
  return (root || document).querySelector(sel)
}
function qsa(root, sel) {
  return Array.from((root || document).querySelectorAll(sel))
}

// Header behavior
class HeaderController {
  /** @param {HTMLElement} header */
  constructor(header) {
    this.header = header
    this.hero = qs(document, SELECTOR.hero)
    this.contactCta = qs(this.header, SELECTOR.contactCta)
    this.mm = gsap.matchMedia()
  }

  getHeroBottomY() {
    if (!this.hero) return 0
    const rect = this.hero.getBoundingClientRect()
    const pageY = window.pageYOffset || document.documentElement.scrollTop
    return pageY + rect.top + this.hero.offsetHeight
  }

  setContactCta(isOnBrandBg) {
    if (!this.contactCta) return
    const border = qs(this.contactCta, 'span')
    if (isOnBrandBg) {
      this.contactCta.classList.add('bg-white', 'text-brand')
      this.contactCta.classList.remove('bg-brand', 'text-white')
      if (border) {
        border.classList.remove(
          'border-brandDark',
          'shadow-[2px_2px_0_0_#f54a00]'
        )
        border.classList.add(
          'border-brandLight',
          'shadow-[2px_2px_0_0_#ffd230]'
        )
      }
    } else {
      this.contactCta.classList.add('bg-brand', 'text-white')
      this.contactCta.classList.remove('bg-white', 'text-brand')
      if (border) {
        border.classList.remove(
          'border-brandLight',
          'shadow-[2px_2px_0_0_#ffd230]'
        )
        border.classList.add('border-brandDark', 'shadow-[2px_2px_0_0_#f54a00]')
      }
    }
  }

  applyDesktopState() {
    const thresholdY = this.getHeroBottomY()
    const past = window.scrollY >= thresholdY
    this.header.classList.toggle('bg-brand', past)
    this.header.classList.toggle('bg-transparent', !past)
    this.setContactCta(past)
  }

  applyMobileState() {
    this.header.classList.add('bg-brand')
    this.header.classList.remove('bg-transparent')
    this.setContactCta(true)
  }

  init() {
    const self = this
    this.mm.add(
      {
        isDesktop: '(min-width: 768px)',
      },
      (ctx) => {
        const { isDesktop } = ctx.conditions
        function onScrollResize() {
          if (isDesktop) self.applyDesktopState()
          else self.applyMobileState()
        }
        onScrollResize()
        window.addEventListener('scroll', onScrollResize, { passive: true })
        window.addEventListener('resize', onScrollResize)
        window.addEventListener('orientationchange', onScrollResize)
        return () => {
          window.removeEventListener('scroll', onScrollResize)
          window.removeEventListener('resize', onScrollResize)
          window.removeEventListener('orientationchange', onScrollResize)
        }
      }
    )
  }
}

// Mobile menu
class MobileMenuController {
  /** @param {HTMLElement} root */
  constructor(root) {
    this.root = root
    this.button = qs(root, SELECTOR.mobileMenuButton)
    this.menu = qs(document, SELECTOR.mobileMenu)
    this.container = qs(this.menu, SELECTOR.mobileMenuContainer)
    this.links = qsa(this.menu, SELECTOR.mobileMenuLink)
    this.isOpen = false
    this.buttonTL = gsap.timeline({
      paused: true,
      ease: 'power2.inOut',
      duration: 0.3,
    })
    const bars = this.button ? this.button.querySelectorAll('span') : []
    if (bars.length >= 2) {
      this.buttonTL
        .to(bars[0], { rotation: 45, y: 5 }, 0)
        .to(bars[1], { rotation: -45, y: -3 }, 0)
    }
    this.menuTL = gsap.timeline({ paused: true, ease: 'power2.inOut' })
    if (this.menu && this.container) {
      this.menuTL
        .fromTo(this.menu, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 })
        .fromTo(
          this.container,
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.4 }
        )
      this.menuTL.eventCallback('onReverseComplete', () => {
        this.menu.classList.add('mobile-menu-hidden')
        if (this.button) this.button.setAttribute('aria-expanded', 'false')
      })
    }
  }

  toggle() {
    if (!this.menu || !this.button) return
    if (this.isOpen) {
      this.buttonTL.reverse()
      this.menuTL.reverse()
    } else {
      this.menu.classList.remove('mobile-menu-hidden')
      this.buttonTL.play()
      this.menuTL.play()
    }
    this.isOpen = !this.isOpen
    this.button.setAttribute('aria-expanded', String(this.isOpen))
  }

  close() {
    if (!this.isOpen) return
    this.buttonTL.reverse()
    this.menuTL.reverse()
    this.isOpen = false
    if (this.button) this.button.setAttribute('aria-expanded', 'false')
  }

  init() {
    if (this.button) this.button.addEventListener('click', () => this.toggle())
    if (this.links.length)
      this.links.forEach((a) => a.addEventListener('click', () => this.close()))
  }
}

// Reviews carousel
class ReviewsController {
  /** @param {HTMLElement} root */
  constructor(root) {
    this.root = root
    this.track = qs(root, SELECTOR.reviewsTrack)
    this.prev = qs(root, SELECTOR.reviewsPrev)
    this.next = qs(root, SELECTOR.reviewsNext)
  }

  scrollByDir(dir) {
    if (!this.track) return
    const card = qs(this.track, 'article')
    const style = getComputedStyle(this.track)
    const gapStr = style.columnGap || style.gap || '0px'
    const gap = Number.parseFloat(gapStr) || 0
    const cardWidth = card
      ? card.getBoundingClientRect().width
      : this.track.getBoundingClientRect().width
    const amount = Math.round(cardWidth + gap)
    this.track.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  init() {
    if (!this.track || !this.prev || !this.next) return
    this.prev.addEventListener('click', () => this.scrollByDir(-1))
    this.next.addEventListener('click', () => this.scrollByDir(1))
  }
}

document.addEventListener('DOMContentLoaded', function onReady() {
  const headerEl = qs(document, SELECTOR.header)
  if (headerEl) new HeaderController(headerEl).init()

  const headerScope = headerEl || document
  new MobileMenuController(headerScope).init()

  const reviewsEl = qs(document, SELECTOR.reviews)
  if (reviewsEl) new ReviewsController(reviewsEl).init()
})
