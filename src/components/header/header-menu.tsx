"use client";

import { FunctionComponent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Mail,
  Github,
  Menu,
  GitCompareArrows,
  BriefcaseBusiness,
  RotateCcw,
  Grid3X3,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

import styles from "@/styles/header-menu/header-menu.module.scss";

interface HeaderMenu {
  onDialogOpen: () => void;
}

const HeaderMenu: FunctionComponent<HeaderMenu> = (props) => {
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
              <a href="https://github.com/nera1" target="_blank">
                <CommandItem className="cursor-pointer">
                  <Github />
                  <span>Github</span>
                </CommandItem>
              </a>
              <a href="https://github.com/nera1/sumr" target="_blank">
                <CommandItem className="cursor-pointer" onClick={() => {}}>
                  <GitCompareArrows />
                  <span>Repository</span>
                </CommandItem>
              </a>
              <a href="mailto:nera4936@gmail.com" target="_blank">
                <CommandItem className="cursor-pointer">
                  <Mail />
                  <span>Mail</span>
                </CommandItem>
              </a>
              <a href="https://pf.sumr.it" target="_blank">
                <CommandItem className="cursor-pointer">
                  <BriefcaseBusiness />
                  <span>Portfolio</span>
                </CommandItem>
              </a>
              <a href="https://again.sumr.it" target="_blank">
                <CommandItem className="cursor-pointer">
                  <RotateCcw />
                  <span>Again</span>
                </CommandItem>
              </a>
              <CommandItem
                className="cursor-pointer"
                onSelect={props.onDialogOpen}
              >
                <Grid3X3 />
                <span>Contributions</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default HeaderMenu;
