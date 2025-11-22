import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store';


const Navbar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.value);
    return (
        <div className='flex gap-4'>
           {isLoggedIn ? "Logout" : "Login"}
        </div>
    )
}

export default Navbar