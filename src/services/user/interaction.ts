import Api from 'services/api';
import { toast } from 'react-toastify';

class Interaction extends Api {
  constructor() {
    super('user/interaction');
  }

  public changeTags = async (tags: number[]) => {
    const accessToken = this.getAccessToken();

    const endpoint = `tags`;
    const data = { tags };
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.put(endpoint, data, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response.data;
  };

  public getTags = async () => {
    const endpoint = `tags`;

    const response = await this.get(endpoint);

    return response.data;
  };

  public addToLibrary = async (itemsIds: number[]) => {
    const accessToken = this.getAccessToken();

    const endpoint = `library`;
    const data = { itemsIds };
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.post(endpoint, data, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response;
  };

  public removeFromLibrary = async (itemsIds: number[]) => {
    const accessToken = this.getAccessToken();

    const endpoint = `library`;
    const config = {
      data: { itemsIds },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.delete(endpoint, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response;
  };

  public clearLibrary = async () => {
    const accessToken = this.getAccessToken();

    const endpoint = `library`;
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.delete(endpoint, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response;
  };

  public addToWishlist = async (itemsIds: number[]) => {
    const accessToken = this.getAccessToken();

    const endpoint = `wishlist`;
    const data = { itemsIds };
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.post(endpoint, data, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response;
  };

  public removeFromWishlist = async (itemsIds: number[]) => {
    const accessToken = this.getAccessToken();

    const endpoint = `wishlist`;
    const config = {
      data: { itemsIds },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.delete(endpoint, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response;
  };

  public clearWishlist = async () => {
    const accessToken = this.getAccessToken();

    const endpoint = `wishlist`;
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.delete(endpoint, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response;
  };

  public addToCart = async (itemsIds: number[]) => {
    const accessToken = this.getAccessToken();

    const endpoint = `cart`;
    const data = { itemsIds };
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.post(endpoint, data, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response;
  };

  public removeFromCart = async (itemsIds: number[]) => {
    const accessToken = this.getAccessToken();

    const endpoint = `cart`;
    const config = {
      data: { itemsIds },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.delete(endpoint, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response;
  };

  public clearCart = async () => {
    const accessToken = this.getAccessToken();

    const endpoint = `cart`;
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.delete(endpoint, config);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.warn(response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return response;
  };

  public getLibrary = async () => {
    const accessToken = this.getAccessToken();

    const endpoint = `library`;
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.get(endpoint, config);

    return response.data;
  };

  public getWishlist = async () => {
    const accessToken = this.getAccessToken();

    const endpoint = `wishlist`;
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.get(endpoint, config);

    return response.data;
  };

  public getCart = async () => {
    const accessToken = this.getAccessToken();

    const endpoint = `cart`;
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.get(endpoint, config);

    return response.data;
  };

  public reviewGame = async (
    gameId: number,
    positive: boolean,
    content: string,
  ) => {
    const accessToken = this.getAccessToken();

    const endpoint = `review`;
    const data = { gameId, positive, content };
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.post(endpoint, data, config);

    if (response.status === 201) {
      toast.success(response.data.message);
    }

    return response.data;
  };

  public getReviews = async () => {
    const accessToken = this.getAccessToken();

    const endpoint = `reviews`;
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await this.get(endpoint, config);

    return response.data;
  };
}

export const {
  changeTags,
  getTags,
  addToLibrary,
  removeFromLibrary,
  clearLibrary,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  addToCart,
  removeFromCart,
  clearCart,
  getLibrary,
  getWishlist,
  getCart,
  reviewGame,
  getReviews,
} = new Interaction();
