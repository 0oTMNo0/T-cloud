import { Input, Modal, Notification, NumberInput, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Button, Label, Toast } from 'flowbite-react'
// import { Cookies } from 'next/dist/server/web/spec-extension/cookies'
import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import { MdError } from 'react-icons/md'
import Cookies from 'js-cookie'

type MyModaltype = {
  opened: boolean
  onClose: any
}

const MyModal: FC<MyModaltype> = (props) => {
  const [opened, setOpened] = useState(false)
  const [token, setToken] = useState('');
  const [openNoti, setOpenNoti] = useState<boolean>(false)
  const [page, setPage] = useState<boolean>(true)

  useEffect(() => {
    setOpened(props.opened)
  }
    , [props.opened])

  const form = useForm({
    initialValues: {
      name: 'say', password: 'hello',
      confirmPassword: 'hi',
    },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 4 ? 'Name must have at least 4 letters' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });



  const loginform = useForm({
    initialValues: { name: '', },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 4 ? 'Name must have at least 4 letters' : null),
    },
  });


  function handlesubmit(values: any) {
    fetch('http://localhost:8000/user/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: values.name,
        password: values.password
      })
    })
      .then(response => response.json())
      .then(data => {
        setToken(data.token);
        console.log(data)
        Cookies.set('token', data.token);

        props.onClose(false)
        if(data.status === 'failed'){
          setOpenNoti(true)
        }else{
          setOpened(false)
        }
      })
  }




  function handlesubmitRegister(values: any) {
    fetch('http://localhost:8000/user/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: values.name,
        password: values.password
      })
    })
      .then(response => response.json())
      .then(data => {
        // setToken(data.token);
        // Cookies.set('token', data.token);
        setPage(true)
        if(data.status === 'failed'){
          setOpenNoti(true)
        }
      }
      )
  }



  return (
    <>
      {
        page ?
          (<Modal
            size='xs'
            opened={opened}
            onClose={() => { setOpened(false); props.onClose(false) }}
            transition="rotate-left"
            transitionDuration={600}
            transitionTimingFunction="ease"
            withCloseButton={false}
          >
            <form onSubmit={loginform.onSubmit(handlesubmit)} dir='rtl' className='flex flex-col gap-4'>
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
              <PasswordInput
                label="رمز عبور"
                placeholder="رمز عبور"
                {...loginform.getInputProps('password')}
                sx={{
                  '& div': {
                    backgroundColor: '#fff',
                    border: 'none',
                    borderBottom: '2px solid #69369E',
                    '& div': {
                      border: 'none',
                    }
                  },
                  '& input': {
                    all: 'unset',
                    textAlign: 'right',
                    width: '100%',
                    '&:focus': {
                      all: 'unset',
                      textAlign: 'right',
                      width: '100%',
                    }
                  }
                }}
              />
              <div className="flex items-center gap-2">
                <input id="purple" type="checkbox" value="" className="w-4 h-4 text-purple-600 bg-gray-100 rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="purple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">مرا به خاطر داشته باش</label>
              </div>
              <span className='self-center'>
                <Button color="purple" type='submit'>
                  ورود
                </Button>
              </span>
            </form>
            <div className='w-full text-center mt-2 text-sm'>

              <a className='hover:underline text-myprimary-200' onClick={() => {
                // setOpened(false); props.onClose(false);setOpenModal(true)
                setPage(false)
              }}>
                ثبت نام
              </a>
            </div>


            {
              openNoti ? (
                <div className='absolute z-50 top-96 right-10 animate-bounce'>
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

          </Modal>)
          : (
            <Modal
              size='lg'
              opened={opened}
              onClose={() => { setOpened(false); props.onClose(false) }}
              transition="rotate-left"
              transitionDuration={600}
              transitionTimingFunction="ease"
              withCloseButton={false}
            >
              <div className='flex'>
                <div className='w-3/5 px-8'>
                  <form onSubmit={form.onSubmit(handlesubmitRegister)} dir='rtl' className='flex flex-col gap-4'>
                    <TextInput label="نام کاربری" placeholder="نام کاربری" {...form.getInputProps('name')}
                      sx={{
                        '& div': {
                          all: 'unset',
                          backgroundColor: '#fff',
                          fontSize: '0.7rem',
                          color: 'red'
                        },
                        '& input': {
                          all: 'unset',
                          fontSize: '1rem',
                          color: 'black',
                          textAlign: 'right',
                          borderBottom: '2px solid #69369E',
                          width: '100%',
                          backgroundColor: "transparent",
                          '&:focus': {
                            all: 'unset',
                            textAlign: 'right',
                            fontSize: '1rem',
                            color: 'black',
                            borderBottom: '2px solid #69369E',
                            width: '100%',
                            backgroundColor: "transparent",
                          }
                        }
                      }} />
                    <PasswordInput
                      label="رمز عبور"
                      placeholder="رمز عبور"
                      {...form.getInputProps('password')}
                      sx={{
                        '& div': {
                          backgroundColor: '#fff',
                          border: 'none',
                          '& div': {
                            border: 'none',
                          }

                        },
                        '& input': {
                          all: 'unset',
                          textAlign: 'right',
                          borderBottom: '2px solid #69369E',
                          width: '100%',
                          '&:focus': {
                            all: 'unset',
                            textAlign: 'right',
                            borderBottom: '2px solid #69369E',
                            width: '100%',
                          }
                        }
                      }}
                    />
                    <PasswordInput
                      label="تکرار رمز عبور"
                      placeholder="تکرار رمز عبور"
                      {...form.getInputProps('confirmPassword')}
                      sx={{
                        '& div': {
                          backgroundColor: '#fff',
                          border: 'none',
                          '& div': {
                            border: 'none',
                          }
                        },
                        '& input': {
                          all: 'unset',
                          textAlign: 'right',
                          borderBottom: '2px solid #69369E',
                          width: '100%',
                          '&:focus': {
                            all: 'unset',
                            borderBottom: '2px solid #69369E',
                            textAlign: 'right',
                            width: '100%',
                          }
                        }
                      }}
                    />

                    <span className='self-center'>
                      <Button color="purple" type='submit'>
                        ثبت نام
                      </Button>
                    </span>
                  </form>
                  <div className='w-full text-center mt-2 text-sm'>
                    <a className='hover:underline text-myprimary-200' onClick={() => {
                      setPage(true)
                    }}>
                      ورود
                    </a>
                  </div>
                </div>
                <div className='w-2/5 flex flex-col justify-evenly items-end border-l-2 border-myprimary-100 pl-4'>


                  <div className='flex gap-2 items-center justify-center'>
                    <p dir='rtl' className='text-xs sm:text-sm'>با اطمینان از خرید خود لذت ببر</p>
                    <Image
                      layout='intrinsic'
                      src='/asset/crown.png'
                      alt='vipText'
                      height={40}
                      width={40}
                    />
                  </div>

                  <div className='flex gap-2 items-center justify-center'>
                    <p dir='rtl' className='text-xs sm:text-sm'>بهترین برند ها را با ما تجربه کنید</p>
                    <Image
                      layout='intrinsic'
                      src='/asset/stars.png'
                      alt='vipText'
                      height={40}
                      width={40}
                    />
                  </div>
                  <div className='flex gap-2 items-center justify-center'>
                    <p dir='rtl' className='text-xs sm:text-sm'>با خرید خود از حراجی خیریه به
                      جوانان در حال تحصیل کمک کنید</p>
                    <Image
                      layout='intrinsic'
                      src='/asset/helpIcon.png'
                      alt='vipText'
                      height={60}
                      width={60}
                    />
                  </div>


                </div>
              </div>


              {
                openNoti ? (
                  <div className='absolute z-50 top-96 right-36 animate-bounce'>
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



    </>
  )
}


export default MyModal
