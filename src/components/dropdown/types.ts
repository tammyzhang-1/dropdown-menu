export interface Data {
  id: number;
  level: "county" | "state" | "region";
  name: string;
  parent: number | null;
}

export interface TreeData extends Data {
  children?: TreeData[];
}

export interface DropdownItem {
  id: number;
  level: "county" | "state" | "region";
  name: string;
  parent: number | null;
  children?: DropdownItem[];
}
