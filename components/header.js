import { Image } from '@chakra-ui/react'
import { css } from '@emotion/react'

const logo = css`
  width: 272px;
  height: 92px;
  margin-bottom: 50px;
`

export default function Header() {
  return (
    <div>
      <Image src="/images/google-logo.svg" css={logo}/>
    </div>
  )
}