// Next.js 15 Route Parameter Types
export interface SyncRouteParams {
  params: {
    id: string;
  };
}

export interface AsyncRouteParams {
  params: Promise<{
    id: string;
  }>;
}

// Generic route params for different scenarios
export interface RouteParams<T = { id: string }> {
  params: T;
}

export interface AsyncRouteParamsGeneric<T = { id: string }> {
  params: Promise<T>;
}

// Common route parameter patterns
export interface UserRouteParams {
  params: {
    id: string;
  };
}

export interface RecipeRouteParams {
  params: {
    id: string;
  };
}

export interface AsyncUserRouteParams {
  params: Promise<{
    id: string;
  }>;
}

export interface AsyncRecipeRouteParams {
  params: Promise<{
    id: string;
  }>;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Database utility types
export type DatabaseId = string;
export type SerialId = number;

// User types for Clerk integration
export interface ClerkUser {
  id: string;
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  bio?: string;
  profileImageUrl?: string;
  isPrivate?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Recipe types
export interface Recipe {
  id: string;
  userId: string;
  title: string;
  description?: string;
  instructions?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecipeWithAuthor extends Recipe {
  author: ClerkUser;
}

export interface RecipeWithDetails extends RecipeWithAuthor {
  ingredients: RecipeIngredient[];
  images: RecipeImage[];
  categories: Category[];
  tags: Tag[];
  nutrition?: Nutrition;
  ratings: Rating[];
  comments: Comment[];
}

// Component types
export interface RecipeIngredient {
  recipeId: string;
  ingredientId: number;
  quantity?: string;
  unit?: string;
  order?: number;
  ingredient: Ingredient;
}

export interface Ingredient {
  id: number;
  name: string;
}

export interface RecipeImage {
  id: number;
  recipeId: string;
  imageUrl: string;
  altText?: string;
  isPrimary: boolean;
  order?: number;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Nutrition {
  id: number;
  recipeId: string;
  calories?: number;
  protein?: number;
  carbohydrates?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Rating {
  id: number;
  recipeId: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  user: ClerkUser;
}

export interface Comment {
  id: number;
  recipeId: string;
  userId: string;
  text: string;
  createdAt: Date;
  user: ClerkUser;
}

// Search and filter types
export interface RecipeFilters {
  category?: string;
  tags?: string[];
  search?: string;
  userId?: string;
  isPublished?: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: 'newest' | 'oldest' | 'title' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

// Form types
export interface CreateRecipeData {
  title: string;
  description?: string;
  instructions?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  ingredients: {
    name: string;
    quantity?: string;
    unit?: string;
  }[];
  categories?: string[];
  tags?: string[];
  images?: {
    url: string;
    altText?: string;
    isPrimary?: boolean;
  }[];
  nutrition?: Partial<Omit<Nutrition, 'id' | 'recipeId' | 'createdAt' | 'updatedAt'>>;
}

export interface UpdateRecipeData extends Partial<CreateRecipeData> {
  isPublished?: boolean;
}

// Error types
export interface DatabaseError extends Error {
  code?: string;
  constraint?: string;
  table?: string;
  column?: string;
}

export interface ValidationError extends Error {
  field?: string;
  value?: any;
  constraint?: string;
} 