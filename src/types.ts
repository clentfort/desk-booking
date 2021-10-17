export interface Desk {
  id: string;
  name: string;
  monitor: string;
  type?: string;
  preassignedTo?: string;
  floor: string;
}
export interface Booking {
  desk: string;
  date: string;
  name: string;
  comment: string;
}


