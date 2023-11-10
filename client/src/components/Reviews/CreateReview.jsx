import { useState } from "react";
import { Card, TextField, CardContent } from "@mui/material";
import { createReview } from "../../API/reviews";
import { useNavigate } from "react-router-dom";

export default function CreateReviwForm() {
  const [reviews, setReviews] = useState([]);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewImage, setReviewImage] = useState("");
  const [reviewPost, setReviewPost] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const postData = {
    review_image: reviewImage,
    review_title: reviewTitle,
    review_post: reviewPost,
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const APIData = await createReview(postData);
    console.log(APIData);
    navigate("/reviews");
  }
  return (
    <div>
      <div className="form">
        <h1 className="header">post a review</h1>
        <Card style={{ background: "#FBFBED", color: "#1E221F" }}>
          <CardContent>
          <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <TextField
              id="NP-input-box"
              value={reviewTitle}
              inputProps={{ style: {color: "black"}}}
              style={{ flex: 1, margin: '0 20px 0 0', color: 'white'}}
              label="Title"
              fullWidth
              margin="normal"
              multiline
              onChange={(e) => setReviewTitle(e.target.value)}
            />
            <TextField
              id="NP-input-box"
              value={reviewPost}
              label="Post"
              fullWidth
              margin="normal"
              multiline
              onChange={(e) => setReviewPost(e.target.value)}
            />
            <TextField
              id="NP-input-box"
              value={reviewImage}
              label="Image"
              fullWidth
              margin="normal"
              multiline
              onChange={(e) => setReviewImage(e.target.value)}
            />
            <button type="submit" id="np-button">
              Post Project
            </button>
          </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
