import { Dropdown } from 'flowbite-react'
import produce from 'immer'
import Cookies from 'js-cookie'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slice/productSlice'

interface Props {
    id: number | undefined
    product: any
}

const CardMangerProduct: FC<Props> = (props) => {

    const categoryList = useSelector((state: any) => state.product.category)
    const dispatch = useDispatch()
    
    
    const categoryName = categoryList?.find((item: any) => item.id === props.product?.category)?.name
    
    ////
    const [name, setName] = useState<string | undefined>(props.product?.name)
    const [description, setDescription] = useState<string | undefined>(props.product?.description)
    const [price, setPrice] = useState<number | undefined>(props.product?.price)
    const [remaining, setRemaining] = useState<number | undefined>(props.product?.remaining)
    const [final_price, setFinalPrice] = useState<number | undefined>(props.product?.final_price)
    const [slug, setSlug] = useState<string | undefined>(props.product?.slug)
    const [sex, setSex] = useState<boolean | undefined>(props.product?.featured)
    const [categoryId, setCategoryId]= useState<number | undefined>(props.product?.category)

    useEffect(()=>{
        setName(props.product?.name)
        setDescription(props.product?.description)
        setPrice(props.product?.price)
        setRemaining(props.product?.remaining)
        setFinalPrice(props.product?.final_price)
        setSlug(props.product?.slug)
        setSex(props.product?.featured)
        setCategoryId(props.product?.category)
    },[props.id,props.product])
    
    

    ////


    const handleDELETE = () => {
        fetch(`http://localhost:8000/store/product/id/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + Cookies.get('token')
            }
        }).then(response => response.json())
            .then(data => {
                dispatch((fetchProducts()))
            }
            ).catch(err => console.error(err))
    }

    const handleUPDATE = () => {
        // console.log(name, description, price, remaining, final_price, slug,sex, categoryId)
        console.log(props.product)
        fetch(`http://localhost:8000/store/product/id/${props.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + Cookies.get('token')
            },
            body: JSON.stringify({
                name: name,
                price: price,
                final_price: final_price,
                category: categoryId,
                slug: slug?.split(' ').join('-'),
                featured: sex,
                extra_information: props.product.extra_information,
                image: props.product.image,
                images: props.product.images,
                options: props.product.options,
                remaining: remaining,
            })
        }).then(response => response.json())
            .then(data => {
                dispatch((fetchProducts()))
            }
            ).catch(err => console.error(err))
    }
    
    return (
        <article className='bg-mywhite rounded-br flex flex-col items-center p-4 h-[500px]'>
            <div className='border-[1px] border-myprimary-100 w-20 h-32 rounded'>
                <img src={props.product ? props.product.main_image : null} alt='product' className='w-full h-full object-cover rounded' />
            </div>
            <form className='flex flex-col w-full px-8 mt-4 gap-1' dir='rtl' onSubmit={(e) => e.preventDefault()}>

                <div className='flex w-full gap-2'>
                    <div className='flex flex-col w-1/2'>
                        <label className='text-myblack text-xs translate-y-1'>نام کالا</label>
                        <input type='text' placeholder='نام کالا' className=' border-b-2 border-t-0 p-2 border-x-0 border-myprimary-200 focus:border-myprimary-100 w-full focus:ring-0' defaultValue={
                             props.product ? props.product.name : ''
                            
                        } onChange={(e)=>{
                            setName(e.target.value)
                        }}/>
                    </div>

                    <div className='flex flex-col w-1/2'>
                        <label className='text-myblack text-xs translate-y-1'>برند</label>
                        <input type='text' placeholder='برند' className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-full focus:ring-0' defaultValue={
                            props.product ? props.product.description : ''
                        } onChange={(e)=>{
                            setDescription(e.target.value)
                        }}/>
                    </div>
                </div>

                <div className='flex w-full gap-2'>
                    <div className='flex flex-col w-1/2'>
                        <label className='text-myblack text-xs translate-y-1'>قیمت(میلیون تومان)</label>
                        <input type='number' placeholder='قیمت' className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-full focus:ring-0' defaultValue={
                            props.product ? (props.product.price) : ''
                        } onChange={
                            (e)=>{setPrice(parseFloat(e.target.value))}
                        }/>
                    </div>

                    <div className='flex flex-col w-1/2'>
                        <label className='text-myblack text-xs translate-y-1'>تعداد</label>
                        <input type='number' placeholder='تعداد' className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-full focus:ring-0' defaultValue={
                            props.product ? props.product.remaining : ''
                        } onChange={(e)=>{
                            setRemaining(parseInt(e.target.value))
                        }}/>
                    </div>
                </div>

                <div className='flex w-full gap-2'>
                    <div className='flex flex-col w-1/2'>
                        <label className='text-myblack text-xs translate-y-1'>ویژه</label>
                        <input type='text' placeholder='ویژه' className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-full focus:ring-0' defaultValue={
                            props.product ? props.product.slug : ''
                        } onChange={(e)=>setSlug(e.target.value)}/>
                    </div>

                    <div className='flex flex-col w-1/2'>
                        <label className='text-myblack text-xs translate-y-1'>تخفیف(میلیون تومان)</label>
                        <input type='number' placeholder='تخفیف' className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-full focus:ring-0' defaultValue={
                            props.product?.final_price !== props.product?.price ? props.product.price - props.product.final_price : ''
                        } onChange={(e)=>{
                            if(e.target.value === ''){
                                setFinalPrice(props.product.price)
                        }else{
                            setFinalPrice(props.product.price - parseFloat(e.target.value))
                        }
                        }}/>
                    </div>
                </div>

                <div className='flex justify-between gap-2'>
                    <div className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-1/2'>
                        <Dropdown label={
                            props.product?.featured ? 'جنسیت:مرد' : 'جنسیت:زن'
                        } inline={true} color='purple' size='sm'>
                            <Dropdown.Item onClick={()=>{setSex(true)}
                            }>مرد</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{
                                setSex(false)
                            }}>زن</Dropdown.Item>
                        </Dropdown>
                    </div>
                    <div className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-1/2'>
                        <Dropdown label={
                            categoryName ? (' دسته بندی:' + categoryName) : 'دسته بندی'
                        } inline={true} color='purple' size='sm'>
                           {
                                 categoryList?.map((item: any) => {
                                        return <Dropdown.Item key={item.id} onClick={() => {
                                            setCategoryId(item.id)
                                        } }>{item.name}</Dropdown.Item>
                                    } )
                            }
                        </Dropdown>
                    </div>
                </div>

                <div className='flex w-full mt-8 text-mywhite gap-2'>
                    <button className='bg-green-500 rounded-md py-1 w-1/2 hover:bg-green-600'onClick={()=>{
                        handleUPDATE()
                    }}>
                        ذخیره
                    </button>
                    <button className='bg-red-500 rounded-md py-1 w-1/2 hover:bg-red-600' onClick={()=>{
                        handleDELETE()
                    }}>
                        حذف
                    </button>
                </div>
            </form>
            
        </article>
    )
}

export default CardMangerProduct
