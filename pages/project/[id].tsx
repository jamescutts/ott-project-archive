import {
  Spacer,
  Container,
  Text,
  Spinner,
  Image,
  User,
  Badge,
  Grid,
  Card,
  Col,
  Row,
  Button,
} from "@nextui-org/react";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import { Project } from "..";
import { Entry } from "../../models/entry";
import Link from "next/link";
import Head from "next/head";
import { formatDistanceToNow, formatRelative, subDays } from "date-fns";

interface Props {
  project?: Project;
  entries?: [Entry];
}

export async function getServerSideProps(context: { query: { id: any } }) {
  const id = context.query.id;

  try {
    const res = await fetch(`${process.env.API_URL}projects/${id}`);

    let project = await res.json();

    const eres = await fetch(`${process.env.API_URL}entries/${id}`);
    let entries = await eres.json();

    return {
      props: {
        project: JSON.parse(JSON.stringify(project)),
        entries: JSON.parse(JSON.stringify(entries)),
      },
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
  const [entries, setEntries] = useState<[Entry] | undefined>(props.entries);

  return (
    <Layout>
      {project && (
        <>
          <Head>
            <title>{project.Title} | OnTableTop Project Archive</title>
            <meta
              name="description"
              content={project.Description?.substring(0, 160)}
            />
          </Head>
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
            <Text h1>{project?.Title}</Text>
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
            <Row>
              <Col>
                <User
                  src={
                    project.Author
                      ? project.Author.ImageUrl
                      : `https://i.pravatar.cc/300?u=${project.author_id}`
                  }
                  name={project.author_id}
                  description={`@${project?.author_id}`}
                  size="lg"
                />
              </Col>
              <Col css={{ flex: 1 }}>
                <Link href={project?.Url.toString()} target="_blank">
                  <Button>View OnTableTop</Button>
                </Link>
              </Col>
            </Row>
            <Spacer y={1} />
            <Text size="$xl">{project?.Description}</Text>
            <Spacer y={1} />

            {project?.Game && <Badge variant="bordered">{project?.Game}</Badge>}
            {project?.Company && (
              <Badge variant="bordered">{project?.Company}</Badge>
            )}
            {project?.Genre && (
              <Badge variant="bordered">{project?.Genre}</Badge>
            )}

            <Spacer y={2} />
          </Container>

          {entries && (
            <>
              <Spacer y={2} />
              {entries.map((entry) => (
                <>
                  <Container sm>
                    <Card>
                      <Card.Header>
                        <Col>
                          <Text h2>{entry.Title}</Text>
                          <Row>
                            {entry.Date && (
                              <Col css={{ flex: 2 }}>
                                <Text>
                                  {formatDistanceToNow(new Date(entry.Date), {
                                    addSuffix: true,
                                  })}
                                </Text>
                              </Col>
                            )}
                            <Col css={{ flex: 1, flexDirection: "row" }}>
                              <Badge color="primary">
                                Tutoring {entry.Recommendations?.Tutoring}
                              </Badge>
                              <Badge color="error">
                                Skill {entry.Recommendations?.Skill}
                              </Badge>
                              <Badge color="warning">
                                Idea {entry.Recommendations?.Idea}
                              </Badge>
                            </Col>
                          </Row>
                        </Col>
                      </Card.Header>
                      <Card.Divider />
                      <Card.Body>
                        {entry.Content?.map((content) => (
                          <>
                            {content.Type === "text" && (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: content.Content,
                                }}
                              />
                            )}
                            {content.Type === "image-large" &&
                              content.Image?.Url && (
                                <Link href={content.Image?.Url} target="_blank">
                                  <Image
                                    src={content.Image?.Url?.toString()}
                                    alt={content.Image?.Alt?.toString()}
                                    objectFit="cover"
                                  />
                                </Link>
                              )}
                            {content.Type === "image-gallery" && (
                              <Grid.Container gap={1}>
                                {content.Images?.map((image) => (
                                  <>
                                    {image.Url && (
                                      <Grid xs={6} key={image.Url}>
                                        <Link href={image?.Url} target="_blank">
                                          <Image
                                            src={image.Url?.toString()}
                                            alt={image.Alt?.toString()}
                                            objectFit="cover"
                                          />{" "}
                                        </Link>
                                      </Grid>
                                    )}
                                  </>
                                ))}
                              </Grid.Container>
                            )}
                            {content.Type === "list" && <h3>{content.Type}</h3>}
                            {content.Type === "embed" && (
                              <iframe
                                width="637"
                                height="358"
                                src={content.Url}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                title={entry.Title?.toString()}
                                style={{
                                  aspectRatio: " 16 / 9",
                                  width: "100%",
                                }}
                              ></iframe>
                            )}
                            <Spacer y={1} />
                          </>
                        ))}
                      </Card.Body>
                    </Card>
                  </Container>
                  <Spacer y={2} />
                </>
              ))}
            </>
          )}
        </>
      )}
    </Layout>
  );
}
