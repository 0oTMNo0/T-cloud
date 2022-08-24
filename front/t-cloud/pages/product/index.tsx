import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Footer from '../../src/layout/Footer'
import Header from '../../src/layout/Header'
import { FaSortAmountDownAlt } from 'react-icons/fa'
import { Badge, Button, Dropdown } from 'flowbite-react'
import { MdCancel } from 'react-icons/md'
import CardDefault from '../../src/component/CardDefulte'
import CardVip from '../../src/component/CardVip'
import CardHelp from '../../src/component/CardHelp'
import Cardoffer from '../../src/component/CardOffer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, fetchProducts } from '../../src/redux/slice/productSlice'
import { Menu, Notification, RangeSlider } from '@mantine/core';
import { IoIosArrowDown } from 'react-icons/io'


import { useRouter } from 'next/router'

interface Iproduct {
  id: number;
  attributes: string;
  category: number;
  description: string;
  extra_information: string;
  featured: boolean;
  final_price: string;
  images: string[];
  main_image: string;
  name: string;
  options: string[];
  price: string;
  remaining: number;
  slug: string | null;
}
const products = () => {

  // const test: Iproduct[] = []

  const { query } = useRouter()
  const mypath = useRouter()


  const dispatch = useDispatch()
  const productList = useSelector((state: any) => state.product.product)
  const categoryList = useSelector((state: any) => state.product.category)

  const [allBrand, setAllBrand] = useState<string[]>([])
  const [allSize, setAllSize] = useState<string[]>([])
  const [pageSize, setPageSize] = useState(20)
  const [rangeFilter, setRangeFilter] = useState<[number, number]>([0, 100])

  const [productListFilter, setProductListFilter] = useState<Iproduct[]>([])

  const [sortDropdown, setSortDropdown] = useState('گرانترین')
  const [filterCategory, setFilterCategory] = useState<string>('ALL')
  const [filterBrand, setFilterBrand] = useState<string>('ALL')
  const [filterSize, setFilterSize] = useState<string>('ALL')
  const [filterSex, setFilterSex] = useState<boolean | undefined>(undefined)


  useEffect(() => {
    dispatch((fetchProducts()))
    dispatch((fetchCategories()))
  }, [])

  useEffect(() => {
    productList?.map((product: any) => {
      if (!allBrand.includes(product.description)) {
        allBrand.push(product.description)
      }
    }
    )
    productList?.map((product: any) => {
      product.options?.map((option: any) => {
        if (!allSize.includes(option)) {
          allSize.push(option)
        }
      })
    })
    //check if productList is fetched
    if(productList&&productList.length>0) {
      if(query.category) {
        addFilterCategory(query.category)
      }}
  }, [productList])


  function fullmyDATA() {
    setProductListFilter(productList)
  }
  
  useEffect(() => {
     setProductListFilter(productList)
    //find category id by name
    let categoryId:number | undefined = undefined
    categoryList?.map((category: any) => {
      if (filterCategory.includes(category.name)) {
        categoryId=category.id
      }
    })
    //filter product by category
    if(categoryId !== undefined) {
      setProductListFilter(productListFilter.filter((product: any) => product.category === categoryId))
    }
    //filter product by brand
    if(filterBrand !== 'ALL'){
      setProductListFilter(productListFilter.filter((product: any) => product.description === filterBrand))
    }
    //filter product by size
    if(filterSize !== 'ALL'){
      setProductListFilter(productListFilter.filter((product: any) => product.options?.includes(filterSize)))
    }
    //filter product by sex
    if(filterSex !==undefined)
    {
      setProductListFilter(productListFilter.filter((products:any)=>
        products.featured == filterSex
      ))
    }
    //filter product by range
    if(rangeFilter[0] !== 0 || rangeFilter[1] !== 100){
      setProductListFilter(productListFilter.filter((product: any) => {
        if (parseInt(product.final_price) >= rangeFilter[0] && parseInt(product.final_price) <= rangeFilter[1]) {
          return product
        }
      }
      ))
    }
    setSortDropdown(sortDropdown)
  }, [productList, rangeFilter, filterCategory, filterBrand, filterSize, filterSex])

  useEffect(() => {
    let productListSort = [...productListFilter]
    switch (sortDropdown) {
      case 'گرانترین':
        setProductListFilter(productListSort.sort((a: any, b: any) => {
          return b.final_price - a.final_price
        }
        ))
        break;
      case 'ارزان ترین':
        setProductListFilter(productListSort.sort((a: any, b: any) => {
          return a.final_price - b.final_price
        }
        ))
        break;
      case 'نام':
        setProductListFilter(productListSort.sort((a: any, b: any) => {
          if (a.description < b.description) {
            return -1
          } else if (a.description > b.description) {
            return 1
          } else {
            return 0
          }
        }))
        break;
      case 'جدیدترین':
        setProductListFilter(productListSort.sort((a: any, b: any) => {
          return b.id - a.id
        }
        ))
    }
  }, [sortDropdown])



  const addFilterSize = (size: string) => {
    let searchparam = new URLSearchParams(window.location.search)
    searchparam.delete('size')
    searchparam.set('size', size)
    mypath.push({
      pathname: 'product',
      search: searchparam.toString()
    })
    fullmyDATA()
    setFilterSize(size)
  }

  function addFilterCategory (category: any)  {
    let searchparam = new URLSearchParams(window.location.search)
    searchparam.delete('category')
    searchparam.set('category', category)
    mypath.push({
      pathname: 'product',
      search: searchparam.toString()
    })
    fullmyDATA()
    setFilterCategory(category)
  }


  const addFilterBrand = (brand: string) => {
    let searchparam = new URLSearchParams(window.location.search)
    searchparam.delete('brand')
    searchparam.set('brand', brand)
    mypath.push({
      pathname: 'product',
      search: searchparam.toString()
    })
    fullmyDATA()
    setFilterBrand(brand)
  }


  return (
    <>
      <Head>
        <title>T-Cloud</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />

      <main className='bg-mybackground font-IR'>
        <div className='flex justify-between py-6 md:px-6'>
          <div className='flex gap-1 items-center hover:border-myprimary-200 border-[1px] border-mybackground p-1 z-10'>
            <Dropdown
              label={<FaSortAmountDownAlt />}
              inline={true}
            >
              <Dropdown.Item onClick={() => {
                setSortDropdown('گرانترین')
              }}>گرانترین</Dropdown.Item>
              <Dropdown.Item onClick={() => {
                setSortDropdown('نام')
              }}>
                نام</Dropdown.Item>
              <Dropdown.Item onClick={() => {
                setSortDropdown('ارزان ترین')
              }}>
                ارزان ترین</Dropdown.Item>
              <Dropdown.Item onClick={() => {
                setSortDropdown('جدیدترین')
              }}>
                جدیدترین</Dropdown.Item>
            </Dropdown>
            <p className='hidden md:block'>{sortDropdown}</p>
          </div>

          <div className='flex items-center gap-2'>
            <section className='hover:border-myprimary-200 border-[1px] border-mybackground p-1 z-10'>
              <Menu width={300}>
                <Menu.Target>
                  <button className='flex gap-2 items-center text-xs sm:text-sm'>قیمت<IoIosArrowDown /></button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>محدوده ی قیمت</Menu.Label>
                  <Menu.Item>
                    <RangeSlider color="dark" thumbSize={14} defaultValue={[1, 100]}
                      value={rangeFilter}
                      onChange={setRangeFilter}
                      size='xs'
                      marks={[
                        { value: 10, label: '10MT' },
                        { value: 30, label: '30MT' },
                        { value: 50, label: '50MT' },
                        { value: 70, label: '70MT' },
                        { value: 90, label: '90MT' },
                      ]} />
                  </Menu.Item>
                  <Menu.Label></Menu.Label>
                </Menu.Dropdown>
              </Menu>
            </section>


            {/* <section className='hover:border-myprimary-200 border-[1px] border-mybackground p-1 z-10 text-xs sm:text-sm'>
              <Dropdown label='جنسیت' inline={true} size="sm" >
                <Dropdown.Item onClick={() => setFilterSex(true)}>مردانه</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilterSex(false)}>زنانه</Dropdown.Item>
              </Dropdown>
            </section> */}

            <section className='hover:border-myprimary-200 border-[1px] border-mybackground p-1 z-10 text-xs sm:text-sm'>
              <Menu width={80}>
                <Menu.Target>
                  <button className='flex gap-2 items-center text-xs sm:text-sm'>جنسیت<IoIosArrowDown /></button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>
                    <button className='text-center w-full h-full' onClick={() => {setFilterSex(true)}}>مردانه</button>
                  </Menu.Item>
                  <Menu.Item>
                    <button className='text-center w-full h-full' onClick={() => setFilterSex(false)}>زنانه</button>
                  </Menu.Item>
                  </Menu.Dropdown>
              </Menu>
            </section>
            {/* //////////////// */}

          

            {/* <section className='hover:border-myprimary-200 border-[1px] border-mybackground p-1 z-10 text-xs sm:text-sm'>
              <Dropdown label='سایز' inline={true} size="sm">
                {
                  allSize.map((size: string) => {
                    if (size !== 'ALL') {
                      return <Dropdown.Item onClick={() => { addFilterSize(size) }}>{size}</Dropdown.Item>
                    }
                  })
                }
              </Dropdown>
            </section> */}

            <section className='hover:border-myprimary-200 border-[1px] border-mybackground p-1 z-10 text-xs sm:text-sm'>
              <Menu width={80}>
                <Menu.Target>
                  <button className='flex gap-2 items-center text-xs sm:text-sm'>سایز<IoIosArrowDown /></button>
                </Menu.Target>
                <Menu.Dropdown>
                  {

                    allSize.map((size: string) => {
                      if (size !== 'ALL') {
                        return <Menu.Item>
                          <button className='text-center w-full h-full' onClick={() => { addFilterSize(size) }}>{size}</button>
                        </Menu.Item>
                      }
                    }
                    )
                  }
                </Menu.Dropdown>
              </Menu>
            </section>

            {/* filter brand by dropdown */}
            {/* <section className='hover:border-myprimary-200 border-[1px] border-mybackground p-1 z-10 text-xs sm:text-sm'>
              <Dropdown label='برند' inline={true} size="sm">
                {
                  allBrand?.map((item: string) => {
                    return (
                      <Dropdown.Item
                        onClick={() => addFilterBrand(item)}
                      >{item}</Dropdown.Item>
                    )
                  })
                }
              </Dropdown>
            </section> */}


            <section className='hover:border-myprimary-200 border-[1px] border-mybackground p-1 z-10 text-xs sm:text-sm'>
             <Menu width={200}>
                <Menu.Target>
                  <button className='flex gap-2 items-center text-xs sm:text-sm'>برند<IoIosArrowDown /></button>
                </Menu.Target>
                <Menu.Dropdown>
                  {
                    allBrand?.map((item: string) => {
                      return (
                        <Menu.Item>
                          <button className='text-center w-full h-full' onClick={() => addFilterBrand(item)}>{item}</button>
                        </Menu.Item>
                      )})
                  }
                </Menu.Dropdown>
              </Menu>
            </section>

            {/* filter Category by dropdown */}


            
            {/* <section className='hover:border-myprimary-200 border-[1px] border-mybackground p-1 z-10 text-xs sm:text-sm'>
              <Dropdown label='دسته بندی' inline={true} size="sm">
                {
                  categoryList?.map((category: any) => {
                    return <Dropdown.Item
                    onClick={() => {addFilterCategory(category.name)}}
                    >{category.name}</Dropdown.Item>
                  })
                }
              </Dropdown>
            </section> */}


            <section className='hover:border-myprimary-200 border-[1px] border-mybackground p-1 z-10 text-xs sm:text-sm'>
              <Menu width={100}>
                <Menu.Target>
                  <button className='flex gap-2 items-center text-xs sm:text-sm'>دسته بندی<IoIosArrowDown /></button>
                </Menu.Target>
                <Menu.Dropdown>
                  {
                    categoryList?.map((category: any) => {
                      return (
                        <Menu.Item>
                          <button className='text-center w-full h-full' onClick={() => {addFilterCategory(category.name)}}>{category.name}</button>
                        </Menu.Item>
                      )
                    }
                    )
                  }
                </Menu.Dropdown>
              </Menu>
            </section>







          </div>

        </div>


        <div className='flex justify-end px-6 gap-1 pb-4'>
          {
            filterCategory !== 'ALL' ?
            (<button onClick={()=>{
              setFilterCategory('ALL')
              let searchparam = new URLSearchParams(window.location.search)
              searchparam.delete('category')
              searchparam.set('category', 'ALL')
              mypath.push({
                pathname: 'product',
                search: searchparam.toString()
              })
            }}><Badge color="purple"><div className='flex justify-between items-center'><MdCancel />{filterCategory}</div></Badge></button>):null
          }

          {
            filterBrand !== 'ALL' ?
              (<button onClick={() => {
                setFilterBrand('ALL')
                let searchparam = new URLSearchParams(window.location.search)
                searchparam.delete('brand')
                searchparam.set('brand', 'ALL')
                mypath.push({
                  pathname: 'product',
                  search: searchparam.toString()
                })
              }}><Badge color="purple"><div className='flex justify-between items-center'><MdCancel />{filterBrand}</div></Badge></button>) : null}
          {
            filterSize !== 'ALL' && <button onClick={() => {
              let searchparam = new URLSearchParams(window.location.search)
              searchparam.delete('size')
              searchparam.set('size', 'ALL')
              mypath.push({
                pathname: 'product',
                search: searchparam.toString()
              })
              setFilterSize('ALL')
            }
            }><Badge color="purple"><div className='flex justify-between items-center'><MdCancel />{filterSize}</div></Badge></button>
          }
          {
            filterSex !== undefined ?
              <button onClick={() => {
                setFilterSex(undefined)
              }
              }><Badge color="purple"><div className='flex justify-between items-center'><MdCancel />{filterSex ? 'مردانه' : 'زنانه'}</div></Badge></button>
              : null
          }

        </div>

        

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'>
          {
            productListFilter?.slice(0, pageSize).map((item: any,index:number) => {
              return (
                <div className='flex justify-center items-center mb-4 z-0' dir='rtl' key={index}>
                  {
                    item.slug === 'vip' ?
                      (
                        <CardVip
                          id={item.id}
                          brand={item.description}
                          label={item.name}
                          price={item.price}
                          size={(item.options.filter((item2: string) => item2 !== 'ALL'))}
                          url={item.main_image}
                          rate={4}
                        />
                      ) : item.slug === 'help' ?
                        (
                          <CardHelp
                            id={item.id}
                            brand={item.description}
                            label={item.name}
                            price={item.price}
                            size={(item.options.filter((item2: string) => item2 !== 'ALL'))}
                            url={item.main_image}
                            rate={4}
                          />
                        ) : item.slug === 'off' ?
                          (
                            <Cardoffer
                              id={item.id}
                              oldPrice={item.price}
                              brand={item.description}
                              label={item.name}
                              price={item.final_price}
                              size={(item.options.filter((item2: string) => item2 !== 'ALL'))}
                              url={item.main_image}
                              rate={4}
                            />
                          ) : (
                            <CardDefault
                              id={item.id}
                              brand={item.description}
                              label={item.name}
                              price={item.price}
                              size={(item.options.filter((item2: any) => item2 !== 'ALL'))}
                              url={item.main_image}
                              rate={4}
                            />
                          )
                  }

                </div>
              )
            })
          }

        </div>



        
        <div className='w-full flex justify-center items-center mt-6'>
          {
            productList?.length !== pageSize ?
              (
                <Button size='xl' color='purple' onClick={() => {
                  if ((pageSize + 20) < productList.length) {
                    setPageSize(pageSize + 20)
                  } else {
                    setPageSize(productList.length)
                  }
                }}>...بیشتر</Button>
              ) : null
          }
        </div>

      </main>

    
        <Footer />
    </>
  )
}

export default products
