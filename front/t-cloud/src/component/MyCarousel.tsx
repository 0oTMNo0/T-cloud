import React from 'react'
import { Carousel  } from 'flowbite-react'

const MyCarousel = () => {
    return (
      <div className="h-96 sm:h-96 xl:h-80 2xl:h-96">
      <Carousel slideInterval={5000}>
        <img
          src="https://cdn.vox-cdn.com/thumbor/5Dj_nH1hfcjTomLIQ5MZAVy82q0=/393x201:3499x2531/1200x675/filters:focal(393x201:3499x2531)/cdn.vox-cdn.com/uploads/chorus_image/image/50343001/lookbook_phase_6.0.0.jpg"
          alt="..."
          className='w-full h-full object-cover'
        />
        <img
          src="https://images7.alphacoders.com/702/702170.jpg"
          alt="..."
          className='w-full h-full object-cover'
        />
        <img
          src="https://wallpaper.dog/large/10897214.jpg"
          alt="..."
          className='w-full h-full object-cover'
        />
      </Carousel>
    </div>
    )
}

export default MyCarousel
