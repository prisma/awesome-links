import React from 'react';
import { prisma } from '../../lib/prisma';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/dist/client/router';

const BookmarkLinkMutation = gql`
  mutation ($id: String!) {
    bookmarkLink(id: $id) {
      title
      url
      imageUrl
      category
      description
    }
  }
`;

const Link = ({ link }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [createBookmark] = useMutation(BookmarkLinkMutation);
  const router = useRouter();

  const bookmark = async () => {
    setIsLoading(true);
    toast.promise(createBookmark({ variables: { id: link.id } }), {
      loading: 'working on it',
      success: 'Saved successfully! 🎉',
      error: `Something went wrong 😥 Please try again`,
    });
    setIsLoading(false);
  };

  return (
    <div>
      <div className="prose container mx-auto px-8">
        <Toaster />
        <button
          onClick={() => bookmark()}
          className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="w-6 h-6 animate-spin mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              Saving...
            </span>
          ) : (
            <span>Bookmark</span>
          )}
        </button>
        <h1>{link.title}</h1>
        <img src={link.imageUrl} className="shadow-lg rounded-lg" />
        <p>{link.description}</p>
        <a className="text-blue-500" href={`${link.url}`}>
          {link.url}
        </a>
      </div>
    </div>
  );
};

export default Link;

export const getServerSideProps = async ({ params }) => {
  const id = params.id;
  const link = await prisma.link.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      category: true,
      url: true,
      imageUrl: true,
      description: true,
    },
  });
  return {
    props: {
      link,
    },
  };

  // const { data } = await client.query({
  //   query: gql`
  //     query ($id: String!) {
  //       link(id: $id) {
  //         id
  //         title
  //         description
  //         category
  //         url
  //         imageUrl
  //         isBookmarked
  //       }
  //     }
  //   `,
  //   variables: { id },
  // });
  // const { title, description, category, imageUrl, url, isBookmarked } = data;
  // const link = {
  //   id,
  //   title,
  //   description,
  //   category,
  //   imageUrl,
  //   url,
  //   isBookmarked,
  // };
  // return {
  //   props: { link },
  // };
};
