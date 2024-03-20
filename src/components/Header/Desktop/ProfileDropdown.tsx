import { FC, useState, useContext } from 'react';
import useSoftNavigate from 'hooks/useSoftNavigate';
import { NavDropdown } from 'react-bootstrap';
import { AuthContext } from 'contexts/AuthContext';
import sharedData from '../sharedData';
const ProfileDropdown: FC = () => {
  const navigate = useSoftNavigate();
	const { userData } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState<string | null>(null);
  const handleDropdownToggle = (eventKey: string) => {
    setIsOpen(prevIsOpen => (eventKey === prevIsOpen ? null : eventKey));
  };

  const renderNavDropdownWithClick = (
    title: string,
    renderKey: string,
    links: string[],
    items: string[],
  ) => {
    return (
      <NavDropdown
        title={title}
        id={renderKey}
        className="profile-dropdown"
        renderMenuOnMount
        onClick={e => {
          e.stopPropagation();
          handleDropdownToggle(renderKey);
        }}
        show={isOpen === renderKey}
        key={renderKey}
      >
        {links.map((link, index) => (
          <NavDropdown.Item
            href="#"
            key={index}
            onClick={e => {
              navigate(link, e);
            }}
          >
            {items[index]}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    );
  };

  return (
    <>
      {renderNavDropdownWithClick(
        userData?.username || 'profile',
        '4',
        sharedData.minorMenuItems.map(item => item.link),
        sharedData.minorMenuItems.map(item => item.text),
      )}
      {/* TODO: Add real user link */}
      <a
        onClick={e => {
          e.preventDefault;
          navigate('user_link');
        }}
        target="_blank"
        rel="noreferrer"
        className="compact-profile-link"
      >
        <img
          src={userData?.profilePicture || '/images/default-pfp.png'}
          alt="Profile"
          width="40"
          height="40"
          className={`profile-pic ${userData?.profilePicture ? '' : 'no-pfp'}`}
        />
      </a>
    </>
  );
};

export default ProfileDropdown;
