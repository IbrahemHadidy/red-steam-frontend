import { FC, useContext, useEffect, useState } from 'react';
import useSoftNavigate from 'hooks/useSoftNavigate';
import { toast } from 'react-toastify';
import useResponsiveViewport from 'hooks/useResponsiveViewport';
import { changeTags } from 'services/user/userInteractions';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import './UserTags.scss';
import { AuthContext } from 'contexts/AuthContext';
import useDynamicMetaTags from 'hooks/useDynamicMetaTags';

const UserTags: FC = () => {
  const navigate = useSoftNavigate();
  const { userData } = useContext(AuthContext);
  const isViewport740 = useResponsiveViewport(740);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [initialTags, setInitialTags] = useState<string[]>([]);
  const [isUserDataFetched, setIsUserDataFetched] = useState(false);

  useEffect(() => {
    if (!isUserDataFetched && userData && userData.tags.length < 3) {
      toast.warn('Please add at least 3 tags to continue!');
      setIsUserDataFetched(true);
    }
  }, [userData, isUserDataFetched]);

  // Fetch tags from the backend when the component mounts
  useEffect(() => {
    if (userData) {
      const { tags } = userData;
      // TODO: Delete the demo tags and replace with tags from the backend
      const initialTags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'];
      setInitialTags(initialTags);
      setSelectedTags(tags);
    }
  }, [userData]);

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

  useDynamicMetaTags({
    title: `Tags Selection`,
    background:
      "radial-gradient(30% 40% at 40% 30%, rgba(33, 36, 41, .5) 0%, rgba(33, 36, 41, 0) 100%) no-repeat, url( '/images/acct_creation_bg.jpg' ) -45vw 0 no-repeat, #212429"
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
      if (!userData) return toast.warn('User data not found.');
      changeTags(userData?._id, selectedTags);
      navigate('/');
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
