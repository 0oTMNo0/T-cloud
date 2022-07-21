import React from 'react'
import {FaShoppingCart} from 'react-icons/fa'
const Header = () => {
  return (
    <header className='w-screen p-2 bg-myblack flex justify-between text-mywhite'>
      <div>
        <button className='flex p-1 bg bg-myprimary-200 rounded'>
          <div className='bg-myprimary-100 p-1 rounded'>
          <FaShoppingCart/>
          <p></p>
          </div>

        </button>
      </div>
    </header>
  )
}

export default Header

