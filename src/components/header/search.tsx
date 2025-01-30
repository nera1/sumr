"use client";

import { FunctionComponent, Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

type SearchState = {
  input: string;
  open: boolean;
};

const Search: FunctionComponent = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    input: "",
    open: false,
  });
  const router = useRouter();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { input } = searchState;
    if (event.key === "Enter" && input.trim()) {
      router.push(`/?search=${encodeURIComponent(input)}`);
      setTimeout(() => {
        setSearchState((prev) => ({ ...prev, input: "" }));
      }, 10);
    }
  };

  return (
    <div
      className={`flex justify-center items-center border border-input rounded-md bg-background h-9 ${
        searchState.open ? "px-3" : "w-9"
      }`}
    >
      <SearchIcon
        size={16}
        className="cursor-pointer"
        onClick={() => {
          const { open, input } = searchState;
          if (open && input.trim()) {
            router.push(`/?search=${encodeURIComponent(input)}`);
            setTimeout(() => {
              setSearchState((prev) => ({ ...prev, input: "" }));
            }, 10);
          } else {
            setSearchState((prev) => ({ ...prev, open: true }));
          }
        }}
      />
      <Input
        type="text"
        value={searchState.input}
        onChange={(event) => {
          const { value } = event.target;
          setSearchState((prev) => ({
            ...prev,
            input: value.trim(),
          }));
        }}
        onBlur={() => {
          setSearchState((prev) => ({
            ...prev,
            open: false,
          }));
        }}
        onKeyDown={handleKeyDown}
        className={`border-none transition-[width] duration-500 ease-out bg-transparent focus:ring-0 focus-visible:ring-0 placeholder:text-muted-foreground ${
          searchState.open ? "w-28" : "w-0 px-0 text-transparent"
        }`}
      />
    </div>
  );
};

export default function SearchComponent() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}
