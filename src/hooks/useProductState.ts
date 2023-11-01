import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useProductState = () => {
    const { products, isLoading, error, singleProduct, searchTerm } = useSelector((state: RootState) => state.productR);

    return {
        products,
        error,
        isLoading,
        singleProduct,
        searchTerm,
    }
}

export default useProductState