import React, { useState } from 'react'
import styles from './SearchBar.module.scss'
import { useSearchParams } from 'react-router'

function SearchBar() {
    const [searchParams,setSearchParams] = useSearchParams()
    const [searchInputValue, setSearchInputValue] = useState('')

    

    const handleSubmission=()=>{
        const newParams = new URLSearchParams();
        newParams.set('search',searchInputValue)

        if (searchInputValue){
            newParams.set('search',searchInputValue)
        };

        setSearchParams(newParams)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
        e.preventDefault();
        e.target.blur() 
        handleSubmission();
        }
    };

    const handleButtonSubmission=(e)=>{
        e.preventDefault();
        e.target.blur() 
        handleSubmission();
    }


  return (
    <>
        <input className={`${styles["search-input-box"]} form-control fs-5 px-2 py-1`} type="search" name="productSearch" id="prductSearch" placeholder='Search Product . . .' value={searchInputValue} onChange={(e)=>{setSearchInputValue(e.target.value)}} onKeyDown={handleKeyDown} />
        <button class={`${styles['search-input-btn']} btn btn-outline-secondary m-0 px-1 py-2`} type="button" id="button-addon1"><img src="images/search-icon.png" alt="enter" onClick={handleButtonSubmission} /></button>
    </>

  )
}

export default SearchBar