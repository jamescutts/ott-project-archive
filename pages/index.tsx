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
};

type Author = {
  _id: String;
  ImageUrl: String;
  GoldenButton: String;
};

export type Project = {
  _id: String;

  Title: String;

  Url: String;

  Description?: String;

  HeaderImage?: String;

  author_id?: String;

  Game?: String;

  Company?: String;

  Genre?: String;

  Active: boolean;

  GoldenButton: boolean;
};

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

export default function Posts(props: Props) {
  const [projects, setProjects] = useState<[Project]>(props.projects);

  return (
    <Layout>
      <header className="store-hero">
        <Spacer y={2} />
        <Container lg>
          <Card variant="bordered">
            <Card.Body css={{ padding: "$24" }}>
              <Text
                h1
                css={{
                  textGradient: "45deg, #5699b6 -20%, #3a7792 50%",
                }}
              >
                Welcome to the OnTableTop Project Archive
              </Text>
              <Text size={24}>
                This project aims to create an mirror of project content from
                OnTableTop for archival purposes.
              </Text>
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
              xs={
                index === 0 || index === 4 || index === 10 || index === 15
                  ? 6
                  : 3
              }
            >
              <Card
                css={{ w: "100%", h: "400px" }}
                isPressable
                isHoverable
                as={Link}
                href={`/project/${project._id}`}
              >
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
                  <Card.Image
                    src={project.HeaderImage}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    alt={project.Title.toString()}
                  />
                </Card.Body>
                <Card.Footer>
                  <Row>
                    <Col>
                      <User
                        src={`https://i.pravatar.cc/300?u=${project.author_id}`}
                        name={project.author_id}
                        description={`@${project.author_id}`}

                      />
                    </Col>
                    <Col>
                      <Row justify="flex-end">
                        {project.GoldenButton && (
                          <Badge color="warning">Golden Button</Badge>
                        )}
                      </Row>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      </Container>
      <Spacer y={2} />
    </Layout>
  );
}
