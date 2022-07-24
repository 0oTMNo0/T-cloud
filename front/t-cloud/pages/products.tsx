import Head from 'next/head'
import React, { useState } from 'react'
import Footer from '../src/layout/Footer'
import Header from '../src/layout/Header'
import { FaSortAmountDownAlt } from 'react-icons/fa'
import { Badge, Dropdown } from 'flowbite-react'
import {MdCancel} from 'react-icons/md'
import CardDefault from '../src/component/CardDefulte'
import CardVip from '../src/component/CardVip'

const products = () => {
  const test=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  const [sortDropdown, setSortDropdown] = useState('گرانترین')
  const [filterCategory, setFilterCategory] = useState<string[]>(['همه'])
  const [filterBrand, setFilterBrand] = useState<string[]>(['all'])
  const [filterSize, setFilterSize] = useState<string[]>(['all'])
  const [filterSex, setFilterSex] = useState<boolean | undefined>(undefined)



  const addFilterSize = (size: string) => {
    if (!filterSize.includes(size)) {
      setFilterSize([...filterSize, size])
      if(filterSize.includes('all')){
        setFilterSize(filterSize.filter(item => item !== 'all'))
      }
    }
  }





  
  const addFilterCategory = (category: string) => {
    if (!filterCategory.includes(category)) {
      setFilterCategory([...filterCategory, category])
      if (filterCategory.includes('همه')) {
        setFilterCategory(filterCategory.filter(item => item !== 'همه'))
      }
    }
  }

  const addFilterBrand = (brand: string) => {
    if (!filterBrand.includes(brand)) {
      setFilterBrand([...filterBrand, brand])
      if (filterBrand.includes('همه')) {
        setFilterBrand(filterBrand.filter(item => item !== 'all'))
      }
    }
    console.log(filterBrand)
  }
  
  return (
    <div>
      <Head>
        <title>T-Cloud</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Header />
      </header>


      <main className='bg-mybackground'>
        <div className='flex justify-between p-6'>
          <div className='flex gap-1 items-center hover:border-myprimary-200 border-[1px] border-mybackground p-1'>
            <Dropdown
              label={<FaSortAmountDownAlt />}
              inline={true}
            >
              <Dropdown.Item onClick={() => {
                setSortDropdown('گرانترین')
              }}>گرانترین</Dropdown.Item>
              <Dropdown.Item onClick={() => {
                setSortDropdown('جدیدترین')
              }}>
                جدیدترین</Dropdown.Item>
              <Dropdown.Item onClick={() => {
                setSortDropdown('ارزان ترین')
              }}>
                ارزان ترین</Dropdown.Item>

            </Dropdown>
            <p>{sortDropdown}</p>
          </div>

          <div className='flex items-center gap-2'>

            <section className='hover:border-myprimary-200 border-[1px] border-mybackground p-1'>
              <Dropdown label='قیمت' inline={true}>
                <Dropdown.Item>
                  {/* <input type='number' placeholder='min' />
                  <input type='number' placeholder='max' /> */}










                </Dropdown.Item>


              </Dropdown>
            </section>

            <section className='hover:border-myprimary-200 border-[1px] border-mybackground p-1'>
              <Dropdown label='جنسیت' inline={true}>
                <Dropdown.Item onClick={() => setFilterSex(true)}>مردانه</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilterSex(false)}>زنانه</Dropdown.Item>
              </Dropdown>
            </section>

            <section className='hover:border-myprimary-200 border-[1px] border-mybackground p-1'>
              <Dropdown label='سایز' inline={true}>
                <Dropdown.Item onClick={() => addFilterSize('s')}>S</Dropdown.Item>
                <Dropdown.Item onClick={() => addFilterSize('m')}>M</Dropdown.Item>
                <Dropdown.Item onClick={() => addFilterSize('l')}>L</Dropdown.Item>
                <Dropdown.Item onClick={() => addFilterSize('xl')}>XL</Dropdown.Item>
                <Dropdown.Item onClick={() => addFilterSize('xxl')}>XXL</Dropdown.Item>
              </Dropdown>
            </section>

              {/* filter brand by dropdown */}
            <section className='hover:border-myprimary-200 border-[1px] border-mybackground p-1'>
              <Dropdown label='برند' inline={true}>
                <Dropdown.Item onClick={() => addFilterBrand('nike')}>nike</Dropdown.Item>
                <Dropdown.Item onClick={() => addFilterBrand('puma')}>puma</Dropdown.Item>
                <Dropdown.Item onClick={() => addFilterBrand('reebok')}>reebok</Dropdown.Item>

              </Dropdown>
            </section>


            {/* filter Category by dropdown */}
            <section className='hover:border-myprimary-200 border-[1px] border-mybackground p-1'>
              <Dropdown label=' دسته بندی' inline={true}>

                <Dropdown.Item onClick={() => addFilterCategory('لباس')}>لباس</Dropdown.Item>

                <Dropdown.Item onClick={() => addFilterCategory('شلوار')}>شلوار</Dropdown.Item>

                <Dropdown.Item onClick={() => addFilterCategory('کفش')}>کفش</Dropdown.Item>

                <Dropdown.Item onClick={() => addFilterCategory('مجلسی')}>مجلسی</Dropdown.Item>

                <Dropdown.Item onClick={() => addFilterCategory('ورزشی')}>ورزشی</Dropdown.Item>

                <Dropdown.Item onClick={() => addFilterCategory('کاپشن')}>کاپشن</Dropdown.Item>

              </Dropdown>
            </section>

          </div>
        </div>
        <div className='flex justify-end px-6 gap-1 pb-4'>
        {
          filterCategory.map(item => {
            if(item !== 'همه')
            return (<button onClick={()=>{
              setFilterCategory(filterCategory.filter(item2 => item2 !== item))
            }}><Badge color="purple"><div className='flex justify-between items-center'><MdCancel/>{item}</div></Badge></button>)
        })}
        {
          filterBrand.map(item => {
            if(item !== 'all')
            return (<button onClick={()=>{
              setFilterBrand(filterBrand.filter(item2 => item2 !== item))
            }}><Badge color="purple"><div className='flex justify-between items-center'><MdCancel/>{item}</div></Badge></button>)
        })}
        {
          filterSize.map(item => {
            if(item !== 'all')
            return (<button onClick={()=>{
              setFilterSize(filterSize.filter(item2 => item2 !== item))
            }}><Badge color="purple"><div className='flex justify-between items-center'><MdCancel/>{
              item === 's' ? 'S' :
              item === 'm' ? 'M' :
              item === 'l' ? 'L' :
              item === 'xl' ? 'XL' :
              item === 'xxl' ? 'XXL' :
              item
            }</div></Badge></button>)
        })}
        {
          filterSex !== undefined ?
          <button onClick={()=>{
            setFilterSex(undefined)
          }
          }><Badge color="purple"><div className='flex justify-between items-center'><MdCancel/>{filterSex ? 'زنانه' : 'مردانه'}</div></Badge></button>
          : null
        }
        
        </div>

        <div className='grid grid-cols-3 md:grid-cols-4'>
          {
            test.map(item =>{
              return(
                <div className='flex justify-center items-center mb-4' dir='rtl'>
                  <CardVip
              brand='nike'
              label='dress'
              price={10}
              size={['S', 'M', 'L', 'XL']}
              url='https://is4.revolveassets.com/images/up/2022/July/071122_rw_shops_weddingshop_r.jpg'
              rate={4}
            />
                </div>

              )
            })
          }
        </div>

      </main>


      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default products
