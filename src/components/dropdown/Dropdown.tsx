import React, { useMemo, useState, useRef, useEffect } from "react";
import type { Data, TreeData } from "./types";
import DropdownInput from "./DropdownInput";
import DropdownList from "./DropdownList";
import data from "../../data/census_classification.json";
import "./Dropdown.css";

/* ----------------- Data processing helpers ------------------ */

const dataTyped: Data[] = data.map((item) => ({
  ...item,
  level: item.level as "state" | "region" | "county",
}));

/**
 * Converts flat data with parent-child relationships into a tree structure.
 * @param options - Array of flat data objects.
 * @returns Array of tree data objects with nested children.
 */
function buildTree(options: Data[]): TreeData[] {
  const lookup: { [id: number]: TreeData } = {};
  const rootOptions: TreeData[] = [];

  options.forEach((option) => {
    lookup[option.id] = { ...option, children: [] };
  });

  options.forEach((option) => {
    if (option.parent === null) {
      rootOptions.push(lookup[option.id]);
    } else {
      const parent = lookup[option.parent];
      if (parent) {
        parent.children!.push(lookup[option.id]);
      }
    }
  });

  return rootOptions;
}

/**
   * Filters the list of counties based on the search term.
   * @param options - Array of county options.
   * @param inputText - The current search term.
   * @returns Filtered list of counties.
   */
  function filterOptions(options: TreeData[], inputText: string): TreeData[] {
    const lowered = inputText.toLowerCase();

    const filtered: TreeData[] = [];

    for (const option of options) {
      const children = option.children
        ? filterOptions(option.children, inputText)
        : [];

      const isMatch =
        option.level === "county" &&
        option.name.toLowerCase().includes(lowered);

      if (isMatch || children.length > 0) {
        filtered.push({
          ...option,
          children,
        });
      }
    }

    return filtered;
  }

/* ----------------- Component ------------------ */

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TreeData | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [inputText, setInputText] = useState<string>("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLDivElement>(null);

  const optionsTree = useMemo(() => buildTree(dataTyped), [dataTyped]);

  const filteredOptions = useMemo(() => {
    if (inputText.trim() && isOpen) {
      return filterOptions(optionsTree, inputText);
    }
    return optionsTree;
  }, [inputText, isOpen, optionsTree]);

  // Hook for handling clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setInputText("");
        setIsSearching(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ---------- Event Handlers ---------- */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    setIsSearching(true);
  };

  const handleSelect = (item: TreeData) => {
    setSelectedItem(item);
    setIsOpen(false);
    setInputText("");
    setIsSearching(false);
  };

  const openDropdown = () => {
    setIsOpen(true);
  };

  const handleClear = () => {
    setSelectedItem(null);
    setInputText("");
    setIsSearching(false);
  };

  /* ---------- Computed ---------- */
  const inputValue =
    isOpen && isSearching ? inputText : selectedItem?.name || "";
  
  const showClear = selectedItem !== null && !isSearching;

  return (
    <div className="dropdown" ref={dropdownRef}>
      <DropdownInput
        onClick={openDropdown}
        isOpen={isOpen}
        value={inputValue}
        onChange={handleInputChange}
        onClear={handleClear}
        showClear={showClear}
      />
      {isOpen && filteredOptions.length > 0 && (
        <DropdownList
          options={filteredOptions}
          onSelect={handleSelect}
          selectedId={selectedItem?.id ?? null}
          selectedRef={selectedRef}
        />
      )}
    </div>
  );
}



export default DropdownMenu;
