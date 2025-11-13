// this service is used for users to get the product listings
// not the service for the seller
// Use the listing type defined in prisma/schema.prisma
import { Listings, Reviews } from "@prisma/client";
// initialize a prisma client if not already and use in queries here
import prisma from "../../../../prisma/client";

export const fetchAllProducts = async (): Promise<Listings[]> => {
  // get all records in the listings table
  return prisma.listings.findMany();
};

export const fetchAllReviewsByProductId = async (): Promise<Reviews[]> => {
  // get all records in the reviews table by ProductId
  return prisma.listings.findMany();
};

export const getTermById = async (id: number): Promise<Term | null> => {
  try {
    // get first record that match the "where" object key/value pairs
    const term = prisma.term.findUnique({
      where: {
        id: id,
      },
    });

    if (!term) {
      return null;
    } else {
      return term;
    }
  } catch (error) {
    throw new Error(`Failed to fetch term with id ${id}`);
  }
};

export const createTerm = async (termData: {
  title: string;
  definition: string;
}): Promise<Term> => {
  // create a new term with termData as its column values, except for isFavourite as false
  const newTerm: Term = await prisma.term.create({
    data: {
      isFavourite: false,
      ...termData,
    },
  });

  return newTerm;
};

export const updateTerm = async (
  id: number,
  term: { title: string; definition: string; isFavourite: boolean }
): Promise<Term> => {
  // find a term where the id matches the id parameter, and update with the term argument for values
  const updateTerm = await prisma.term.update({
    where: {
      id: id,
    },
    data: {
      ...term,
    },
  });
  return updateTerm;
};

export const deleteTerm = async (id: number): Promise<void> => {
  // delete the term that matches the where key/value pairs
  await prisma.term.delete({
    where: {
      id: id,
    },
  });
};
