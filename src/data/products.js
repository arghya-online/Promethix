export const CATEGORIES = [
    "3D Printed Mementoes",
    "Table Lamps",
    "Vases",
    "Lithophanes",
    "God and Goddess Miniatures",
    "Artifacts",
    "Custom Projects",
];

export const PRODUCTS = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    name: `Promethix Creation #${i + 1}`,
    category: CATEGORIES[i % CATEGORIES.length],
    price: (i + 1) * 500 + 499,
    description: "High-quality 3D printed artifact crafted with precision.",
    images: [
        `https://images.unsplash.com/photo-${[
            "1581092160562-40aa08e78837",
            "1505740420928-5e560c06d30e",
            "1517646287270-a5a9ca602e5c",
            "1550745165-9bc0b252726f"
        ][i % 4]
        }?auto=format&fit=crop&q=80&w=400`,
    ],
    customizable: i % 3 === 0,
}));
