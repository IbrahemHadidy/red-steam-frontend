import { FC } from "react";
import "./BrowseSteam.scss";
const BrowseSteam: FC = () => {
  return (
    <div className="home-section">
      <div className="home-contents">
        <div className="big-buttons">
          <div className="home-titles" style={{marginBottom: "10px"}}>Browse Steam</div>
          <div className="browse-buttons">
            <a className="big-button" href="/explore/new/"> New Releases </a>
            <a className="big-button" href="/search/?specials=1&"> Specials </a>
            <a className="big-button" href="/genre/Free%20to%20Play/"> Free Games </a>
            <a className="big-button" href="/tag/browse/"> By User Tags </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseSteam;
