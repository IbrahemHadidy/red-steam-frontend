// Components
import Create from './CreateForm';
import ItemsList from './ItemsList';

// Hooks
import useDynamicBackground from 'hooks/useDynamicBackground';

// Types
import type { FC, JSX } from 'react';
import type { Admin } from './admin.types';

const Admin: FC<Admin> = ({
  type,
  name,
  setName,
  website,
  setWebsite,
  handleIconChange,
  icon,
  onSubmit,
  submitted,
}): JSX.Element => {
  // Init
  useDynamicBackground(`#181A21`);

  return (
    <>
      <Create
        type={type}
        name={name}
        setName={setName}
        website={website}
        setWebsite={setWebsite}
        handleIconChange={handleIconChange}
        icon={icon}
        onSubmit={onSubmit}
      />
      <ItemsList type={type} submitted={submitted} />
    </>
  );
};

export default Admin;
