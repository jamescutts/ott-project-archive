import Layout from "../components/layout";
import { useState } from "react";
import {
  Container,
  Grid,
  Spacer,
  Card,
  Text,
  Col,
  Row,
  Button,
  User,
  Badge,
  Link,
  Input,
} from "@nextui-org/react";

type Props = {
  projects: [Project];
  count: number | undefined;
};

type Author = {
  _id: string;
  ImageUrl: string;
  GoldenButton: string;
};

export type Project = {
  _id: string;

  Title: string;

  Url: string;

  LastUpdated: Date;

  Description?: string;

  HeaderImage?: string;

  author_id?: string;

  Author?: Author;

  Game?: string;

  Company?: string;

  Genre?: string;

  Active: boolean;

  GoldenButton: boolean;
};

export const getServerSideProps = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}projects`);
    let projects = await res.json();

    const cres = await fetch(`${process.env.API_URL}projects/count`);
    let count = await cres.json();

    return {
      props: { projects: JSON.parse(JSON.stringify(projects)), count: count },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { projects: [], count: undefined },
    };
  }
};

export default function Posts(props: Props) {
  const [projects, setProjects] = useState<[Project]>(props.projects);
  const [count, setCount] = useState<number | undefined>(props.count);

  return (
    <Layout>
      <header className="store-hero">
        <Spacer y={2} />
        <Container lg>
          <Card
            variant="bordered"
            css={{
              backgroundImage:
                "linear-gradient(45deg, #5699b6 -20%, #3a7792 50%)",
            }}
          >
            <Card.Body css={{ padding: "$24" }}>
              <Text h1>Welcome to the OnTableTop Project Archive</Text>
              <Text size={24}>
                This project aims to create an mirror of project content from
                OnTableTop for archival purposes.
              </Text>
              <Spacer y={1} />
              <Badge size="xl" disableOutline color="success" variant="flat">
                {count} Projects Archived
              </Badge>
            </Card.Body>
          </Card>
        </Container>
      </header>

      <Spacer y={2} />

      {/* <Container lg>
        <Grid.Container gap={2}>
          <Grid xs={12}>
            <Input placeholder="Search" type="search" size="xl" bordered fullWidth />
          </Grid>
        </Grid.Container>
      </Container>
      <Spacer y={2} /> */}

      <Container lg>
        <Grid.Container gap={2}>
          {projects.map((project, index) => (
            <Grid
              xs={12}
              sm={
                index === 0 ||
                index === 4 ||
                index === 10 ||
                index === 15 ||
                index === 17 ||
                index === 19
                  ? 6
                  : 3
              }
              key={project._id}
            >
              <Link href={`/project/${project._id}`}>
                <Card css={{ w: "100%", h: "400px" }} isPressable isHoverable>
                  {project.GoldenButton && (
                    <Badge
                      color="warning"
                      css={{
                        position: "absolute",
                        zIndex: 2,
                        top: 15,
                        right: 15,
                      }}
                      size={"sm"}
                    >
                      Golden Button
                    </Badge>
                  )}
                  <Card.Header
                    css={{
                      position: "absolute",
                      zIndex: 1,
                      top: 5,
                    }}
                  >
                    <Col>
                      <Text
                        size={12}
                        weight="bold"
                        transform="uppercase"
                        color="#9E9E9E"
                      >
                        {project.Genre}
                      </Text>
                      <Text h3 color="white">
                        {project.Title}
                      </Text>
                    </Col>
                  </Card.Header>
                  <Card.Body css={{ p: 0 }}>
                    {project.HeaderImage && (
                      <Card.Image
                        src={project.HeaderImage}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                        alt={project.Title.toString()}
                      />
                    )}
                  </Card.Body>
                  <Card.Footer>
                    <User
                      src={
                        project.Author
                          ? project.Author.ImageUrl
                          : `https://i.pravatar.cc/300?u=${project.author_id}`
                      }
                      name={project.author_id}
                      description={`@${project.author_id}`}
                    />
                  </Card.Footer>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid.Container>
      </Container>
      <Spacer y={2} />
    </Layout>
  );
}
