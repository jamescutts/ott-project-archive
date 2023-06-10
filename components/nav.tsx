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
      <Navbar.Brand as={Link} href="/">
        {/* <Navbar.Toggle aria-label="toggle navigation" /> */}
        {/* <AcmeLogo /> */}
        <Text b color="inherit" hideIn="xs" >
          OTT Project Archive
        </Text>
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
        <Navbar.Link href="/project">Projects</Navbar.Link>
        <Navbar.Link href="/authors">
          Authors
        </Navbar.Link>
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
      {/* <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem key={item}>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="#"
            >
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse> */}
    </Navbar>
  );
}

// <Navbar variant="sticky">
//   <Navbar.Brand as={Link} href="/">
//     {/* <AcmeLogo /> */}
//     <Badge color="primary" content={"Alpha"} isSquared horizontalOffset="-25%">
//       <Text b color="inherit" hideIn="xs">
//         OTT Project Archive
//       </Text>
//     </Badge>
//   </Navbar.Brand>
//   <Navbar.Content hideIn="xs">
//     {/* <Navbar.Link href="/entries">Entries</Navbar.Link> */}
//     {/* <Navbar.Link href="/project">Projects</Navbar.Link> */}
//     {/* <Navbar.Link href="/authors">Authors</Navbar.Link> */}
//   </Navbar.Content>
//   <Navbar.Content>
//     <Navbar.Item>
//       <Button auto flat as={Link} href="https://beastsofwar.com/project" target="_blank">
//         OnTableTop
//       </Button>
//     </Navbar.Item>
//   </Navbar.Content>
// </Navbar>
