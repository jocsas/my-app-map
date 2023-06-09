import { NextSeo } from 'next-seo'

import LinkWrapper from 'components/LinkWrapper'
import { InfoOutline } from '@styled-icons/evaicons-outline/InfoOutline'
import dynamic from 'next/dynamic'
import { MapProps } from 'components/Map'

const Map = dynamic(() => import('components/Map'), { ssr: false })

export default function HomeTemplate({ places }: MapProps) {
  return (
    <>
      <NextSeo
        title="My App"
        description="A simple project from RIo de Janeiro"
        canonical="https://curso.jocsa.ga"
        openGraph={{
          url: 'https://curso.jocsa.ga',
          title: 'My App',
          description: 'A simple project from RIo de Janeiro',
          images: [
            {
              url: 'https://curso.jocsa.ga',
              width: 1280,
              height: 720,
              alt: 'My App'
            }
          ],
          site_name: 'My App'
        }}
      />
      <LinkWrapper href="/about">
        <InfoOutline size={32} aria-label="About" />
      </LinkWrapper>
      <Map places={places} />
    </>
  )
}
