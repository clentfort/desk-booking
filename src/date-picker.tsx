import { addDays, formatISO, isAfter, isBefore, isSameDay } from "date-fns";

function isAfterOrSame(dateLeft: Date | number, dateRight: Date | number) {
  return isAfter(dateLeft, dateRight) || isSameDay(dateLeft, dateRight);
}

function formatISODate(date: Date | number) {
  return formatISO(date, { representation: "date" });
}

interface DatePickerProps {
  min?: Date;
  max?: Date;
  value: Date;
  onChange: (value: Date) => void;
}

export default function DatePicker({
  min,
  max,
  value,
  onChange,
}: DatePickerProps) {
  const canDecrease = min != null && isAfter(value, min);
  const canIncrease = max != null && isAfter(addDays(max, -1), value);
  return (
    <>
      <button
        className={!canDecrease ? "text-gray-400" : ""}
        disabled={!canDecrease}
        type="button"
        onClick={() => {
          if (canDecrease) {
            onChange(addDays(value, -1));
          }
        }}
      >
        <span className="text-1xl fas fa-chevron-left" />
      </button>
      <input
        className="select-none text-center text-3xl bg-transparent border-0 mx-3"
        name="button"
        required
        type="date"
        min={min && formatISODate(min)}
        max={max && formatISODate(max)}
        value={formatISODate(value)}
        onChange={({ target }) => {
          const newValue = new Date(target.value);
          if (
            target.value == "" ||
            (min != null && !isAfterOrSame(newValue, min)) ||
            (max != null && !isBefore(newValue, max))
          ) {
            return;
          }
          onChange(newValue);
        }}
      />
      <button
        className={!canIncrease ? "text-gray-400" : ""}
        disabled={!canIncrease}
        type="button"
        onClick={() => {
          if (canIncrease) {
            onChange(addDays(value, 1));
          }
        }}
      >
        <span className="text-1xl fas fa-chevron-right" />
      </button>
    </>
  );
}
