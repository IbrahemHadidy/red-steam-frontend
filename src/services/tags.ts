import { toast } from "react-toastify";

export const fetchUserTagsFromBackend = async () => {
  try {
    // Make a request to your backend API to fetch tags
    const response = await fetch('your-backend-url/tags');
    if (!response.ok) {
      toast.error('Failed to fetch tags');
      throw new Error('Failed to fetch tags');
    }
    const data = await response.json();
    return data.tags; // Assuming the response contains a 'tags' array
  } catch (error) {
    toast.error('Error fetching tags');
    console.error('Error fetching tags:', error);
  }
};

// Function to submit selected tags to the backend
export const submitSelectedUserTagsToBackend = async (selectedTags: string[]) => {
  try {
    // Make a request to your backend API to submit selected tags
    const response = await fetch('your-backend-url/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedTags }),
    });
    if (!response.ok) {
      toast.error('Error submitting selected tags');
      throw new Error('Failed to submit selected tags');
    }
    console.log('Selected tags submitted successfully');
    // Handle success appropriately (e.g., show success message to user)
  } catch (error) {
    toast.error('Error submitting selected tags');
    console.error('Error submitting selected tags:', error);
  }
};
