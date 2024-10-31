export interface Category {
  title: string;
  link: string;
  img: string;
  gradRGP: string;
}

export type OpenedTab = 'New & Trending' | 'Top Sellers' | 'Popular Upcoming' | 'Specials';

export interface queueGame {
  imageNumber: string;
  imageLink: string;
}

export interface LinkItem {
  to: string;
  text: string;
}
