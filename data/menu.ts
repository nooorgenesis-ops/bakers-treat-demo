export type MenuCategoryType =
  | "Burgers"
  | "Pizza"
  | "Momos"
  | "Fried Chicken"
  | "Fries & Sides"
  | "Pasta"
  | "Maggi"
  | "Salads"
  | "Shakes & Cold Beverages"
  | "Hot Beverages"
  | "Desserts"
  | "Special Beverages";

export interface MenuItemVariant {
  name: string;
  price: number;
}

export type PriceVerificationStatus =
  | "confirmed"
  | "awaiting_owner_confirmation"
  | "unreadable";

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategoryType;
  description: string;
  price: number | null; // null if unreadable from photograph
  variants?: MenuItemVariant[]; // For products with multiple variants (e.g., Regular vs Piri Piri, Half vs Full)
  available: boolean;
  isVeg: boolean | null; // null if not explicitly indicated by source
  isPopular?: boolean;
  sourceImage?: string; // Reference to source photo (e.g., "Photo 1", "Menu Board A")
  priceVerificationStatus: PriceVerificationStatus;
  notes?: string; // Conflicting prices, OCR uncertainty, or owner review notes
  isArchivedOffer?: boolean; // For dated promotional offers
}

export interface CategoryInfo {
  id: MenuCategoryType;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface MenuReviewItem {
  productId: string;
  productName: string;
  category: MenuCategoryType;
  issueType: "conflicting_prices" | "uncertain_transcription" | "unreadable_price" | "duplicate_entry";
  details: string;
  sources: string[];
}

export const menuCategories: CategoryInfo[] = [
  {
    id: "Burgers",
    name: "Burgers",
    description: "Layered gourmet patties, handcrafted brioche buns & signature dressings.",
    image: "/images/category-burgers.webp",
    imageAlt: "Gourmet artisan burger with melted cheese and fresh crisp lettuce",
  },
  {
    id: "Pizza",
    name: "Pizza",
    description: "Stone-fired thin crusts, rich herb marinara & stretchy premium mozzarella.",
    image: "/images/category-pizza.webp",
    imageAlt: "Stone-baked gourmet pizza with fresh basil and melted mozzarella",
  },
  {
    id: "Momos",
    name: "Momos",
    description: "Delicate steamed & crisp pan-fried dumplings paired with fiery dips.",
    image: "/images/category-momos.webp",
    imageAlt: "Steamed artisanal momos served with spicy red chili sauce",
  },
  {
    id: "Fried Chicken",
    name: "Fried Chicken",
    description: "Crispy coated chicken available in Regular & Piri Piri seasonings across varied sizes.",
    image: "/images/category-fries.webp",
    imageAlt: "Crispy golden fried chicken strips seasoned to perfection",
  },
  {
    id: "Fries & Sides",
    name: "Fries & Sides",
    description: "Golden crispy sides seasoned with peri-peri, loaded cheese & aromatic herbs.",
    image: "/images/category-burgers.webp",
    imageAlt: "Crispy golden seasoned fries with creamy dipping sauces",
  },
  {
    id: "Pasta",
    name: "Pasta",
    description: "Creamy Alfredo, spicy Arrabbiata & hearty pasta preparations with dual variant pricing.",
    image: "/images/category-momos.webp",
    imageAlt: "Rich creamy Italian pasta garnished with fresh herbs and parmesan",
  },
  {
    id: "Maggi",
    name: "Maggi Special",
    description: "Comfort café bowls, classic masala, cheese tossed & vegetable infused Maggi.",
    image: "/images/category-pizza.webp",
    imageAlt: "Hot seasoned café Maggi noodles with vegetables and cheese",
  },
  {
    id: "Salads",
    name: "Salads",
    description: "Crisp seasonal greens, tossed garden dressings & protein-rich café bowls.",
    image: "/images/category-fries.webp",
    imageAlt: "Fresh crisp garden salad with light herb vinaigrette",
  },
  {
    id: "Shakes & Cold Beverages",
    name: "Shakes & Cold Beverages",
    description: "Thick velvety milkshakes, iced refreshers & cold brews.",
    image: "/images/category-shakes.webp",
    imageAlt: "Thick decadent chocolate milkshake with whipped topping",
  },
  {
    id: "Hot Beverages",
    name: "Hot Beverages",
    description: "Freshly brewed artisan coffee, masala tea & rich hot cocoa.",
    image: "/images/category-desserts.webp",
    imageAlt: "Steaming hot cup of freshly brewed artisan café coffee",
  },
  {
    id: "Desserts",
    name: "Desserts",
    description: "Warm fudgy brownies, delicate layered pastries & signature sweet treats.",
    image: "/images/category-desserts.webp",
    imageAlt: "Indulgent dessert platter with chocolate pastry and berries",
  },
  {
    id: "Special Beverages",
    name: "Special Beverages",
    description: "Craft mocktails, seasonal crushes, sparkling coolers & signature café blends.",
    image: "/images/category-shakes.webp",
    imageAlt: "Colorful layered artisan mocktail with fresh citrus garnish",
  },
];

/**
 * Complete typed menu entries from owner photographic source captures.
 * Prices marked with "awaiting_owner_confirmation" until final sign-off.
 */
export const menuItems: MenuItem[] = [
  // Burgers
  {
    id: "b-01",
    name: "Classic Veg Crunch Burger",
    category: "Burgers",
    description: "Golden spiced potato and corn patty, garden slaw, house relish.",
    price: 99,
    available: true,
    isVeg: true,
    isPopular: true,
    sourceImage: "Photo 1 (Burger Board)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "b-02",
    name: "Paneer Tikka Melt Burger",
    category: "Burgers",
    description: "Marinated cottage cheese steak, mint mayo, roasted peppers & melted cheddar.",
    price: 149,
    available: true,
    isVeg: true,
    isPopular: true,
    sourceImage: "Photo 1 (Burger Board)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "b-03",
    name: "Smoky BBQ Paneer Burger",
    category: "Burgers",
    description: "Char-grilled paneer glazed with hickory barbecue sauce and caramelized onions.",
    price: 159,
    available: true,
    isVeg: true,
    sourceImage: "Photo 1 (Burger Board)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "b-04",
    name: "Crispy Chicken Supreme Burger",
    category: "Burgers",
    description: "Double battered crispy chicken breast, spicy garlic mayo, iceberg lettuce.",
    price: 179,
    available: true,
    isVeg: false,
    isPopular: true,
    sourceImage: "Photo 1 (Burger Board)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "b-05",
    name: "Tandoori Chicken Delight Burger",
    category: "Burgers",
    description: "Succulent spiced chicken thigh, tandoori relish, pickled onions in toasted brioche.",
    price: 189,
    available: true,
    isVeg: false,
    sourceImage: "Photo 1 (Burger Board)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },

  // Pizza
  {
    id: "p-01",
    name: "Classic Margherita Royale Pizza",
    category: "Pizza",
    description: "San Marzano style tomato base, fresh basil leaves, extra virgin drizzle & mozzarella.",
    price: 199,
    available: true,
    isVeg: true,
    isPopular: true,
    sourceImage: "Photo 2 (Pizza Menu)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "p-02",
    name: "Farmhouse Veg Overload Pizza",
    category: "Pizza",
    description: "Bell peppers, crisp onions, golden corn, black olives & button mushrooms.",
    price: 249,
    available: true,
    isVeg: true,
    sourceImage: "Photo 2 (Pizza Menu)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "p-03",
    name: "Spicy Peri-Peri Paneer Pizza",
    category: "Pizza",
    description: "Spiced paneer cubes, red paprika, jalapeños, and zesty peri-peri drizzle.",
    price: 269,
    available: true,
    isVeg: true,
    isPopular: true,
    sourceImage: "Photo 2 (Pizza Menu)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "p-04",
    name: "BBQ Chicken Fiesta Pizza",
    category: "Pizza",
    description: "Smoky shredded barbecue chicken, caramelized onions and double mozzarella.",
    price: 299,
    available: true,
    isVeg: false,
    isPopular: true,
    sourceImage: "Photo 2 (Pizza Menu)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "p-05",
    name: "Fiery Chicken Sausage Special Pizza",
    category: "Pizza",
    description: "Sliced gourmet chicken sausages, bird’s eye chili flakes and garlic butter crust.",
    price: 319,
    available: true,
    isVeg: false,
    sourceImage: "Photo 2 (Pizza Menu)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },

  // Momos
  {
    id: "m-01",
    name: "Steamed Himalayan Veg Momos (6 pcs)",
    category: "Momos",
    description: "Finely minced seasonal veggies, ginger scallion aroma, fiery red chutney.",
    price: 99,
    available: true,
    isVeg: true,
    isPopular: true,
    sourceImage: "Photo 3 (Momos Section)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "m-02",
    name: "Crispy Fried Paneer Momos (6 pcs)",
    category: "Momos",
    description: "Golden fried dumplings filled with rich paneer and herbs, served with mayo dip.",
    price: 129,
    available: true,
    isVeg: true,
    sourceImage: "Photo 3 (Momos Section)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "m-03",
    name: "Steamed Classic Chicken Momos (6 pcs)",
    category: "Momos",
    description: "Juicy minced chicken infused with coriander, spring onions and Himalayan spices.",
    price: 139,
    available: true,
    isVeg: false,
    isPopular: true,
    sourceImage: "Photo 3 (Momos Section)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "m-04",
    name: "Pan-Fried Kurkure Chicken Momos (6 pcs)",
    category: "Momos",
    description: "Extra crunchy cornflake crust dumplings with tangy dipping relish.",
    price: 169,
    available: true,
    isVeg: false,
    isPopular: true,
    sourceImage: "Photo 3 (Momos Section)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },

  // Fried Chicken (With Regular and Piri Piri variants & sizes)
  {
    id: "fc-01",
    name: "Crispy Fried Chicken Strips",
    category: "Fried Chicken",
    description: "Tender boneless chicken tenders fried to a golden crunch with dipping sauce.",
    price: 159,
    variants: [
      { name: "Regular Seasoned", price: 159 },
      { name: "Piri Piri Spiced", price: 179 },
    ],
    available: true,
    isVeg: false,
    isPopular: true,
    sourceImage: "Photo 4 (Fried Chicken Board)",
    priceVerificationStatus: "awaiting_owner_confirmation",
    notes: "Two variant prices recorded for Regular and Piri Piri seasoning",
  },
  {
    id: "fc-02",
    name: "Crispy Fried Chicken (2 Pieces)",
    category: "Fried Chicken",
    description: "Signature battered crisp bone-in chicken pieces, crunchy outside and juicy inside.",
    price: 189,
    variants: [
      { name: "Regular Crispy", price: 189 },
      { name: "Piri Piri Crunch", price: 209 },
    ],
    available: true,
    isVeg: false,
    sourceImage: "Photo 4 (Fried Chicken Board)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "fc-03",
    name: "Crispy Fried Chicken Bucket (4 Pieces)",
    category: "Fried Chicken",
    description: "Sharing bucket of freshly fried seasoned chicken with garlic dips.",
    price: 349,
    variants: [
      { name: "Regular Crispy", price: 349 },
      { name: "Piri Piri Crunch", price: 379 },
    ],
    available: true,
    isVeg: false,
    isPopular: true,
    sourceImage: "Photo 4 (Fried Chicken Board)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "fc-04",
    name: "Chicken Popcorn Crunch Box",
    category: "Fried Chicken",
    description: "Bite-sized seasoned chicken tenders fried to golden perfection.",
    price: 149,
    variants: [
      { name: "Regular", price: 149 },
      { name: "Piri Piri Dust", price: 169 },
    ],
    available: true,
    isVeg: false,
    sourceImage: "Photo 4 (Fried Chicken Board)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },

  // Fries & Sides
  {
    id: "f-01",
    name: "Classic Salted Golden Fries",
    category: "Fries & Sides",
    description: "Thick-cut skin-on potatoes, lightly seasoned with sea salt.",
    price: 79,
    available: true,
    isVeg: true,
    sourceImage: "Photo 5 (Sides & Starters)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "f-02",
    name: "Fiery Peri-Peri Masala Fries",
    category: "Fries & Sides",
    description: "Crispy fries tossed in our signature African bird's eye spice blend.",
    price: 99,
    available: true,
    isVeg: true,
    isPopular: true,
    sourceImage: "Photo 5 (Sides & Starters)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "f-03",
    name: "Loaded Cheesy Garlic Fries",
    category: "Fries & Sides",
    description: "Smothered in warm jalapeño cheese sauce, toasted garlic and chili flakes.",
    price: 139,
    available: true,
    isVeg: true,
    sourceImage: "Photo 5 (Sides & Starters)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "f-04",
    name: "Crispy Golden Onion Rings (8 pcs)",
    category: "Fries & Sides",
    description: "Panko crumbed whole sweet onion rings with spicy cocktail dip.",
    price: 119,
    available: true,
    isVeg: true,
    sourceImage: "Photo 5 (Sides & Starters)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },

  // Pasta (With two prices for Veg and Chicken / variants)
  {
    id: "pas-01",
    name: "Creamy White Sauce Alfredo Penne",
    category: "Pasta",
    description: "Al dente penne in velvety parmesan cream sauce, sautéed garlic mushrooms & herbs.",
    price: 189,
    variants: [
      { name: "Vegetarian", price: 189 },
      { name: "With Grilled Chicken", price: 229 },
    ],
    available: true,
    isVeg: true,
    isPopular: true,
    sourceImage: "Photo 6 (Pasta Section)",
    priceVerificationStatus: "awaiting_owner_confirmation",
    notes: "Preserves dual price point for Veg (189) vs Chicken (229) variant",
  },
  {
    id: "pas-02",
    name: "Fiery Red Sauce Arrabbiata Penne",
    category: "Pasta",
    description: "Slow-cooked San Marzano tomato sauce, fresh garlic, red chilies, extra virgin olive oil.",
    price: 179,
    variants: [
      { name: "Vegetarian", price: 179 },
      { name: "With Grilled Chicken", price: 219 },
    ],
    available: true,
    isVeg: true,
    isPopular: true,
    sourceImage: "Photo 6 (Pasta Section)",
    priceVerificationStatus: "awaiting_owner_confirmation",
    notes: "Preserves dual price point for Veg (179) vs Chicken (219) variant",
  },
  {
    id: "pas-03",
    name: "Pink Sauce Mixed Herb Pasta",
    category: "Pasta",
    description: "Harmonious combination of rich tomato marinara and creamy Alfredo with Italian herbs.",
    price: 199,
    variants: [
      { name: "Vegetarian", price: 199 },
      { name: "With Grilled Chicken", price: 239 },
    ],
    available: true,
    isVeg: true,
    sourceImage: "Photo 6 (Pasta Section)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },

  // Maggi Specials
  {
    id: "mg-01",
    name: "Classic Masala Café Maggi",
    category: "Maggi",
    description: "Double-cooked masala noodles tossed with freshly chopped coriander and mild spices.",
    price: 59,
    available: true,
    isVeg: true,
    sourceImage: "Photo 7 (Maggi & Quick Bites)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "mg-02",
    name: "Veggie Loaded Cheese Maggi",
    category: "Maggi",
    description: "Tossed with crunchy bell peppers, onions, sweet corn and smothered in melted cheese.",
    price: 89,
    available: true,
    isVeg: true,
    isPopular: true,
    sourceImage: "Photo 7 (Maggi & Quick Bites)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "mg-03",
    name: "Spicy Peri-Peri Egg Maggi",
    category: "Maggi",
    description: "Scrambled spiced eggs folded into piping hot noodles with peri-peri kick.",
    price: 99,
    available: true,
    isVeg: false,
    sourceImage: "Photo 7 (Maggi & Quick Bites)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "mg-04",
    name: "Shredded Chicken Tikka Maggi",
    category: "Maggi",
    description: "Tender shredded chicken tikka pieces in aromatic savory noodles.",
    price: 119,
    available: true,
    isVeg: false,
    sourceImage: "Photo 7 (Maggi & Quick Bites)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },

  // Salads
  {
    id: "sal-01",
    name: "Fresh Garden Veg Crunch Salad",
    category: "Salads",
    description: "Crisp cucumber, cherry tomatoes, shredded lettuce, bell peppers in lemon herb dressing.",
    price: 129,
    available: true,
    isVeg: true,
    sourceImage: "Photo 8 (Salads & Healthy Bowls)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "sal-02",
    name: "Grilled Paneer & Corn Salad",
    category: "Salads",
    description: "Char-grilled spiced paneer cubes, sweet corn, olives and honey mustard drizzle.",
    price: 159,
    available: true,
    isVeg: true,
    sourceImage: "Photo 8 (Salads & Healthy Bowls)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "sal-03",
    name: "Smoked Chicken Caesar Bowl",
    category: "Salads",
    description: "Tender herb-grilled chicken breast strips, garlic croutons, parmesan and creamy Caesar dressing.",
    price: 189,
    available: true,
    isVeg: false,
    isPopular: true,
    sourceImage: "Photo 8 (Salads & Healthy Bowls)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },

  // Shakes & Cold Beverages
  {
    id: "s-01",
    name: "Belgian Chocolate Decadence Shake",
    category: "Shakes & Cold Beverages",
    description: "Rich dark cocoa, milk chocolate swirls, dark ganache, thick ice cream base.",
    price: 129,
    available: true,
    isVeg: true,
    isPopular: true,
    sourceImage: "Photo 9 (Beverages Board)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "s-02",
    name: "Alphonso Mango Cream Shake",
    category: "Shakes & Cold Beverages",
    description: "Real Alphonso pulp blended with vanilla cream and toasted pistachio sprinkles.",
    price: 139,
    available: true,
    isVeg: true,
    sourceImage: "Photo 9 (Beverages Board)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "s-03",
    name: "Lotus Biscoff Thickshake",
    category: "Shakes & Cold Beverages",
    description: "Crushed speculoos cookies, caramel spread, whipped cream and biscuit crunch.",
    price: 169,
    available: true,
    isVeg: true,
    isPopular: true,
    sourceImage: "Photo 9 (Beverages Board)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "s-04",
    name: "Cold Brew Iced Coffee",
    category: "Shakes & Cold Beverages",
    description: "Slow-steeped Arabica coffee, chilled whole milk and sweet vanilla notes.",
    price: 109,
    available: true,
    isVeg: true,
    sourceImage: "Photo 9 (Beverages Board)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "s-05",
    name: "Fresh Mint & Lime Mojito Refresher",
    category: "Shakes & Cold Beverages",
    description: "Hand-muddled mint sprigs, tangy lime juice, cane syrup and sparkling soda.",
    price: 89,
    available: true,
    isVeg: true,
    sourceImage: "Photo 9 (Beverages Board)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },

  // Hot Beverages
  {
    id: "hb-01",
    name: "Freshly Brewed South Indian Filter Coffee",
    category: "Hot Beverages",
    description: "Traditional chicory blend coffee with frothy hot milk.",
    price: 40,
    available: true,
    isVeg: true,
    sourceImage: "Photo 10 (Hot Sips & Tea)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "hb-02",
    name: "Special Masala Kadak Chai",
    category: "Hot Beverages",
    description: "Freshly brewed black tea infused with cardamom, ginger, cloves and milk.",
    price: 30,
    available: true,
    isVeg: true,
    isPopular: true,
    sourceImage: "Photo 10 (Hot Sips & Tea)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "hb-03",
    name: "Velvety Hot Chocolate with Marshmallows",
    category: "Hot Beverages",
    description: "Steaming Dutch cocoa blend topped with miniature sweet marshmallows.",
    price: 99,
    available: true,
    isVeg: true,
    sourceImage: "Photo 10 (Hot Sips & Tea)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "hb-04",
    name: "Green Tea / Honey Lemon Tea",
    category: "Hot Beverages",
    description: "Soothing hot infusion of pure green tea leaves with natural wild honey.",
    price: 49,
    available: true,
    isVeg: true,
    sourceImage: "Photo 10 (Hot Sips & Tea)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },

  // Desserts
  {
    id: "d-01",
    name: "Signature Sizzling S'mores Brownie",
    category: "Desserts",
    description: "Warm Belgian chocolate brownie, toasted marshmallows and vanilla bean gelato.",
    price: 149,
    available: true,
    isVeg: true,
    isPopular: true,
    sourceImage: "Photo 11 (Desserts & Bakes)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "d-02",
    name: "Red Velvet Molten Lava Cake",
    category: "Desserts",
    description: "Moist ruby cocoa sponge with molten cream cheese filling that flows upon cutting.",
    price: 129,
    available: true,
    isVeg: true,
    sourceImage: "Photo 11 (Desserts & Bakes)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "d-03",
    name: "Classic New York Blueberry Cheesecake",
    category: "Desserts",
    description: "Silky baked cream cheese layer topped with tart wild blueberry compote.",
    price: 159,
    available: true,
    isVeg: true,
    isPopular: true,
    sourceImage: "Photo 11 (Desserts & Bakes)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },

  // Special Beverages & Seasonal Drinks
  {
    id: "sb-01",
    name: "Blue Ocean Curacao Sparkler",
    category: "Special Beverages",
    description: "Zesty blue curaçao syrup, lime juice, mint and sparkling soda on crushed ice.",
    price: 99,
    available: true,
    isVeg: true,
    isPopular: true,
    sourceImage: "Photo 9 (Beverages Board)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "sb-02",
    name: "Green Apple Bubble Fizz",
    category: "Special Beverages",
    description: "Crisp tart green apple syrup, sparkling water, popping fruit pearls.",
    price: 119,
    available: true,
    isVeg: true,
    sourceImage: "Photo 9 (Beverages Board)",
    priceVerificationStatus: "awaiting_owner_confirmation",
  },
  {
    id: "sb-03",
    name: "Seasonal Fresh Watermelon Mint Cooler",
    category: "Special Beverages",
    description: "Freshly pressed sweet watermelon juice with crushed mint and black salt notes.",
    price: 89,
    available: true,
    isVeg: true,
    sourceImage: "Photo 9 (Beverages Board)",
    priceVerificationStatus: "awaiting_owner_confirmation",
    notes: "Seasonal fruit item subject to market availability",
  },
];

/**
 * Separate review list for duplicate products, conflicting prices, and uncertain OCR readings
 * as required by project data quality standards.
 */
export const menuReviewList: MenuReviewItem[] = [
  {
    productId: "pas-01",
    productName: "Creamy White Sauce Alfredo Penne",
    category: "Pasta",
    issueType: "conflicting_prices",
    details: "Veg variant listed as ₹189 on board; Chicken variant listed as ₹229. Preserved both prices as variants.",
    sources: ["Photo 6 (Pasta Section)", "Photo 2 (Flyer)"],
  },
  {
    productId: "fc-01",
    productName: "Crispy Fried Chicken Strips",
    category: "Fried Chicken",
    issueType: "conflicting_prices",
    details: "Regular price ₹159; Piri Piri seasoning add-on ₹179. Preserved both variants.",
    sources: ["Photo 4 (Fried Chicken Board)"],
  },
  {
    productId: "sb-03",
    productName: "Seasonal Fresh Watermelon Mint Cooler",
    category: "Special Beverages",
    issueType: "uncertain_transcription",
    details: "Marked as seasonal; price transcribed from handwritten board, requires owner verification.",
    sources: ["Photo 9 (Beverages Board)"],
  },
];
