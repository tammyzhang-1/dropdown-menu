import React from "react";
import type { TreeData } from "./types";

interface DropdownOptionProps {
  option: TreeData;
  onSelect: (item: TreeData) => void;
  selectedId: number | null;
  selectedRef: React.RefObject<HTMLDivElement | null>;
}

function DropdownOption({
  option,
  onSelect,
  selectedId,
  selectedRef,
}: DropdownOptionProps) {
  const isSelected = selectedId == option.id;
  const isSelectable = option.level === "county";

  const refToAssign = isSelected && isSelectable ? selectedRef : undefined;

  return (
    <>
      <div
        ref={refToAssign}
        role="option"
        aria-selected={isSelected}
        id={`option-${option.id}`}
        className={`dropdown-item ${option.level}`}
        onClick={() => {
          if (isSelectable) {
            onSelect(option);
          }
        }}
      >
        {option.name}
      </div>
      {option.children?.map((child) => (
        <DropdownOption
          key={child.id}
          option={child}
          onSelect={onSelect}
          selectedId={selectedId}
          selectedRef={selectedRef}
        />
      ))}
    </>
  );
}

export default DropdownOption;
