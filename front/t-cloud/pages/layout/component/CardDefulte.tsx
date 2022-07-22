import React from 'react'


type myCardProps = {
    brand: string
    url: string
    label: string
    price: number
    size: string[]
  }

    const CardDefault = (props: myCardProps) => {
        return (
            <div className="card">
                <div className="card-image">
                    <img src={props.url} alt={props.brand} />
                </div>
                <div className="card-content">
                    <p className="card-title">{props.label}</p>
                    <p className="card-price">{props.price}</p>
                    <p className="card-size">{props.size}</p>
                </div>
            </div>
        )

    }

    export default CardDefault
// const CardDefulte = ({
//     url,
//     label,
//     brand,
//     price,
//   }:myCardProps) => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default CardDefulte
