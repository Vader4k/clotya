export type BlogCardProps = {
    id: string;
    title: string;
    slug: string;
    categories: string[];
    date: string;
    image: string;
    intro: string;
}

export interface BlogDetails extends BlogCardProps {
    details: string;
    tags: string[];
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