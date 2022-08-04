import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FaJenkins, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import MyModalChecckout from '../layout/MyModalChecckout';
import MyModalLogin from '../layout/MyModalLogin';
import { addToCart, decreaseQuantity, removeFromCart } from '../redux/slice/cartSlice';
import {BiLogOut} from 'react-icons/bi';

interface CartType {
    id: string;
    productId:number;
    brand: string;
    name: string;
    size: string;
    price: number;
    image: string;
    quantity: number;
}

const CartItem = () => {

    const cartList = useSelector((state: any) => state.cart.cart)
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [checkout , setCheckout] = useState<boolean>(false)

    const totalPrice = useMemo(() => {
        return cartList?.map((item: CartType) => item.price * item.quantity).reduce((a: number, b: number) => a + b, 0)
    }, [cartList])

    // const handelLoginbtn = useMemo(() => {
    //         if(document.cookie.includes('token')){
    //             return( <button className='flex p-1 gap-1' onClick={()=>{
    //                 setOpenModal(true)
    //             }}>
    //             <div className='p-1'>
    //                 <FaUser />
    //             </div>
    //             <p>وارد شوید</p>
    //         </button>)
    //     }else{
    //         return (
    //             <button className='flex p-1 gap-1' onClick={()=>{
    //                 //delete token from cookie
    //                 document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    //             }}>
    //                 <div className='p-1'>
    //                     <BiLogOut />
    //                 </div>
    //                 <p>خارج شوید</p>
    //             </button>
    //         )
    // }
    // },[])
    function handelLoginbtn(){
        if(document.cookie.includes('token')){
                        return( <button className='flex p-1 gap-1' onClick={()=>{
                            setOpenModal(true)
                        }}>
                        <div className='p-1'>
                            <FaUser />
                        </div>
                        <p>وارد شوید</p>
                    </button>)
                }else{
                    return (
                        <button className='flex p-1 gap-1' onClick={()=>{
                            //delete token from cookie
                            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
                        }}>
                            <div className='p-1'>
                                <BiLogOut />
                            </div>
                            <p>خارج شوید</p>
                        </button>
                    )
            }
    }


    
    return (
        <>
            <div className='flex justify-between items-center'>

                {
                    // typeof window === 'object' ? (
                    //     handelLoginbtn()
                    // ):null
                }
                <MyModalLogin opened={openModal} onClose={(value:boolean)=>{setOpenModal(value)}}/>
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
                                            <button onClick={()=>{
                                                dispatch(decreaseQuantity(item))
                                            }}>-</button>
                                            <p>{item.quantity}</p>
                                            <button onClick={()=>{
                                                dispatch(addToCart(item))
                                            }}>+</button>

                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-between'>
                                        <p>{item.brand}</p>
                                        <p>{item.size}</p>
                                        <p>{item.price}MT</p>
                                    </div>
                                </div>


                                <div className='h-24 flex items-end flex-col justify-between font-semibold'>
                                    <button onClick={()=>{
                                        dispatch(removeFromCart(item))
                                    }}>x</button>
                                    <p>total:{item.price* item.quantity}MT</p></div>
                            </div>
                        )
                    })
                }


            </div>
           {
            cartList.length !== 0 ?
            (
                <div className=' text-center w-full p-2 flex flex-col gap-2 mt-2'>
                <p>{(totalPrice * 1000000).toLocaleString('fa-IR')}تومان</p>
                <button onClick={()=>{
                    if(document.cookie.includes('token')){
                        setCheckout(true)
                        console.log(checkout)
                    }else{
                        setOpenModal(true)
                    }
                }}
                    className='bg-myprimary-100 p-2 rounded-md w-full hover:bg-myprimary-200'>
                    <p>تایید سبد خرید</p>
                </button>
                <MyModalChecckout totalPrice={totalPrice*10000000} opened={checkout} onClose={(value:boolean)=>{setCheckout(value)}}/>
            </div>
            ):null
        }

        </>
    )
}

export default CartItem
