import { Project } from "./project";

export interface ProjectQuery {
  info: Info;
  results: Project[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: any;
}
