import React from "react";
import styles from "./styles/Nav.module.css";
import { Badge, Button, Link, Navbar, Text } from "@nextui-org/react";

export default function Nav() {
  return (
    <Navbar variant="sticky">
      <Navbar.Brand as={Link} href="/">
        {/* <AcmeLogo /> */}
        <Badge color="primary" content={"Alpha"} isSquared horizontalOffset="-25%">
          <Text b color="inherit" hideIn="xs">
            OTT Project Archive
          </Text>
        </Badge>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        {/* <Navbar.Link href="/entries">Entries</Navbar.Link> */}
        {/* <Navbar.Link href="/project">Projects</Navbar.Link> */}
        {/* <Navbar.Link href="/authors">Authors</Navbar.Link> */}
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button auto flat as={Link} href="https://beastsofwar.com/" target="_blank">
            OnTableTop
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
