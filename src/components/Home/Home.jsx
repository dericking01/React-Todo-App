import {
  Container,
  Up,
  Categories,
  InputContainer,
  Input,
  ModalContent,
} from '../../styles/home.styled'
import { useGlobalContext } from '../../GlobalContext'
import Category from './Category'
import { Modal, Button } from '@mui/material'
import { BiCheck } from 'react-icons/bi'
import { Icon } from '../../styles/global.styled'
import { v4 } from 'uuid'
import { useState, useEffect } from 'react'
import { setItem, getItem } from '../../utils/helpers'
import randomColor from 'randomcolor'
import { motion } from 'framer-motion'
import DeleteModal from '../Modal'
const Home = () => {
  const { user, openModal, handleCloseModal, setOpenModal } = useGlobalContext()
  const [text, setText] = useState('')
  const [data, setData] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteModalText, setDeleteModalText] = useState('')
  const [deleteItemId, setDeleteItemId] = useState(null)
  const [continueDelete, setContinueDelete] = useState(false)
  // adding category
  const handleAddingCategory = (e) => {
    e.preventDefault()
    setText('')
    const design = randomColor()
    const id = v4()
    localStorage.setItem(`design-${id}`, design)
    setData([
      {
        name: text,
        id,
        color: randomColor({
          hue: 9,
          luminosity: 100,
        }),
        design,
      },
      ...data,
    ])
    handleCloseModal()
  }
  useEffect(() => {
    const items = getItem('categories')
    items && setData(items)
  }, [])
  useEffect(() => {
    setItem('categories', data)
  }, [data])
  // Delete Category
  const deleteCategory = (id) => {
    const newCat = data.filter((item) => item.id !== id)
    localStorage.removeItem(`todosCategory-${id}`)
    localStorage.removeItem(`design-${id}`)
    setData(newCat)
  }
  if (continueDelete) {
    deleteCategory(deleteItemId)
    setContinueDelete(false)
  }
  const containerVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
      x: -100,
    },
  }
  const modalVariant = {
    hidden: {
      opacity: 0,
      scale: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  }
  const categoriesVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        when: 'beforeChildren',
      },
    },
    exit: {
      opacity: 0,
    },
  }
  return (
    <Container
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        todo={deleteModalText}
        type="category"
        setContinueDelete={setContinueDelete}
      />
      {data.length < 1 && (
        <Up>
          <h3>Hi {user}</h3>
          <p>let's help you organize your todo list</p>
          <p>create a category to get started.</p>
          <Button
            variant="contained"
            sx={{
              mt: 5,
            }}
            size="small"
            color="warning"
            onClick={() => setOpenModal(true)}
            component={motion.div}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.4,
              },
            }}
          >
            new
          </Button>
        </Up>
      )}
      <Categories
        variants={categoriesVariant}
        initial="hidden"
        animate="visible"
      >
        {data.map((item, key) => {
          return (
            <Category
              key={key}
              {...item}
              custom={key}
              deleteCategory={() => {
                setDeleteModalText(item.name)
                setShowDeleteModal(true)
                setDeleteItemId(item.id)
              }}
            />
          )
        })}
      </Categories>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        component={motion.div}
        variants={modalVariant}
        initial="hidden"
        animate="visible"
      >
        <ModalContent>
          <h4 id="modal-title">New Category</h4>
          <InputContainer
            id="modal-description"
            onSubmit={handleAddingCategory}
          >
            <Input
              type="text"
              spellCheck="false"
              value={text}
              onChange={(e) => {
                setText(e.target.value)
              }}
              required
              autoFocus
            />
            <Icon type="submit">
              <BiCheck />
            </Icon>
          </InputContainer>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default Home
