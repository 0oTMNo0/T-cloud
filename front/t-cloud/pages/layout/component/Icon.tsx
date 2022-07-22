
import { type } from 'os'
import React from 'react'
import  style  from '../../../styles/Icon.module.css'


const Icon = () => {
  return (
    <div>
    <span className='text-[5rem]'>T</span>
      <div className={style.container}>
        <span className={style.topLeft}></span>
        <span className={style.bottomLeft}></span>
        <span className={style.middleTop}></span>
        <span className={style.rightTop}></span>
        <span className={style.rightBottom}></span>
      </div>
    </div>
  )
}

export default Icon
