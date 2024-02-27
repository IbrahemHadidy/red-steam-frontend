import { FC, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useResponsiveViewports from 'hooks/useResponsiveViewports';
import { submitSelectedUserTagsToBackend, fetchUserTagsFromBackend } from 'services/tags';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import './UserTags.scss';

const UserTags: FC = () => {
  const isViewport740 = useResponsiveViewports(740);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // TODO: Delete the demo tags
  const [initialTags, setInitialTags] = useState<string[]>([
    'tag1',
    'tag2',
    'tag3',
    'tag4',
    'tag5',
    'tag6',
    'tag7',
    'tag8',
    'tag9',
    'tag10',
    'tag11',
    'tag12',
    'tag13',
  ]);

  // TODO: Import tags from backend database
  // Fetch tags from the backend when the component mounts
  // useEffect(() => {
  //   fetchUserTagsFromBackend().then(({ tags, selectedTags }) => {
  //     setInitialTags(tags);
  //     setSelectedTags(selectedTags);
  //   });
  // }, []);

  // Sort tags function
  const sortTags = (tags: string[]) => {
    return tags.sort((a, b) => {
      const aSelected = selectedTags.includes(a);
      const bSelected = selectedTags.includes(b);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return a.localeCompare(b);
    });
  };

  // Filter and sort tags based on search query and selected status
  const filteredSortedTags = sortTags(
    initialTags.filter(tag =>
      tag.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  useEffect(() => {
    // Set the page background
    document.body.style.background =
      "radial-gradient(30% 40% at 40% 30%, rgba(33, 36, 41, .5) 0%, rgba(33, 36, 41, 0) 100%) no-repeat, url( '/images/acct_creation_bg.jpg' ) -45vw 0 no-repeat, #212429";
    // Set the tab title
    document.title = `Tags Selection`;
  }, [isViewport740]);

  // Function to handle tag selection
  const handleTagSelect = (tag: string) => {
    // Check if the tag is already selected
    if (selectedTags.includes(tag)) {
      // If selected, remove it from the selected tags array
      setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
    } else {
      // If not selected, add it to the selected tags array
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Function to handle submission of selected tags
  const handleSubmit = () => {
    if (selectedTags.length >= 3) {
      // If at least 3 tags are selected, proceed with further actions
      // For example, you might want to save the selected tags to the user's profile
      submitSelectedUserTagsToBackend(selectedTags);
      console.log('Selected Tags:', selectedTags);
      // Redirect the user to the next step or page
    } else {
      // If less than 3 tags are selected, display a message to the user
      toast.warn('Please select at least 3 tags to continue.');
    }
  };

  return (
    <>
      <Header />
      <div className="tag-select-container">
        <div className="user-tags-warning">
          <h2>Please select at least 3 tags to proceed.</h2>
        </div>
        <div className="tags-search-container">
          <input
            type="text"
            className="tags-search-input"
            placeholder="Search tags..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Render tag options */}
        <div className="tag-options">
          {filteredSortedTags.map(tag => (
            <div
              key={tag}
              className={`tag-option ${
                selectedTags.includes(tag) ? 'selected' : ''
              }`}
              onClick={() => handleTagSelect(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
        <button className="tags-submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <Footer />
    </>
  );
};

export default UserTags;
