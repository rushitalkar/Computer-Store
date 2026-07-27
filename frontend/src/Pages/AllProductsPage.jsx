import React from 'react'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../Components/ProductCard'
import { BarLoader } from 'react-spinners'
import { PackageIcon } from 'lucide-react'

const AllProductsPage = () => {
      const{data : products, isLoading , error} = useProducts()

       if (isLoading) {
    return <BarLoader width={"100%"} color="#36d7b7"/>
  }
    
  if (error) {
    return <div role='alert' className='alert alert-error'>
      <span>Something Went Wrong Please Refesh Page</span>
   </div>
  }
  return (
    <div>
     <h2 className='text-xl font-bold flex items-center gap-2 mb-6'>
          <PackageIcon className="size-5  text-primary"/>
          All Products
        </h2>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {
                    products.map((product)=>{
                    return   <ProductCard  key={product.id} product={product}/>
                    })
                  }
               </div>
               </div>
  )
}

export default AllProductsPage
