import {
  Badge,
  Card,
  Col,
  Container,
  Grid,
  Link,
  Row,
  Spacer,
  User,
  Text,
} from "@nextui-org/react";
import Layout from "../../components/layout";
import { useState } from "react";
import { Project } from "..";

type Props = {
  projects: [Project];
};

export const getServerSideProps = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}projects`);
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

export default function Projects(props: Props) {
  const [projects, setProjects] = useState<[Project]>(props.projects);

  return (
    <Layout>
      <Spacer y={2} />
      <Container lg>
        <Grid.Container gap={2}>
          {projects.map((project) => (
            <Grid xs={3} key={project._id}>
              <Link href={`/project/${project._id}`}>
                <Card css={{ w: "100%", h: "400px" }} isPressable isHoverable>
                  <Card.Header
                    css={{ position: "absolute", zIndex: 1, top: 5 }}
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
                        alt={project.Title}
                      />
                    )}
                  </Card.Body>
                  <Card.Footer>
                    <Row>
                      <User
                        src={`https://i.pravatar.cc/300?u=${project.author_id}`}
                        name={project.author_id}
                        bordered
                      />
                    </Row>
                  </Card.Footer>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid.Container>
      </Container>
    </Layout>
  );
}
