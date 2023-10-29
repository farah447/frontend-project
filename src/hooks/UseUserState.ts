import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const UseUserState = () => {
    const { users, isLoading, isLoggedIn, error, userData, searchTerm, ban } = useSelector((state: RootState) => state.UsersR);

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

export default UseUserState