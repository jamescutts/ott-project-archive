import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("archive");

    const projects = await db.collection("projects").find().limit(40).toArray();

    res.json(projects);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};