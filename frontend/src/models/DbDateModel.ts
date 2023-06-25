export interface DbDateModel {
  _id: string;
  startDate: Date;
  status: "Accepted" | "Pending" | "Ejected";
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface DisabledDbDays {
  _id: string;
  startDate: string;
  endDate: string;
}
