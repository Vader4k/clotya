import { ProfileSchemaType, AddressSchemaType, PasswordSchemaType, UserLoginSchemaType, UserRegisterSchemaType } from "../schema/accountSchema";

// Mock Data
export type Order = {
    id: string;
    date: string;
    total: number;
    status: 'Delivered' | 'Processing' | 'Cancelled' | 'Shipped';
    items: number;
};

const mockOrders: Order[] = [
    { id: '#ORD-7352', date: '2023-10-15', total: 120.50, status: 'Delivered', items: 3 },
    { id: '#ORD-8921', date: '2023-11-02', total: 45.00, status: 'Processing', items: 1 },
    { id: '#ORD-9012', date: '2023-11-20', total: 299.99, status: 'Shipped', items: 2 },
    { id: '#ORD-1123', date: '2024-01-05', total: 65.00, status: 'Delivered', items: 1 },
];

const mockUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: {
        streetAddress: '123 Main St',
        apartment: 'Apt 4B',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'United States',
    }
}

// Utility for mock delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const accountClientService = {
    login: async (data: UserLoginSchemaType) => {
        await delay(800);
        return { message: "Login successful", user: { email: data.email } };
    },
    
    register: async (data: UserRegisterSchemaType) => {
        await delay(800);
        return { message: "Account created successfully", user: { email: data.email } };
    },
    
    logout: async () => {
        await delay(500);
        return { message: "Logged out successfully" };
    },

    getProfile: async () => {
        await delay(600);
        return mockUser;
    },

    updateProfile: async (data: ProfileSchemaType) => {
        await delay(800);
        return { message: "Profile updated successfully", data };
    },

    updatePassword: async (data: PasswordSchemaType) => {
        await delay(1000);
        return { message: "Password changed successfully" };
    },

    updateAddress: async (data: AddressSchemaType) => {
        await delay(800);
        return { message: "Address updated successfully", data };
    },

    getOrders: async (): Promise<Order[]> => {
        await delay(900);
        return mockOrders;
    }
};
