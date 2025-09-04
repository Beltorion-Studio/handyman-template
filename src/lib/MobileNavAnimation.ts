import { gsap } from 'gsap'

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

  constructor(navSelector: string) {
    this.nav = document.querySelector(navSelector)!
    this.menuButton = this.nav.querySelector('[za-elements="menu-button"]')!
    this.mobileMenu =  this.nav.querySelector('[za-elements="mobile-menu"]')!
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
        y: -10,
      },
      {
        duration: this.MENU_DURATION,
        opacity: 1,
        visibility: 'visible',
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
}
