import { Dropdown } from 'flowbite-react'
import produce from 'immer'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

interface Props {
    id: number | undefined
    product: any
}

const CardMangerProduct: FC<Props> = (props) => {

    const [sex, setSex] = useState<boolean | undefined>(props.product?.featured)
    const categoryList = useSelector((state: any) => state.product.category)

    const categoryName = categoryList?.find((item: any) => item.id === props.product?.category)?.name

    return (
        <article className='bg-mywhite rounded-br flex flex-col items-center p-4 h-[500px]'>
            <div className='border-[1px] border-myprimary-100 w-20 h-32 rounded'>
                <img src={props.product ? props.product.main_image : null} alt='product' className='w-full h-full object-cover rounded' />
            </div>
            <form className='flex flex-col w-full px-8 mt-4 gap-1' dir='rtl' onSubmit={(e) => e.preventDefault()}>

                <div className='flex w-full gap-2'>
                    <div className='flex flex-col w-1/2'>
                        <label className='text-myblack text-xs translate-y-1'>نام کالا</label>
                        <input type='text' placeholder='نام کالا' className=' border-b-2 border-t-0 p-2 border-x-0 border-myprimary-200 focus:border-myprimary-100 w-full focus:ring-0' value={
                            props.product ? props.product.name : ''
                        } />
                    </div>

                    <div className='flex flex-col w-1/2'>
                        <label className='text-myblack text-xs translate-y-1'>برند</label>
                        <input type='text' placeholder='برند' className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-full focus:ring-0' value={
                            props.product ? props.product.description : ''
                        } />
                    </div>
                </div>

                <div className='flex w-full gap-2'>
                    <div className='flex flex-col w-1/2'>
                        <label className='text-myblack text-xs translate-y-1'>قیمت(میلیون تومان)</label>
                        <input type='number' placeholder='قیمت' className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-full focus:ring-0' value={
                            props.product ? (props.product.final_price) : ''
                        } />
                    </div>

                    <div className='flex flex-col w-1/2'>
                        <label className='text-myblack text-xs translate-y-1'>تعداد</label>
                        <input type='number' placeholder='تعداد' className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-full focus:ring-0' value={
                            props.product ? props.product.remaining : ''
                        } />
                    </div>
                </div>

                <div className='flex w-full gap-2'>
                    <div className='flex flex-col w-1/2'>
                        <label className='text-myblack text-xs translate-y-1'>ویژه</label>
                        <input type='text' placeholder='ویژه' className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-full focus:ring-0' value={
                            props.product ? props.product.slug : ''
                        } />
                    </div>

                    <div className='flex flex-col w-1/2'>
                        <label className='text-myblack text-xs translate-y-1'>تخفیف(میلیون تومان)</label>
                        <input type='number' placeholder='تخفیف' className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-full focus:ring-0' value={
                            props.product?.final_price !== props.product?.price ? props.product.price - props.product.final_price : ''
                        } />
                    </div>
                </div>

                <div className='flex justify-between gap-2'>
                    <div className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-1/2'>
                        <Dropdown label={
                            props.product?.featured ? 'جنسیت:مرد' : 'جنسیت:زن'
                        } inline={true} color='purple' size='sm'>
                            <Dropdown.Item >مرد</Dropdown.Item>
                            <Dropdown.Item >زن</Dropdown.Item>
                        </Dropdown>
                    </div>
                    <div className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-1/2'>
                        <Dropdown label={
                            categoryName ? (' دسته بندی:' + categoryName) : 'دسته بندی'
                        } inline={true} color='purple' size='sm'>
                           {
                                 categoryList?.map((item: any) => {
                                        return <Dropdown.Item key={item.id} onClick={() => {
                                            setSex(item.id)
                                        } }>{item.name}</Dropdown.Item>
                                    } )
                            }
                        </Dropdown>
                    </div>
                </div>

                <div className='flex w-full mt-8 text-mywhite gap-2'>
                    <button className='bg-green-500 rounded-md py-1 w-1/2 hover:bg-green-600'>
                        ذخیره
                    </button>
                    <button className='bg-red-500 rounded-md py-1 w-1/2 hover:bg-red-600'>
                        حذف
                    </button>
                </div>
            </form>


        </article>
    )
}

export default CardMangerProduct
