import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { ArrowLeftIcon, SparklesIcon, TypeIcon } from "lucide-react"
import { useCreateProduct } from "../hooks/useProducts"
import { Link } from "react-router-dom"
import { FileTextIcon } from "lucide-react"
import { BarLoader } from "react-spinners"
const CreatePage = () => {
  const navigate = useNavigate()
  const createProduct = useCreateProduct() 
  const [formData, setFormData] = useState({
    title : "",
    description : "",
    imageUrl : "",
  })


  const handleSubmit = (e)=>{
      e.preventDefault()
      createProduct.mutate(formData , {
        onSuccess : ()=>navigate("/")
      })
  }
  return (
    <div>
         <div className="max-w-lg  mx-auto">
             <Link to={"/"} className="btn btn-ghost btn-sm gap-1 mb-4">
                  <ArrowLeftIcon className="size-4"/> Back
             </Link>
   
             <div className="card bg-base-300">
                 <div className="card-body">
                  <h1 className="card-title">
                    <SparklesIcon className="size-5 text-primary"/>
                    New Product
                  </h1>
                  <form  onSubmit={handleSubmit} className="space-y-4 mt-4" action="">
                      <label  className="input input-bordered flex items-baseline gap-2 bg-base-200" >
                        <TypeIcon className="size-4 text-base-content/50"/>
                        <input type="text" 
                         placeholder="Product Title"
                         value={formData.title}
                         onChange={(e)=>setFormData({...formData , title : e.target.value})}
                        className="grow"
                        required
                        />
                      </label>

                      <label  className="input input-bordered flex items-baseline gap-2 bg-base-200" >
                        <TypeIcon className="size-4 text-base-content/50"/>
                        <input type="text" 
                         placeholder="Image Url......"
                         value={formData.imageUrl}
                         onChange={(e)=>setFormData({...formData , imageUrl : e.target.value})}
                        className="grow"
                        required
                        />
                      </label>

                       <div className="form-control">
              <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300">
                <FileTextIcon className="size-4 text-base-content/50 mt-1" />
                <textarea
                  placeholder="Description"
                  className="grow bg-transparent resize-none focus:outline-none min-h-24"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
            </div>

             {createProduct.isError && (
              <div role="alert" className="alert alert-error alert-sm">
                <span>Failed to create. Try again.</span>
              </div>
            )}

            <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={createProduct.isPending}
            >
              {
                createProduct.isPending ? 
                (
                  <BarLoader width={"100%"}/>
                ) :(
                      "Create Product"
                )
              }
            </button>
                  </form>
                 </div>
             </div>

         </div>
    </div>
  )
}

export default CreatePage

