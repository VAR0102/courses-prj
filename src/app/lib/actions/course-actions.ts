"use server"

import { createWriteStream } from "fs";
import { InputCourse,  addCourse, getCourseByName,  } from "../api";
import { redirect } from "next/navigation";

export const handleAdd = async (prev: unknown, data: FormData) => {
  const name = data.get("name") as string;
  const price = data.get("price") as string;
  const duration = data.get("duration") as string;
  const cover = data.get("cover") as File;

  if (!name || !price || !duration || !cover) {
    return { message: "Please fill all fields and upload a cover image.", name, price, duration };
  }

  if (isNaN(Number(price)) || isNaN(Number(duration))) {
    return { message: "Price and duration must be numbers.", name, price, duration };
  }

  const existCourse = await getCourseByName(name);
  if (existCourse) {
    return { message: "A course with this name already exists. Please choose another name.", name, price, duration };
  }

  try {
    const extension = cover.type.split("/").pop();
    const filename = `${Date.now()}.${extension}`;
    const filePath = `public/images/${filename}`;
    const stream = createWriteStream(filePath);
    const bufferedImage = await cover.arrayBuffer();
    stream.write(Buffer.from(bufferedImage));
    stream.end();

    const course: InputCourse = {
      name,
      price: Number(price),
      duration: Number(duration),
      cover: `images/${filename}`
    };
    await addCourse(course);

    return redirect("/");
  } catch (error) {
    console.error("Error handling file upload:", error);
    return { message: "An error occurred while uploading the image.", name, price, duration };
  }
}
