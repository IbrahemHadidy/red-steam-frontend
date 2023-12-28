import { FC, useState, SetStateAction } from "react";
import NavSearch from "../NavSearch";
import { menuData, navigationItems } from "../menuData-mobile";

type MenuItem = {
	label: string;
	url: string;
	className: string;
	category?: string;
	specialClass?: string;
};

type GroupedMenuItem = {
	menuTitle: string;
	categoryGroups: Record<string, MenuItem[]>;
};

type menuTitle = string | SetStateAction<null>;

const MobileSecondNav: FC = () => {
	const [openMenu, setOpenMenu] = useState<menuTitle | null>(null);

	const handleMenuClick = (menuTitle: menuTitle) => {
		if (openMenu === menuTitle) {
			setOpenMenu(null); // Close the menu if it's already open
		} else {
			setOpenMenu(menuTitle); // Open the menu if it's closed
		}
	};

	const preventDefault = (event: { preventDefault: () => void }) => {
		event.preventDefault();
	};

	const groupedMenuItems: GroupedMenuItem[] = Object.entries(menuData).map(
		([menuTitle, menu]) => {
			const items = menu.items;
			const categoryGroups: Record<string, MenuItem[]> = {};

			items.forEach((item: MenuItem) => {
				if (item.category) {
					if (!categoryGroups[item.category]) {
						categoryGroups[item.category] = [];
					}
					categoryGroups[item.category].push(item);
				}
			});

			return { menuTitle, categoryGroups };
		}
	);

	return (
		<div className="second-nav-mobile">
			<nav className="navbar navbar-expand-sm navbarBg-mobile">
				{groupedMenuItems.map(({ menuTitle, categoryGroups }, index) => (
					<div key={index}>
						{/* TODO: render profile image when logged in backend logic */}
						{/* <img
							className="profile-picture"
							src="https://source.unsplash.com/user/c_v_r"
							alt="Avatar"
						/> */}
						<ul className="navbar-nav navbar-nav-mobile">
							<li className="nav-item nav-item-mobile dropdown">
								<a
									className={`nav-link navBarItem navBarItem-mobile ${
										/* TODO: add the special class when logged in backend logic */
										/* menuTitle === "Your Store" && isloggedIn ? "special-class" : */ ""
									}`}
									href="#"
									onClick={() => handleMenuClick(menuTitle)} // Handle click to open/close the menu
								>
									{menuTitle}
								</a>
								{/* Conditionally render the dropdown menu based on the openMenu state */}
								{openMenu === menuTitle && (
									<div className={`dropdown-menu dropdown-menu-mobile ${menuTitle}-div`}>
										{Object.entries(categoryGroups).map(
											([category, categoryItems], categoryIndex) => (
												<div key={categoryIndex} className={`category-div ${category}`}>
													{categoryItems.map((categoryItem, itemIndex) => (
														<a
															key={itemIndex}
															className={`menuItem ${categoryItem.className} ${
																categoryItem.specialClass || ""
															}`}
															href={categoryItem.url}
															onClick={preventDefault}
														>
															{categoryItem.label}
														</a>
													))}
												</div>
											)
										)}
									</div>
								)}
							</li>
						</ul>
					</div>
				))}

				{navigationItems.map((item, index) => (
					<div key={index}>
						<ul className="navbar-nav">
							<li className="nav-item navbar-nav-mobile">
								<a className="nav-link navBarItem navBarItem-mobile" href={item.url}>
									{item.label}
								</a>
							</li>
						</ul>
					</div>
				))}
				<NavSearch />
			</nav>
		</div>
	);
};

export default MobileSecondNav;
