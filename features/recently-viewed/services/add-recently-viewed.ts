export const addRecentlyViewed = (productId: string) => {
    const stored = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");

    const updated = [
        productId,
        ...stored.filter((id: string) => id !== productId)
    ]

    localStorage.setItem("recentlyViewed", JSON.stringify(updated.slice(0, 6)));
}