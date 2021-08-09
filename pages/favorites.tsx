import React from 'react';
import { AwesomeLink } from '../components/AwesomeLink';
import { prisma } from '../lib/prisma';

const Favorites = ({ favorites }) => {
  return (
    <div className="mx-auto my-20 max-w-5xl px-10">
      <h1 className="text-3xl font-medium my-5">My Favorites</h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {favorites.length === 0 ? (
          <p className="text-2xl font-medium">
            You haven't bookmarked any links yet 👀
          </p>
        ) : (
          favorites.map((link) => (
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
    </div>
  );
};

export default Favorites;

export const getServerSideProps = async () => {
  const user = await prisma.user.findUnique({
    where: {
      email: 'abdelwahab@prisma.io',
    },
    include: {
      favorites: true,
    },
  });
  return {
    props: { favorites: user.favorites },
  };
};
