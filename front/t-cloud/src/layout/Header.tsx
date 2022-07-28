import React, { useEffect, useState } from 'react'
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
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
          <div className='absolute z-[11] w-52 bg-mywhite shadow-lg translate-x-[-200px] translate-y-[100px] max-h-56 overflow-y-auto flex flex-col no-scrollbar'>
            {
              searchdata?.map((item, index) => {
                return (
                  <div className='flex justify-between items-center p-2 hover:bg-purple-300 z-20' key={index}>
                    
                      <img src={item.main_image} alt='product' className='w-8 h-10' />
                      <div className='text-myprimary-100 flex flex-col' dir='rtl'>
                        <p>{item.description}</p>
                      <p className='text-xs text-gray-400'>{item.name}</p></div>
                    
                  </div>
                )
              })
            }

          </div>
          <input type='text' placeholder='search' className='focus:outline-none hidden w-0 transition-[0.5s] bg-transparent outline-none active:outline-none focus:border-none border-none group-focus-within:w-52 group-focus-within:block h-7 ring-0 focus:ring-0'
          onChange={(e)=>{
            setSearchData(
              data?.filter(item=>{
                return item.name.toLowerCase().includes((e.target.value).toLowerCase()) || item.description.toLowerCase().includes((e.target.value).toLowerCase())
              })
            );
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
            <a href='#'>
              خانه
            </a>
          </li>
          <li>
            <a href='#'>
              محصولات
            </a>
          </li>
          <li>
            <a href='#'>
              مدیریت
            </a>
          </li>
          <li>
            <a href='#'>
              درباره ما
            </a>
          </li>
        </ul>
        </div>
      </div>
    </header>
  )
}

export default Header

