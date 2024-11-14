import Layout from '@/components/Layout'
import React from 'react'

const categories = () => {
    const SaveNewProductCategory = ()=>{
        alert("Saved Successfully !!")
    }
  return (
    <Layout>
        <h1>Categories</h1>
        <form onSubmit={SaveNewProductCategory}>
            <label> New Category Name</label>
            <div className='flex gap-1'>
            <input className='m-0' type="text" placeholder='Enter Category Name ' />
            <button type='submit' className='btn-primary'>Save</button>
            </div>
        </form>
    </Layout>
)
}

export default categories
