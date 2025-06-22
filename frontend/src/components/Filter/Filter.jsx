import React, { useState } from 'react'
import styles from './Filter.module.scss'
import ReactSlider from 'react-slider'
import { useSearchParams } from 'react-router';
import { useSelector } from 'react-redux';

function Filter(){

  const displayTheme = useSelector(state => state.displayTheme)

  const [category, setCategory] = useState('')
  const [minPrice,setMinPrice]=useState(0);
  const [maxPrice,setMaxPrice]=useState(10000);
  const [sortBy, setSortBy] = useState('')
  const [order, setOrder] = useState('')

  const [searchParams,setSearchParams] = useSearchParams()
  
  const handlePriceChange = (value) => {
    setMaxPrice(value[1])
    setMinPrice(value[0])
  }

  const handleInputClick=(e)=>{
    if (e.target.name=='category') setCategory(e.target.value)
    else if (e.target.name=='sortBy') setSortBy(e.target.value)
    else setOrder(e.target.value)
  }

  const handleSubmission=()=>{
    const newParams = new URLSearchParams(searchParams);

    newParams.set('category',category);
    
    newParams.set('minPrice',minPrice);
    newParams.set('maxPrice',maxPrice);
    
    newParams.set('sortBy',sortBy);
    newParams.set('order', order);
    newParams.set('page',1)

    setSearchParams(newParams);
  }

  
  return (
    <div className={`${styles['filterSection']} ${styles[displayTheme]} d-flex flex-column p-3 row-gap-4`}>
      <div className={`${styles['filterHeading']} fs-4 fw-bolder text-center m-2 pb-2`}>Filter</div>

      <details className={`${styles['filterDropDown']} p-2 fs-6`}>
        <summary>Category</summary>
        <label><input type="radio" name='category' onClick={handleInputClick} value="beauty" /> Beauty</label><br/>
        <label><input type="radio" name='category' onClick={handleInputClick} value="fragrances" /> Fragrances</label><br/>
        <label><input type="radio" name='category' onClick={handleInputClick} value="furniture" /> Furniture</label><br/>
        <label><input type="radio" name='category' onClick={handleInputClick} value="groceries" /> Groceries</label>
      </details>

      <details className={`${styles['filterDropDown']} p-2 fs-6`}>
        <summary>Price Range</summary>
        <div className=''>
          <div className={`d-flex justify-content-between`}>
            <span className={`ps-2`}>Min: ${minPrice}</span>
            <span className={`pe-2`}>Max: ${maxPrice}</span>
          </div>
          <ReactSlider
            className={`${styles["horizontal-slider"]} m-0`}
            thumbClassName={`${styles["thumb"]}`}
            trackClassName={`${styles["track"]}`}
            value={[minPrice,maxPrice]}
            min={0}
            max={10000}
            step={10}
            onChange={handlePriceChange}
            withTracks={true}
            pearling
            minDistance={10}
          />
          <div className={`d-flex justify-content-between`}>
            <span className={`ps-2`} style={{fontSize: 0.75+'rem'}}>0</span>
            <span className={`pe-2`} style={{fontSize: 0.75+'rem'}}>10000</span>
          </div>
        </div>
      </details>
      
      <details className={`${styles['filterDropDown']} p-2 fs-6`}>
        <summary>Sort By</summary>
        <label><input type="radio" name='sortBy' onClick={handleInputClick} value="title" /> Name</label><br/>
        <label><input type="radio" name='sortBy' onClick={handleInputClick} value="price" /> Price</label>
      </details>

      <details className={`${styles['filterDropDown']} p-2 fs-6`}>
        <summary>Order</summary>
        <label><input type="radio" name='order' onClick={handleInputClick} value={1} /> Ascending</label><br/>
        <label><input type="radio" name='order' onClick={handleInputClick} value={-1} /> Descending</label>
      </details>

      <button className={`${styles["applyFilterBtn"]} p-2 fw-bolder mb-2`} onClick={handleSubmission}>Apply Filter</button>

    </div>
  )
}

export default Filter