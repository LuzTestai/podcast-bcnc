import styles from "./card-product.module.css";
import Image from "next/image";
import { cortarStrPorGuionOComa } from "@/lib";
import { CardProductProps } from "@/types";

const CardProduct: React.FC<CardProductProps> = ({ title, autor, image }) => {
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.image}>
          <Image src={image} alt={title} width={100} height={100} priority />
        </div>
        <h2 className={styles.title}>{cortarStrPorGuionOComa(title)}</h2>
        <p className={styles.description}>{autor}</p>
      </div>
    </div>
  );
};

export default CardProduct;
