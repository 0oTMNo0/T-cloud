import { FileInput, Modal, Select, TextInput } from '@mantine/core'
import { Toast } from 'flowbite-react'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { MdError } from 'react-icons/md'
import { useSelector } from 'react-redux'
import Icon from '../component/Icon'

type MyModaltype = {
    opened: boolean
    onClose: any
  }

const MyModalAddProduct: FC<MyModaltype> = (props) => {
    const [opened, setOpened] = useState(false)
    const [main_image, setMainImage] = useState<File | null >()
    const [openNoti, setOpenNoti] = useState<boolean>(false)
    const [categorySelect, setCategorySelect] = useState<number | undefined>()
    const categoryList = useSelector((state: any) => state.product.category)


    const categorys = useMemo(()=>{
        return categoryList.map((item:any)=>({
        value:item.id,
        label:item.name
        }))
        },[categoryList])

        console.log(categorys)

    useEffect(() => {
        setOpened(props.opened)
      }
        , [props.opened])

        useEffect(() => {
            if (main_image!=null) {
                console.log(getBase64(main_image).then(data => {
                    console.log(data)
                }))
            }
        }
            , [main_image])

        function getBase64(file: File) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }

  return (
        <Modal
            size='lg'
            opened={opened}
            onClose={() => { setOpened(false); props.onClose(false) }}
            transition="rotate-left"
            transitionDuration={600}
            transitionTimingFunction="ease"
            overflow="outside"
            >
                <div className='absolute top-0'>
            <Icon/>
                </div>
            <form className='mt-12 flex flex-col gap-1'>
            <Select label="choose category" placeholder="Pick one" data={categorys} required/>
            <TextInput placeholder="Your name" label="Full name" required />
            <FileInput value={main_image} onChange={setMainImage} />
            </form>
           
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

export default MyModalAddProduct
