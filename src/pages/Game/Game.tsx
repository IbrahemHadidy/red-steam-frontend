import { FC } from 'react';
import Header from "../../components/Header/Header";
import SecondNavbar from "../../components/SecondNavbar/SecondNavbar";
import MediaAndSummary from "./MediaAndSummary/MediaAndSummary";
import Footer from "../../components/Footer/Footer";
import "./Game.css"

const Store: FC = () => {
  return(
    <div className='game'>
      <Header />
      <SecondNavbar />
      <MediaAndSummary />
      {/* <Footer /> */}
    </div>
  )
}

export default Store;