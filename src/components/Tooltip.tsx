interface TooltipProps {
  children: React.ReactNode;
  text: string;
  show: boolean;
}

function Tooltip({ children, text, show }: TooltipProps) {
  return (
    <div className={`relative inline-block group`}>
      {children}
      {show && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3
                     px-2 py-1 bg-black text-white text-xs rounded
                     whitespace-nowrap z-20
                     opacity-0 invisible 
                     group-hover:opacity-100 group-hover:visible 
                     transition-opacity duration-200
                     after:content-['']
                      after:absolute
                      after:top-full 
                      after:left-1/2
                      after:-translate-x-1/2 
                      after:border-4
                      after:border-solid
                      after:border-t-black 
                      after:border-x-transparent
                      after:border-b-transparent"
        >
          {text}
        </span>
      )}
    </div>
  );
}
export default Tooltip;
