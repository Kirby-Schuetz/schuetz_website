import { useState, useEffect } from "react";
import { fetchAllReviews } from "../../API/reviews";
import { Card, CardContent, CardMedia, CardActionArea } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function AllReview() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchReview() {
      try {
        const storedReviews = await fetchAllReviews();
        console.log(storedReviews);
        setReviews(storedReviews);
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReview();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <h1 className="header">reviews</h1>
          <button className="addButton">
            <Link to={`/reviewform`}>Add Review Post</Link>
          </button>
          <div></div>
          {reviews.map((review) => (
            <div key={review.review_id} className="posts">
              <Card style={{ background: "#FBFBED", color: "#1E221F" }}>
                <h2>{review.review_title}</h2>
                  <CardMedia>
                    <img src={review.review_image} alt={review.review_title} />
                  </CardMedia>
                  <CardContent>
                    <h3>{review.review_post}</h3>
                  </CardContent>
                <button>
                  <Link to={`/reviews/${review.review_id}/edit`}>
                    Edit Review Post
                  </Link>
                </button>
              </Card>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
