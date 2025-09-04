import gsap from 'gsap'

type AnimationConfig = {
  duration: number
  ease: string
  iconRotation: number
}

type AccordionElements = {
  question: Element | null
  answer: Element | null
  icon: Element | null
}

class AccordionAnimation {
  private config: AnimationConfig = {
    duration: 0.3,
    ease: 'power2.out',
    iconRotation: 90,
  }

  public hideAnswer(answer: Element): void {
    gsap.set(answer, {
      height: 0,
      opacity: 0,
      visibility: 'hidden',
      marginTop: 0,
      marginBottom: 0,
    })
  }

  public closeAnswer(answer: Element, icon: Element | null, onComplete: () => void): void {
    gsap.to(answer, {
      height: 0,
      opacity: 0,
      marginTop: 0,
      marginBottom: 0,
      duration: this.config.duration,
      ease: this.config.ease,
      onComplete: () => {
        gsap.set(answer, { visibility: 'hidden' })
        onComplete()
      },
    })

    this.rotateIcon(icon, 0)
  }

  public openAnswer(answer: Element, icon: Element | null, onStart: () => void): void {
    gsap.set(answer, { visibility: 'visible' })
    gsap.to(answer, {
      height: 'auto',
      opacity: 1,
      marginBottom: '1.5rem',
      duration: this.config.duration,
      ease: this.config.ease,
      onStart,
    })

    this.rotateIcon(icon, this.config.iconRotation)
  }

  private rotateIcon(icon: Element | null, rotation: number): void {
    if (!icon) return

    gsap.to(icon, {
      rotation: rotation,
      duration: this.config.duration,
      ease: this.config.ease,
    })
  }
}

class AccordionItem {
  private animation: AccordionAnimation
  private elements: AccordionElements

  constructor(item: Element, animation: AccordionAnimation) {
    this.animation = animation
    this.elements = this.getElements(item)
    this.init()
  }

  private getElements(item: Element): AccordionElements {
    return {
      question: item.querySelector('[data-accordion-question]'),
      answer: item.querySelector('[data-accordion-answer]'),
      icon: item.querySelector('svg'),
    }
  }

  private init(): void {
    const { question, answer } = this.elements

    if (!question || !answer) return

    this.animation.hideAnswer(answer)
    this.bindEvents(question)
  }

  private bindEvents(question: Element): void {
    question.addEventListener('click', () => this.handleClick())
    question.addEventListener('keydown', (e: Event) => {
      const keyEvent = e as KeyboardEvent
      this.handleKeydown(keyEvent)
    })
  }

  private handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      this.handleClick()
    }
  }

  private handleClick(): void {
    const { answer, icon, question } = this.elements
    if (!answer || !question) return

    const item = answer.closest('[data-accordion-item]')
    if (!item) return

    const isOpen = item.hasAttribute('data-active')

    if (isOpen) {
      this.animation.closeAnswer(answer, icon, () => {
        item.removeAttribute('data-active')
        question.setAttribute('aria-expanded', 'false')
        answer.setAttribute('aria-hidden', 'true')
      })
    } else {
      this.animation.openAnswer(answer, icon, () => {
        item.setAttribute('data-active', '')
        question.setAttribute('aria-expanded', 'true')
        answer.setAttribute('aria-hidden', 'false')
      })
    }
  }
}

export class FAQ {
  private animation: AccordionAnimation
  private accordions: HTMLElement[]

  constructor() {
    this.animation = new AccordionAnimation()
    this.accordions = Array.from(document.querySelectorAll('[data-accordion]'))
    this.init()
  }

  private init(): void {
    this.accordions.forEach((accordion) => {
      const items = accordion.querySelectorAll('[data-accordion-item]')
      items.forEach((item) => new AccordionItem(item, this.animation))
    })
  }
}
