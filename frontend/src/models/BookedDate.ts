interface BookedDate {
  id: string;
  startDate?: Date | string;
  endDate?: Date | string;
  status: "Pending" | "Accepted" | 'Ejected';
}

export default BookedDate;
