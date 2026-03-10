export type UserData = {
    _id: string;
    name: string;
    email: string;
    role: "admin" | "user";
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v?: number;
};

export type MeResponse = {
    message: string;
    user: UserData;
};

export type LoginResponse = {
    message: string;
};