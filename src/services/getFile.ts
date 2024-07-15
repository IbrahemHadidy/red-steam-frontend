import axios from 'configs/axiosConfig';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

class GetFile {
  async getImage(id: string) {
    try {
      const response = await axios.get(`${backendUrl}/api/file/image/${id}`, {
        responseType: 'blob',
      });

      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  async getVideo(id: string) {
    try {
      const response = await axios.get(`${backendUrl}/api/file/video/${id}`, {
        responseType: 'stream',
      });

      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  }
}

export const { getImage, getVideo } = new GetFile();
