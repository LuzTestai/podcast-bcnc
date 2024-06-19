"use client";
import React, { useEffect } from "react";
import styles from "./navbar.module.css";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className={styles.navbar}>
      <h1 className={styles.title} onClick={() => router.push("/")}>
        Podcaster
      </h1>
      {/* <div className={styles.spinnerNavbar}> </div> */}
    </div>
  );
};

export default Navbar;
