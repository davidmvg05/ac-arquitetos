export interface Project {
  id: string
  title: string
  slug: string
  category: 'Arquitetura' | 'Arquitetura de Interiores'
  location: string
  year: number
  image: string
  alt: string
  description: string
  dimensions?: {
    width: number
    height: number
  }
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  category: string
  date: string
  readTime: string
  excerpt: string
  image: string
  alt: string
}

export interface Testimonial {
  id: string
  author: string
  role: string
  location: string
  quote: string
  projectTitle: string
  year: number
}

export interface MenuItem {
  title: string
  path: string
  tag: string
  image: string
}
