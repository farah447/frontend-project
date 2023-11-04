import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useOrdersState = () => {
    const { orders, isLoading, error } = useSelector((state: RootState) => state.orderReducer);

    return {
        orders,
        isLoading,
        error
    }
}

export default useOrdersState