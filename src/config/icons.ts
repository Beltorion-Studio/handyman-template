export const icons = {
  // Checkbox and Checkmark Icons
  checkbox: {
    checked: 'carbon:checkbox-checked',
    checkedFilled: 'carbon:checkbox-checked-filled',
  },
  checkmark: {
    default: 'carbon:checkmark',
    filled: 'carbon:checkmark-filled',
    outline: 'carbon:checkmark-outline',
  },

  // Add Icons
  add: {
    default: 'carbon:add',
    filled: 'carbon:add-filled',
    large: 'carbon:add-large',
  },

  // Shape Icons
  shapes: {
    dotMark: 'carbon:dot-mark',
    circleSolid: 'carbon:circle-solid',
  },

  // Communication Icons
  communication: {
    email: 'carbon:email',
  },

  // Caret Icons
  caret: {
    caretDown: 'carbon:caret-down',
    caretLeft: 'carbon:caret-left',
    caretRight: 'carbon:caret-right',
    caretUp: 'carbon:caret-up',
  },

  // Chevron Icons
  chevron: {
    chevronDown: 'quill:chevron-down',
    chevronLeft: 'quill:chevron-left',
    chevronRight: 'quill:chevron-right',
    chevronUp: 'quill:chevron-up',
  },
} as const

export type IconName = (typeof icons)[keyof typeof icons][keyof (typeof icons)[keyof typeof icons]]

// Project Icons - Project-specific icon mappings
// Change these to update icons throughout the entire project
export const projectIcons = {
  defaultBullet: icons.checkmark.default,

  // Bullet points and list items
  bullet: icons.shapes.dotMark,
  bulletFilled: icons.shapes.circleSolid,

  // Checkmarks and success states
  checkmark: icons.checkmark.default,
  checkmarkOutline: icons.checkmark.outline,

  // Add/Plus actions
  add: icons.add.filled,
  addLarge: icons.add.large,

  // Communication
  email: icons.communication.email,

  // Caret arrows
  arrowDown: icons.caret.caretDown,
  arrowLeft: icons.caret.caretLeft,
  arrowRight: icons.caret.caretRight,
  arrowUp: icons.caret.caretUp,

  // Chevron arrows
  chevronDown: icons.chevron.chevronDown,
  chevronLeft: icons.chevron.chevronLeft,
  chevronRight: icons.chevron.chevronRight,
  chevronUp: icons.chevron.chevronUp,

  // Form elements
  checkbox: icons.checkbox.checkedFilled,
  checkboxOutline: icons.checkbox.checked,
} as const

export type ProjectIconName = keyof typeof projectIcons
