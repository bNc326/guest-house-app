export interface Rating {
  _id: string;
  name: string;
  email: string;
  message: string;
  positives?: string;
  negatives?: string;
  rating: number;
  anonymus: boolean;
  hotel: string;
  createdAt: string;
  status: "Accepted" | "Pending" | "Ejected";
}
