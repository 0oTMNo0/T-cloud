import { Checkbox, FileInput, Modal, MultiSelect, NumberInput, Select, Textarea, TextInput } from '@mantine/core'
import { Toast } from 'flowbite-react'
import Cookies from 'js-cookie'
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
    const [main_image, setMainImage] = useState<File | null>()
    const [openNoti, setOpenNoti] = useState<boolean>(false)



    ///form states
    const [categorySelect, setCategorySelect] = useState<string | null>()
    const categoryList = useSelector((state: any) => state.product.category)
    const [name, setName] = useState<string>()
    const [slug, setSlug] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [price, setPrice] = useState<number>()
    const [final_price, setFinalPrice] = useState<number>()
    const [images, setImages] = useState<File[]>([])
    const [sizeSelect, setSizeSelect] = useState<string[]>(['ALL'])
    const [extraInfo, setExtraInfo] = useState<string>()
    const [isMan, setIsMan] = useState<boolean>(false)
    const [main_image64, setMainImage64] = useState<string>()
    const [quantity, setQuantity] = useState<number>()


    const sizeOptions = [
        { value: 'XS', label: 'XS' },
        { value: 'S', label: 'S' },
        { value: 'M', label: 'M' },
        { value: 'L', label: 'L' },
        { value: 'XL', label: 'XL' },
        { value: 'FREESIZE', label: 'FREESIZE' },
    ]
    ////////

    const categorys = useMemo(() => {
        return categoryList.map((item: any) => ({
            value: item.id,
            label: item.name
        }))
    }, [categoryList])

    useEffect(() => {
        setOpened(props.opened)
    }
        , [props.opened])


    function handlesubmit(e: any) {
        e.preventDefault()

        if (main_image) {
            getBase64(main_image).then(base64 => {
                if (typeof base64 === 'string') {
                    setMainImage64(base64)
                }
            })
        }
        
        let myImages: any[] = []
        if (images.length > 0) {
            images.map((item: any) => {
                getBase64(item).then(base64 => {
                    if (typeof base64 === 'string') {
                        myImages.push(base64)
                    }
                })
            })
        }



        fetch('http://localhost:8000/store/product/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + Cookies.get('token')
            },
            body: JSON.stringify({
                name: name,
                price: price,
                final_price: final_price,
                category: categorySelect,
                slug: slug?.split(' ').join('-'),
                featured: isMan,
                extra_information: extraInfo,
                image: main_image64,
                images: myImages,
                options: sizeSelect,
                remaining: quantity,
            })
        }).then(res => res.json())
            .then(data => {
                if (data.detail) {
                    setOpenNoti(true)
                }
                else {
                    setOpened(false)
                    props.onClose()
                }
            })
    }

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
            // overflow="inside"
            title="افزودن کالا"
        >
            <div className='absolute top-5'>
                <Icon />
            </div>
            <form className='mt-16 flex flex-col gap-2' onSubmit={(e) => handlesubmit(e)}>
                <Select label="choose category" placeholder="Pick one" value={categorySelect} onChange={setCategorySelect} data={categorys} required />
                <TextInput placeholder="product name" label="product name" value={name} onChange={(e) => { setName(e.target.value) }} required />
                <TextInput placeholder="Your slug" label="Slug" value={slug} onChange={(e) => { setSlug(e.target.value) }} />
                <TextInput placeholder="product brand" label="brand" value={description} onChange={(e) => { setDescription(e.target.value) }} required />
                <NumberInput placeholder="product price" label="price (MT)" value={price} onChange={setPrice} required />
                <NumberInput placeholder="product final price" label="final price (MT)" value={final_price} onChange={setFinalPrice} required />
                <FileInput label='main image' value={main_image} onChange={setMainImage} required accept="image/png,image/jpeg" />
                <FileInput multiple label='images' value={images} onChange={setImages} accept="image/png,image/jpeg" />
                <MultiSelect value={sizeSelect} onChange={setSizeSelect} data={sizeOptions} label="size options" placeholder="Pick all that you like" required />
                <Textarea value={extraInfo} onChange={(event) => setExtraInfo(event.currentTarget.value)} placeholder="Extra information" label="Extra information" required />
                <NumberInput placeholder="product quantity" label="quantity" value={quantity} onChange={setQuantity} required />
                <Checkbox checked={isMan} onChange={(event) => setIsMan(event.currentTarget.checked)} label="آیا محصول مردانه است" />
                <button className='bg-myprimary-200 hover:bg-myprimary-100 text-white font-bold py-2 px-4 rounded-lg' type='submit'>افزودن</button>
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
