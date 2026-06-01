/** 
 * Section 1: Core & Base Types 
 */

export interface BlogCardProps {
    _id: string;
    title: string;
    slug: string;
    categories: string[];
    date: string;
    image: string;
    intro: string;
    style?: string;
    blogPage?: boolean;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

/** 
 * Section 2: Specialized Blog Variants 
 */

export interface BlogDetails extends BlogCardProps {
    details: string;
    author: string;
    authorImage: string;
    authorBio: string;
    comments: Comment[];
}

export interface Comment {
    id: string;
    author: string;
    authorImage: string;
    comment: string;
    date: string;
}

export interface BlogResponse {
    blogs: Omit<BlogCardProps, "style" | "blogPage">[];
    pagination: {
        currentPage: number;
        limit: number;
        totalBlogs: number;
        totalPages: number;
    }
}

export interface BlogPageProps {
  searchParams: Promise<{
    category?: string;
    tag?: string;
    search?: string;
    page?: string;
  }>;
}