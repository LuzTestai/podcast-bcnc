import React from "react";
import styles from "./card-detail.module.css";
import { convertirFecha, convertirDuracion } from "@/lib";
import { CardDetailProps } from "@/types";
import Image from "next/image";

const CardDetail: React.FC<CardDetailProps> = ({
  title,
  author,
  description,
  episodes,
  podcastDetail,
  image,
  onClickEpisodeProp,
}) => {
  return (
    <div className={styles.container} key={title}>
      <div className={styles.column}>
        <div className={styles.rectangle}>
          <Image
            src={image ? image : ""}
            alt={title}
            width={100}
            height={100}
          />
          <div className={styles.borderBottom}>
            <h2>Episodes : {episodes}</h2>
          </div>
          <div className={styles.borderBottom}>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div className={styles.columnTwo}>
        <div className={styles.row}>
          <h2>{title} </h2>
          <span className={styles.autor}>by {author}</span>
        </div>
        <div className={styles.row}>
          <div>
            {podcastDetail.map((pod, index) => (
              <div
                key={`${pod.artistId}-${index}`}
                className={styles.cardContent}
              >
                <div
                  onClick={() => onClickEpisodeProp(pod.feedUrl)}
                  className={styles.linkDiv}
                >
                  {pod.artistName}
                </div>
                <p className={styles.date}>{convertirFecha(pod.releaseDate)}</p>
                <span className={styles.minutes}>
                  {convertirDuracion(Number(pod.trackTimeMillis))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
