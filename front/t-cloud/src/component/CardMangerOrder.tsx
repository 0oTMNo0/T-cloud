import produce from 'immer'
import Cookies from 'js-cookie'
import React, { FC } from 'react'


interface CardMangerOrderProps {
    order: any
}
const CardMangerOrder: FC<CardMangerOrderProps> = (props) => {
    let copyOrder = props.order
    function handleStatusSubmit () {
        fetch(`http://localhost:8000/store/order/${props.order.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + Cookies.get('token')
            },
            body: JSON.stringify({
                address: props.order.address,
                data: props.order.data,
                status: 'done',
                products: props.order.products,
            })
        }).then(response => response.json())
            .then(data => {
                window.location.reload()
            }
            ).catch(err => console.error(err))

    }

    function handleSaveSubmit(){
        // console.log('copy',copyOrder)
        // copyOrder.data[0].totalPrice =
        fetch(`http://localhost:8000/store/order/${props.order.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + Cookies.get('token')
            },
            body: JSON.stringify({
                address: copyOrder.address,
                data: copyOrder.data,
                status: copyOrder.status,
                products: copyOrder.products,
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                window.location.reload()
            }
            ).catch(err => console.error(err))

    }


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

                <label className='text-myblack text-xs translate-y-1'>قیمت کل(MT)</label>
                <input type='number' placeholder='قیمت کل' className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-full focus:ring-0' defaultValue={
                   props.order?.total

                } disabled/>

                <label className='text-myblack text-xs translate-y-1'>بیشتر</label>
                <input type='text' placeholder='بیشتر' className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 w-full focus:ring-0' defaultValue={
                    props.order?.data[0].more
                } onChange={(e)=>{
                    copyOrder.data[0].more = e.target.value
                }}/>

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
                                <div className='flex items-center'>تعداد:
                                    <input type='number' className='border-b-2 border-t-0 border-x-0 border-myprimary-200 p-2 focus:border-myprimary-100 focus:ring-0 w-8 py-0' defaultValue={product.quantity} 
                                    onChange={(e:any)=>{
                                        copyOrder.products[index].quantity = +e.target.value
                                    }}/>
                                </div>
                            </div>
                            <p>{(product.data[0]?.price * 1000000).toLocaleString('Fa-IR')}</p>
                        </div>
                           )
                        })
                    }
                </div>
                <div className='flex gap-1 w-full'>
                <button type='submit' className='bg-myprimary-200 w-1/2 rounded-lg p-2 text-mywhite text-xs mt-2 hover:bg-myprimary-100' onClick={()=>{
                    handleStatusSubmit()
                }}>تحویل داده شد</button>
                <button type='submit' className='bg-myprimary-200 w-1/2 rounded-lg p-2 text-mywhite text-xs mt-2 hover:bg-myprimary-100' onClick={()=>{
                    handleSaveSubmit()
                }}>ذخیره</button>
                </div>
            </form>
        </article>
    )
}

export default CardMangerOrder
