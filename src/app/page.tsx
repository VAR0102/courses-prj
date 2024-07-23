import Image from "next/image";
import styles from "./page.module.css";
import { getAllCourses } from "./lib/api";
import { log } from "console";

export default function Home() {
let data = getAllCourses()
   
  return (
    <main className={styles.main}>
      </main>
  );
}
