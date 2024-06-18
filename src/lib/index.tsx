import React from "react";

export const cortarStrPorGuionOComa = (str: string) => {
  const indexGuion = str.indexOf("-");
  const indexComa = str.indexOf(",");
  const indexCorte = Math.min(
    indexGuion !== -1 ? indexGuion : Infinity,
    indexComa !== -1 ? indexComa : Infinity
  );

  return indexCorte !== Infinity ? str.slice(0, indexCorte) : str;
};

export const convertirFecha = (fecha: string | number | Date) => {
  return new Date(fecha).toLocaleDateString("es-AR");
};

export const convertirDuracion = (duracionSegundos: number) => {
  console.log("ACA LA DURACION:", duracionSegundos);
  const horas = Math.floor(duracionSegundos / 3600);
  const minutos = Math.floor((duracionSegundos % 3600) / 60);
  const segundos = duracionSegundos % 60;

  const duracionFormateada = `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;

  return duracionFormateada;
};

export const convertirAHTML = (stringHTML: string) => {
  const divElement = document.createElement("div");
  divElement.innerHTML = stringHTML;
  return divElement.innerHTML;
};
