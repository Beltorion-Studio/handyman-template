import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export class MobileNavAnimation {
  private nav: HTMLElement
  private menuButton: HTMLElement
  private mobileMenu: HTMLElement
  private spans: NodeListOf<HTMLElement>
  private menuTimeline: GSAPTimeline
  private hamburgerTimeline: GSAPTimeline
  private isActive: boolean = false

  // Animation durations
  private readonly HAMBURGER_DURATION = 0.25
  private readonly MENU_DURATION = 0.5
  private readonly SCROLL_DURATION = 0.3

  private readonly SCROLL_COLOR = 'oklch(.5 .134 242.749 / 1)'
  private readonly TRANSPARENT_COLOR = 'oklch(.5 .134 242.749 / 0)'

  constructor(navSelector: string) {
    this.nav = document.querySelector(navSelector)!
    this.menuButton = this.nav.querySelector('[za-elements="menu-button"]')!
    this.mobileMenu = this.nav.querySelector('[za-elements="mobile-menu"]')!
    this.spans = this.menuButton.querySelectorAll('span')

    // Create GSAP timelines
    this.hamburgerTimeline = gsap.timeline({ paused: true })
    this.menuTimeline = gsap.timeline({ paused: true })
    this.setupAnimations()
    this.init()
  }

  private setupAnimations(): void {
    const [topSpan, middleSpan, bottomSpan] = this.spans

    // Hamburger animation
    this.hamburgerTimeline
      .to(topSpan, {
        duration: this.HAMBURGER_DURATION,
        y: 6,
        ease: 'power2.inOut',
      })
      .to(
        bottomSpan,
        {
          duration: this.HAMBURGER_DURATION,
          y: -6,
          ease: 'power2.inOut',
        },
        '<'
      )
      .to(
        middleSpan,
        {
          duration: this.HAMBURGER_DURATION,
          scale: 0,
          ease: 'power2.inOut',
        },
        '<'
      )
      .to(topSpan, {
        duration: this.HAMBURGER_DURATION,
        rotation: 45,
        ease: 'power2.inOut',
      })
      .to(
        bottomSpan,
        {
          duration: this.HAMBURGER_DURATION,
          rotation: -45,
          ease: 'power2.inOut',
        },
        '<'
      )

    // Menu animation
    this.menuTimeline.fromTo(
      this.mobileMenu,
      {
        opacity: 0,
        visibility: 'hidden',
        height: 0,
        y: -10,
      },
      {
        duration: this.MENU_DURATION,
        opacity: 1,
        visibility: 'visible',
        height: 'auto',
        y: 0,
        ease: 'power2.out',
      }
    )
  }

  private init(): void {
    if (!this.nav || !this.menuButton || !this.mobileMenu) {
      console.error('Required elements not found')
      return
    }
    this.bindEvents()
    this.setupScrollAnimations()
  }

  private toggleMenu(): void {
    this.isActive = !this.isActive
    const isExpanded = this.menuButton.getAttribute('aria-expanded') === 'true'

    this.menuButton.setAttribute('aria-expanded', (!isExpanded).toString())
    document.body.style.overflow = isExpanded ? 'auto' : 'hidden'

    // Animate both hamburger and menu
    if (this.isActive) {
      this.hamburgerTimeline.play()
      this.menuTimeline.play()
      this.updateMobileMenuBackground()
    } else {
      this.hamburgerTimeline.reverse()
      this.menuTimeline.reverse()
    }
  }

  private bindEvents(): void {
    this.menuButton.addEventListener('click', () => this.toggleMenu())
    this.menuButton.addEventListener('keydown', (e) => this.handleMenuKeydown(e))
    document.addEventListener('keydown', (e) => this.handleEscapeKey(e))
  }

  private handleMenuKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      this.toggleMenu()
    }
  }

  private handleEscapeKey(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this.menuButton.getAttribute('aria-expanded') === 'true') {
      this.toggleMenu()
    }
  }

  private setupScrollAnimations(): void {
    // Only apply scroll animations on desktop
    if (window.innerWidth < 1024) return

    // Simple scroll trigger - background changes when scrolled down past threshold
    ScrollTrigger.create({
      trigger: 'body',
      start: '100px top', // 100px threshold
      end: 'max',
      onEnter: () => {
        // Scrolled down past threshold - add background
        gsap.to(this.nav, {
          duration: this.SCROLL_DURATION,
          backgroundColor: this.SCROLL_COLOR,
          ease: 'power2.out',
        })
      },
      onLeaveBack: () => {
        // Scrolled back up to top - remove background
        gsap.to(this.nav, {
          duration: this.SCROLL_DURATION,
          backgroundColor: this.TRANSPARENT_COLOR,
          ease: 'power2.out',
        })
      },
    })
  }

  private updateMobileMenuBackground(): void {
    // On mobile, always ensure nav has bg-brand when menu is open
    if (window.innerWidth < 1024 && this.isActive) {
      gsap.set(this.nav, { backgroundColor: this.SCROLL_COLOR })
    }
  }
}
