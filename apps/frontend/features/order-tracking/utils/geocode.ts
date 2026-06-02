// Geocoding utility using OpenStreetMap Nominatim API
// Falls back to a local lookup table for common cities

const CITY_COORDINATES: Record<string, [number, number]> = {
    // Nigeria
    'lagos': [6.5244, 3.3792],
    'abuja': [9.0579, 7.4951],
    'port harcourt': [4.8156, 7.0498],
    'kano': [12.0022, 8.5920],
    'ibadan': [7.3776, 3.9470],
    'kaduna': [10.5105, 7.4165],
    'benin city': [6.3350, 5.6037],
    'enugu': [6.4584, 7.5464],
    'warri': [5.5167, 5.7500],
    'calabar': [4.9517, 8.3220],
    'aba': [5.1066, 7.3667],
    'jos': [9.8965, 8.8583],
    'ilorin': [8.4966, 4.5426],
    'abeokuta': [7.1475, 3.3619],
    'owerri': [5.4836, 7.0333],
    'uyo': [5.0377, 7.9128],
    'asaba': [6.1944, 6.7336],
    'lekki': [6.4698, 3.5852],
    'ikeja': [6.6018, 3.3515],
    'yaba': [6.5095, 3.3711],
    // International
    'london': [51.5074, -0.1278],
    'new york': [40.7128, -74.0060],
    'paris': [48.8566, 2.3522],
    'dubai': [25.2048, 55.2708],
    'accra': [5.6037, -0.1870],
    'nairobi': [-1.2921, 36.8219],
    'johannesburg': [-26.2041, 28.0473],
    'cairo': [30.0444, 31.2357],
};

// Default warehouse location (Lagos, Nigeria)
export const WAREHOUSE_LOCATION: [number, number] = [6.4698, 3.5852];

export async function geocodeCity(city: string, state?: string, country?: string): Promise<[number, number]> {
    const cityLower = city.toLowerCase().trim();

    // Try local lookup first
    if (CITY_COORDINATES[cityLower]) {
        return CITY_COORDINATES[cityLower];
    }

    // Try Nominatim API
    try {
        const query = [city, state, country].filter(Boolean).join(', ');
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
            {
                headers: {
                    'User-Agent': 'Clotya-OrderTracking/1.0'
                }
            }
        );

        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            }
        }
    } catch {
        // Silently fall through to fallback
    }

    // Fallback: return a slightly offset warehouse location
    return [WAREHOUSE_LOCATION[0] + 2, WAREHOUSE_LOCATION[1] + 1];
}
