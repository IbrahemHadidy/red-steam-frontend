import { FC } from 'react';
import Header from "../../components/Header/Header";
import SecondNavbar from "../../components/SecondNavbar/SecondNavbar";
import Sidebar from "./Sidebar/Sidebar";
import Featured from "./Featured/Featured";
import Offers from "./Offers/Offers"
import Categories from "./Categories/Categories"
import Queue from './Queue/Queue';
import Recommended from './Recommended/Recommended';
import PopularVR from './PopularVR/PopularVR';
import BrowseSteam from './BrowseSteam/BrowseSteam';
import HomeTabs from './HomeTabs/HomeTabs';
import Footer from "../../components/Footer/Footer";
import "./Store.css"

const Store: FC = () => {
  return(
    <div className='store'>
      <Header />
      <Sidebar />
      <SecondNavbar />
      <Featured />
      <Offers />
      <Categories />
      <div>
        <Queue />
        <Recommended />
      </div>
      <BrowseSteam />
      <PopularVR />
      <HomeTabs />
      <Footer />
    </div>
  )
}

export default Store;