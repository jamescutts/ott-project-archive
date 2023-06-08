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
} from "@nextui-org/react";
import Head from 'next/head';

export default function Games() {
  return (
    <Layout>
      <Head>
        <title>Games | OnTableTop Project Archive</title>
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
              <Text h1>Games</Text>
              <Text size={24}>Coming soon</Text>
              <Spacer y={1} />
            </Card.Body>
          </Card>
        </Container>
      </header>
    </Layout>
  );
}
