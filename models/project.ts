import { Author } from "../pages";


export type Project = {
  _id: string;

  Title: string;

  Url: string;

  LastUpdated: Date;

  Description?: string;

  HeaderImage?: string;

  author_id?: string;

  Author?: Author;

  Game?: string;

  Company?: string;

  Genre?: string;

  Active: boolean;

  GoldenButton: boolean;
};
