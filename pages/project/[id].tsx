import {
  Spacer,
  Container,
  Text,
  Spinner,
  Image,
  User,
  Badge,
  Grid,
} from "@nextui-org/react";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import { Project } from "..";
import { Entry } from "../../models/entry";

interface Props {
  project?: Project;
}

export async function getServerSideProps(context: { query: { id: any } }) {
  const id = context.query.id;

  try {
    const res = await fetch(`${process.env.API_URL}projects/${id}`);

    let project = await res.json();

    return {
      props: { project: JSON.parse(JSON.stringify(project)) },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { project: undefined },
    };
  }
}
export default function ProjectPage(props: Props) {
  const [project, setProject] = useState<Project | undefined>(props.project);

  return (
    <Layout>
      {project?.HeaderImage && (
        <>
          <Spacer y={2} />
          <Container md>
            <Image
              // height={500}
              src={project?.HeaderImage.toString()}
              alt={project.Title.toString()}
              objectFit="cover"
            />
          </Container>
        </>
      )}
      <Container sm>
        <Spacer y={1} />
        <h1>{project?.Title}</h1>
        {project?.GoldenButton && (
          <Badge color="warning" isSquared size="lg">
            Golden Button
          </Badge>
        )}
        {project?.Active && (
          <Badge color="success" isSquared size="lg" variant="flat">
            Active
          </Badge>
        )}
        <Spacer y={1} />
        <User
          src={`https://i.pravatar.cc/300?u=${project?.author_id}`}
          name={project?.author_id}
          description={`@${project?.author_id}`}
          size="lg"
        />
        <Spacer y={1} />
        <Text>{project?.Description}</Text>
        <Spacer y={1} />

        {project?.Game && <Badge variant="bordered">{project?.Game}</Badge>}
        {project?.Company && (
          <Badge variant="bordered">{project?.Company}</Badge>
        )}
        {project?.Genre && <Badge variant="bordered">{project?.Genre}</Badge>}

        <Spacer y={2} />
      </Container>
    </Layout>
  );
}
