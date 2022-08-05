import { Modal, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Button } from 'flowbite-react'
import React, { FC, useEffect, useState } from 'react'
import Icon from '../component/Icon'
import {TbDiscount2} from "react-icons/tb";
import Cookie from 'js-cookie'



type MyModaltype = {
  totalPrice: number
    opened: boolean
    onClose: any
  }

const MyModalChecckout:FC<MyModaltype> = (props) => {

    const [opened, setOpened] = useState(false)
    const [discount, setDiscount] = useState(false)
    const [myTotalPrice, setMyTotalPrice] = useState<number>(props.totalPrice)
    const [discountValue, setDiscountValue] = useState('')
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
                
                  {
                    props.totalPrice === myTotalPrice ?
                    (
                      <div className="w-full flex flex-col text-center text-2xl">
                      <p>{'جمع کل:  '+(myTotalPrice).toLocaleString('fa-IR')+'ریال'}</p>
                      </div>
                    ):(
                      <div className="w-full flex flex-col text-center text-2xl">
                      <p>{'جمع کل:  '+(myTotalPrice).toLocaleString('fa-IR')+'ریال'}</p>
                      <p className='line-through text-lg text-red-600'>{(props.totalPrice).toLocaleString('fa-IR')}</p>
                      </div>
                    )
                  }
                <div>
                  <form dir='rtl' className='mt-8 p-4'>
                  <div className='grid grid-cols-2 gap-4 mb-2'>
                  <TextInput label="نام" placeholder="نام" {...loginform.getInputProps('name')}
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
                <TextInput label="نام خانوادگی" placeholder="نام خانوادگی" {...loginform.getInputProps('name')}
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
                <TextInput label="تلفن" placeholder="تلفن" {...loginform.getInputProps('name')}
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
                <TextInput label="بیشتر" placeholder="بیشتر" {...loginform.getInputProps('name')}
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
                  <TextInput label="آدرس" placeholder="آدرس" {...loginform.getInputProps('name')}
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
                }}
                />
                <div className='w-full flex justify-center m-4'>

                <Button color='purple' size='lg'>
                  ثبت سفارش
                </Button>
                </div>
                  </form>
                  <div className='w-min justify-end items-center flex flex-row-reverse border-2 border-myprimary-100 rounded'>
                    <input type='text' className=' h-5 border-none focus:ring-0' onChange={(e)=>{
                      setDiscountValue(e.target.value)
                    }}/>
                    <button className='bg-myprimary-100 p-1 text-mywhite text-3xl' disabled={discount} onClick={()=>{
                      
                      //Get data from server with token
                      fetch(`http://localhost:8000/store/coupon/validate`,{
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': 'Token '+ Cookie.get('token')
                        },
                        body: JSON.stringify({
                        code: discountValue
                        })
                      }).then(res=>res.json()).then(data=>{
                          console.log(data)
                          setDiscount(true)
                          setMyTotalPrice(myTotalPrice-data.discount)
                      }).catch(err=>{
                        console.log(err)
                      }).finally(()=>{
                        setDiscountValue('')
                      })
                    }}>
                      <TbDiscount2/>
                    </button>
                  </div>
                </div>
          </Modal>
    
  )
}

export default MyModalChecckout
