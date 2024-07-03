
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        fetch("/api/auth/logout").catch((err) => {
            console.error(err);
        })
        localStorage.removeItem('user-token');
        deleteCookie('auth-token');
        navigate('/login');
    }, [])

    function deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    return (
        <></>
    )
}