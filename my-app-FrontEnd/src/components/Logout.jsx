import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        // Clear all cookies
        Cookies.remove('accessToken', { path: '/' });
        Cookies.remove('refreshToken', { path: '/' });
        Cookies.remove('username', { path: '/' });
        Cookies.remove('agentId', { path: '/' });
        Cookies.remove('role', { path: '/' });
        Cookies.remove('roleId', { path: '/' });

        // Optional: Clear localStorage if needed
        // localStorage.clear();

        // Redirect to Sign In page
        navigate('/signin');
    };

    return logout;
};

export default useLogout;
