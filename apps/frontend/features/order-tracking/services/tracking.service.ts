import axiosInstance from "@/lib/http/axios";
import { QUERIES } from "@/queries/queries";
import { TrackedOrder, TrackingFormData } from "../types/tracking.types";

export const trackingService = {
    trackOrder: async (data: TrackingFormData): Promise<TrackedOrder> => {
        const response = await axiosInstance.get(QUERIES.order.TRACK, {
            params: {
                orderNumber: data.orderNumber,
                email: data.email
            }
        });
        return response.data.order;
    }
};
