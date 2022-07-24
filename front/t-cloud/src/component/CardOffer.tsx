import React from 'react'
import { Card , Button } from 'flowbite-react'
import {FaStar} from 'react-icons/fa'
import Image from 'next/image'


type myCardProps = {
    brand: string
    url: string
    label: string
    oldPrice: number
    price: number
    size: string[]
    rate: number
  }

    const Cardoffer = (props: myCardProps) => {
        return (
                <>
            <div className="bg-mywhite border-[1px] border-myprimary-100 overflow-hidden group w-32 h-56 sm:w-52 sm:h-80 rounded-xl">
              <img src={props.url} alt={props.brand} className='object-cover object-center h-full'/>
                <div className='text-mywhite bg-black bg-opacity-50 w-full translate-y-[-33px] h-32 px-2 group-hover:translate-y-[-85px] transition-all ease-in-out'>
                  <div className='flex justify-between items-center'>
                    <p>{props.brand}</p>
                    <span className='flex flex-col leading-[1px]]'>
                      <p className='text-red-600 text-xs line-through'>{props.oldPrice}MT</p>
                      <p className='text-sm'>{props.price}MT</p>
                    </span>
                  </div>
                  <div className='flex justify-center items-center'>
                    <p>{props.label}</p>
                     </div>
                    <div className='flex justify-between'>
                        <div className='flex gap-1 items-center'>
                          <p className='text-yellow-400'><FaStar/></p>
                          {props.rate}
                        </div>
                      <span>{
                        props.size.map((item, index) => {
                          return <span className='mx-1' key={index}>{item}</span>})
                        }</span>
                        </div>
                </div>
                <div className='bg-white sm:translate-y-[-530px] translate-y-[-435px] w-full h-full opacity-0 group-hover:opacity-100 group-hover:bg-opacity-50 flex justify-center items-center pt-24'>
                <Button color="purple" size='md'>سفارش</Button>
                </div>
                <div className='relative sm:translate-y-[-760px] translate-y-[-570px]'>
                  <Image
                  layout='fixed'
                  src='/asset/oferIcon.png'
                  width={40}
                  height={40}
                  alt={props.brand} 
                  className='object-cover object-center h-full'/>
                </div>
            </div>
            </>
        )

    }

    export default Cardoffer
    

