import { t } from "i18next";
import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

interface SearchInputProps {
  search: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SearchInput = ({ search, handleSearch, className }: SearchInputProps) => {
  return ( 
    <div
      className={twMerge(`
        sm:min-w-64 md:min-w-96 flex px-3 py-1 rounded-xl bg-white dark:bg-slate-800 dark:focus-within:bg-slate-700
        border border-slate-400 dark:border-slate-500 focus-within:border-slate-700 dark:focus-within:border-slate-200
      `, className)}
      role="search"
    >
      <input
        type="text"
        onChange={handleSearch}
        value={search}
        placeholder={t("Search.placeholder")}
        className={twMerge("focus:outline-none w-full text-slate-700 dark:text-slate-200 bg-transparent", className)}
      />
    </div>
  );
}
 
export default SearchInput;