import { useState } from "react";
import Tooltip from "./Tooltip";

interface ValueStepperProps {
  value: string;
  onValueChange: (value: string) => void;
  onBlur: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  isDecrementDisabled: boolean;
  isIncrementDisabled: boolean;
}

function ValueStepper({
  value,
  onValueChange,
  onBlur,
  onIncrement,
  onDecrement,
  isDecrementDisabled,
  isIncrementDisabled,
}: ValueStepperProps) {
  const [isInputHovered, setIsInputHovered] = useState(false);
  return (
    <div
      className={`flex items-center justify-between bg-[#212121] rounded-lg w-[140px]
                 focus-within:ring-2 focus-within:ring-blue-500 ${
                   isInputHovered ? "bg-[#424242]" : ""
                 }`}
    >
      <Tooltip text="Value must greater than 0" show={isDecrementDisabled}>
        <button
          onClick={onDecrement}
          disabled={isDecrementDisabled}
          aria-label="Decrement value"
          className={`h-9 px-3 py-1 text-gray-400 transition-colors rounded-l-lg
                     hover:bg-[#424242]  hover:text-white cursor-pointer
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none`}
        >
          -
        </button>
      </Tooltip>
      <input
        type="text"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onMouseEnter={() => setIsInputHovered(true)}
        onMouseLeave={() => setIsInputHovered(false)}
        onBlur={onBlur}
        className="w-12 h-9 text-center bg-transparent text-white flex-1
                   focus:outline-none 
                   peer/input hover:bg-[#424242]"
      />
      <Tooltip text="Value must smaller than 100" show={isIncrementDisabled}>
        <button
          onClick={onIncrement}
          aria-label="Increment value"
          disabled={isIncrementDisabled}
          className={`h-9 px-3 py-1 text-gray-400 transition-colors rounded-r-lg
                     hover:bg-[#424242]  hover:text-white cursor-pointer
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none`}
        >
          +
        </button>
      </Tooltip>
    </div>
  );
}

export default ValueStepper;
