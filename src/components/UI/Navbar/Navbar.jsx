import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<div className='navbar'>
			<div classname='navbarlinks'>
				<Link to='/about'>О сайте</Link>
				<Link to='/posts'>Посты</Link>
			</div>
		</div>
	)
}

export default Navbar
