import { z } from "zod";

export const movieSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Movie Name must be at least 3 characters" })
    .nonempty({ message: "Movie Name is required" }),
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(10, { message: "Rating cannot be more than 10" }),     
  genre: z.string().nonempty({ message: "Genre is required" }),
});

export type MovieFormData = z.infer<typeof movieSchema>;
