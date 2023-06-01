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
  Type: string;
  Content?: any;
  Image?: Image;
  Url?: string;
};

// export class Text implements Content {
//   Type!: string;
//   Content?: string;
// }

// export class Subtitle implements Content {
//   Type!: string;
//   Content?: string;
// }

// export class Embed implements Content {
//   Type!: string;
//   Url?: string;
// }

// export class List implements Content
// {
//   Type!: string;

//     public List<ListItem>? Items { get; set; }

// }

// export class LargeImage implements Content
// {
//   Type!: string;

//     public Image? Image { get; set; }
// }

// export class ImageGallery implements Content
// {
//   Type!: string;

//     public List<Image>? Images { get; set; }
// }


export class Image {
  Url?: string;
  Alt?: string;
}