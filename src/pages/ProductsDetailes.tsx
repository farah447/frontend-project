import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts, findProductById } from "../redux/slices/products/productSlice";
import { fetchCategory } from "../redux/categories/categorySlice";

const ProductsDetailes = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { singleProduct, isLoading, error } = useSelector((state: RootState) => state.productR);

  const { categories } = useSelector((state: RootState) => state.categoriesR);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts()).then(() => dispatch(findProductById(Number(id))))
    dispatch(fetchCategory()).then(() => dispatch(findProductById(Number(id))))
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const getCategoryNameById = (CategoryId: number) => {

    const category = categories.find((category) => category.id === CategoryId)
    return category ? category.name + ", " : 'Category not found!'
  }


  return (
    <div>
      <h2> Product Details </h2>
      {singleProduct && <>
        <img src={singleProduct.image} alt={singleProduct.name} />
        <h3>Name:{singleProduct.name}</h3>
        <p>Description:{singleProduct.description}</p>
        <p>Price: {singleProduct.price} EUR</p>
        <p>Categories: {singleProduct.categories && singleProduct.categories.map((CategoryId) => getCategoryNameById(CategoryId))}</p>
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