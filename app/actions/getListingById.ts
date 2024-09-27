import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message); // Use error.message for a cleaner error
    } else {
      throw new Error("An unknown error occurred"); // Fallback for non-Error objects
    }
  }
}
