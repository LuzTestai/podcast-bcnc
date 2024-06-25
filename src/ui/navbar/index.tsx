"use client";
import React from "react";
import styles from "./navbar.module.css";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className={styles.navbar}>
      <h1 className={styles.title} onClick={() => router.push("/")}>
        Podcaster
      </h1>
    </div>
  );
};

export default Navbar;
