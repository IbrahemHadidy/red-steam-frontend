

//!! TODO: CHANGE THE TAGS AND GENRES TO AVAILABLE TAGS/SORT OPTIONS USED IN THE SITE


import { FC, useContext } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from 'contexts/AuthContext';
import "./Sidebar.scss";

interface LinkItem {
	to: string;
	text: string;
}

const Sidebar: FC = () => {
  	const { isLoggedIn } = useContext(AuthContext);

	// Helper function to generate links
	const generateLinks = (links: LinkItem[]) => {
		return links.map((link: LinkItem, index: number) => (
    	  <Link key={index} className="item" to={link.to}>
    	    {link.text}
    	  </Link>
    	));
	};

	// TODO: Backend logic, render recently viewed games, max 5 latest viewed games, remove them from database after 4 days
	const recentlyViewedLinks = [
		// Define recently viewed game links
		{ to: "/game/PUBG_BATTLEGROUNDS", text: "PUBG: BATTLEGROUNDS" },
		{ to: "/game/NARAKA_BLADEPOINT", text: "NARAKA: BLADEPOINT" },
		{ to: "/game/Call_of_Duty", text: "Call of Duty®" },
	];

	// TODO: Backend logic, render tags dynamically depending on user's tags selection (most 5 tags having games)
	const tagsLinks = [
		// Define tag links
		{ to: "/tags/en/Mod/", text: "Mod" },
		{
			to: "/tags/en/Dark%20Fantasy/",
			text: "Dark Fantasy",
		},
		{
			to: "/tags/en/Psychological/",
			text: "Psychological",
		},
		{
			to: "/tags/en/Open%20World/",
			text: "Open World",
		},
		{ to: "/tags/en/Fantasy/", text: "Fantasy" },
	];

	// TODO: Backend logic, conditional redirection
	const recommendedLinks = [
		// Define recommended links
		// TODO: Not working link need to add code for handling friend activity
		{
			to: isLoggedIn ? "/recommended/friendactivity/" : "/login",
			text: "By Friends",
		},
		{ to: isLoggedIn ? "/tag/browse/#yours" : "/login", text: "Tags" },
	];

		const categoryLinks = [
		// Define category links
		{ to: "/category/topsellers", text: "Top Sellers" },
		{ to: "/category/new", text: "New Releases" },
		{ to: "/category/upcoming", text: "Upcoming" },
		{ to: "/category/specials", text: "Specials" },
		{ to: "/category/vr", text: "VR Titles" },
		{ to: "/category/controller-friendly", text: "Controller-Friendly" },
		{ to: "/category/greatondeck", text: "Great on Deck" },
	];

	const genreLinks = [
		// Define genre links
		{ to: "/genre/free-to-play", text: "Free to Play" },
		{ to: "/genre/early-access", text: "Early Access" },
		{ to: "/genre/action", text: "Action" },
		{ to: "/genre/adventure", text: "Adventure" },
		{ to: "/genre/casual", text: "Casual" },
		{ to: "/genre/indie", text: "Indie" },
		{ to: "/genre/massively-multiplayer", text: "Massively Multiplayer" },
		{ to: "/genre/racing", text: "Racing" },
		{ to: "/genre/rpg", text: "RPG" },
		{ to: "/genre/simulation", text: "Simulation" },
		{ to: "/genre/sports", text: "Sports" },
		{ to: "/genre/strategy", text: "Strategy" },
	];

	return (
		<div className="fixed-sidebar">
			<Nav className="sidebar">
				{/* Steam Gift Cards section */}
				<div>
					<a
						className="item"
						href="/digitalgiftcards/"
					>
						<div className="gift-card">
							<img
								className="image"
								src="/images/steamcards_promo_03.png"
								alt="Steam Gift Cards"
							/>{" "}
							<h6 className="gift-card-h6">Steam Gift Cards</h6>
							<p className="gift-card-p">Give the Gift of Game</p>
						</div>
					</a>
				</div>

				{/* Recently Viewed section */}
				<div className="recents" id="hom-elj">
					<div className="header">Recently Viewed</div>
					<div>{generateLinks(recentlyViewedLinks)}</div>
				</div>

				{/* Your Tags section */}
				{isLoggedIn && <div>
					<div className="header tag">Your Tags</div>
					<div>{generateLinks(tagsLinks)}</div>
				</div> }

				{/* Recommended section */}
				<div>
					<div className="header">Recommended</div>
					<div>{generateLinks(recommendedLinks)}</div>
				</div>

				{/* Browse Categories section */}
				<div>
					<div className="header">Browse Categories</div>
					<div>{generateLinks(categoryLinks)}</div>
				</div>

				{/* Browse by Genre section */}
				<div>
					<div className="header">Browse by genre</div>
					{generateLinks(genreLinks)}
				</div>
			</Nav>
		</div>
	);
};

export default Sidebar;
