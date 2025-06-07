import { MetadataRoute } from 'next'
import { client } from '../../sanity/lib/client'
import { getProjectsSlug } from '../../sanity/lib/queries'

// Define a type for your project slug items
interface ProjectSlug {
  slug: {
    current: string
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://portfolio-v3-six-olive.vercel.app/'
  
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Dynamic work project routes
  try {
    const projectSlugs = await client.fetch<ProjectSlug[]>(getProjectsSlug)
    
    const projectRoutes: MetadataRoute.Sitemap = projectSlugs
      .filter((item) => item && item.slug && typeof item.slug.current === 'string')
      .map((item) => ({
        url: `${baseUrl}/work/${item.slug.current}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))

    return [...staticRoutes, ...projectRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return static routes if dynamic generation fails
    return staticRoutes
  }
}