import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("archive");

    const count = await db.collection("projects").countDocuments();

    res.json(count);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};