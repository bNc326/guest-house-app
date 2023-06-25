export interface DisabledDaysObject extends Record<string, any> {
  _id: string;
  startDate: Date | string;
  endDate: Date | string;
  admin: string;
  createdAt: Date;
}

export type DisabledDaysModel = [DisabledDaysObject];
