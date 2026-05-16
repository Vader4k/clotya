export type UserData = {
    _id: string;
    name: string;
    email: string;
    role: "admin" | "user";
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    phone: string,
    streetAddress?: string,
    apartment?: string,
    city?: string,
    state?: string,
    postalCode?: string,
    country?: string,
};

export type MeResponse = {
    message: string;
    user: UserData;
};

export type LoginResponse = {
    message: string;
};