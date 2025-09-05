import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'

export type Service = CollectionEntry<'services'>

/**
 * Get all services from the content collection
 */
export async function getAllServices(): Promise<Service[]> {
  return await getCollection('services')
}

/**
 * Get featured services only
 */
export async function getFeaturedServices(): Promise<Service[]> {
  const services = await getAllServices()
  return services.filter((service) => service.data.featured)
}

/**
 * Get services by category
 */
export async function getServicesByCategory(category: string): Promise<Service[]> {
  const services = await getAllServices()
  return services.filter((service) => service.data.category === category)
}

/**
 * Get services sorted by order
 */
export async function getServicesSorted(): Promise<Service[]> {
  const services = await getAllServices()
  return services.sort((a, b) => a.data.order - b.data.order)
}

/**
 * Get a single service by slug
 */
export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const services = await getAllServices()
  return services.find((service) => service.slug === slug)
}

/**
 * Get service categories
 */
export async function getServiceCategories(): Promise<string[]> {
  const services = await getAllServices()
  const categories = services
    .map((service) => service.data.category)
    .filter((category): category is string => Boolean(category))

  return [...new Set(categories)].sort()
}
