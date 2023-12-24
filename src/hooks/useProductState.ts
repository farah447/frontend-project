import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useProductState = () => {
    const { products, isLoading, error, singleProduct, searchTerm, pagination } = useSelector((state: RootState) => state.productReducer);

    return {
        products,
        error,
        pagination,
        isLoading,
        singleProduct,
        searchTerm,
    }
}

export default useProductState