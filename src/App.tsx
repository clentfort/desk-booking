import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/solid.css";
import { addDays } from "date-fns";
import { useState } from "react";
import "./app.css";
import DatePicker from "./date-picker";
import DeskList from "./desk-list";
import FloorPlan from "./floor-plan";
import { Booking, Desk } from "./types";

const MIN_DATE = new Date();
const MAX_DATE = addDays(MIN_DATE, 4 * 7);

const bookings: Map<Desk["id"], Booking> = new Map();
const desks: Array<Desk> = [...new Array(25)]
  .map((_, i) => {
    const desk: Desk = {
      id: i + "",
      name: 1 + i + ``,
      monitor: Math.random() > 0.5 ? "Dell" : "Asus",
      preassignedTo: i === 0 ? "Paula" : undefined,
      type: Math.random() < 0.8 ? "Standing Desk" : undefined,
      floor: (i % 3) + 1 + "",
    };
    let booking: Booking | undefined;
    if (i === 3) {
      bookings.set(desk.id, {
        name: "christian@lentfort.com",
        desk: i + "",
        date: "2021-10-19",
        comment: "",
      });
    }

    return desk;
  })
  .sort((a, b) => {
    if (a.floor === b.floor) {
      return 0;
    } else if (a.floor < b.floor) {
      return -1;
    }
    return 1;
  })
  .map((desk, i) => {
    return {
      ...desk,
      name: `Desk ${i + 1}`,
    };
  });

const floors = new Set(
  desks.map(({ floor }) => {
    return floor;
  })
);

function App() {
  const [date, setDate] = useState(new Date());
  return (
    <form className="flex flex-col min-h-screen p-3">
      <div className="text-center">
        <DatePicker
          min={MIN_DATE}
          max={MAX_DATE}
          value={date}
          onChange={setDate}
        />
      </div>
      <div className="flex flex-col lg:flex-wrap gap-3 flex-grow h-0">
        <div className="flex justify-center box p-3 text-center h-1/2 flex-grow">
          <FloorPlan />
        </div>
        <div className="box p-3 text-center text-xl lg:text-2xl">
          <span className="text-gray-500 text-lg lg:text-xl">Floor</span>
          {[...floors].map((_, i) => {
            return (
              <a key={i} className="px-1.5" href="#">
                {i + 1}
              </a>
            );
          })}
        </div>
        <div className="box flex-grow hidden lg:flex flex-col h-1/2 overflow-auto">
          <DeskList desks={desks} bookings={bookings} />
        </div>
        <div className="box p-3 flex flex-col gap-1">
          <label>
            <span className="block text-sm">Book for:</span>
            <input className="input" type="text" name="bookFor" />
          </label>
          <label>
            <span className="block text-sm">Mode of Transportation:</span>
            <input
              className="input"
              id="modeOfTransportation"
              list="modesOfTransportation"
              name="modeOfTransportation"
              type="text"
            />
            <datalist id="modesOfTransportation">
              <option value="Bike" />
              <option value="Car" />
              <option value="Train" />
              <option value="Walking" />
            </datalist>
          </label>
          <label>
            <span className="block text-sm">Comment:</span>
            <textarea className="input" name="comment" rows={1} />
          </label>
          <button className="font-bold" type="submit">
            Book Desks
          </button>
        </div>
      </div>
    </form>
  );
}

export default App;
