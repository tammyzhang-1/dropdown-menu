import React from "react";

type DropdownInputProps = {
  onClick: () => void;
  isOpen: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  showClear: boolean;
};

function DropdownInput({
  onClick,
  isOpen,
  value,
  onChange,
  onClear,
  showClear,
}: DropdownInputProps) {
  return (
    <div className="dropdown-input" onClick={onClick}>
      <input
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="dropdown-listbox"
        aria-autocomplete="list"
        aria-activedescendant={isOpen && value ? `option-${value}` : undefined}
        className="dropdown-search"
        value={value}
        placeholder="Please select a county"
        onChange={onChange}
      />
      <div className="dropdown-controls">
        <div className="dropdown-clear">
          {showClear && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
            >
              ×
            </span>
          )}
        </div>
        <div className="dropdown-arrow-box">
          <svg
            className={`dropdown-arrow ${isOpen ? "open" : ""}`}
            viewBox="0 0 10 6"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0 L5 8.66 L10 0 Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default DropdownInput;
