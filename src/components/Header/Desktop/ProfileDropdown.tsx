import React, { useState, MouseEvent } from "react";
import { NavDropdown } from "react-bootstrap";

interface ProfileDropdownProps {}

const ProfileDropdown: React.FC<ProfileDropdownProps> = () => {
	const [isOpen, setIsOpen] = useState<string | null>(null);

	const handleDropdownToggle = (eventKey: string) => {
		setIsOpen((prevIsOpen) => (eventKey === prevIsOpen ? null : eventKey));
	};

	const renderNavDropdownWithClick = (title: string, renderKey: string, items: string[]) => {
		return (
			<NavDropdown
				title={title}
				id={renderKey}
				className="profile-dropdown"
				renderMenuOnMount
				onClick={(e: MouseEvent) => {
					e.stopPropagation(); // Prevent event propagation
					handleDropdownToggle(renderKey);
				}}
				show={isOpen === renderKey}
				key={renderKey}
			>
				{items.map((item, index) => (
					<NavDropdown.Item
						key={index}
						href={`#action/${renderKey}.${index + 1}`}
					>
						{item}
					</NavDropdown.Item>
				))}
			</NavDropdown>
		);
	};

	return (
		<>
			{renderNavDropdownWithClick("Profile", "4", [
				"View my profile",
				"Account Details",
				"Store preferences",
				"Change language",
				"Sign out of account...",
			])}
			<a
				href="https://github.com/Joeyryanbridges"
				target="_blank"
				rel="noreferrer"
				className="compact-profile-link"
			>
				<img
					src="https://source.unsplash.com/user/c_v_r"
					alt="Profile"
					width="40"
					height="40"
					className="profile-pic"
				/>
			</a>
		</>
	);
};

export default ProfileDropdown;
