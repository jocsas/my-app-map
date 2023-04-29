import PlacesTemplate, { PlacesTemplateProps } from 'Templates/Places'
import { client } from 'graphql/client'
import { GetPlaceBySlugQuery, GetPlacesQuery } from 'graphql/generated/graphql'
import { GET_PLACES, GET_PLACE_BY_SLUG } from 'graphql/queries'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

export default function Places({ place }: PlacesTemplateProps) {
  const router = useRouter()

  // retorna um loading
  if (router.isFallback) return null

  return <PlacesTemplate place={place} />
}

export async function getStaticPaths() {
  const { places } = await client.request<GetPlacesQuery>(GET_PLACES, {
    first: 3
  })

  const paths = places.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { place } = await client.request<GetPlaceBySlugQuery>(
    GET_PLACE_BY_SLUG,
    {
      slug: `${params?.slug}`
    }
  )

  if (!place) return { notFound: true }
  return {
    revalidate: 5,
    props: {
      place
    }
  }
}

//getStaticPaths => serve para gerar as urls em build time /about, /trip/pretopolis
//getStaticProps => serve para buscar dados da pagina (props) - build time - estatico
//getServerSideProps => serve para buscar dados da pagina (props) - runtime - toda requisicao (bundle fica no server)
//getInitialProps => serve para buscar dados da pagina (props) - runtime - toda requisicao (bundle também vem para o client) - hydrate
