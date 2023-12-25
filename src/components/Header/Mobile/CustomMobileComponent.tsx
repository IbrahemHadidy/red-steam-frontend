import React, { useState, useEffect, useRef, MouseEvent } from "react";
import SteamMenu from "./CustomMenu";
import MiniHeader from "./MiniHeader";

const CustomMobileComponent: React.FC = () => {
	const [showMenu, setShowMenu] = useState<boolean>(false);
	const menuRef = useRef<HTMLDivElement | null>(null);

	const toggleMenu = (event: MouseEvent) => {
		event.stopPropagation();
		setShowMenu(!showMenu);
	};

	const closeMenu = () => {
		setShowMenu(false);
	};

	const handleClickOutside = (event: Event) => {
		if (showMenu && menuRef.current && !menuRef.current.contains(event.target as Node)) {
			// Click occurred outside the menu, so close it
			closeMenu();
		}
	};

	useEffect(() => {
		// Add or remove the click event listener based on the menu state
		if (showMenu) {
			document.addEventListener("click", handleClickOutside);
			document.body.style.overflow = "hidden"; // Prevent scrolling
		} else {
			document.removeEventListener("click", handleClickOutside);
			document.body.style.overflow = "auto"; // Allow scrolling
		}

		return () => {
			// Clean up the event listener and reset overflow property when the component unmounts
			document.removeEventListener("click", handleClickOutside);
			document.body.style.overflow = "auto";
		};
	}, [showMenu]);

	return (
		<>
			<MiniHeader onMenuClick={toggleMenu} />
			{/* Overlay to fade away when the menu is open */}
			<div className={`overlay ${showMenu ? "show" : ""}`} onClick={closeMenu}></div>
			{/* Container for the menu */}
			<div className={`steam-menu-container ${showMenu ? "show" : ""}`} ref={menuRef}>
				<SteamMenu />
			</div>
		</>
	);
};

export default CustomMobileComponent;
