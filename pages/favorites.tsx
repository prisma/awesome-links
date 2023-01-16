import React from 'react';
import { AwesomeLink } from '../components/AwesomeLink';
import { gql, useQuery } from '@apollo/client';

const FavoritesQuery = gql`
  query {
    favorites {
      title
      id
      url
      imageUrl
      description
      category
    }
  }
`;

const Favorites = () => {
  const { data, loading, error } = useQuery(FavoritesQuery);
  if (error) return <p>Oops! SOmething went wrong {error}</p>;
  return (
    <div className="mx-auto my-20 max-w-5xl px-10">
      <h1 className="text-3xl font-medium my-5">My Favorites</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.favorites.length === 0 ? (
            <p className="text-2xl font-medium">
              You haven't bookmarked any links yet 👀
            </p>
          ) : (
            data.favorites.map((link) => (
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
