import React from 'react'
import NavLink from './NavLink'

const MenuOverlay = ({ links, activeId, onNavigate }) => {
    return (
        <ul className='flex flex-col py-4 items-center'>
            {links.map((link, index) => (
                <li key={index} className='w-full text-center'>
                    <NavLink
                        href={link.path}
                        title={link.title}
                        active={activeId === link.path}
                        onClick={onNavigate}
                    />
                </li>
            ))}
        </ul>
    )
}

export default MenuOverlay
