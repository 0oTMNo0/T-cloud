import produce from 'immer'
import React, { FC } from 'react'


interface CardMangerOrderProps {
    order: any
}
const CardMangerOrder: FC<CardMangerOrderProps> = (props) => {


    return (
        <article className='bg-mywhite rounded-br flex flex-col items-center p-4 h-[500px]'>
            <form className='flex flex-col w-full px-8 mt-4 gap-1' dir='rtl' onSubmit={(e) => e.preventDefault()}>
                <label className='text-myblack text-xs translate-y-1'>تاریخ ایجاد</label>
                <input type='text' placeholder='تاریخ ایجاد' className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-full focus:ring-0' value={
                    props.order?.created.split("T")[0]
                } disabled />

                <label className='text-myblack text-xs translate-y-1'>وضعیت</label>
                <input type='text' placeholder='وضعیت' className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-full focus:ring-0' value={
                    props.order?.status
                } disabled />

                <label className='text-myblack text-xs translate-y-1'>قیمت کل</label>
                <input type='number' placeholder='قیمت کل' className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-full focus:ring-0' value={
                    props.order?.data[0].totalprice
                } />

                <label className='text-myblack text-xs translate-y-1'>بیشتر</label>
                <input type='text' placeholder='بیشتر' className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-full focus:ring-0' value={
                    props.order?.data[0].more
                } />

                <div className='border-myprimary-200 border-2 rounded h-32 mt-4 overflow-y-scroll flex flex-col p-2 no-scrollbar'>


                    {
                        props.order?.products.map((product: any, index: number) => {
                           return(
                            <div className=' border-b-[1px] border-myprimary-200 flex hover:scale-105 hover:bg-mybackground p-1 items-center justify-between' key={index}>
                            <div className='rounded border-[1px] border-myprimary-200 w-10 h-14'>
                                <img src={product.data[0]?.image} className='w-full h-full rounded object-cover' />
                            </div>
                            <div className='flex flex-col'>
                                <p>{"شماره:"+product.product}</p>
                                <p>{"سایز:"+product.data[0]?.size}</p>
                                <p>{"تعداد:"+product.quantity}</p>
                            </div>
                            <p>{(product.data[0]?.price * 1000000).toLocaleString('Fa-IR')}</p>
                        </div>
                           )
                        })
                    }
                </div>
                <div className='flex gap-1 w-full'>
                <button className='bg-myprimary-200 w-1/2 rounded-lg p-2 text-mywhite text-xs mt-2 hover:bg-myprimary-100'>تحویل داده شد</button>
                <button className='bg-myprimary-200 w-1/2 rounded-lg p-2 text-mywhite text-xs mt-2 hover:bg-myprimary-100'>ذخیره</button>
                </div>
            </form>
        </article>
    )
}

export default CardMangerOrder
