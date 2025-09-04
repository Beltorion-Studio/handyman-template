export const contactConfig = {
  company: {
    name: 'ZenAstro',
    address: {
      street: '123 Innovation Drive',
      city: 'Tech City',
      state: 'CA',
      stateName: 'California',
      zipCode: '90210',
      country: 'United States',
    },
    phone: {
      primary: '+1 (555) 123-4567',
      secondary: '+1 (555) 987-6543',
      fax: '+1 (555) 123-4568',
    },
    email: {
      general: 'hello@zenastro.com',
      support: 'support@zenastro.com',
      sales: 'sales@zenastro.com',
      careers: 'careers@zenastro.com',
    },
    businessHours: {
      monday: { open: '9:00 AM', close: '6:00 PM', closed: false },
      tuesday: { open: '9:00 AM', close: '6:00 PM', closed: false },
      wednesday: { open: '9:00 AM', close: '6:00 PM', closed: false },
      thursday: { open: '9:00 AM', close: '6:00 PM', closed: false },
      friday: { open: '9:00 AM', close: '5:00 PM', closed: false },
      saturday: { open: '10:00 AM', close: '4:00 PM', closed: false },
      sunday: { open: 'Closed', close: 'Closed', closed: true },
    },
  },
  emergency: {
    available: false,
    phone: null,
    responseTime: null,
  },
} as const

export type ContactConfig = typeof contactConfig
export type BusinessHours = typeof contactConfig.company.businessHours
export type DaySchedule = typeof contactConfig.company.businessHours.monday
