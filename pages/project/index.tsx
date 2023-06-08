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
  Pagination,
} from "@nextui-org/react";
import Layout from "../../components/layout";
import { useState } from "react";
import { Project } from "../Project";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery, dehydrate, QueryClient } from "react-query";

export default function projectsPage() {
  const router = useRouter();
  const [page, setPage] = useState(parseInt(router.query.page) || 1);
  const { data } = useQuery(
    ["projects", page],
    async () =>
      await fetch(`/api/projects/?page=${page}`).then(
        (result) => result.json()
      ),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  function handlePaginationChange(page: number) {
    setPage(page);
    router.push(`project/?page=${page}`, undefined, { shallow: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <Layout>
      <Spacer y={2} />
      <Container lg>
        <Text h1>Projects</Text>
        <Grid.Container gap={2}>
          {data?.results?.map((project: Project, index: number) => (
            <Grid
              xs={12}
              sm={index === 0 || index === 4 ? 6 : 3}
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
                  {project.Author && (
                    <Card.Footer>
                      <User
                        src={
                          project.Author
                            ? project.Author.ImageUrl
                            : `https://i.pravatar.cc/300?u=${project.author_id}`
                        }
                        name={project.author_id}
                        description={`@${project.author_id}`}
                        bordered={project.Author.GoldenButton}
                        color={
                          project.Author?.GoldenButton ? "warning" : (project.Author.Cog ? "primary" : undefined)
                        }
                      />
                    </Card.Footer>
                  )}
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid.Container>
        <Spacer y={1} />
        <Pagination
          total={data.info.pages}
          initialPage={page}
          onChange={(p) => handlePaginationChange(p)}
          siblings={3}
          boundaries={3}
        />
        <Spacer y={2} />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context: { query: { page: string } }) {
  let page = 1;
  if (context.query.page) {
    page = parseInt(context.query.page);
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ["projects", page],
    async () =>
      await fetch(`${process.env.API_URL}projects/?page=${page}`).then(
        (result) => result.json()
      )
  );
  return { props: { dehydratedState: dehydrate(queryClient) } };
}
