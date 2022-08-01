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
import { Menu, RangeSlider } from '@mantine/core';
import {IoIosArrowDown} from 'react-icons/io'


import { useRouter } from 'next/router'

interface Iproduct{
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

  const test:Iproduct[]=[]

  const { query } = useRouter()
  const mypath = useRouter()
  //const test =useRouter()
   // if(query.category) {
  //   addFilterCategory(query.category)
  // }


  const dispatch = useDispatch()
  const productList = useSelector((state: any) => state.product.product)
  const categoryList = useSelector((state: any) => state.product.category)

  const [allBrand, setAllBrand] = useState<string[]>([])
  const [allSize, setAllSize] = useState<string[]>([])
  const [pageSize, setPageSize] = useState(20)
  const [rangeFilter, setRangeFilter] = useState<[number, number]>([0,100])
  const [productListFilter, setProductListFilter] = useState<Iproduct[]>([])


  const [sortDropdown, setSortDropdown] = useState('گرانترین')
  const [filterCategory, setFilterCategory] = useState<string[]>(['ALL'])
  const [filterBrand, setFilterBrand] = useState<string[]>(['ALL'])
  const [filterSize, setFilterSize] = useState<string[]>(['ALL'])
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







  useEffect(() => {
     setProductListFilter(productList)
    //find category id by name
    let categoryId:number[] = []
    categoryList?.map((category: any) => {
      if (filterCategory.includes(category.name)) {
        categoryId.push(category.id)
      }
    })
    //filter product by category
    if(categoryId.length >0){
      setProductListFilter(productListFilter.filter((product: any) => {
        if (categoryId.includes(product.category)) {
          return product
        }
      }))
    }
    //filter product by brand
    if(filterBrand[0] !== 'ALL'){
      setProductListFilter(productListFilter.filter((product: any) => {
        if (filterBrand.includes(product.description)) {
          return product
        }
      }))
    }
    //filter product by size
    if(filterSize[0] !== 'ALL'){
      // setProductListFilter(productListFilter.filter((product: any) => {
      //   if (filterSize.includes(product.options)) {
      //     return product
      //   }
      // }
      // ))

      filterSize.forEach((size: string) => {
        let mytest=productListFilter.filter((product: any) => {
          if (product.options.includes(size.toUpperCase())) {
            return product
          }
        }
        )
      })
      setProductListFilter(test)

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
    //setSortDropdown(sortDropdown)
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
    },[sortDropdown])
      

    

  const addFilterSize = (size: string) => {
    if (!filterSize.includes(size)) {
      if (filterSize.includes('ALL')) {
        const filterSizes = filterSize.filter(item => item !== 'ALL')
        setFilterSize([...filterSizes, size])
      }else{
        setFilterSize([...filterSize, size])
      }
    }
  }


  function addFilterCategory (category: any)  {
    let searchparam = new URLSearchParams(window.location.search)
    if (!filterCategory.includes(category)) {
      if (filterCategory.includes('ALL')) {
        const filterCategories = filterCategory.filter(item => item !== 'ALL')
        setFilterCategory([...filterCategories, category])
      searchparam.delete('category')
      searchparam.set('category', category)
      mypath.push({
        pathname: 'product',
        search: searchparam.toString()
      })
      }else{
      searchparam.delete(
        'category'
      )
      searchparam.set('category', category)
      mypath.push({
        pathname: 'product',
        search: searchparam.toString()
      })
      setFilterCategory([...filterCategory, category])}
    }
  }


  const addFilterBrand = (brand: string) => {
    if (!filterBrand.includes(brand)) {
      setFilterBrand([...filterBrand, brand])
      if (filterBrand.includes('ALL')) {
        const filterBrands = filterBrand.filter(item => item !== 'ALL')
        setFilterBrand([...filterBrands, brand])
      }else{
        setFilterBrand([...filterBrand, brand])
      }
    }
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
            <p className='text-sm'>{sortDropdown}</p>
          </div>

          <div className='flex items-center gap-2'>
            <section className='hover:border-myprimary-200 border-[1px] border-mybackground p-1 z-10'>
              <Menu width={300}>
                <Menu.Target>
                  <button className='flex gap-2 items-center text-sm'>قیمت<IoIosArrowDown/></button>
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
                    ]}/>
                  </Menu.Item>
                  <Menu.Label></Menu.Label>
                </Menu.Dropdown>
              </Menu>
            </section>




            <section className='hover:border-myprimary-200 border-[1px] border-mybackground p-1 z-10 text-sm'>
              <Dropdown label='جنسیت' inline={true}>
                <Dropdown.Item onClick={() => setFilterSex(true)}>مردانه</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilterSex(false)}>زنانه</Dropdown.Item>
              </Dropdown>
            </section>

            
            <section className='hover:border-myprimary-200 border-[1px] border-mybackground p-1 z-10 text-sm'>
              <Dropdown label='سایز' inline={true}>
                {
                  allSize.map((size: string) => {
                    if (size !== 'ALL') {
                      return <Dropdown.Item onClick={() => {addFilterSize(size)}}>{size}</Dropdown.Item>
                    }
                  })
                }
              </Dropdown>
            </section>

            {/* filter brand by dropdown */}
            <section className='hover:border-myprimary-200 border-[1px] border-mybackground p-1 z-10 text-sm'>
              <Dropdown label='برند' inline={true}>
                {
                  allBrand?.map((item: string) => {
                    return (
                      <Dropdown.Item onClick={() => addFilterBrand(item)}>{item}</Dropdown.Item>
                    )
                  })
                }
              </Dropdown>
            </section>


            {/* filter Category by dropdown */}
            <section className='hover:border-myprimary-200 border-[1px] border-mybackground p-1 z-10 text-sm'>
              <Dropdown label=' دسته بندی' inline={true}>
                {
                  categoryList?.map((category: any) => {
                    return <Dropdown.Item onClick={() => addFilterCategory(category.name)}>{category.name}</Dropdown.Item>
                  })
                }
              </Dropdown>
            </section>

          </div>
        </div>
        <div className='flex justify-end px-6 gap-1 pb-4'>
          {
            filterCategory.map(item => {
              if (item !== 'ALL')
                return (<button onClick={() => {
                  setFilterCategory(filterCategory.filter(item2 => item2 !== item))
                  if(filterCategory.length === 0){
                    setFilterCategory(['ALL'])
                  }
                }}><Badge color="purple"><div className='flex justify-between items-center'><MdCancel />{item}</div></Badge></button>)
            })}
          {
            filterBrand.map(item => {
              if (item !== 'ALL')
                return (<button onClick={() => {
                  setFilterBrand(filterBrand.filter(item2 => item2 !== item))
                  if (filterBrand.length === 0) {
                    setFilterBrand(['ALL'])
                    console.log(filterBrand)
                  }
                }}><Badge color="purple"><div className='flex justify-between items-center'><MdCancel />{item}</div></Badge></button>)
            })}
          {
            filterSize.map(item => {
              if (item !== 'ALL')
                return (<button onClick={() => {
                  setFilterSize(filterSize.filter(item2 => item2 !== item))
                  if(filterSize.length === 0){
                    setFilterSize(['ALL'])
                  }
                }}><Badge color="purple"><div className='flex justify-between items-center'><MdCancel />{
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
              <button onClick={() => {
                setFilterSex(undefined)
              }
              }><Badge color="purple"><div className='flex justify-between items-center'><MdCancel />{filterSex ? 'مردانه':'زنانه'}</div></Badge></button>
              : null
          }

        </div>

        <div className='grid grid-cols-3 md:grid-cols-4'>
          {
            productListFilter?.slice(0, pageSize).map((item: any) => {
              return (
                <div className='flex justify-center items-center mb-4 z-0' dir='rtl'>
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
              <Button size='xl' color='purple' onClick={()=>{
                if((pageSize+20)<productList.length){
                  setPageSize(pageSize+20)
                }else{
                  setPageSize(productList.length)
                }
              }}>...بیشتر</Button>
            ):null
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