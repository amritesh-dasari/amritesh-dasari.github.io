import Link from "next/link"

const NavLink = ({ href, title, active = false, onClick }) => {
    const baseClasses = "relative block py-2 pl-3 pr-4 sm:text-xl rounded md:p-0 transition-colors duration-300";
    const stateClasses = active ? "text-white" : "text-[#ADB7BE] hover:text-white";

    return (
        <Link
            href={href}
            onClick={onClick}
            className={`${baseClasses} ${stateClasses}`}
        >
            {title}
        </Link>
    )
}

export default NavLink
