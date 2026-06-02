import { OrderStatus } from '../types/tracking.types';

/**
 * Calculate simulated package position along a route based on order status and timestamps.
 * Returns a value between 0 and 1 representing progress along the route.
 */
export function getRouteProgress(status: OrderStatus, createdAt: string, updatedAt: string): number {
    switch (status) {
        case 'pending':
            return 0;
        case 'processing':
            return 0.1;
        case 'shipped': {
            // Simulate movement based on time elapsed since status changed to shipped
            const shippedAt = new Date(updatedAt).getTime();
            const now = Date.now();
            const elapsed = now - shippedAt;
            const estimatedTransitMs = 5 * 24 * 60 * 60 * 1000; // 5 days in ms

            // Progress between 0.2 and 0.85 (never reaches destination until delivered)
            const transitProgress = Math.min(elapsed / estimatedTransitMs, 1);
            return 0.2 + transitProgress * 0.65;
        }
        case 'delivered':
            return 1;
        case 'cancelled':
            return 0;
        default:
            return 0;
    }
}

/**
 * Interpolate a point along a line between two coordinates.
 */
export function interpolatePosition(
    start: [number, number],
    end: [number, number],
    progress: number
): [number, number] {
    return [
        start[0] + (end[0] - start[0]) * progress,
        start[1] + (end[1] - start[1]) * progress,
    ];
}

/**
 * Generate intermediate points along a curved route for a more natural-looking path.
 */
export function generateRoutePath(
    start: [number, number],
    end: [number, number],
    segments: number = 50
): [number, number][] {
    const points: [number, number][] = [];
    const midLat = (start[0] + end[0]) / 2;
    const midLng = (start[1] + end[1]) / 2;

    // Add a slight curve by offsetting the midpoint
    const latDiff = Math.abs(end[0] - start[0]);
    const lngDiff = Math.abs(end[1] - start[1]);
    const curveOffset = Math.max(latDiff, lngDiff) * 0.15;

    const controlLat = midLat + curveOffset;
    const controlLng = midLng;

    for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        // Quadratic Bezier curve
        const lat = (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * controlLat + t * t * end[0];
        const lng = (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * controlLng + t * t * end[1];
        points.push([lat, lng]);
    }

    return points;
}
