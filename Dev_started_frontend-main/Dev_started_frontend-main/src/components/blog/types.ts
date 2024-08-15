export interface IBlogCategory {
  title: string;
  id: number;
}

export interface IAuthor {
  username: string;
  full_name: string;
}

export interface ICategory {
  title: string;
  id: number;
}
export interface IBlog {
  category: IBlogCategory;
  title: string;
  slug: string;
  author: IAuthor;
  updated_on: string;
  content: string;
  created_on: string;
  read_count: number;
  read_time: number;
  likes_count: number;
  image: string;
}

export interface IBlogList {
  blogs: Array<IBlog>;
}

// {
//     "category": {
//       "title": "Test",
//       "id": 1
//     },
//     "title": "Test 2",
//     "slug": "test-2",
//     "author": "Shallin Veer",
//     "updated_on": "2023-12-20T17:40:42.586Z",
//     "content": "<p>Test 2</p>\r\n<p>Test 2</p>\r\n<p></p>\r\n<p>Test 2</p>\r\n<p>Test 2</p>\r\n<p></p>\r\n<p>Test 2</p>\r\n<p>Test 2</p>\r\n<p></p>\r\n<p>Test 2</p>\r\n<p>Test 2</p>\r\n<p></p>\r\n<p></p>",
//     "created_on": "2023-12-20T17:40:42.586Z",
//     "read_count": 0,
//     "read_time": 1,
//     "likes_count": 5,
//     "image": "https://the-dev-starter.s3.amazonaws.com/tinymce/images/WhatsApp_Image_2023-12-14_at_23.37.12.jpeg?AWSAccessKeyId=AKIA2OTLPPAODD24MUIJ&Signature=pzu781mt01NBEsbVYOLZsrE7WKM%3D&Expires=1703095548"
//   }
