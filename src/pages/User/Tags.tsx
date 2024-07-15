'use client';

// React
import { useContext, useEffect, useState } from 'react';

// Next.js
import { useRouter } from 'next/navigation';

// Toast notifications
import { toast } from 'react-toastify';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Components
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';

// Hooks
import useDynamicMetaTags from 'hooks/useDynamicMetaTags';
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Services
import { changeTags } from 'services/user/interaction';

// Styles
import './Tags.scss';

// Types
import type { ChangeEvent, FC } from 'react';

const Tags: FC = () => {
  // Initializations
  const router = useRouter();
  const isViewport740 = useResponsiveViewport(740);

  // Contexts
  const { userData } = useContext(AuthContext);

  // States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<{ id: number; name: string }[]>([]);
  const [initialTags, setInitialTags] = useState<{ id: number; name: string }[]>([]);
  const [isUserDataFetched, setIsUserDataFetched] = useState<boolean>(false);

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
      const initialTags = [
        { id: 1, name: 'Demo Tag 1' },
        { id: 2, name: 'Demo Tag 2' },
        { id: 3, name: 'Demo Tag 3' },
        { id: 4, name: 'Demo Tag 4' },
        { id: 5, name: 'Demo Tag 5' },
        { id: 6, name: 'Demo Tag 6' },
        { id: 7, name: 'Demo Tag 7' },
        { id: 8, name: 'Demo Tag 8' },
      ];
      setInitialTags(initialTags);
      setSelectedTags(tags);
    }
  }, [userData]);

  // Filter and sort tags based on search query and selected status
  const filteredSortedTags = initialTags
    .filter((tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      const aSelected = selectedTags.some((selectedTag) => selectedTag.name === a.name);
      const bSelected = selectedTags.some((selectedTag) => selectedTag.name === b.name);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return a.name.localeCompare(b.name);
    });

  useDynamicMetaTags(
    {
      title: `Tags Selection`,
      background:
        "radial-gradient(30% 40% at 40% 30%, rgba(33, 36, 41, .5) 0%, rgba(33, 36, 41, 0) 100%) no-repeat, url( '/images/acct_creation_bg.jpg' ) -45vw 0 no-repeat, #212429",
    },
    [isViewport740]
  );

  // Function to handle tag selection
  const handleTagSelect = (tag: { id: number; name: string }) => {
    // Check if the tag is already selected
    if (selectedTags.includes(tag)) {
      // If selected, remove it from the selected tags array
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
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
      changeTags(selectedTags.map((tag) => tag.id));
      router.push('/');
    } else {
      // If less than 3 tags are selected, display a message to the user
      toast.warn('Please select at least 3 tags to continue.');
    }
  };

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
            onChange={handleSearchQueryChange}
          />
        </div>
        {/* Render tag options */}
        <div className="tag-options">
          {filteredSortedTags.map((tag) => (
            <div
              key={tag.id}
              className={`tag-option ${selectedTags.includes(tag) ? 'selected' : ''}`}
              onClick={() => handleTagSelect(tag)}
            >
              {tag.name}
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

export default Tags;
