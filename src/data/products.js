export const CATEGORIES = [
  "3D Printed Mementoes",
  "Table Lamps",
  "Vases",
  "Lithophanes",
  "God and Goddess Miniatures",
  "Artifacts",
  "Custom Projects",
];

const CATEGORY_DATA = {
  "3D Printed Mementoes": {
    price: 999,
    weight: "120g",
    printTime: "6 hours",
    dimensions: "8.0 x 8.0 x 12.0 cm",
  },
  "Table Lamps": {
    price: 2499,
    weight: "450g",
    printTime: "18 hours",
    dimensions: "15.0 x 15.0 x 25.0 cm",
  },
  Vases: {
    price: 1299,
    weight: "200g",
    printTime: "10 hours",
    dimensions: "12.0 x 12.0 x 22.0 cm",
  },
  Lithophanes: {
    price: 799,
    weight: "80g",
    printTime: "5 hours",
    dimensions: "10.0 x 0.3 x 10.0 cm",
  },
  "God and Goddess Miniatures": {
    price: 1599,
    weight: "150g",
    printTime: "12 hours",
    dimensions: "7.0 x 7.0 x 15.0 cm",
  },
  Artifacts: {
    price: 1899,
    weight: "300g",
    printTime: "14 hours",
    dimensions: "18.0 x 12.0 x 10.0 cm",
  },
  "Custom Projects": {
    price: 2999,
    weight: "500g",
    printTime: "20 hours",
    dimensions: "20.0 x 20.0 x 20.0 cm",
  },
};

export const PRODUCTS = Array.from({ length: 21 }).map((_, i) => {
  const category = CATEGORIES[i % CATEGORIES.length];
  const data = CATEGORY_DATA[category];
  const materials = ["PLA+", "PETG", "TPU", "Resin"];
  const material = materials[i % materials.length];

  return {
    id: i + 1,
    name: `${category} Edition #${Math.floor(i / CATEGORIES.length) + 1}`,
    category: category,
    price: data.price,
    rating: "4.9",
    reviews: 42,
    description:
      "A masterfully crafted 3D printed artifact, designed for functional elegance and durability.",
    longDescription:
      "Experience the perfect blend of modern engineering and artistic design. This piece is meticulously 3D printed using high-grade polymers, ensuring structural integrity while maintaining a lightweight profile. Whether for home decor or practical utility, it stands as a testament to precision manufacturing.",
    specs: {
      material: material,
      weight: data.weight,
      dimensions: data.dimensions,
      printTime: data.printTime,
      layerHeight: "0.12mm",
    },
    features: [
      "Eco-friendly Biodegradable Material",
      "High Impact Resistance",
      "Precision Layer Adhesion",
      "Customizable Color Options",
    ],
    images: [
      `https://images.unsplash.com/photo-${
        [
          "1581092160562-40aa08e78837",
          "1505740420928-5e560c06d30e",
          "1517646287270-a5a9ca602e5c",
          "1550745165-9bc0b252726f",
        ][i % 4]
      }?auto=format&fit=crop&q=80&w=800`,
      `https://images.unsplash.com/photo-${
        [
          "1615655406736-b37c4fabf923",
          "1589820296156-2454dad33d94",
          "1513519245088-0e12902e5a38",
          "1593106577609-b67f136e053a",
        ][i % 4]
      }?auto=format&fit=crop&q=80&w=800`,
    ],
    customizable: i % 3 === 0,
  };
});
