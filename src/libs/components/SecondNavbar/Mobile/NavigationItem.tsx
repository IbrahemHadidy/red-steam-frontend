// NextJS
import Link from 'next/link';

interface NavigationItemProps {
  item: {
    label: string;
    url: string;
  };
}

export default function NavigationItem({ item }: NavigationItemProps) {
  return (
    <div>
      <ul className="navbar-nav">
        <li className="nav-item navbar-nav-mobile">
          <Link className="nav-link navBarItem navBarItem-mobile" href={item.url}>
            {item.label}
          </Link>
        </li>
      </ul>
    </div>
  );
}
