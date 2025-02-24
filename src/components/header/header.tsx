"use client";

import { FunctionComponent, useEffect, useState } from "react";
import Link from "next/link";

import GitHubCalendar from "react-github-calendar";

import Search from "./search";
import Logo from "../svg/logo";
import HeaderMenu from "./header-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import styles from "@/styles/header/header.module.scss";
import { Description } from "@radix-ui/react-dialog";

type Header = {
  isHidden: boolean;
  lastScrollY: number;
  isLoaded: boolean;
  isOpen: boolean;
};

type Activity = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

const transformData = (data: Activity[]): Activity[] => {
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);
  sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 14);

  return data.filter((day) => new Date(day.date) >= sixMonthsAgo);
};

const Header: FunctionComponent = () => {
  const [headerState, setHeaderState] = useState<Header>({
    isHidden: false,
    lastScrollY: 0,
    isLoaded: false,
    isOpen: false,
  });

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    setHeaderState((prevState) => ({
      ...prevState,
      isHidden: currentScrollY > prevState.lastScrollY && currentScrollY > 50,
      lastScrollY: currentScrollY,
    }));
  };

  const handleDialogOpen = () => {
    setHeaderState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerState.lastScrollY]);

  useEffect(() => {
    if (headerState.isOpen) {
      setTimeout(() => {
        setHeaderState((prev) => ({ ...prev, isLoaded: true }));
      }, 1000);
    }
  }, [headerState.isOpen]);

  return (
    <header
      className={`${styles["header"]} transition-transform duration-300 ${
        headerState.isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className={styles["container"]}>
        <div className={styles["left"]}>
          <Link href={"/"} className={styles["home"]}>
            <Logo />
          </Link>
        </div>
        <div className={styles["center"]}></div>
        <div className={styles["right"]}>
          <Search />
          <HeaderMenu onDialogOpen={handleDialogOpen} />
        </div>
      </div>
      <Dialog
        open={headerState.isOpen}
        onOpenChange={(value) => {
          if (!value) {
            setHeaderState((prev) => ({
              ...prev,
              isOpen: false,
              isLoaded: false,
            }));
          }
        }}
      >
        <DialogContent className="z-50">
          <DialogHeader>
            <DialogTitle>Github contributions</DialogTitle>
            <Description></Description>
          </DialogHeader>
          <div className="flex justify-center py-3">
            <div className={`${headerState.isLoaded ? "hidden" : ""}`}>
              <div className="w-8 h-8 border-4 border border-t-transparent rounded-full animate-spin" />
            </div>
            <div className={`${headerState.isLoaded ? "" : "hidden"}`}>
              <GitHubCalendar username="nera1" transformData={transformData} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
