// React
import { useCallback, useState } from 'react';

// Toast notifications
import { toast } from 'react-toastify';

// Services
import { updateDeveloper } from 'services/common/developers';
import { updateFeature } from 'services/common/features';
import { updateLanguage } from 'services/common/languages';
import { updatePublisher } from 'services/common/publishers';
import { updateTag } from 'services/common/tags';

// Types
import type { ChangeEvent, FC, FormEvent, JSX } from 'react';
import type { Company } from 'types/company.types';
import type { EditModalProps } from './admin.types';

const EditModal: FC<EditModalProps> = ({ type, setOpen, item }): JSX.Element => {
  const [name, setName] = useState<string>(item.name);
  const [website, setWebsite] = useState<string>((item as Company).website);
  const [icon, setIcon] = useState<string>((item as unknown as { icon: string }).icon);

  const handleSubmit = useCallback(
    async (e: FormEvent): Promise<void> => {
      e.preventDefault();

      // Create a mapping between the type and the corresponding update function
      const updateFunctions = {
        feature: () => updateFeature(item.id, name, icon),
        developer: () => updateDeveloper(item.id, name, website),
        publisher: () => updatePublisher(item.id, name, website),
        tag: () => updateTag(item.id, name),
        language: () => updateLanguage(item.id, name),
      };

      // Check if the type exists in the mapping
      const updateFunction = updateFunctions[type];
      if (updateFunction) {
        // Call the respective function based on the type
        const message: string = (await updateFunction()).message;
        toast.success(message);
        setOpen(false);
        return;
      }

      // Handle the default case or if type doesn't match
      toast.error('Failed to update item');
      setOpen(false);
      return;
    },
    [icon, item.id, name, setOpen, type, website]
  );

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleWebsiteChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWebsite(e.target.value);
  };

  const handleIconChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file); // Read the file as a data URL (Base64 encoded)
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setIcon(reader.result.split(',')[1]); // Extract the Base64 string
        }
      };
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={() => setOpen(false)} />
      <div className="edit-modal">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>

          {(type === 'developer' || type === 'publisher') && (
            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="url"
                value={website}
                onChange={handleWebsiteChange}
              />
            </div>
          )}

          {type === 'feature' && (
            <div className="form-group">
              <label htmlFor="icon">Icon</label>
              <input id="icon" name="icon" type="file" onChange={handleIconChange} />
            </div>
          )}

          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default EditModal;
