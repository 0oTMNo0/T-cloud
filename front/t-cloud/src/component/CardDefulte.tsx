import React, { FC } from 'react'
import { Card , Button } from 'flowbite-react'
import style from '../../styles/CardDefault.module.css'
import {FaStar} from 'react-icons/fa'
import Link from 'next/link'


type myCardProps = {
    id: number,
    brand: string
    url: string
    label: string
    price: number
    size: string[]
    rate: number
  }

    const CardDefault:FC<myCardProps> = (props) => {
        return (
            <Link  href={`/product/${props.id}`} >
            <div className="bg-mywhite border-[1px] border-myprimary-100 overflow-hidden group w-32 h-56 sm:w-52 sm:h-80 rounded ">
              <img src={props.url} alt={props.brand} className='object-cover object-center h-full'/>
                <div className='text-xs sm:text-sm text-mywhite bg-black bg-opacity-50 w-full translate-y-[-33px] h-32 px-2 py-1 group-hover:translate-y-[-75px] transition-all ease-in-out'>
                  <div className='flex justify-between'>
                    <p>{props.brand}</p>
                    <p>{props.price}MT</p>
                  </div>
                  <p className='flex justify-center items-center whitespace-nowrap mt-1'>
                    {props.label.slice(0,40)}...
                  </p>
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
                <div className='bg-white sm:translate-y-[-520px] translate-y-[-425px] w-full h-full opacity-0 group-hover:opacity-100 group-hover:bg-opacity-50 flex justify-center items-center pt-24'>
                <Button color="purple" size='md'>سفارش</Button>
                </div>
            </div>
            </Link>
        )

    }

    export default CardDefault

