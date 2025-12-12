import React from 'react'
import NavLink from './NavLink'

const MenuOverlay = ({ links, activeSection, pathname, onNavigate }) => {
    return (
        <ul className='flex flex-col py-4 items-center'>
            {links.map((link, index) => {
                const isSectionLink = Boolean(link.sectionId);
                const isActive = isSectionLink
                    ? activeSection === link.sectionId
                    : pathname === link.href;

                return (
                    <li key={index} className='w-full text-center'>
                        <NavLink
                            href={link.href}
                            title={link.title}
                            sectionId={link.sectionId}
                            currentPath={pathname}
                            active={isActive}
                            onClick={onNavigate}
                        />
                    </li>
                )
            })}
        </ul>
    )
}

export default MenuOverlay
