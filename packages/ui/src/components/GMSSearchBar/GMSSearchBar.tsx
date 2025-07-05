import { IconSearch } from "../icons/icons";

interface GMSSearchBarProps {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const GMSSearchBar = ({ placeholder, onChange }: GMSSearchBarProps) => {
  return (
    <label className="input w-full">
      <IconSearch iconSize="medium" styles="text-base-content" />
      <input
        type="search"
        className="grow"
        placeholder={placeholder}
        onChange={onChange}
        aria-label={placeholder}
      />
    </label>
  );
};
