import { FC } from 'react';
import Header from "../components/Header/Header";
import Sidebar from "./Store/Sidebar/Sidebar";
import SecondNavbar from "./Store/SecondNavbar/SecondNavbar";
import Featured from "./Store/Featured/Featured";
import Offers from "./Store/Offers/Offers"
import Categories from "./Store/Categories/Categories"

const Store: FC = () => {
  return(
    <div className='store'>
      <Header />
      <Sidebar />
      <SecondNavbar />
      <Featured />
      <Offers />
      <Categories />
    </div>
  )
}

export default Store;