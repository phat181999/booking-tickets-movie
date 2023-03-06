export interface Avatart {
  id: number;
  avartar: string;
}
export interface Movie {
  id?: number;
  title?: string;
  director?: string;
  description?: string;
  type?: string;
  trailer?: string;
  theater_id?: string;
  showtime?: string;
  timecount?: string;
  avatar?: Array<Avatart>;
}
