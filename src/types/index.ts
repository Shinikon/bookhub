
export type BookStatus = 'planned' | 'reading' | 'read' | 'abandoned';

export type Book = {
  id: number;
  title: string;
  author: string;
  description?: string;
  genre: string[];
  year: number;
  isbn?: string;
  cover?: string;
  status: BookStatus;
  isFavorite?: boolean;    
  userRating?: number;     
  userReview?: string;      
  addedAt: string;
};