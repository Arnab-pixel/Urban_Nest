import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });
    return favorites;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message); // Use error.message for a cleaner error
    } else {
      throw new Error("An unknown error occurred"); // Fallback for non-Error objects
    }
  }
}
