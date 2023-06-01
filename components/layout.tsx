import React from "react";
import Navbar from "./nav";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
// import 'semantic-ui-css/semantic.min.css'

export default function Layout(props: any) {

  return (
    <NextUIProvider>
      <Navbar />
      {props.children}
    </NextUIProvider>
  );
}
