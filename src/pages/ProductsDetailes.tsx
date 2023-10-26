import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { findProductById } from "../redux/slices/products/productSlice";

const ProductsDetailes = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { singleProduct, isLoading, error } = useSelector((state: RootState) => state.productR);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(findProductById(Number(id)))
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h2> Product Details </h2>
      {singleProduct && <>
        <img src={singleProduct.image} alt={singleProduct.name} />
        <h3>Name:{singleProduct.name}</h3>
        <p>Description:{singleProduct.description}</p>
        <p>Price: {singleProduct.price} EUR</p>
        <p>Categories: {singleProduct.categories && singleProduct.categories.join(`, `)}</p>
        <p>Sizes: {singleProduct.sizes && singleProduct.sizes.join(`, `)}</p>
        <button onClick={() => {
          navigate("/")
        }}>Back To Home</button>
        <button>Add To Cart</button>
      </>}
    </div>
  )
}

export default ProductsDetailes