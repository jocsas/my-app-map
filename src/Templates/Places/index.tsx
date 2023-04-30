import { CloseOutline } from '@styled-icons/evaicons-outline'
import Image from 'next/image'
import LinkWrapper from 'components/LinkWrapper'
import * as S from './styles'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

type ImageProps = {
  url: string
  height: number
  width: number
}

export type PlacesTemplateProps = {
  place: {
    slug: string
    name: string
    description?: {
      html: string
      text: string
    }
    gallery: ImageProps[]
  }
}

export default function PlacesTemplate({ place }: PlacesTemplateProps) {
  const router = useRouter()
  if (router.isFallback) return null
  return (
    <>
      <NextSeo
        title={`${place.name} - My App`}
        description={place.description?.text}
        canonical="https://curso.jocsa.ga"
        openGraph={{
          url: 'https://curso.jocsa.ga',
          title: `${place.name} - My App`,
          description: place.description?.text,
          images: [
            {
              url: place.gallery[0]?.url,
              width: place.gallery[0]?.width,
              height: place.gallery[0]?.height,
              alt: `${place.name}`
            }
          ],
          site_name: 'My App'
        }}
      />
      <LinkWrapper href="/">
        <CloseOutline size={32} aria-label="close" />
      </LinkWrapper>
      <S.Wrapper>
        <S.Container>
          <S.Heading>{place.name}</S.Heading>
          <S.Body
            dangerouslySetInnerHTML={{ __html: place.description?.html || '' }}
          ></S.Body>
          <S.Gallery>
            {place.gallery.map((img, index) => (
              <Image
                src={img.url}
                alt={place.name}
                key={`photo-${index}`}
                width={1024}
                height={768}
                quality={75}
              />
            ))}
          </S.Gallery>
        </S.Container>
      </S.Wrapper>
    </>
  )
}
