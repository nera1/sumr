"use client";

import { FunctionComponent, useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import db from "@/data/db.json";
import link from "@/data/icon_link.json";

import { IconLink } from "@/types";

const CategorySelect: FunctionComponent = () => {
  const icons: IconLink = link;
  const frameworks = Object.entries(db.categories).map(([key, value]) => ({
    value: key,
    label: key,
    count: value.length,
    icon: icons[key] || icons["default"],
  }));

  const searchParams = useSearchParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(searchParams.get("category") || ""); // 초기값 동기화

  useEffect(() => {
    if (!value) return; // 값이 없으면 실행하지 않음

    const queryString = new URLSearchParams({ category: value }).toString();

    router.push(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/?${queryString}`);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "카테고리"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Avatar className="w-5 h-5">
                    <AvatarImage src={`icons/${framework.icon}`} />
                    <AvatarFallback>??</AvatarFallback>
                  </Avatar>
                  {framework.label}
                  <p className="text-xs text-muted-foreground">
                    {framework.count}
                  </p>
                  <Check
                    className={`ml-auto ${
                      value === framework.value ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default function CategorySelectComponent() {
  return (
    <Suspense fallback={<div></div>}>
      <CategorySelect />
    </Suspense>
  );
}
