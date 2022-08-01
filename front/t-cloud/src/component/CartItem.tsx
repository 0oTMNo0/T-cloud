import React, { useState } from 'react'
import { FaJenkins, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

interface CartType {
    id: number | undefined;
    brand: string | undefined;
    name: string | undefined;
    size: string | undefined;
    price: number | undefined;
    image: string | undefined;
    quantity: number;
}


const CartItem = () => {

    const cartList = useSelector((state: any) => state.cart.cart)
    const dispatch = useDispatch()
    const [total,setTotal] = useState<number>(0)

    return (
        <>
            <div className='flex justify-between items-center'>

                <button className='flex p-1 gap-1'>
                    <div className='p-1'>
                        <FaUser />
                    </div>
                    <p>وارد شوید</p>
                </button>

                {
                    cartList.length === 0 ?
                        (
                            <p>سبد خرید شما خالی است</p>
                        ) : (
                            <span className='flex gap-2 flex-row-reverse'>{cartList.length}<p> کالا </p></span>
                        )
                }

            </div>
            <div className='w-full flex flex-col overflow-y-scroll no-scrollbar'>
                {
                    cartList.map((item: any ,index:number) => {
                        return (
                            <div className='border-myprimary-100 border-b-2 flex justify-between p-2' key={index}>
                                <div className='flex gap-2'>
                                    <div className='overflow-hidden border-2 border-myprimary-200 rounded w-16 h-24'>
                                        <img src={item.image}
                                            className='object-cover object-center h-full' />
                                        {/* start add btn here */}
                                        <div className='bg-myprimary-200 bg-opacity-75 w-full h-8 translate-y-[-30px] flex justify-center gap-2 items-center'>
                                            <button>-</button>
                                            <p>{item.quantity}</p>
                                            <button>+</button>

                                        </div>



                                    </div>
                                    <div className='flex flex-col justify-between'>
                                        <p>{item.brand}</p>
                                        <p>{item.size}</p>
                                        <p>{item.price}MT</p>
                                    </div>
                                </div>


                                <div className='h-24 flex items-end flex-col justify-between font-semibold'><button>x</button><p>total:{item.price* item.quantity}MT</p></div>
                            </div>
                        )
                    })
                }


            </div>
           {
            cartList.length !== 0 ?
            (
                <div className=' text-center w-full p-2 flex flex-col gap-2 mt-2'>
                <p>{(55 * 1000000).toLocaleString('fa-IR')}تومان</p>
                <button
                    className='bg-myprimary-100 p-2 rounded-md w-full hover:bg-myprimary-200'>
                    <p>تایید سبد خرید</p>
                </button>
            </div>
            ):null
           }
        </>
    )
}

export default CartItem
