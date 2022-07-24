import React from 'react'
import { Card , Button } from 'flowbite-react'
import style from '../../styles/CardDefault.module.css'
import {FaStar} from 'react-icons/fa'


type myCardProps = {
    brand: string
    url: string
    label: string
    price: number
    size: string[]
    rate: number
  }

    const CardDefault = (props: myCardProps) => {
        return (
                <>
            <div className="bg-mywhite border-[1px] border-myprimary-100 overflow-hidden group w-32 h-56 sm:w-52 sm:h-80 rounded-xl">
              <img src={props.url} alt={props.brand} className='object-cover object-center h-full'/>
                <div className='text-mywhite bg-black bg-opacity-50 w-full translate-y-[-33px] h-32 px-2 py-1 group-hover:translate-y-[-75px] transition-all ease-in-out'>
                  <div className='flex justify-between'>
                    <p>{props.brand}</p>
                    <p>{props.price}MT</p>
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
                <div className='bg-white sm:translate-y-[-520px] translate-y-[-425px] w-full h-full opacity-0 group-hover:opacity-100 group-hover:bg-opacity-50 flex justify-center items-center pt-24'>
                <Button color="purple" size='sm'>select option</Button>
                </div>
            </div>
            </>
        )

    }

    export default CardDefault
// const CardDefulte = ({
//     url,
//     label,
//     brand,
//     price,
//   }:myCardProps) => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default CardDefulte