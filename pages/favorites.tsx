import React from 'react';
import { AwesomeLink } from '../components/AwesomeLink';
import { gql, useQuery } from '@apollo/client';
import type { Link } from '.prisma/client';

const FavoritesQuery = gql`
  query {
    favorites {
      bookmarks{
        title
        id
        url
        imageUrl
        description
        category
      }
    }
  }
`;

const Favorites = () => {
  const { data, loading, error } = useQuery(FavoritesQuery);
  if (error) return <p>Oops! Something went wrong {JSON.stringify(error)}</p>;

  return (
    <div className="mx-auto my-20 max-w-5xl px-10">
      <h1 className="text-3xl font-medium my-5">My Favorites</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.favorites.bookmarks.length === 0 ? (
            <p className="text-2xl font-medium">
              You haven't bookmarked any links yet 👀
            </p>
          ) : (
            data.favorites.bookmarks.map((link: Link) => (
              <div key={link.id}>
                <AwesomeLink
                  title={link.title}
                  description={link.description}
                  category={link.category}
                  imageUrl={link.imageUrl}
                  url={link.url}
                  id={link.id}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
