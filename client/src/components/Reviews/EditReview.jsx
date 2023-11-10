import { useEffect, useState } from "react";
import {
  editReview,
  fetchReviewByReviewId,
  deleteReview,
} from "../../API/reviews";
import { useParams, useNavigate } from "react-router-dom";
import { Card, TextField } from "@mui/material";

export default function EditReview() {
  const { review_id } = useParams();
  const [isDeleted, setIsDeleted] = useState(false);
  const [postToEdit, setPostToEdit] = useState({
    review_image: "",
    review_title: "",
    review_post: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getReviewByReviewId() {
      try {
        const response = await fetchReviewByReviewId(review_id);
        const selectedReview = response;
        setPostToEdit({
          review_id: selectedReview.review_id,
          review_title: selectedReview.review_title,
          review_image: selectedReview.review_image,
          review_post: selectedReview.review_post,
        });
      } catch (error) {
        console.error("Trouble getting post. Try again!", error);
      }
    }
    getReviewByReviewId();
  }, [review_id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await editReview(postToEdit.review_id, postToEdit);
      console.log("Edited", response);
      alert("Post successfully edited!");
      navigate("/reviews");
      const returnVal = response;
      return returnVal;
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (review_id) => {
    try {
      const response = await deleteReview(review_id);
      console.log("Deleted", response);
      setIsDeleted(true);
    } catch (error) {
      console.error("Trouble deleting post. Try again!", error);
    }
  };

  return (
    <div>
      <div className="form">
        <h1 className="header">edit a review</h1>
        <Card style={{ background: "#FBFBED", color: "#1E221F" }}>
          <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <TextField
              id="NP-input-box"
              label="Image"
              fullWidth
              margin="normal"
              multiline
              value={postToEdit.review_image}
              onChange={(e) =>
                setPostToEdit({
                  ...postToEdit,
                  review_image: e.target.value,
                })
              }
            />
            <TextField
              id="NP-input-box"
              label="Title"
              fullWidth
              margin="normal"
              multiline
              value={postToEdit.review_title}
              onChange={(e) =>
                setPostToEdit({
                  ...postToEdit,
                  review_title: e.target.value,
                })
              }
            />
            <TextField
              id="NP-input-box"
              label="Post"
              fullWidth
              margin="normal"
              multiline
              value={postToEdit.review_post}
              onChange={(e) =>
                setPostToEdit({
                  ...postToEdit,
                  review_post: e.target.value,
                })
              }
            />
            <button type="submit">Submit</button>
            <button
              className="button"
              onClick={() => {
                const shouldDelete = window.confirm(
                  "Are you sure you want to delete this post?"
                );
                if (shouldDelete) {
                  handleDelete(review_id);
                  navigate("/reviews");
                }
              }}
            >
              Delete
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
