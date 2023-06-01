export type Entry = {
  _id: String;

  project_id: String;

  author_id: String;

  Title?: String;

  Url?: String;

  Date?: Date;

  Content?: [Content];
};

export type Content = {
  Type: String;
};
