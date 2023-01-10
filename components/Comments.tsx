import { useState, useEffect } from "react";
import moment from "moment";
import parse from "html-react-parser";

import { getComments } from "../services";
import Box from "./Box";

export default function Comments({ slug }: any) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((res) => setComments(res));
  }, []);

  return (
    <Box title={`${comments.length} Comments`}>
      {comments.map((comment: any) => {
        return (
          <div key={comment.createdAt} className="mt-4">
            <p>
              <span className="font-bold mr-1">{comment.name}</span>
              on
              <span className="ml-1">
                {moment(comment.createdAt).format("MMM DD, YYYY")}
              </span>
            </p>
            <p className="whitespace-pre-line">{parse(comment.comment)}</p>
          </div>
        );
      })}
    </Box>
  );
}
