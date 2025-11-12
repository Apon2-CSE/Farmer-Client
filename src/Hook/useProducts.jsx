import  Axios  from "axios";
import { useEffect, useState } from "react"

const useProduct=()=>{
    const [products , setProducts]=useState([]);
     const [loading , setLoading]=useState(true);
      const [error , setError]=useState(null);
      

      
      useEffect(()=>{
        Axios.get('http://localhost:3000/crops')
       .then(data => setProducts(data.data))
            .catch(err=>setError(err))
            .finally(()=>setLoading(false))
      },[])
      return {products, loading,error}
    
}
export default useProduct