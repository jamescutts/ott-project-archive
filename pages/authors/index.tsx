import Layout from "../../components/layout";
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
  Table,
  Tooltip,
} from "@nextui-org/react";
import Head from "next/head";
import { Author } from "../../models/Author";
import { useState } from "react";

type Props = {
  data: [Author];
};

const columns = [
  {
    key: "_id",
    label: "NAME",
  },
  {
    key: "Cog",
    label: "CULT OF GAMES",
  },
];

export const getServerSideProps = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}authors`);
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

export default function Authors(props: Props) {
  const [data, setData] = useState<[Author]>(props.data);

  const renderCell = (author: Author, columnKey: string) => {
    switch (columnKey) {
      case "_id":
        return (
          <User
            src={author.ImageUrl}
            name={author._id}
            description={`@${author._id}`}
            bordered={author.GoldenButton}
            color={
              author.GoldenButton
                ? "warning"
                : author.Cog
                ? "primary"
                : undefined
            }
          />
        );
      case "Cog":
        return author.Cog ? <Badge color="primary">CoG Member</Badge> : <></>;
      default:
        return;
    }
  };

  return (
    <Layout>
      <Head>
        <title>Authors | OnTableTop Project Archive</title>
        <meta name="description" content="OnTableTop Project Archive" />
      </Head>
      <header className="store-hero">
        <Spacer y={2} />

        <Container lg>
          <Text h1>Authors</Text>

          <Spacer y={2} />

          <Table
            aria-label="Example table with dynamic content"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            selectionMode="single"
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column key={column.key}>{column.label}</Table.Column>
              )}
            </Table.Header>
            <Table.Body items={data}>
              {(item) => (
                <Table.Row key={item._id}>
                  {(columnKey) => (
                    <Table.Cell>
                      {renderCell(item, columnKey.toString())}
                    </Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
            <Table.Pagination
              shadow
              noMargin
              align="center"
              rowsPerPage={10}
              onPageChange={(page) => console.log({ page })}
            />
          </Table>
        </Container>
        <Spacer y={2} />
      </header>
    </Layout>
  );
}
