export interface ProductInformation {
  _id: string;
  generalInformations: GeneralInformations;
  variants?: (VariantsEntity)[] | null;
  id: number;
  title: string;
  vendor: string;
  handle: string;
  productType: string;
  featuredImage: ImageOrFeaturedImage;
  __v: number;
  createdAt: string;
  updatedAt: string;
  mix: string;
  media: Media[];
}

export interface Media {
  id: string;
  mediaContentType: string;
  image?: {
    originalSrc: string;
  };
  originalSource?: {
    format: string;
    mimeType: string;
    url: string;
    height: number;
    width: number;
  };
  preview: {
    image: {
      altText: string;
      id: string;
      originalSrc: string;
    }
  }
}
export interface GeneralInformations {
  packages: Packages;
  finances: Finances;
  progress: Progress;
  pricePerUnit: string;
}
export interface Packages {
  listPackages?: (ListPackagesEntityOrIngredientsEntity)[] | null;
  labelDisplay: string;
}
export interface ListPackagesEntityOrIngredientsEntity {
  label: string;
  value: string;
  percent: number;
}
export interface Finances {
  financialDescription: string;
  financialDetails?: (FinancialDetailsEntityOrNutritionalDetailEntity)[] | null;
  labelDisplay: string;
}
export interface FinancialDetailsEntityOrNutritionalDetailEntity {
  typeText: string;
  label: string;
  value: string;
}
export interface Progress {
  progressions?: (ProgressionsEntity)[] | null;
  labelDisplay: string;
}
export interface ProgressionsEntity {
  done: boolean;
  image: string;
  subValue: string;
  label: string;
  value: string;
}
export interface VariantsEntity {
  available: boolean;
  quantity: number;
  id: number;
  ingredientInformations: IngredientInformations;
  nutritionInformations: NutritionInformations;
  price: string;
  image: ImageOrFeaturedImage;
  title: string;
  media: Media[];
}
export interface IngredientInformations {
  ingredients?: (ListPackagesEntityOrIngredientsEntity)[] | null;
  labelDisplay: string;
}
export interface NutritionInformations {
  nutritions?: (NutritionsEntity)[] | null;
  labelDisplay: string;
}
export interface NutritionsEntity {
  nutritionalDetail?: (FinancialDetailsEntityOrNutritionalDetailEntity)[] | null;
  title: string;
}
export interface ImageOrFeaturedImage {
  originalSrc: string;
}
