"use client";

import { FunctionComponent, useEffect, useState } from "react";
import Link from "next/link";

import Search from "./search";
import Logo from "../svg/logo";
import HeaderMenu from "./header-menu";

import styles from "@/styles/header/header.module.scss";

type Header = {
  isHidden: boolean;
  lastScrollY: number;
  isLoaded: boolean;
  isOpen: boolean;
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerState.lastScrollY]);

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
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
