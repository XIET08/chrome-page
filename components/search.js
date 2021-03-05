import { Image } from '@chakra-ui/react'
import { css } from '@emotion/react'


const icon = css`
  width: 26px;
  height: 26pxpx;
`

const searchWrap = css`
  width: 561px;
  height: 44px;
  border-radius: 20px;
  border: 1px solid #d5d5d5;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
`

const searchInput = css`
  background-color: #fff;
  border: none;
  color: #000;
  font-size: 16px;
  height: 100%;
  outline: none;
  padding-inline-end: 10px;
  padding-inline-start: 22px;
  position: relative;
  width: 100%;
  border-radius: 20px;
  flex: 1;
`

export default function Search() {
  return (
    <div css={searchWrap}>
      <Image src="/images/icon-search.svg" css={icon}/>
      <input type="text" css={searchInput} placeholder="在 Google 上搜索，或者输入一个网址"/>
      <Image src="/images/icon-voice.svg" css={icon}/>
    </div>
  )
}