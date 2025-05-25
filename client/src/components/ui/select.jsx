import { useState, useRef, useEffect } from "react";
import { cn } from "../../utils/utils";
import { ChevronDown } from "lucide-react";
import { Children, cloneElement } from "react";

// Main Select component
const Select = ({ className, children, onValueChange, value, placeholder, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter children to only include SelectItem and SelectGroup for the native select
  const selectChildren = Children.toArray(children).filter(
    (child) => child.type === SelectItem || child.type === SelectGroup
  );

  // Find the display value for the trigger
  const selectedChild = selectChildren.find(
    (child) => child.props.value === value
  );
  const displayValue = selectedChild?.props.children || placeholder || "Select an option";

  return (
    <div className={cn("relative", className)}>
      {/* Hidden select for form compatibility and accessibility */}
      <select
        className="sr-only"
        value={value || ""}
        onChange={(e) => {
          onValueChange?.(e.target.value);
          setIsOpen(false);
        }}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {selectChildren.map((child, index) =>
          cloneElement(child, { key: `select-option-${index}` })
        )}
      </select>

      {/* Custom trigger */}
      <SelectTrigger
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        className={className}
      >
        <SelectValue>{displayValue}</SelectValue>
      </SelectTrigger>

      {/* Custom dropdown content */}
      {isOpen && (
        <SelectContent ref={contentRef}>
          {Children.toArray(children).map((child, index) =>
            child.type === SelectItem || child.type === SelectGroup
              ? cloneElement(child, {
                  key: `content-item-${index}`,
                  onClick: (val) => {
                    onValueChange?.(val);
                    setIsOpen(false);
                  },
                })
              : child
          )}
        </SelectContent>
      )}
    </div>
  );
};

// Render as optgroup for native select compatibility
const SelectGroup = ({ children, label }) => (
  <optgroup label={label}>{children}</optgroup>
);

// Render the display value in the trigger
const SelectValue = ({ children }) => <span>{children}</span>;

// Custom trigger for the dropdown
const SelectTrigger = ({ children, className, onClick, isOpen, ref }) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between rounded-md border px-3 py-2 text-sm cursor-pointer",
      className
    )}
    onClick={onClick}
  >
    {children}
    <ChevronDown
      className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
    />
  </div>
);

// Scroll buttons (optional, for long lists)
const SelectScrollUpButton = () => (
  <button className="p-1 text-sm text-gray-500 hover:text-gray-700">↑</button>
);

const SelectScrollDownButton = () => (
  <button className="p-1 text-sm text-gray-500 hover:text-gray-700">↓</button>
);

// Dropdown content container
const SelectContent = ({ children, className, ref }) => (
  <div
    ref={ref}
    className={cn(
      "absolute z-50 max-h-96 min-w-[8rem] overflow-auto rounded-md border bg-white shadow-md",
      className
    )}
  >
    {children}
  </div>
);

// Label for optgroup or accessibility
const SelectLabel = ({ children, className }) => (
  <div className={cn("px-3 py-2 text-sm font-semibold", className)}>
    {children}
  </div>
);

// Select item for both native select and custom dropdown
const SelectItem = ({ children, value, onClick, ...props }) => (
  <>
    <option value={value} {...props}>
      {children}
    </option>
    <div
      className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
      onClick={() => onClick?.(value)}
      {...props}
    >
      {children}
    </div>
  </>
);

// Separator for visual grouping in the dropdown
const SelectSeparator = () => <div className="my-1 h-px bg-gray-200" />;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};