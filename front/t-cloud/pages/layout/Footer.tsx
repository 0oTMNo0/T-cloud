import React from 'react'
import Icon from './component/Icon'
import { TbPoint } from "react-icons/tb"
import { FaLinkedinIn , FaGithub , FaInstagram} from "react-icons/fa"
 import style from './../../styles/footer.module.css'
const Footer = () => {
  return (
    <div className='bg-mybackground'>
      <footer>
        <div className='flex items-center flex-row-reverse'>
          <div className='w-full h-2 bg-myblack'></div>
          <div className='w-44'>
            <Icon />
          </div>
        </div>


        <div className='w-screen border-b-8 border-myblack grid sm:grid-cols-4 p-8 grid-cols-1' dir='rtl'>

          <div>
            <p className='font-bold text-xl m-4'>اطلاعات</p>


            <ul>
              <li>
                <a href='#'>
                  <span className='text-myblack hover:text-myprimary-200 hover:underline flex items-center mr-6 my-4'>
                    <TbPoint />
                    درباره
                  </span>
                </a>
              </li>
            </ul>

            <ul>
              <li>
                <a href='#'>
                  <span className='text-myblack hover:text-myprimary-200 hover:underline flex items-center mr-6 my-4'>
                    <TbPoint />
                    تحویل
                  </span>
                </a>
              </li>
            </ul>

            <ul>
              <li>
                <a href='#'>
                  <span className='text-myblack hover:text-myprimary-200 hover:underline flex items-center mr-6 my-4'>
                    <TbPoint />
                    سیاست حفظ حریم خصوصی
                  </span>
                </a>
              </li>
            </ul>

            <ul>
              <li>
                <a href='#'>
                  <span className='text-myblack hover:text-myprimary-200 hover:underline flex items-center mr-6 my-4'>
                    <TbPoint />
                    شرایط و ضوابط
                  </span>
                </a>
              </li>
            </ul>
          </div>



          {/* next col */}
          <div>
            <p className='font-bold text-xl m-4'>خدمات مشتری</p>


            <ul>
              <li>
                <a href='#'>
                  <span className='text-myblack hover:text-myprimary-200 hover:underline flex items-center mr-6 my-4'>
                    <TbPoint />
                    با ما تماس بگیرید
                  </span>
                </a>
              </li>
            </ul>

            <ul>
              <li>
                <a href='#'>
                  <span className='text-myblack hover:text-myprimary-200 hover:underline flex items-center mr-6 my-4'>
                    <TbPoint />
                    بازگشت
                  </span>
                </a>
              </li>
            </ul>

            <ul>
              <li>
                <a href='#'>
                  <span className='text-myblack hover:text-myprimary-200 hover:underline flex items-center mr-6 my-4'>
                    <TbPoint />
                    نقشه سایت                  
                    </span>
                </a>
              </li>
            </ul>

            
          </div>
          {/* next col */}
          <div>
            <p className='font-bold text-xl m-4'>بیشتر</p>


            <ul>
              <li>
                <a href='#'>
                  <span className='text-myblack hover:text-myprimary-200 hover:underline flex items-center mr-6 my-4'>
                    <TbPoint />
                    برندها
                  </span>
                </a>
              </li>
            </ul>

            <ul>
              <li>
                <a href='#'>
                  <span className='text-myblack hover:text-myprimary-200 hover:underline flex items-center mr-6 my-4'>
                    <TbPoint />
                    کوپن های هدیه
                  </span>
                </a>
              </li>
            </ul>

            <ul>
              <li>
                <a href='#'>
                  <span className='text-myblack hover:text-myprimary-200 hover:underline flex items-center mr-6 my-4'>
                    <TbPoint />
                    وابسته ها
                    </span>
                </a>
              </li>
            </ul>

            <ul>
              <li>
                <a href='#'>
                  <span className='text-myblack hover:text-myprimary-200 hover:underline flex items-center mr-6 my-4'>
                    <TbPoint />
                    ویژه
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* next col */}
          <div>
            <p className='font-bold text-xl m-4'>حساب من</p>


            <ul>
              <li>
                <a href='#'>
                  <span className='text-myblack hover:text-myprimary-200 hover:underline flex items-center mr-6 my-4'>
                    <TbPoint />
                    حساب من
                  </span>
                </a>
              </li>
            </ul>

            <ul>
              <li>
                <a href='#'>
                  <span className='text-myblack hover:text-myprimary-200 hover:underline flex items-center mr-6 my-4'>
                    <TbPoint />
                    تاریخچه سفارش ها
                  </span>
                </a>
              </li>
            </ul>

            <ul>
              <li>
                <a href='#'>
                  <span className='text-myblack hover:text-myprimary-200 hover:underline flex items-center mr-6 my-4'>
                    <TbPoint />
                    لیست علاقه مندی ها
                  </span>
                </a>
              </li>
            </ul>

            <ul>
              <li>
                <a href='#'>
                  <span className='text-myblack hover:text-myprimary-200 hover:underline flex items-center mr-6 my-4'>
                    <TbPoint />
                    خبرنامه
                  </span>
                </a>
              </li>
            </ul>
          </div>

        </div>
        {/* socailMedia */}
        <div className='w-screen p-6'>
          <ul className={style.socialIcons}>
            <li>
              <a href='#'>
                <FaLinkedinIn />
              </a>
            </li>
            <li>
              <a href='#'>
                <FaGithub />
              </a>
            </li>
            <li>
              <a href='#'>
                <FaInstagram />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default Footer



