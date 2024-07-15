'use client';

// Next.js
import Image from 'next/image';

// Images
import footerLogo from 'images/footerLogo_valve_new.png';
import facebookIcon from 'images/ico_facebook.png';
import twitterIcon from 'images/ico_twitter.png';
import steamFooterLogo from 'images/logo_steam_footer.png';

// Styles
import './Footer.scss';

// Types
import type { FC } from 'react';

const Footer: FC = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-rule"></div>
        <div className="footer-steam-logo">
          <Image src={steamFooterLogo} alt="Valve Software" />
        </div>

        <div className="footer-logo">
          <a href="http://www.valvesoftware.com">
            <Image src={footerLogo} alt="Valve Software" />
          </a>
        </div>
        <div className="footer-text">
          <div>
            This website is an educational project replicating the Steam site for learning purposes
            and is not affiliated with Valve Corporation.
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

        <div style={{ clear: 'left' }}></div>
        <br />

        <div className="footer-rule"></div>

        <div className="footer-links">
          <a href="http://www.valvesoftware.com/">Valve</a>
          &nbsp;&nbsp; | &nbsp;&nbsp;
          <a href="http://www.steampowered.com/">Steam</a>
          &nbsp;&nbsp; | &nbsp;&nbsp;
          <a href="#">
            <s>Jobs</s>
          </a>
          &nbsp;&nbsp; | &nbsp;&nbsp;
          <a href="#">
            <s>Steam Distribution</s>
          </a>
          &nbsp;&nbsp; | &nbsp;&nbsp;
          <a href="#">
            <s>Support</s>
          </a>
          &nbsp;&nbsp; | &nbsp;&nbsp;
          <a href="#">
            <s>Gift Cards</s>
          </a>
          &nbsp;&nbsp; | &nbsp;&nbsp;
          <a href="#">
            <Image src={facebookIcon} alt="Facebook" />
            &nbsp;<s>Steam</s>
          </a>
          &nbsp;&nbsp; | &nbsp;&nbsp;
          <a href="http://twitter.com/steam">
            <Image src={twitterIcon} alt="Twitter" />
            &nbsp;<s>@steam</s>
          </a>
          <div style={{ display: 'inline-block', marginLeft: '235px' }}>
            <a href="https://github.com/IbrahemHadidy">My Github</a>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <a href="https://github.com/IbrahemHadidy/red-steam">Repository</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
