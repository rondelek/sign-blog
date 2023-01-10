import { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";
import Box from "./Box";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((result) => setCategories(result));
  }, []);

  return (
    <Box title={"Categories"}>
      {categories.map((category) => {
        return (
          <Link href={`/category/${category["slug"]}`} key={category["name"]}>
            <h4 className="text-xl font-light py-3 border-b hover:text-red-600 transition duration-400">
              {category["name"]}
            </h4>
          </Link>
        );
      })}
    </Box>
  );
}
