
import { Button } from '@mantine/core'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import CartItem from '../component/CartItem'
import style from './../../styles/Header.module.css'
const Header = () => {
  const [data, setData] = useState<any[]>([]);
  const [searchdata, setSearchData] = useState<any[]>([]);
  useEffect(() => {
    fetch('http://localhost:8000/store/product')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);
  return (
    <header className='w-screen p-2 bg-myblack flex justify-between text-mywhite'>
      <div className='group'>
        <button className='flex p-1 bg bg-myprimary-200 rounded-md gap-1 group'>
          <div className='bg-myprimary-100 p-1 rounded-md'>
            <FaShoppingCart />
          </div>
          <p className='hidden sm:block'>سبد خرید</p>
        </button>



        <div className='absolute flex-col bg-myblack text-mywhite w-80 sm:w-96 max-h-[400px] hidden group-focus-within:flex rounded-lg p-2 top-14 z-20'>
          
          <CartItem/>

        </div>

      </div>
      <div className='flex items-center gap-2'>


        <form className='flex bg-myprimary-200 rounded-md group items-center'>
          <div className='hidden absolute z-[11] w-52 bg-mywhite shadow-lg translate-x-[0px] translate-y-[130px] max-h-56 overflow-y-auto flex-col no-scrollbar group-focus-within:flex'>
            {
              searchdata?.map((item, index) => {
                return (
                  <Link href={`/product/${item.id}`}>
                  <button className='flex justify-between items-center p-2 hover:bg-purple-300 z-20' key={index}>
                    <img src={item.main_image} alt='product' className='w-8 h-10' />
                    <div className='text-myprimary-100 flex flex-col' dir='rtl'>
                      <p>{item.description}</p>
                      <p className='text-xs text-gray-400'>{item.name}</p></div>
                  </button>
                  </Link>
                )
              })
            }

          </div>
          <input type='text' placeholder='search' className='focus:outline-none hidden w-0 transition-[0.5s] bg-transparent outline-none active:outline-none focus:border-none border-none group-focus-within:w-52 group-focus-within:block h-7 ring-0 focus:ring-0'
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setSearchData(
                  data?.filter(item => {
                    return item.name.toLowerCase().includes((e.target.value).toLowerCase()) || item.description.toLowerCase().includes((e.target.value).toLowerCase())
                  })
                );
              } else {
                setSearchData([])
              }
            }}
          />

          <button className='grid place-content-center p-1 cursor-pointer' type='button'>
            <span className='bg-myprimary-100 p-1 rounded-md'>
              <FaSearch />
            </span>
          </button>
        </form>


        <div className={style.dropmenu}>
          <FiMenu className='text-mywhite text-3xl' />
          <ul className={style.dropdown}>
            <li>
              <Link href='/'>
              <a href='#'>
                خانه
              </a>
              </Link>
            </li>
            <li>
              <Link href='/product'>
              <a href='#'>
                محصولات
              </a>
              </Link>
            </li>
            <li>
              <Link href='/'>
              <a href='#'>
                مدیریت
              </a>
              </Link>
            </li>
            <li>
              <Link href='/'>
              <a href='#'>
                درباره ما
              </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header

