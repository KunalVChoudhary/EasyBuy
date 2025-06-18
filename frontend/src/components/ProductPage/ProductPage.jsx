import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import styles from './ProductPage.module.scss';
import ProductCard from '../ProductCard/ProductCard'
import Pagination from '../Pagination/Pagination';

function ProductPage() {

  const [searchParams,setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(searchParams.get('page') || 1)
  const [totalPages, setTotalPages]= useState(1)


  useEffect(() => {
    const query = searchParams.toString();
    fetch(`${import.meta.env.VITE_API_URL}/products?${query}`,{
      method:'GET',credentials:'include'
    })
      .then(res => res.json())
      .then(data => {
        setProducts(data.products)
        setCurrentPageNo(data.currentPage)
        setTotalPages(data.totalPages)
      })
    }, [searchParams]);


    return (
      <div className={`${styles['productListContainer']} p-3` }>
        <div className={`${styles['productCardContainer']} p-3`}>
          {products.map((element,index)=>{
            return <ProductCard key={element.productId} productDetail={element}/>
          })}
        </div>
        <div className={`d-flex justify-content-center`}>
          <Pagination props={{currentPageNo, totalPages, searchParams, setSearchParams}}/>        
        </div>
      </div>
    )
  }

export default ProductPage