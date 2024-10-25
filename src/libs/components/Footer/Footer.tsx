// NextJS
import Image from 'next/image';
import Link from 'next/link';

// Images
import footerLogo from '@images/footerLogo_valve_new.png';
import facebookIcon from '@images/ico_facebook.png';
import twitterIcon from '@images/ico_twitter.png';
import steamFooterLogo from '@images/logo_steam_footer.png';

// Styles
import '@styles/components/Footer.scss';

// Types
import type { JSX } from 'react';

export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-rule"></div>
        <Link href="/" className="footer-steam-logo">
          <Image src={steamFooterLogo} alt="Valve Software" />
        </Link>
        <p className="footer-logo">
          <a href="http://www.valvesoftware.com">
            <Image src={footerLogo} alt="Valve Software" />
          </a>
        </p>
        <p className="footer-text">
          This website is an educational project replicating the Steam site for learning purposes
          and is not affiliated with Valve Corporation.
          <br />
          <s>VAT included in all prices where applicable</s>.&nbsp;&nbsp;
          <a className="disabled">
            <s>Privacy Policy</s>
          </a>
          &nbsp; | &nbsp;
          <a className="disabled">
            <s>Legal</s>
          </a>
          &nbsp; | &nbsp;
          <a className="disabled">
            <s>Steam Subscriber Agreement</s>
          </a>
          &nbsp; | &nbsp;
          <a className="disabled">
            <s>Refunds</s>
          </a>
          &nbsp; | &nbsp;
          <a className="disabled">
            <s>Cookies</s>
          </a>
        </p>

        <div style={{ clear: 'left' }} />
        <br />
        <div className="footer-rule" />

        <div className="footer-links">
          <p>
            <a href="http://www.valvesoftware.com/">Valve</a>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <a href="http://www.steampowered.com/">Steam</a>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <a className="disabled">
              <s>Jobs</s>
            </a>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <a className="disabled">
              <s>Steam Distribution</s>
            </a>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <a className="disabled">
              <s>Support</s>
            </a>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <a className="disabled">
              <s>Gift Cards</s>
            </a>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <a className="disabled">
              <Image src={facebookIcon} alt="Facebook" />
              &nbsp;<s>Steam</s>
            </a>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <a className="disabled">
              <Image src={twitterIcon} alt="Twitter" />
              &nbsp;<s>@steam</s>
            </a>
          </p>
          <p>
            <a href="https://github.com/IbrahemHadidy">My Github</a>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <a href="https://github.com/IbrahemHadidy/red-steam">Repository</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
