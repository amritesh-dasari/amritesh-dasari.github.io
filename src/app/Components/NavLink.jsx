import Link from "next/link"

const NavLink = ({ href, title, active = false, onClick }) => {
    const baseClasses = "relative block py-2 pl-3 pr-4 sm:text-xl rounded md:p-0 transition-colors duration-300";
    const stateClasses = active
        ? "font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
        : "text-[#ADB7BE] hover:text-white";

    const handleClick = (e) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                const nav = document.querySelector('nav');
                const offset = nav ? nav.offsetHeight : 0;
                const elementTop = element.getBoundingClientRect().top + window.scrollY;
                const targetPos = Math.max(0, elementTop - offset);
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        }
        onClick?.();
    };

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={`${baseClasses} ${stateClasses}`}
        >
            {title}
        </Link>
    )
}

export default NavLink
