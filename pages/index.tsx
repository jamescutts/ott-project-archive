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
import Head from "next/head";
import { ProjectQuery } from "../models/api";
import { Project } from "../models/project";

type Props = {
  data: ProjectQuery;
};

export const getServerSideProps = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}projects`);
    let data = await res.json();

    return {
      props: { data: data },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { data: undefined },
    };
  }
};

export default function Posts(props: Props) {
  const [data, setData] = useState<ProjectQuery>(props.data);

  return (
    <Layout>
      <Head>
        <title>OnTableTop Project Archive</title>
        <meta name="description" content="OnTableTop Project Archive" />
      </Head>
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
                {data?.info?.count} Projects Archived
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
          {data?.results?.map((project: Project, index) => (
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
