import PagesTemplate, { PageTemplateProps } from 'Templates/Pages'
import { client } from 'graphql/client'
import { GetPageBySlugQuery, GetPagesQuery } from 'graphql/generated/graphql'
import { GET_PAGES, GET_PAGES_BY_SLUG } from 'graphql/queries'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

export default function Pages({ heading, body }: PageTemplateProps) {
  const router = useRouter()

  // retorna um loading
  if (router.isFallback) return null

  return <PagesTemplate heading={heading} body={body} />
}

export async function getStaticPaths() {
  const { pages } = await client.request<GetPagesQuery>(GET_PAGES, { first: 3 })

  const paths = pages.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { page } = await client.request<GetPageBySlugQuery>(GET_PAGES_BY_SLUG, {
    slug: `${params?.slug}`
  })

  if (!page) return { notFound: true }
  return {
    props: {
      heading: page.heading,
      body: page.body.html
    }
  }
}

//getStaticPaths => serve para gerar as urls em build time /about, /trip/pretopolis
//getStaticProps => serve para buscar dados da pagina (props) - build time - estatico
//getServerSideProps => serve para buscar dados da pagina (props) - runtime - toda requisicao (bundle fica no server)
//getInitialProps => serve para buscar dados da pagina (props) - runtime - toda requisicao (bundle também vem para o client) - hydrate
