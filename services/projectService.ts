import clientPromise from "../lib/mongodb";
import { Project } from "../pages";
import project from "../pages/project";

export const getServerSideProps = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/projects");
    let projects = await res.json();

    return {
      props: { projects: JSON.parse(JSON.stringify(projects)) },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { projects: [] },
    };
  }
};

export async function getProject(
    slug: string,
  ): Promise<Project> {


    try {
        const client = await clientPromise;
        const db = client.db("archive");
    
        const project = await db.collection("projects").findOne({ _id: slug });
    
        return project;
      } catch (e) {
        console.error(e);
        throw new Error(e).message;
      }
  }
  