import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import { AuthContext } from '../context/auth'

const MenuBar = () => {
    const { user, logout } = useContext(AuthContext)

    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path)

    const handleItemClick = (e, { name }) => setActiveItem(name)
    const handleLog = () =>{
        setActiveItem('home')
        logout()
    }
    return (
        <>
        {
            user ? (
                <Menu pointing secondary size="massive" color="teal" stackable>
                    <Menu.Item
                        name="home"
                        onClick={handleItemClick}
                        as={Link}
                        to="/"
                    >   
                        <img
                            alt=""
                            src='https://firebasestorage.googleapis.com/v0/b/fir-e6ee2.appspot.com/o/Screenshot%20(74).png?alt=media'
                        />
                    </Menu.Item>
                    <Menu.Item
                        name={user.username}
                        active={activeItem === user.username}
                        onClick={handleItemClick}
                        as={Link}
                        to={`/profile/${user.username}`}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='logout'
                            onClick={handleLog}
                            as={Link}
                            to="/"
                        />
                    </Menu.Menu>
                </Menu>
            ) : (
                <Menu pointing secondary size="massive" color="teal">
                    <Menu.Item
                        as={Link}
                        to="/"
                    >   
                        <img
                            alt=""
                            src='https://firebasestorage.googleapis.com/v0/b/fir-e6ee2.appspot.com/o/Screenshot%20(74).png?alt=media'
                        />
                    </Menu.Item>
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/"
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='login'
                            active={activeItem === 'login'}
                            onClick={handleItemClick}
                            as={Link}
                            to="/login"
                        />
                        <Menu.Item
                            name='register'
                            active={activeItem === 'register'}
                            onClick={handleItemClick}
                            as={Link}
                            to="/register"
                        />
                    </Menu.Menu>
                </Menu>
            )
        }
        </>
    )
}

export default MenuBar;