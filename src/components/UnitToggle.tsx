type Unit = "%" | "px";
interface UnitToggleProps {
  unit: Unit;
  setUnit: (unit: Unit) => void;
}

function UnitToggle({ unit, setUnit }: UnitToggleProps) {
  return (
    <div className="w-[140px] flex items-center bg-[#212121] rounded-lg p-1 space-x-1">
      <button
        onClick={() => setUnit("%")}
        data-active={unit === "%"}
        className="px-4 py-1 rounded-md text-sm transition-colors w-[50%] cursor-pointer
                   data-[active=true]:bg-[#424242] data-[active=true]:text-white
                   data-[active=false]:text-gray-400 data-[active=false]:hover:text-gray-200"
      >
        %
      </button>
      <button
        onClick={() => setUnit("px")}
        data-active={unit === "px"}
        className="px-4 py-1 rounded-md text-sm transition-colors w-[50%] cursor-pointer
                   data-[active=true]:bg-[#424242] data-[active=true]:text-white
                   data-[active=false]:text-gray-400 data-[active=false]:hover:text-gray-200"
      >
        px
      </button>
    </div>
  );
}

export default UnitToggle;
