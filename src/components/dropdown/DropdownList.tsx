import React, { useEffect, useRef } from "react";
import type { TreeData } from "./types";
import DropdownOption from "./DropdownOption";

interface DropdownListProps {
  options: TreeData[];
  onSelect: (item: TreeData) => void;
  selectedId: number | null;
  selectedRef: React.RefObject<HTMLDivElement | null>;
}

function DropdownList({
  options,
  onSelect,
  selectedId,
  selectedRef,
}: DropdownListProps) {

  const containerRef = useRef<HTMLDivElement>(null);

  // hook for scrolling the selected option into view
  useEffect(() => {
    if (containerRef.current && selectedRef.current) {
      const container = containerRef.current;
      const selected = selectedRef.current;

      container.scrollTop = selected.offsetTop - container.offsetTop;
    }
  }, [selectedId]);

  return (
    <div role="listbox" id="dropdown-listbox" className="dropdown-list" ref={containerRef}>
      {options.map((option) => (
        <DropdownOption
          key={option.id}
          option={option}
          onSelect={onSelect}
          selectedId={selectedId}
          selectedRef={selectedRef}
        />
      ))}
    </div>
  );
}

export default DropdownList;
