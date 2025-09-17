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

  // Navigation Icons
  navigation: {
    caretDown: 'carbon:caret-down',
    caretLeft: 'carbon:caret-left',
    caretRight: 'carbon:caret-right',
    caretUp: 'carbon:caret-up',
  },
} as const

export type IconName = (typeof icons)[keyof typeof icons][keyof (typeof icons)[keyof typeof icons]]

// Project Icons - Project-specific icon mappings
// Change these to update icons throughout the entire project
export const projectIcons = {
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

  // Navigation arrows
  arrowDown: icons.navigation.caretDown,
  arrowLeft: icons.navigation.caretLeft,
  arrowRight: icons.navigation.caretRight,
  arrowUp: icons.navigation.caretUp,

  // Form elements
  checkbox: icons.checkbox.checkedFilled,
  checkboxOutline: icons.checkbox.checked,
} as const

export type ProjectIconName = keyof typeof projectIcons
