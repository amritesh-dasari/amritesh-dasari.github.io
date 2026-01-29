import React from 'react'
import NavLink from './NavLink'

const MenuOverlay = ({ links, activeSection, pathname, onNavigate }) => {
    return (
        <ul className='flex flex-col py-4 px-6 gap-4'>
            {links.map((link, index) => {
                const isSectionLink = Boolean(link.sectionId);
                const isActive = isSectionLink
                    ? activeSection === link.sectionId
                    : pathname === link.href;

                return (
                    <li
                        key={index}
                        className={`py-2 border-l-2 pl-4 transition-all duration-300 ${
                            isActive
                                ? 'border-accent-primary'
                                : 'border-transparent hover:border-border-hover'
                        }`}
                    >
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
