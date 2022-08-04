import React, { useEffect, useMemo, useState } from 'react'
import Footer from '../../src/layout/Footer'
import Header from '../../src/layout/Header'
import { NextRouter, useRouter } from 'next/router'
import { Button, Rating, Tooltip } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../src/redux/slice/productSlice'
import Image from 'next/image'
import CardVip from '../../src/component/CardVip'
import CardDefault from '../../src/component/CardDefulte'
import Cardoffer from '../../src/component/CardOffer'
import CardHelp from '../../src/component/CardHelp'
import { addToCart } from '../../src/redux/slice/cartSlice'
import { useId } from '@mantine/hooks';


interface Iproduct {
  id: number;
  attributes: string;
  category: number;
  description: string;
  extra_information: string;
  featured: boolean;
  final_price: string;
  images: string[];
  main_image: string;
  name: string;
  options: string[];
  price: string;
  remaining: number;
  slug: string | null;
}
interface CartType {
  id:string;
  productId: number | undefined;
  brand: string | undefined;
  name: string | undefined;
  size: string | undefined;
  price: number | undefined;
  image: string | undefined;
  quantity: number;
}

const id = () => {

  const dispatch = useDispatch()
  const router = useRouter()
  // const { query } = router


  const id: number | undefined = +(router.query.id as string)
  const productList = useSelector((state: any) => state.product.product)
  const cartList = useSelector((state: any) => state.cart.cart)
  const [showImage, setShowImage] = useState<string | undefined>('')
  const [PreSize, setPreSize] = useState<string | undefined>('')

  useEffect(() => {
   if (productList.length === 0) {
      dispatch(fetchProducts())
    }
  }, [])

  const product = useMemo(() => {
    let myProduct: Iproduct | undefined = undefined
    myProduct = productList?.find((product: Iproduct) => product.id === id)
    setShowImage(myProduct?.main_image)
    return myProduct
  }, [productList, id])

  const recommendedProducts = useMemo(() => {
    const recommendedProducts = productList?.filter((product2: Iproduct) => product2.category === product?.category)
    return recommendedProducts
  }, [productList])



  return (
    <div>
      <Header />
      <div className='flex flex-col-reverse sm:flex-row w-screen bg-mybackground py-5'>
        <div className='w-full sm:w-3/5 flex flex-col px-4 gap-4' dir='rtl'>
          <div className='flex gap-2 items-center'>
            <p className='font-extrabold text-xl'>{product?.description}</p>
            {
              product?.slug === 'vip' ?
                (
                  <Image src='/asset/vipIcon.png' width={30} height={30} layout='fixed' />
                )
                : product?.slug === 'off' ?
                  (
                    <Image src='/asset/oferIcon.png' width={30} height={30} layout='fixed' />
                  )
                  : product?.slug === 'help' ?
                    (
                      <Image src='/asset/helpIcon.png' width={30} height={30} layout='fixed' />
                    )
                    : null
            }
          </div>
          <p className='font-semibold text-gray-600'>{product?.name}</p>
          <div className='flex'>
            <span className='text-md'>امتیاز:</span>
            {product?.slug === 'vip' ?
              (
                <Rating>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                </Rating>
              )
              : product?.slug === 'help' ?
                (
                  <Rating>
                    <Rating.Star filled={false} />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                  </Rating>
                )
                : product?.slug === 'offer' ?
                  (
                    <Rating>
                      <Rating.Star filled={false} />
                      <Rating.Star filled={false} />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                    </Rating>
                  )
                  : product?.slug === null ?
                    (
                      <Rating>
                        <Rating.Star filled={false} />
                        <Rating.Star filled={false} />
                        <Rating.Star filled={false} />
                        <Rating.Star />
                        <Rating.Star />
                      </Rating>
                    )
                    : null}
          </div>
          <p>سایز:</p>
          <div className='flex gap-2'>
            {
              product?.options?.map((item: any) => {
                if (item !== 'ALL') {
                  return (<button className='border-2 border-myprimary-100 focus:bg-myprimary-100 focus:text-mywhite px-2 py-0 rounded-lg text-myprimary-100'
                    onClick={() => {setPreSize(item);console.log(PreSize)}}>{item}</button>)
                }
              })
            }
          </div>
          <div className='w-full flex flex-col'>
            {
              product?.slug === 'off' ?
                (
                  <span className='font-bold text-red-600 line-through text-xs'>{
                    (+(product?.price) * 1000000).toLocaleString('fa-IR')
                  }</span>
                ) : null
            }
            <span className='text-myprimary-100'>{
              (+(product?.final_price as string) * 1000000).toLocaleString('fa-IR')
            } تومان</span>

          </div>



          <Button color='purple' size='lg' 
            onClick={() => {
              if (PreSize !== '') {
                const cart: CartType = {
                  id: useId((product?.id as number)?.toString()+PreSize),
                  productId: product?.id,
                  brand: product?.description,
                  name: product?.name,
                  size: PreSize,
                  price: +(product?.final_price as string),
                  image: product?.main_image,
                  quantity: 1
                }
                console.log('mycar is',cart)
                dispatch(addToCart(cart))
              }}
            }
          >افزودن به سبد خرید</Button>




          <div className='flex justify-evenly w-full sm:w-3/4 md:w-2/4 lg:w-2/5'>
            <Tooltip content="ضمانت اصل بودن کالا">
              <Image src='/asset/securebrand.png' width={64} height={64} layout='fixed' />
            </Tooltip>
            <Tooltip content='تحویل سریع و آسان'>
              <Image src='/asset/fastSend.png' width={64} height={64} layout='fixed' />
            </Tooltip>
            <Tooltip content="ضمانت بازگشت کالا">
              <Image src='/asset/returnProduct.png' width={64} height={64} layout='fixed' />
            </Tooltip>
          </div>
          <div>
            <p className='font-bold'>توضیحات:</p>
            <p>{product?.extra_information}</p>
          </div>
        </div>
        <div className='w-full sm:w-2/5 flex h-[500px]'>
          <div className='w-3/4 flex justify-center'>
            <img className='border-[1px] border-myprimary-100 object-cover object-center h-full rounded' src={showImage} />
          </div>
          <div className=' h-full w-1/4 flex flex-col no-scrollbar overflow-y-scroll px-1 gap-4'>
            <button onClick={() => setShowImage(product?.main_image)}>
              <img className='border-[1px] border-myprimary-100 object-cover object-center rounded w-full' src={product?.main_image} alt='vip' />
            </button>
            {
              product?.images.map((item: any ,index:number) => {
                return (
                  <button onClick={() => setShowImage(item)} key={index}>
                    <img className='border-[1px] border-myprimary-100 object-cover object-center rounded w-full' src={item} alt='vip' />
                  </button>
                )
              })
            }
          </div>
        </div>

      </div>
      <div className='flex flex-col w-screen bg-mybackground gap-5' dir='rtl'>
        <p className='text-2xl font-semibold px-4'>
          پیشنهادات برای شما:
        </p>
        <div className='overflow-x-scroll flex items-center gap-4 px-6 no-scrollbar'>
          {
            recommendedProducts?.map((item: any ,index:number) => {
              return (
              item.slug === 'vip' ?
                (
                  <div key={index}>
                    <CardVip
                      id={item.id}
                      brand={item.description}
                      label={item.name}
                      price={item.price}
                      size={(item.options.filter((item2: string) => item2 !== 'ALL'))}
                      url={item.main_image}
                      rate={5}
                    />
                  </div>
                ) : item.slug === 'help' ?
                  (
                    <div key={index}>
                      <CardHelp
                        id={item.id}
                        brand={item.description}
                        label={item.name}
                        price={item.price}
                        size={(item.options.filter((item2: string) => item2 !== 'ALL'))}
                        url={item.main_image}
                        rate={4}
                      />
                    </div>
                  ) : item.slug === 'off' ?
                    (
                      <div key={index}>
                        <Cardoffer
                          id={item.id}
                          oldPrice={item.price}
                          brand={item.description}
                          label={item.name}
                          price={item.final_price}
                          size={(item.options.filter((item2: string) => item2 !== 'ALL'))}
                          url={item.main_image}
                          rate={3}
                        />
                      </div>
                    ) : (
                      <div key={index}>
                        <CardDefault
                          id={item.id}
                          brand={item.description}
                          label={item.name}
                          price={item.price}
                          size={(item.options.filter((item2: any) => item2 !== 'ALL'))}
                          url={item.main_image}
                          rate={2}
                        />
                      </div>
                    ))
            })
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default id
