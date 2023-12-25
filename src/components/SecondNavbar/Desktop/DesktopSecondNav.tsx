import { FC, useState } from "react";
import { useSpring, animated } from "react-spring";
import { menuData, navigationItems } from "../menuData";

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

const DesktopSecondNav: FC = () => {
	const [openMenu, setOpenMenu] = useState<string | null>(null);

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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const fadeAnimations: Record<string, any> = {};

	groupedMenuItems.forEach(({ menuTitle }) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		fadeAnimations[menuTitle] = useSpring({
			opacity: openMenu === menuTitle ? 1 : 0,
			config: { duration: openMenu ? 30 : 15 },
		});
	});

	return (
		<>
			<div className="d-none d-md-block mx-auto myNavSec">
				<div className="wishlist-Link-div">
					<a
						className="wishlist-link"
						href="https://store.steampowered.com/wishlist/"
					>
						Wishlist
					</a>
				</div>
				<nav className="navbar navbar-expand-sm navbarBg">
					<ul className="navbar-nav">
						<img
							className="profile-picture"
							src="https://source.unsplash.com/user/c_v_r"
							alt="Avatar"
						/>
						{groupedMenuItems.map(({ menuTitle, categoryGroups }, index) => (
				<li
					key={index}
					className="nav-item dropdown"
					onMouseEnter={() => setOpenMenu(menuTitle)}
					onMouseLeave={() => setOpenMenu(null)}
				>
					<a
						className={`nav-link navBarItem ${
							menuTitle === "Your Store" ? "special-class" : ""
						}`}
						href=""
						data-toggle="dropdown"
					>
						{menuTitle}
					</a>
					<animated.div
						className={`dropdown-menu ${menuTitle}-div`}
						style={fadeAnimations[menuTitle]}
					>
						{openMenu === menuTitle && (
							<>
								{Object.entries(categoryGroups).map(
									([category, categoryItems], categoryIndex) => (
										<div
											key={categoryIndex}
											className={`category-div ${category}`}
										>
											{categoryItems.map((categoryItem, itemIndex) => (
												<a
													key={itemIndex}
													className={`menuItem ${categoryItem.className} ${
														categoryItem.specialClass || ""
													}`}
													href={categoryItem.url}
												>
													{categoryItem.label}
												</a>
											))}
										</div>
									)
								)}
							</>
						)}
					</animated.div>
				</li>
			))}

						{navigationItems.map((item, index) => (
							<a key={index} className="nav-link navBarItem" href={item.url}>
								{item.label}
							</a>
						))}

						<div className="before-search-space"></div>

						<div id="search">
							<form>
								<input type="hidden" />
								<div className="search">
									<input
										name="term"
										type="text"
										className="search-input"
										placeholder="search"
									/>
									<a href="#" className="search-button">
										<img alt="Search" src="/images/blank.gif" />
									</a>
								</div>
							</form>
						</div>
					</ul>
				</nav>
			</div>
		</>
	);
};

export default DesktopSecondNav;
