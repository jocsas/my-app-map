import styled from 'styled-components'

export const Content = styled.section`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  max-width: var(--container);
  margin: auto;
`

export const Heading = styled.h1`
  font-size: var(--large);
  margin-bottom: var(--large);
`

export const Body = styled.div`
  p {
    line-height: var(--medium);
  }
`
