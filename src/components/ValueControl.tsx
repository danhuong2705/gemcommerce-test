import { useState, useEffect, useMemo } from "react";
import UnitToggle from "./UnitToggle";
import ValueStepper from "./ValueStepper";

type Unit = "%" | "px";

interface ValueControlProps {
  initialValue?: number;
  initialUnit?: Unit;
}

const MIN_VALUE = 0;
const MAX_PERCENT_VALUE = 100;

export function ValueControl({
  initialValue = 1.0,
  initialUnit = "%",
}: ValueControlProps) {
  const [unit, setUnit] = useState<Unit>(initialUnit);
  const [value, setValue] = useState<number>(initialValue);

  const [inputValue, setInputValue] = useState<string>(String(initialValue));

  const [lastValidValue, setLastValidValue] = useState<number>(initialValue);

  const maxValue = useMemo(() => {
    return unit === "%" ? MAX_PERCENT_VALUE : Infinity;
  }, [unit]);

  useEffect(() => {
    if (unit === "%" && value > MAX_PERCENT_VALUE) {
      const clampedValue = MAX_PERCENT_VALUE;
      setValue(clampedValue);
      setInputValue(String(clampedValue));
      setLastValidValue(clampedValue);
    }
  }, [unit, value]);

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const handleValueChange = (newValue: number) => {
    const clampedValue = Math.max(MIN_VALUE, Math.min(maxValue, newValue));
    setValue(clampedValue);
    setInputValue(String(clampedValue));
    setLastValidValue(clampedValue);
  };

  const handleBlur = () => {
    const strVal = inputValue.replace(",", ".");

    let floatVal = parseFloat(strVal);

    if (isNaN(floatVal)) {
      handleValueChange(lastValidValue);
      return;
    }

    if (floatVal < MIN_VALUE) {
      floatVal = MIN_VALUE;
    } else if (unit === "%" && floatVal > MAX_PERCENT_VALUE) {
      floatVal = MAX_PERCENT_VALUE;
    }

    setValue(floatVal);
    setInputValue(String(floatVal));
    setLastValidValue(floatVal);
  };

  const handleIncrement = () => {
    handleValueChange(value + 1);
  };

  const handleDecrement = () => {
    handleValueChange(value - 1);
  };

  return (
    <div className="bg-[#151515] p-4 rounded-lg w-64 space-y-3 text-white">
      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-sm">Unit</span>
        <UnitToggle unit={unit} setUnit={setUnit} />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-sm">Value</span>
        <ValueStepper
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={handleBlur}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          isDecrementDisabled={value <= MIN_VALUE}
          isIncrementDisabled={unit === "%" && value >= MAX_PERCENT_VALUE}
        />
      </div>
    </div>
  );
}
