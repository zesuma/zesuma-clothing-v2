import { Outlet, Link } from 'react-router-dom'

import { ReactComponent as ZesumaLogo } from '../../assets/crown.svg'
import './navigation.styles.scss'

const Navigation = () => {
    return (
      <>
      <header className='navigation'>
        <Link className='logo-container' to='/'>
            <ZesumaLogo className='logo' />
        </Link>
        <nav className='nav-links-container'>
        <Link className='nav-link' to='/shop'>
            SHOP
        </Link>
        <Link className='nav-link' to='/auth'>
            SIGN IN
        </Link>
        </nav>
      </header>
      <Outlet />
      </>
    )
  }

  export default Navigation
