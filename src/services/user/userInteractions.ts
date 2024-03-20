import axios from 'axios';
import { toast } from 'react-toastify';
const env = import.meta.env;

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      return Promise.reject(error.response);
    }
    return Promise.reject(error);
  },
);

export async function changeTags(userId: string, tags: string[]) {
  const url = `${env.VITE_BACKEND_API_URL}/api/user/interaction/change-tags`;
  const data = { userId, tags };
  const errorMessage = 'An error occurred. Please try again later';

  try {
    const response = await axios.post(url, data);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else {
      toast.error(errorMessage);
    }
    return response.data;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message || 'Internal Server Error');
    console.error('Error changing tags:', error);
  }
}

export async function addToLibrary(userId: string, itemId: string) {
  const url = `${env.VITE_BACKEND_API_URL}/api/user/interaction/add-to-library`;
  const data = { userId, itemId };
  const errorMessage = 'An error occurred. Please try again later.';

  try {
    const response = await axios.post(url, data);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error(errorMessage);
    }
    return response;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message || 'Internal Server Error');
    console.error('Error adding to library:', error);
  }
}

export async function addToCart(userId: string, itemId: string) {
  const url = `${env.VITE_BACKEND_API_URL}/api/user/interaction/add-to-cart`;
  const data = { userId, itemId };
  const errorMessage = 'An error occurred. Please try again later.';

  try {
    const response = await axios.post(url, data);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error(errorMessage);
    }
    return response;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message || 'Internal Server Error');
    console.error('Error adding to cart:', error);
  }
}

export async function removeFromCart(userId: string, itemId: string) {
  const url = `${env.VITE_BACKEND_API_URL}/api/user/interaction/remove-from-cart`;
  const data = { userId, itemId };
  const errorMessage = 'An error occurred. Please try again later.';

  try {
    const response = await axios.delete(url, { data });
    if (response.status === 200) {
      return response;
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error(errorMessage);
    }
    return response;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message || 'Internal Server Error');
    console.error('Error removing from cart:', error);
  }
}

export async function clearCart(userId: string) {
  const url = `${env.VITE_BACKEND_API_URL}/api/user/interaction/clear-cart`;
  const data = { userId };
  const errorMessage = 'An error occurred. Please try again later.';

  try {
    const response = await axios.delete(url, { data });
    if (response.status === 200) {
      return response;
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error(errorMessage);
    }
    return response;
    return response;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message || 'Internal Server Error');
    console.error('Error removing all from cart:', error);
  }
}

export async function addToWishlist(userId: string, itemId: string) {
  const url = `${env.VITE_BACKEND_API_URL}/api/user/interaction/add-to-wishlist`;
  const data = { userId, itemId };
  const errorMessage = 'An error occurred. Please try again later.';

  try {
    const response = await axios.post(url, data);
    if (response.status === 400) {
      toast.warn(response.data.message);
    } else if (response.status !== 200) {
      toast.error(errorMessage);
    }
    return response;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message || 'Internal Server Error');
    console.error('Error adding to wishlist:', error);
  }
}

export async function removeFromWishlist(userId: string, itemId: string) {
  const url = `${env.VITE_BACKEND_API_URL}/api/user/interaction/remove-from-wishlist`;
  const data = { userId, itemId };
  const errorMessage = 'An error occurred. Please try again later.';

  try {
    const response = await axios.delete(url, { data });
    if (response.status === 400) {
      toast.warn(response.data.message);
    } else if (response.data.message === 'Item not in wishlist') {
      return response;
    } else if (response.status !== 200) {
      toast.error(errorMessage);
    }
    return response;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message || 'Internal Server Error');
    console.error('Error removing from wishlist:', error);
  }
}

export async function getCartItems(userId: string) {
  const url = `${env.VITE_BACKEND_API_URL}/api/user/interaction/get-cart-items`;
  const data = { userId };

  try {
    const response = await axios.get(url, { params: data });
    if (response.status === 404) {
      toast.info(response.data.message);
    }
    return response.data;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message || 'Internal Server Error');
    console.error('Error fetching cart items:', error);
  }
}

export async function getWishlistItems(userId: string) {
  const url = `${env.VITE_BACKEND_API_URL}/api/user/interaction/get-wishlist-items`;
  const data = { userId };

  try {
    const response = await axios.get(url, { params: data });
    if (response.status === 404) {
      toast.info(response.data.message);
    }
    return response.data;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message || 'Internal Server Error');
    console.error('Error fetching wishlist items:', error);
  }
}
