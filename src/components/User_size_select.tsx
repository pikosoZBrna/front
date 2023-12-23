import { useState } from "react"

import {ProductSize} from "../interfaces/Product"

export default function User_size_select(props: {sizes: Array<ProductSize>, on_change: Function}){

    const [size, set_size] = useState<ProductSize>()
    const [options, set_options] = useState<Array<number>>()

    var handle_change = (size_data: ProductSize) => {

        let amouts: Array<number> = []

        for (let index = 1; index <= size_data.current_amount; index++) {
            amouts.push(index)   
        }

        set_size({size: size_data.size, current_amount: size_data.current_amount})
        set_options(amouts)

        props.on_change({size: size_data.size, current_amount: size_data.current_amount})
    }

    return(
        <>
            {props.sizes.map((size_data: ProductSize) => 
                <div key={size_data.size}>
                    <label htmlFor={size_data.size}>{size_data.size}</label>
                    <input id={size_data.size} className='product_size_user' type="radio" name='size_radio' value={size_data.size} onChange={() => handle_change(size_data)}></input>
                </div>
            )}

            {size && options ? 
                <select id={"size_count_select"} onChange={() => props.on_change({size: size.size, current_amount: size.current_amount})}>
                        {options.map((num: number) => 
                            <option key={num.toString()} value={num}>{num}</option>
                        )}
                </select>
            :
                <select id={"size_count_select"}>
                    <option>choose size</option>        
                </select>
            }
        </>
    )
}