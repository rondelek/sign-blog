import { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((result) => setCategories(result));
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 lg:p-8 pb-12 my-8 ">
      <h3 className="text-2xl border-b pb-4">Categories</h3>
      {categories.map((category) => {
        return (
          <Link href={`/category/${category["slug"]}`} key={category["name"]}>
            <h4 className="text-xl font-light py-3 border-b hover:text-red-600 transition duration-400">
              {category["name"]}
            </h4>
          </Link>
        );
      })}
    </div>
  );
}
