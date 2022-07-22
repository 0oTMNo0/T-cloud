import React from 'react'
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import style from './../../styles/Header.module.css'
const Header = () => {
  return (
    <header className='w-screen p-2 bg-myblack flex justify-between text-mywhite'>
      <div>
        <button className='flex p-1 bg bg-myprimary-200 rounded-md gap-1 '>
          <div className='bg-myprimary-100 p-1 rounded-md'>
            <FaShoppingCart />
          </div>
          <p className='hidden sm:block'>سبد خرید</p>
        </button>
        {/* <button className='flex p-1 bg bg-myprimary-200 rounded gap-1'>
          <div className='bg-myprimary-100 p-1 rounded'>
          <FaUser/>
          </div>
          <p>وارد شوید</p>
        </button> */}
      </div>
      <div className='flex items-center gap-2'>


        <form className='flex bg-myprimary-200 rounded-md group items-center'>
          <input type='text' placeholder='search' className='focus:outline-none hidden w-0 transition-[0.5s] bg-transparent outline-none active:outline-none focus:border-none border-none group-focus-within:w-52 group-focus-within:block h-7 ring-0 focus:ring-0'/>
        <button className='grid place-content-center p-1 cursor-pointer' type='button'>
          <span className='bg-myprimary-100 p-1 rounded-md'>
            <FaSearch />
          </span>
        </button>
        </form>




        <FiMenu className='text-mywhite text-3xl' />
      </div>
    </header>
  )
}

export default Header

