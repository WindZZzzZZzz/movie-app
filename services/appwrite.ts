import { Client, Databases, ID, Query } from "appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const SEARCH_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_SEARCH_COLLECTION_ID!;
const SAVE_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, SEARCH_COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        SEARCH_COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, SEARCH_COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, SEARCH_COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const saveMovie = async (movie: MovieDetails) => {
  try {
    await database.createDocument(DATABASE_ID, SAVE_COLLECTION_ID, ID.unique(), {
      id: movie.id.toString(),
      title: movie.title,
      poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
    });
  } catch (error) {
    console.error('Error saving movie:', error);
    throw error;
  }
};

export const cancelSaveMovie = async (movieId: string) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, SAVE_COLLECTION_ID, [
      Query.equal('id', movieId),
    ]);

    if (result.documents.length > 0) {
      const docId = result.documents[0].$id;
      await database.deleteDocument(DATABASE_ID, SAVE_COLLECTION_ID, docId);
    }
  } catch (error) {
    console.error('Error canceling saved movie:', error);
    throw error;
  }
};

export const isMovieSaved = async (movieId: string): Promise<boolean> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, SAVE_COLLECTION_ID, [
      Query.equal('id', movieId),
    ]);
    return result.documents.length > 0;
  } catch (error) {
    console.error('Error checking if movie is saved:', error);
    return false;
  }
};

export const allSavedMovie = async (): Promise<Movie[]|undefined> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, SAVE_COLLECTION_ID);
    return result.documents as unknown as Movie[];
  } catch (error) {
    console.error('Error getting saved movies:', error);
    return undefined;
  }
};
