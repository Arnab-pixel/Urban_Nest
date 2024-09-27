import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: {
      listingId?: string;
      userId?: string;
      listing?: {
        userId: string;
      };
    } = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message); // Use error.message for a cleaner error
    } else {
      throw new Error("An unknown error occurred"); // Fallback for non-Error objects
    }
  }
}
