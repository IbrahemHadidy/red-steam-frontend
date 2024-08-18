export interface ThumbnailsEntry {
  mainImage: string;
  backgroundImage: string;
  menuImg: string;
  horizontalHeaderImage: string;
  verticalHeaderImage: string;
  smallHeaderImage: string;
  searchImage: string;
  tabImage: string;
}

export interface ImageEntry {
  link: string;
  featured?: boolean;
  order: number;
}

export interface VideoEntry {
  link: string;
  posterLink: string;
  order: number;
}
