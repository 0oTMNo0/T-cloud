import { Modal, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { FC, useEffect, useState } from 'react'
import Icon from '../component/Icon'



type MyModaltype = {
  totalPrice: number
    opened: boolean
    onClose: any
  }

const MyModalChecckout:FC<MyModaltype> = (props) => {

    const [opened, setOpened] = useState(false)
    useEffect(() => {
        setOpened(props.opened)
      }
        , [props.opened])

        const loginform = useForm({
          initialValues: { name: '', },
      
          // functions will be used to validate values at corresponding key
          validate: {
            name: (value) => (value.length < 4 ? 'Name must have at least 4 letters' : null),
          },
        });
      
  return (
    
      <Modal
            size='lg'
            opened={opened}
            onClose={() => { setOpened(false); props.onClose(false) }}
            transition="rotate-left"
            transitionDuration={600}
            transitionTimingFunction="ease"
          >
            <span className='absolute top-0'>

                <Icon/>
            </span>
                <div className="w-full text-center text-2xl">
                  {'جمع کل:  '+(props.totalPrice).toLocaleString('fa-IR')+'ریال'}
                </div>
                <div>
                  <form dir='rtl'>
                  <div className='grid grid-cols-2 gap-4'>
                  <TextInput label="نام کاربری" placeholder="نام کاربری" {...loginform.getInputProps('name')}
                sx={{
                  '& div': {
                    all: 'unset',
                    backgroundColor: '#fff',
                    fontSize: '0.7rem',
                    color: 'red'
                  },
                  '& input': {
                    all: 'unset',
                    textAlign: 'right',
                    fontSize: '1rem',
                    color: 'black',
                    borderBottom: '2px solid #69369E',
                    width: '100%',
                    backgroundColor: "transparent",
                    '&:focus': {
                      all: 'unset',
                      fontSize: '1rem',
                      color: 'black',
                      textAlign: 'right',
                      borderBottom: '2px solid #69369E',
                      width: '100%',
                      backgroundColor: "transparent",
                    }
                  }
                }} />
                <TextInput label="نام کاربری" placeholder="نام کاربری" {...loginform.getInputProps('name')}
                sx={{
                  '& div': {
                    all: 'unset',
                    backgroundColor: '#fff',
                    fontSize: '0.7rem',
                    color: 'red'
                  },
                  '& input': {
                    all: 'unset',
                    textAlign: 'right',
                    fontSize: '1rem',
                    color: 'black',
                    borderBottom: '2px solid #69369E',
                    width: '100%',
                    backgroundColor: "transparent",
                    '&:focus': {
                      all: 'unset',
                      fontSize: '1rem',
                      color: 'black',
                      textAlign: 'right',
                      borderBottom: '2px solid #69369E',
                      width: '100%',
                      backgroundColor: "transparent",
                    }
                  }
                }} />
                <TextInput label="نام کاربری" placeholder="نام کاربری" {...loginform.getInputProps('name')}
                sx={{
                  '& div': {
                    all: 'unset',
                    backgroundColor: '#fff',
                    fontSize: '0.7rem',
                    color: 'red'
                  },
                  '& input': {
                    all: 'unset',
                    textAlign: 'right',
                    fontSize: '1rem',
                    color: 'black',
                    borderBottom: '2px solid #69369E',
                    width: '100%',
                    backgroundColor: "transparent",
                    '&:focus': {
                      all: 'unset',
                      fontSize: '1rem',
                      color: 'black',
                      textAlign: 'right',
                      borderBottom: '2px solid #69369E',
                      width: '100%',
                      backgroundColor: "transparent",
                    }
                  }
                }} />
                <TextInput label="نام کاربری" placeholder="نام کاربری" {...loginform.getInputProps('name')}
                sx={{
                  '& div': {
                    all: 'unset',
                    backgroundColor: '#fff',
                    fontSize: '0.7rem',
                    color: 'red'
                  },
                  '& input': {
                    all: 'unset',
                    textAlign: 'right',
                    fontSize: '1rem',
                    color: 'black',
                    borderBottom: '2px solid #69369E',
                    width: '100%',
                    backgroundColor: "transparent",
                    '&:focus': {
                      all: 'unset',
                      fontSize: '1rem',
                      color: 'black',
                      textAlign: 'right',
                      borderBottom: '2px solid #69369E',
                      width: '100%',
                      backgroundColor: "transparent",
                    }
                  }
                }} />
                  </div>
                  </form>
                </div>
          </Modal>
    
  )
}

export default MyModalChecckout
