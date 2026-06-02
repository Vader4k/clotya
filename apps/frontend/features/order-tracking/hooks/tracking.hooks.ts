import { useMutation } from '@tanstack/react-query';
import { trackingService } from '../services/tracking.service';
import { TrackingFormData } from '../types/tracking.types';

export const useTrackOrder = () => {
    return useMutation({
        mutationFn: (data: TrackingFormData) => trackingService.trackOrder(data),
    });
};
