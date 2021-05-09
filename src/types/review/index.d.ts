export interface Review {
  status: Status;
  response: Response;
}
export interface Status {
  code: number;
  message: string;
}
export interface Response {
  pagination: Pagination;
  bottomline: Bottomline;
  products?: (ProductsEntity)[] | null;
  product_tags?: (null)[] | null;
  reviews?: (ReviewsEntity)[] | null;
}
export interface Pagination {
  page: number;
  per_page: number;
  total: number;
}
export interface Bottomline {
  total_review: number;
  average_score: number;
  total_organic_reviews: number;
  organic_average_score: number;
  star_distribution: StarDistribution;
}
export interface StarDistribution {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}
export interface ProductsEntity {
  id: number;
  domain_key: string;
  name: string;
  social_links: SocialLinks;
  embedded_widget_link: string;
  testimonials_product_link: string;
  product_link: string;
  image_url: string;
}
export interface SocialLinks {
  linkedin: string;
  facebook: string;
  twitter: string;
  google_oauth2: string;
}
export interface ReviewsEntity {
  id: number;
  score: number;
  votes_up: number;
  votes_down: number;
  content: string;
  title: string;
  created_at: string;
  deleted: boolean;
  verified_buyer: boolean;
  source_review_id?: null;
  sentiment?: null;
  custom_fields: CustomFields;
  product_id: number;
  user: User;
  comment?: Comment | null;
}

interface Field {
  title: string;
  form_id: number;
  field_type: string;
  value: string;
}
export interface CustomFields {
  [field: string]: Field;
}

export interface CRFS {
  question_id: number,
  answer: string[]
}

export interface User {
  user_id: number;
  social_image?: string | null;
  user_type: string;
  is_social_connected: number;
  display_name: string;
}

export interface Comment {
  id: number,
  content: string,
  create_at: string,
  display_name: string,
  comments_avatar: string,
}
