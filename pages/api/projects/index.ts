import { WithId, Document } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async (
  req: { query: any },
  res: {
    json: (arg0: {
      info: {
        count: number;
        pages: number;
        next: string | null;
        previous: string | null;
      };
      results: WithId<Document>[];
    }) => void;
  }
) => {
  const pageSize = 42;
  const query = req.query;
  const { page } = query;
  try {
    const client = await clientPromise;
    const db = client.db("archive");

    const currentPage = page ? parseInt(page) : 1;

    const skip = (currentPage - 1) * pageSize;

    const projects = await db
      .collection("projects")
      .find()
      .sort({ LastUpdated: -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const count = await db.collection("projects").countDocuments();
    const pages = Math.ceil(count / pageSize);
    const result = {
      info: {
        count: count,
        pages: pages,
        next:
          page < pages
            ? `${process.env.API_URL}projects?page=${currentPage + 1}`
            : null,
        previous:
          page > 1
            ? `${process.env.API_URL}projects?page=${currentPage - 1}`
            : null,
      },
      results: projects,
    };

    res.json(result);
  } catch (e: any) {
    console.error(e);
    throw new Error(e).message;
  }
};
