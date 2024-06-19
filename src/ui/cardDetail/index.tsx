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
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.rectangle}>
          <div className={styles.borderBottom}>
            <Image
              src={image ? image : ""}
              alt={title}
              width={100}
              height={100}
            />
          </div>
          <div className={styles.borderBottom}>
            <h2>{title}</h2>
            <span>by {author}</span>
          </div>
          <div className={styles.borderBottom}>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div className={styles.columnTwo}>
        <div className={styles.row}>
          <h2>Episodes : {episodes}</h2>
        </div>
        <div className={styles.row}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th className={styles.th}>Título</th>
                <th className={styles.th}>Datos</th>
                <th className={styles.th}>Duración</th>
              </tr>
              {podcastDetail.map((pod) => (
                <tr key={pod.collectionId}>
                  <td className={styles.td}>
                    <div
                      onClick={() => onClickEpisodeProp(pod.feedUrl)}
                      className={styles.linkDiv}
                    >
                      {pod.collectionName}
                    </div>
                  </td>
                  <td className={styles.td}>
                    {convertirFecha(pod.releaseDate)}
                  </td>
                  <td className={styles.td}>
                    {convertirDuracion(Number(pod.trackTimeMillis))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
