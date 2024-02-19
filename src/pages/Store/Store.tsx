import { FC, useEffect } from 'react';
import Header from "../../components/Header/Header";
import SecondNavbar from "../../components/SecondNavbar/SecondNavbar";
import Sidebar from "./Sidebar/Sidebar";
import Featured from "./Featured/Featured";
import Offers from "./Offers/Offers"
import Categories from "./Categories/Categories"
import Queue from './Recommended/Queue';
import Recommended from './Recommended/Recommended';
import LoginQueue from './Recommended/LoginQueue';
import PopularVR from './PopularVR/PopularVR';
import BrowseSteam from './BrowseSteam/BrowseSteam';
import HomeTabs from './HomeTabs/HomeTabs';
import Footer from "../../components/Footer/Footer";
import "./Store.scss"

const Store: FC = () => {
	useEffect(() => {
		document.body.style.background = "url('/images/colored_body_top.png') center top no-repeat #1b2838"
	}, []);

	return(
		<div className='store'>
			<Header />
			<Sidebar />
			<SecondNavbar />
			<Featured />
			<Offers />
			<Categories />
			{/* TODO: isLoggedIn Backend logic, render if logged in else display the login div */}
			{/* { !isLoggedIn ? 
				<>
					<Queue /><Recommended />
				</>
				: <LoginQueue /> 
			} */}
			<BrowseSteam />
			<PopularVR />
			<HomeTabs />
			<Footer />
		</div>
	)
}

export default Store;