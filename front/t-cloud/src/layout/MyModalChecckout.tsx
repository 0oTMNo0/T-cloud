import { Modal, NumberInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Button, Toast } from 'flowbite-react'
import React, { FC, useEffect, useState } from 'react'
import Icon from '../component/Icon'
import { TbDiscount2 } from "react-icons/tb";
import Cookie from 'js-cookie'
import { MdError } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../redux/slice/cartSlice'



type MyModaltype = {
  totalPrice: number
  opened: boolean
  onClose: any
}

const MyModalChecckout: FC<MyModaltype> = (props) => {

  const cartList = useSelector((state: any) => state.cart.cart)
  const dispatch = useDispatch()
  const [opened, setOpened] = useState(false)
  const [discount, setDiscount] = useState(false)
  const [myTotalPrice, setMyTotalPrice] = useState<number>(props.totalPrice)
  const [discountValue, setDiscountValue] = useState<string>('')
  const [openNoti, setOpenNoti] = useState<boolean>(false)
  const [discountCode, setDiscountCode] = useState()

  useEffect(() => {
    setOpened(props.opened)
  }
    , [props.opened])

  const loginform = useForm({
    initialValues: {
      name: '',
      Fname: '',
      phoneNumber: '',
      address: '',
      moreInfo: '',
    },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 4 ? 'Name must have at least 4 letters' : null),
      Fname: (value) => (value.length < 4 ? 'Fname must have at least 4 letters' : null),
      phoneNumber: (value: any) => (value.length < 10 ? 'Phone must have at least 10 digits' : null),
      address: (value: any) => (value.length < 10 ? 'Address must have at least 10 digits' : null),
    },
  });

  function handleSubmit(values: any) {
    //console.log(values)

    fetch('http://localhost:8000/store/address/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + Cookie.get('token'),
      },
      body: JSON.stringify({
        name: values.name + ' ' + values.Fname,
        phone: values.phoneNumber,
        address: values.address,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.detail) {
          console.log('get address',data)
          setOpenNoti(true)
        }
        else {
          handleAddresses(data.id, values.moreInfo)
        }
      }).catch(err => {
        console.log(err)
        setOpenNoti(true)
      }
      )
  }

  function handleAddresses(id: number, more: string | undefined) {
    // fetch(`http://localhost:8000/store/address/`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Token '+ Cookie.get('token'),
    //   },
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data)
    //   })
    /////////////////////////////////////////////////////////////////////////////////////////////
    const myorder = cartList.map((item: any) => {
      return {
        product: item.productId,
        quantity: item.quantity,
        data: [
          {
            size: item.size,
            price: item.price,
            image: item.image,
          }
        ]
      }
    }
    )
    const moreData = [{
      more: more,
      totalprice: myTotalPrice,
      discount: discountCode,
    }]
    console.log(moreData)
    fetch(`http://localhost:8000/store/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ Cookie.get('token'),
      },
      body: JSON.stringify({
        address: id,
        data: moreData,
        status: 'pending',
        products: myorder,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.detail) {
          console.log('send order',data)
          setOpenNoti(true)
        }else {
          console.log('something done')
          dispatch(clearCart())
          setOpened(false)
          props.onClose()
        }
      }
      ).catch(err => {
        console.log(err)
        setOpenNoti(true)
      }
      )
  }


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

        <Icon />
      </span>
      {
        props.totalPrice === myTotalPrice ?
          (
            <div className="w-full flex flex-col text-center text-2xl">
              <p>{'جمع کل:  ' + (myTotalPrice).toLocaleString('fa-IR') + 'ریال'}</p>
            </div>
          ) : (
            <div className="w-full flex flex-col text-center text-2xl">
              <p>{'جمع کل:  ' + (myTotalPrice).toLocaleString('fa-IR') + 'ریال'}</p>
              <p className='line-through text-lg text-red-600'>{(props.totalPrice).toLocaleString('fa-IR')}</p>
            </div>
          )
      }
      <div>
        <form dir='rtl' className='mt-8 p-4' onSubmit={loginform.onSubmit(handleSubmit)}>
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
            <TextInput label="نام خانوادگی" placeholder="نام خانوادگی" {...loginform.getInputProps('Fname')}
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
            <NumberInput label="تلفن" placeholder="تلفن"  {...loginform.getInputProps('phoneNumber')}
              sx={{
                '& div': {
                  all: 'unset',
                  backgroundColor: '#fff',
                  fontSize: '0.7rem',
                  color: 'red',
                  '& button': {
                    all: 'unset',
                    display: 'none',
                  },
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
            <TextInput label="بیشتر" placeholder="بیشتر" {...loginform.getInputProps('moreInfo')}
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
          <TextInput label="آدرس" placeholder="آدرس" {...loginform.getInputProps('address')}
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
            <button type='submit' className='w-2/5 bg-myprimary-100 text-white text-md font-medium py-2 px-4 rounded-lg'>ثبت سفارش</button>

            {/* <Button color='purple' size='lg'>
              ثبت سفارش
            </Button> */}

          </div>
        </form>
        <div className='w-min justify-end items-center flex flex-row-reverse border-2 border-myprimary-100 rounded'>
          <input type='text' className=' h-5 border-none focus:ring-0' onChange={(e) => {
            setDiscountValue(e.target.value)
          }} />
          <button className='bg-myprimary-100 p-1 text-mywhite text-3xl' disabled={discount} onClick={() => {

            //Get data from server with token
            fetch(`http://localhost:8000/store/coupon/validate`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + Cookie.get('token')
              },
              body: JSON.stringify({
                code: discountValue
              })
            }).then(res => res.json()).then(data => {
              console.log(data)
              setDiscount(true)
              setMyTotalPrice(myTotalPrice - data.discount)
              setDiscountCode(data.discount)
            }).catch(err => {
              console.log(err)
            }).finally(() => {
              setDiscountValue('')
            })
          }}>
            <TbDiscount2 />
          </button>
        </div>
      </div>


      {
        openNoti ? (
          <div className='absolute z-50 top-[35rem] right-36 animate-bounce'>
            <Toast>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                <MdError className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">
                Something went wrong.
              </div>
              <button onClick={() => setOpenNoti(false)} className='ml-4 hover:text-myprimary-200 text-3xl'>x</button>
            </Toast>
          </div>
        ) : null
      }
    </Modal>

  )
}

export default MyModalChecckout
