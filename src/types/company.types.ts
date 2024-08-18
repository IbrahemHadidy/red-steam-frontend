export interface Company {
  id: number;
  name: string;
  website: string;
}

export interface Publisher extends Company {}
export interface Developer extends Company {}
