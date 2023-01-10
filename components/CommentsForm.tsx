import { useRef, useState, useEffect } from "react";
import Box from "./Box";
import { submitComment } from "../services";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

type CommentsForm = {
  slug: String;
};

export default function CommentsForm({ slug }: CommentsForm) {
  const [error, setError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [localStorage, setLocalStorage] = useState<any>(null);

  const commentEl: any = useRef();
  const nameEl: any = useRef();
  const emailEl: any = useRef();
  const storeDataEl: any = useRef();
  const [formData, setFormData] = useState({
    name: undefined,
    email: undefined,
    comment: undefined,
    storeData: "no",
  });

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initialFormData: any = {
      name: window.localStorage.getItem("name"),
      email: window.localStorage.getItem("email"),
      storeData:
        window.localStorage.getItem("name") ||
        window.localStorage.getItem("email"),
    };
    setFormData(initialFormData);
  }, []);

  const onInputChange = (e: any) => {
    const { target } = e;
    if (target.type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handleCommentSubmission = () => {
    setError(false);
    const { name, email, comment, storeData } = formData;
    if (!name || !email || !comment) {
      setError(true);
      return;
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData === "yes") {
      localStorage!.setItem("name", name);
      localStorage!.setItem("email", email);
    } else {
      localStorage!.removeItem("name");
      localStorage!.removeItem("email");
    }

    submitComment(commentObj).then((res) => {
      setOpenSnackbar(true);
    });
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const inputStyle =
    "w-full p-4 rounded-lg outline-none bg-gray-100 focus:ring-2 focus:ring-gray-200";

  return (
    <Box title={"Leave a reply"}>
      <div className="grid grid-cols-1 mt-6">
        <textarea
          value={formData.comment}
          className={`h-40 ${inputStyle}`}
          placeholder="Comment"
          name="comment"
          onChange={onInputChange}
        />
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-4 gap-6">
        <input
          value={formData.name}
          className={inputStyle}
          type="text"
          name="name"
          placeholder="Name"
          onChange={onInputChange}
        />
        <input
          value={formData.email}
          className={inputStyle}
          type="email"
          name="email"
          placeholder="Email"
          onChange={onInputChange}
        />
      </div>
      <div className="grid grid-cols-1 mt-6">
        <div>
          <input
            value={formData.storeData}
            type="checkbox"
            name="storeData"
            id="storeData"
            className="cursor-pointer"
            onChange={onInputChange}
          />
          <label
            className="text-gray-500 cursor-pointer pl-2"
            htmlFor="storeData"
          >
            Save my name and e-mail for the next time I comment
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs pt-2 text-red-500">All fields are required</p>
      )}
      <Button
        variant="outlined"
        sx={{ marginTop: "1rem" }}
        onClick={handleCommentSubmission}
      >
        Post comment
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        message="Comment submitted successfully"
        onClose={handleClose}
      />
    </Box>
  );
}
