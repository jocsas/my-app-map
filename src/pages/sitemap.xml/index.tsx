/* eslint-disable @typescript-eslint/no-empty-function */
// pages/server-sitemap.xml/index.tsx
import { getServerSideSitemapLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { client } from 'graphql/client'
import { GetPlacesQuery } from 'graphql/generated/graphql'
import { GET_PLACES } from 'graphql/queries'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  const { places } = await client.request<GetPlacesQuery>(GET_PLACES)

  const fields = places.map(({ slug }) => ({
    loc: `https://curso.jocsa.ga/${slug}`,
    lastmod: new Date().toISOString()
  }))

  fields.push(
    {
      loc: 'https://curso.jocsa.ga/',
      lastmod: new Date().toISOString()
    },
    {
      loc: 'https://curso.jocsa.ga/about',
      lastmod: new Date().toISOString()
    }
  )

  return getServerSideSitemapLegacy(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}
