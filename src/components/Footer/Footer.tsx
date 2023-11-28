import { FC } from "react";
import "./Footer.scss";

const Footer: FC = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-rule"></div>
        <div className="footer-steam-logo">
          <img src="/images/logo_steam_footer.png" alt="Valve Software" />
        </div>

        <div className="footer-logo">
          <a href="http://www.valvesoftware.com">
            <img src="/images/footerLogo_valve_new.png" alt="Valve Software" />
          </a>
        </div>
        <div className="footer-text">
          <div>
            This website is an educational project replicating the Steam site
            for learning purposes and is not affiliated with Valve Corporation.
          </div>
          <div>
            <s>VAT included in all prices where applicable</s>.&nbsp;&nbsp;
            <a href="#">
              <s>Privacy Policy</s>
            </a>
            &nbsp; | &nbsp;
            <a href="#">
              <s>Legal</s>
            </a>
            &nbsp; | &nbsp;
            <a href="#">
              <s>Steam Subscriber Agreement</s>
            </a>
            &nbsp; | &nbsp;
            <a href="#">
              <s>Refunds</s>
            </a>
            &nbsp; | &nbsp;
            <a href="#">
              <s>Cookies</s>
            </a>
          </div>
        </div>

        <div style={{ clear: "left" }}></div>
        <br />

        <div className="footer-rule"></div>

        <div className="footer-links">
          <a href="http://www.valvesoftware.com/">Valve</a>
          &nbsp; | &nbsp;
          <a href="http://www.steampowered.com/">Steam</a>
          &nbsp; | &nbsp;
          <a href="#">
            <s>Jobs</s>
          </a>
          &nbsp; | &nbsp;
          <a href="#">
            <s>Steam Distribution</s>
          </a>
          &nbsp; | &nbsp;
          <a href="#">
            <s>Support</s>
          </a>
          &nbsp; | &nbsp;
          <a href="#">
            <s>Gift Cards</s>
          </a>
          &nbsp; | &nbsp;
          <a href="#">
            <img src="/images/ico_facebook.gif" style={{borderRadius: "3px"}}/>
            &nbsp;<s>Steam</s>
          </a>
          &nbsp; | &nbsp;
          <a href="http://twitter.com/steam">
            <img src="/images/ico_twitter.gif" style={{borderRadius: "3px"}}/>
            &nbsp;<s>@steam</s>
          </a>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <a href="https://github.com/IbrahemHadidy">My Github</a>
          &nbsp; | &nbsp;
          <a href="https://github.com/IbrahemHadidy/red-steam">Repository</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
