import Layout from '@/components/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const deletePage = () => {
    const router = useRouter()
    const [productInfo, setProductInfo] = useState("")
    const {id} = router?.query 

    const getProductInfo = async()=>{
        const response = await axios.get(`/api/products?id=${id}`)
        setProductInfo(response?.data)
    }
    const goBack = ()=>{
        router.push("/products")
    }

    const deleteProduct = async()=>{
       await axios.delete(`/api/products?id=${id}`)
       goBack()
    }

    useEffect(()=>{
        if(id){
            getProductInfo()
        }else{
            return 
        }
    },[id])
  return (
 <Layout>
    <h1 className='text-center'>Do you really wanna delete &nbsp;"{productInfo?.title}"</h1>
    <div className='flex gap-1 justify-center'>
        <button className='btn-default' onClick={deleteProduct}>YES</button>
        <button className= 'btn-return'onClick={goBack}>NO</button>
    </div>
 </Layout>
  )
}

export default deletePage
