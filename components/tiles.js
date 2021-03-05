import { 
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Input,
  VStack,
  Box
} from '@chakra-ui/react'
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import useInput from './useInput'

const logo = css`
  width: 272px;
  height: 92px;
  margin-bottom: 50px;
`

const tileListWrap = css`
  width: 100%;
  display: flex;
  font-size: 13px;
  font-weight: 400;
`

const tileWrap = css`
  -webkit-tap-highlight-color: transparent;
    align-items: center;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 112px;
    margin-bottom: 13px;
    margin-top: 3px;
    opacity: 1;
    outline: none;
    padding-bottom: 4px;
    padding-top: 12px;
    position: relative;
    text-decoration: none;
    transition-duration: 300ms;
    transition-property: left, top;
    transition-timing-function: ease-in-out;
    user-select: none;
    width: 112px;
    & .mask-image {
      position: absolute;
      top: 5px;
      right: 7px;
      display: none;
    }
    &:hover {
      background-color: rgba(32, 33, 36, 0.1);
      & .mask-image {
        display: block;
      }
    }
    .tile-icon {
      align-items: center;
      background-color: rgb(241, 243, 244);
      border-radius: 50%;
      display: flex;
      height: 48px;
      justify-content: center;
      width: 48px;
    }
    .tile-title {
      height: 32px;
      border-radius: 12px;
      color: #000;
      line-height: 16px;
      text-align: center;
      margin-top: 12px;
      padding: 2px 8px;
    }
}
`

const actionWrap = css`
  position: absolute;
  right: 0;
  top: -12px;
  z-index: 1;
  background-color: #fff;
  border: none;
  border-radius: 4px;
  box-shadow: rgb(158, 158, 158) 0 2px 6px;
  margin: 0;
  min-width: 128px;
  outline: none;
  padding: 8px 0;
  & > button {
    background: #fff;
    width: 100%;
    height: 32px;
    line-height: 32px;
    padding: 0 24px;
    boder: none;
    outline: none;
    &:hover {
      background: #bec1c5;
    }
  }
  &.hidden {
    display: none;
  }
`

export default function Tiles() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const titleInput = useInput('')
  const urlInput = useInput('')
  const [editId, setEditId] = useState(null)
  const [tileList, setTileList] = useState([])

  useEffect(() => {
    const array = JSON.parse(window.localStorage.getItem('TileList'))
    if (Array.isArray(array)) {
      setTileList(array)
    }
  }, [])

  const handleAction = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    setEditId(item.id)
  }

  const handleAddorEdit = () => {
    const array = JSON.parse(JSON.stringify(tileList))
    debugger
    if (!editId) {
      array.push({
        id: Math.random() + '',
        title: titleInput.input.value,
        url: urlInput.input.value
      })
    } else {
      const index = array.findIndex(item => item.id === editId)
      array[index] = {
        ...tileList[index],
        title: titleInput.input.value,
        url: urlInput.input.value
      }
      setEditId(null)
    }
    onClose()
    titleInput.setValue('')
    urlInput.setValue('')
    setTileList(array)
    window.localStorage.setItem('TileList', JSON.stringify(array))
  }

  const handleShowEdit = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    titleInput.setValue(item.title)
    urlInput.setValue(item.url)
    onOpen()
  }


  const handleDelete = (e, ele) => {
    e.preventDefault()
    e.stopPropagation()
    const index = tileList.findIndex(item => item.id === editId)
    const array = JSON.parse(JSON.stringify(tileList))
    array.splice(index, 1)
    setTileList(array)
    setEditId(null)
    window.localStorage.setItem('TileList', JSON.stringify(array))
  }

  return (
    <div css={tileListWrap}>
      {tileList.map((item) => (
        <a href={item.url} key={item.id} target="_blank" css={{position: 'relative'}}>
          <Box css={actionWrap} className={(editId == item.id && !isOpen) ? '' : 'hidden'}>
            <button onClick={e => handleShowEdit(e, item)}>修改快捷方式</button>
            <button onClick={e => handleDelete(e, item)}>移除</button>
          </Box>
          <section css={tileWrap}>
            <Image src="/images/mask-image.svg" className="mask-image" onClick={(e) => handleAction(e, item)}/>
            <div className="tile-icon">
              <Image
                src={
                  item.url ? `${item.url}/favicon.ico` : '/images/icon-add.svg'
                }
              />
            </div>
            <div className="tile-title">{item.title}</div>
          </section>
        </a>
      ))}
      <section css={tileWrap} onClick={onOpen}>
        <div className="tile-icon">
          <Image src="/images/icon-add.svg" />
        </div>
        <div className="tile-title">添加快捷方式</div>
      </section>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>添加快捷方式</ModalHeader>
          <ModalBody>
            <form>
                <VStack alignItems="flex-start" mb="20px">
                  <Text mb="4px" as="label" textAlign="left">名称</Text>
                  <Input size="sm" name="title" {...titleInput.input}/>
                </VStack>
                <VStack alignItems="flex-start">
                  <Text mb="4px" as="label" textAlign="left">网址</Text>
                  <Input size="sm" name="url" {...urlInput.input}/>
                </VStack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose} variant="ghost">
              取消
            </Button>
            <Button 
              colorScheme="blue"
              isDisabled={!(titleInput.input.value && urlInput.input.value)}
              onClick={handleAddorEdit}
            >完成</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
