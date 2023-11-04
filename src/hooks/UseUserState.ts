import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useUserState = () => {
    const { users, isLoading, isLoggedIn, error, userData, searchTerm, ban } = useSelector((state: RootState) => state.usersReducer);

    return {
        users,
        isLoading,
        error,
        searchTerm,
        isLoggedIn,
        userData,
        ban
    }
}

export default useUserState