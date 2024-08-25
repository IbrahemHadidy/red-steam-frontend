'use client';

// React
import { useContext, useEffect, useState } from 'react';

// NextJS
import Head from 'next/head';
import { useRouter } from 'next/navigation';

// Toast notifications
import { toast } from 'react-toastify';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Custom Hooks
import useDynamicBackground from 'hooks/useDynamicBackground';

// Services
import { getAllTags } from 'services/common/tags';
import { changeTags } from 'services/user/interaction';

// Types
import type { ChangeEvent, FC, JSX } from 'react';
import type { Tag } from 'types/tag.types';

const TagsPage: FC = (): JSX.Element => {
  // Init
  const router = useRouter();
  useDynamicBackground(
    "radial-gradient(30% 40% at 40% 30%, rgba(33, 36, 41, .5) 0%, rgba(33, 36, 41, 0) 100%) no-repeat, url( '/images/acct_creation_bg.jpg' ) -45vw 0 no-repeat, #212429"
  );

  // Contexts
  const { userData, fetchData } = useContext(AuthContext);

  // States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [initialTags, setInitialTags] = useState<Tag[]>([]);

  // Fetch tags from the backend when the component mounts
  useEffect(() => {
    if (userData) {
      const tagsData = async (): Promise<void> => {
        const { tags }: { tags: Tag[] } = userData;
        const initialTags: Tag[] = await getAllTags();
        setInitialTags(initialTags);
        setSelectedTags(tags);
      };
      tagsData();
    }
  }, [userData]);

  // Filter and sort tags based on search query and selected status
  const filteredSortedTags = initialTags
    .filter((tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      const aSelected: boolean = selectedTags.some((selectedTag) => selectedTag.name === a.name);
      const bSelected: boolean = selectedTags.some((selectedTag) => selectedTag.name === b.name);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return a.name.localeCompare(b.name);
    });

  // Function to handle tag selection
  const handleTagSelect = (tag: Tag): void => {
    const isTagSelected: boolean = selectedTags.some((selectedTag) => selectedTag.id === tag.id);

    if (isTagSelected) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Function to handle submission of selected tags
  const handleSubmit = async (): Promise<void> => {
    if (selectedTags.length >= 3) {
      if (!userData) {
        toast.warn('User data not found.');
        return;
      }

      const selectedTagIds: number[] = selectedTags
        .filter((tag) => tag !== undefined && tag !== null && tag.id)
        .map((tag) => tag.id);

      await changeTags(selectedTagIds);
      fetchData();
      setTimeout(() => {
        router.push('/');
      }, 500);
    } else {
      toast.warn('Please add at least 3 tags to continue.');
    }
  };

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Tags Selection</title>
      </Head>
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
    </>
  );
};

export default TagsPage;
