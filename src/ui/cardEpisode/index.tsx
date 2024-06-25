import React from "react";
import styles from "./card-episode.module.css";
import Image from "next/image";
import { convertirAHTML } from "@/lib";
import { CardEpisodeProps } from "@/types";
import DOMPurify from "dompurify";

const CardEpisode: React.FC<CardEpisodeProps> = ({
  title,
  author,
  description,
  titleEpisode,
  image,
  descriptionEpisode,
  audio,
}) => {
  const sanitizedDescription = DOMPurify.sanitize(
    convertirAHTML(descriptionEpisode)
  );
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
              priority
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
        <div className={styles.containerDescription}>
          <div>
            <h2>{titleEpisode}</h2>
          </div>
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizedDescription,
              }}
            />

            <div>
              <audio
                controls
                className={styles.audio}
                data-testid="audio-element"
              >
                <source src={audio} type="audio/mpeg" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEpisode;
