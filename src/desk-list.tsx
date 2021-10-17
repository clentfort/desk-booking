import { Booking, Desk } from "./types";

interface DeskOnDayProps {
  desk: Desk;
  booking?: Booking;
}

function DeskOnDay({
  desk: { floor, name, monitor, preassignedTo, type },
  booking,
}: DeskOnDayProps) {
  const status =
    booking != null ? (
      <span className="text-red-500">{booking.name}</span>
    ) : preassignedTo != null ? (
      <span className="text-yellow-500">
        Permanently booked by {preassignedTo}
      </span>
    ) : (
      <span className="text-green-500">Available</span>
    );

  const info = [monitor, type].filter((item) => item != null).join(", ");

  return (
    <div className="w-full">
      {name}: {status}
      <span className="text-gray-500 float-right">
        Floor {floor} <span className="fas fa-desktop" title={info} />
      </span>
    </div>
  );
}

interface DeskListProps {
  desks: Array<Desk>;
  bookings: Map<Desk["id"], Booking>;
}
export default function DeskList({ desks, bookings }: DeskListProps) {
  return desks.map((desk) => {
    const booking = bookings.get(desk.id);
    return (
      <label
        key={desk.id}
        className="flex px-3 py-2 items-center gap-1 cursor-pointer hover:bg-white"
      >
        <input type="checkbox" name="desk" />
        <DeskOnDay desk={desk} booking={booking} />
      </label>
    );
  });
}
