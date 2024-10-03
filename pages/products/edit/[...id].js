import Layout from '@/components/Layout'
import ProductForm from '@/components/ProductForm';
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const productEdit = () => {
  const router = useRouter();
  const {id} = router.query
  const [productInfo, setProductInfo] = useState(null)
  console.log('productData by Id', productInfo)

  const getProductDetailsById = async(id)=>{
    const response = await axios.get(`/api/products?id=${id}`)
    setProductInfo(response.data)
  }

  useEffect(()=>{
    if(id){
      getProductDetailsById(id)
    }
    else{
      return
    }
  },[id])
  return (
   <Layout>
    <h1>Edit Product</h1>
    {productInfo && (
      <ProductForm {...productInfo} />
    )}
   </Layout>
  )
}

export default productEdit
