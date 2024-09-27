import prisma from "@/app/libs/prismadb";

export interface IListingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const {
      userId,
      bathroomCount,
      category,
      endDate,
      guestCount,
      locationValue,
      roomCount,
      startDate,
    } = params;

    interface ListingQuery {
      userId?: string;
      category?: string;
      roomCount?: { gte: number };
      guestCount?: { gte: number };
      bathroomCount?: { gte: number };
      locationValue?: string;
      NOT?: {
        reservations: {
          some: {
            OR: Array<
              | {
                  endDate: { gte: string };
                  startDate: { lte: string };
                }
              | {
                  startDate: { lte: string };
                  endDate: { gte: string };
                }
            >;
          };
        };
      };
    }

    const query: ListingQuery = {};

    if (userId) {
      query.userId = userId;
    }
    if (category) {
      query.category = category;
    }
    if (roomCount) {
      query.roomCount = { gte: +roomCount };
    }
    if (guestCount) {
      query.guestCount = { gte: +guestCount };
    }
    if (bathroomCount) {
      query.bathroomCount = { gte: +bathroomCount };
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    return listings;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message); // Use error.message for a cleaner error
    } else {
      throw new Error("An unknown error occurred"); // Fallback for non-Error objects
    }
  }
}
