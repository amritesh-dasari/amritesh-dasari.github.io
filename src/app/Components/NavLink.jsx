import Link from "next/link"

const NavLink = ({ href, title, sectionId, currentPath = "/", active = false, onClick }) => {
    const handleClick = (e) => {
        if (sectionId) {
            const isOnHomePage = currentPath === "/" || currentPath === "";
            const element = document.getElementById(sectionId);
            const scrollContainer = document.getElementById("page-scroll");

            if (isOnHomePage && element) {
                e.preventDefault();
                const nav = document.querySelector('nav');
                const offset = nav ? nav.offsetHeight : 0;
                if (scrollContainer) {
                    const containerTop = scrollContainer.getBoundingClientRect().top;
                    const elementTop = element.getBoundingClientRect().top - containerTop + scrollContainer.scrollTop;
                    const targetPos = Math.max(0, elementTop - offset);
                    scrollContainer.scrollTo({ top: targetPos, behavior: 'smooth' });
                } else {
                    const elementTop = element.getBoundingClientRect().top + window.scrollY;
                    const targetPos = Math.max(0, elementTop - offset);
                    window.scrollTo({ top: targetPos, behavior: 'smooth' });
                }
            }
        }
        onClick?.();
    };

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={`text-base font-semibold transition-colors duration-300 ${
                active
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
            }`}
        >
            {title}
        </Link>
    )
}

export default NavLink
