import {useNavigate , useParams ,  Link} from "react-router-dom"
import {useAuth} from "@clerk/react"
import { useProduct , useUpdateProduct } from "../hooks/useProducts"
import {BarLoader} from "react-spinners"
import EditProductFrom from "../Components/EditProductFrom"
const EditProductPage = () => {
  const {id} = useParams()
  const { userId} = useAuth()
  const naviagate = useNavigate()

  const { data : product , isLoading } = useProduct(id)
  const updateProduct = useUpdateProduct()

    if (isLoading) {
      return <BarLoader width={"100%"} color="#36d7b7"/>
    }

    if (!product || product.userId !== userId) {
      return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">{!product ? "Not found" : "Access denied"}</h2>
          <Link to="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    );
    }
  return (
    <EditProductFrom
       product={product}
       isPending={updateProduct.isPending}
       isError={updateProduct.isError}
       onSubmit={(formData)=>{
        updateProduct.mutate({id , ...formData},
          {
            onSuccess : ()=> naviagate(`/product/${id}`)
          }
        )
       }}
    />
  )
}

export default EditProductPage
