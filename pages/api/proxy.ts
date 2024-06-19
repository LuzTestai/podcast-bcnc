import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-fetch";

// Asigna la función a una variable antes de exportarla

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    res.status(400).json({ error: "Invalid URL" });
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.text();

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// Exporta la variable en lugar de la función anónima
export default handler;
