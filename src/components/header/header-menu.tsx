"use client";

import { FunctionComponent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Mail, Github, Menu, GitCompareArrows } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

import styles from "@/styles/header-menu/header-menu.module.scss";

const HeaderMenu: FunctionComponent = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          size="icon"
        >
          <Menu />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`${styles["header-menu"]} rounded-md border`}>
        <Command>
          <CommandList>
            <CommandGroup
              heading="Profile"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CommandItem className="cursor-pointer">
                <Github />
                <span
                  onClick={() => {
                    window.open("https://github.com/ekd594ff");
                  }}
                >
                  Github
                </span>
              </CommandItem>
              <CommandItem className="cursor-pointer" onClick={() => {}}>
                <GitCompareArrows />
                <span
                  onClick={() => {
                    window.open("https://github.com/nera1/sumr");
                  }}
                >
                  Repository
                </span>
              </CommandItem>
              <CommandItem className="cursor-pointer">
                <Mail />
                <span
                  onClick={() => {
                    window.open(`mailto:nera4936@gmail.com`);
                  }}
                >
                  Mail
                </span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default HeaderMenu;
