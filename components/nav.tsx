import React from "react";
import styles from "./styles/Nav.module.css";
import { Badge, Button, Link, Navbar, Text } from "@nextui-org/react";

export default function Nav() {
  const collapseItems = [
    "Features",
    "Customers",
    "Pricing",
    "Company",
    "Legal",
    "Team",
    "Help & Feedback",
    "Login",
    "Sign Up",
  ];

  return (
    <Navbar variant="sticky">
      <Navbar.Brand>
        <Navbar.Toggle aria-label="toggle navigation" showIn="xs" />
        <Link href="/">
          <Text b color="inherit">
            OTT Project Archive
          </Text>
        </Link>
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
        <Navbar.Link href="/project">Projects</Navbar.Link>
        <Navbar.Link href="/authors">Authors</Navbar.Link>
        <Navbar.Link href="/games">Games</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button
            auto
            flat
            as={Link}
            href="https://beastsofwar.com/project"
            target="_blank"
          >
            OnTableTop
          </Button>
        </Navbar.Item>
      </Navbar.Content>
      <Navbar.Collapse>
        <Navbar.CollapseItem>
          <Link
            color="inherit"
            css={{
              minWidth: "100%",
            }}
            href="/project"
          >
            Projects
          </Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem>
          <Link
            color="inherit"
            css={{
              minWidth: "100%",
            }}
            href="/authors"
          >
            Authors
          </Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem>
          <Link
            color="inherit"
            css={{
              minWidth: "100%",
            }}
            href="/games"
          >
            Games
          </Link>
        </Navbar.CollapseItem>
      </Navbar.Collapse>
    </Navbar>
  );
}