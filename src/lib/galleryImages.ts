import gallery1 from '@assets/images/michael-pointner-WpHwhNpRxrQ-unsplash.jpg'
import gallery2 from '@assets/images/alim-IMh9VBL-OSA-unsplash.jpg'
import gallery3 from '@assets/images/c-cai-4H9Py6ngw2A-unsplash.jpg'
import gallery4 from '@assets/images/fadi-al-shami-fQ6BmpIDVW8-unsplash.jpg'
import gallery5 from '@assets/images/jahanzeb-ahsan-sLiJAs590I0-unsplash.jpg'
import gallery6 from '@assets/images/luise-and-nic-YOg8ZUCgXOA-unsplash.jpg'

type GalleryImage = {
  src: ImageMetadata
  alt: string
  title?: string
}

export const images: GalleryImage[] = [
  {
    src: gallery1,
    alt: 'Modern logistics warehouse with automated systems',
    title: 'Automated Warehouse',
  },
  {
    src: gallery2,
    alt: 'Smart transportation fleet management system',
    title: 'Fleet Management',
  },
  {
    src: gallery3,
    alt: 'Advanced supply chain monitoring dashboard',
    title: 'Supply Chain',
  },
  {
    src: gallery4,
    alt: 'Real-time cargo tracking and monitoring',
    title: 'Cargo Tracking',
  },
  {
    src: gallery5,
    alt: 'Integrated logistics management system',
    title: 'Logistics Management',
  },
  {
    src: gallery6,
    alt: 'Digital transformation in transportation',
    title: 'Digital Solutions',
  },
]
