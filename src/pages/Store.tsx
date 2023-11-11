import { FC } from 'react';
import Header from "../components/Header/Header";
import Sidebar from "./Store/Sidebar/Sidebar";
import SecondNavbar from "./Store/SecondNavbar/SecondNavbar";
import Featured from "./Store/Featured/Featured";
import Offers from "./Store/Offers/Offers"
import Categories from "./Store/Categories/Categories"
import Queue from './Store/Queue/Queue';
import Recommended from './Store/Recommended/Recommended';
import PopularVR from './Store/PopularVR/PopularVR';
import BrowseSteam from './Store/BrowseSteam/BrowseSteam';
import HomeTabs from './Store/HomeTabs/HomeTabs';
import Footer from "../components/Footer/Footer";
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