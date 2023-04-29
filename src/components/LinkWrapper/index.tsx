import Link from 'next/link'
import * as S from './styles'

type LinkWrakkerProps = {
  href: string
  children: React.ReactNode
}

const LinkWrapper = ({ href, children }: LinkWrakkerProps) => (
  <S.Wrapper>
    <Link href={href}>{children}</Link>
  </S.Wrapper>
)

export default LinkWrapper
