import { useEffect, useState } from "react";
import { editReview, fetchReviewByReviewId, deleteReview } from "../../API/reviews";
import { useParams, useNavigate } from "react-router-dom";

export default function EditReview() {
  const { review_id } = useParams();
  const [isDeleted, setIsDeleted] = useState(false);
  const [postToEdit, setPostToEdit] = useState({
    project_image: "",
    project_title: "",
    project_post: "",
  });
  const navigate = useNavigate()


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
        })
      } catch (error) {
        console.error("Trouble getting post. Try again!", error);
      }
    }
    getReviewByReviewId();
  }, [review_id]);

  async function handleSubmit(e) {
    e.preventDefault();

  try {
    const response = await editReview(
      postToEdit.review_id,
      postToEdit
    );
    console.log("Edited", response);
    alert("Post successfully edited!");
    const returnVal = response;
    return returnVal;
  } catch(error) {
    console.log(error);
  }
}

const handleDelete = async (review_id) => {
  try {
    const response = await deleteReview(review_id);
    setIsDeleted(true);
  } catch (error) {
    console.error("Trouble deleting post. Try again!", error);
  }
};

return (
  <>
  <h2>Edit Review Post</h2>
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Image:</label>
      <textarea
        type="text"
        value={postToEdit.review_image}
        onChange={(e) => setPostToEdit({
          ...postToEdit,
          review_image: e.target.value,
        })
      }
      />
      </div>
      <div>
        <label>Title:</label>
       <textarea
        type="text"
        value={postToEdit.review_title}
        onChange={(e) => setPostToEdit({
          ...postToEdit,
          review_title: e.target.value,
        })
      }
      />
      </div>
      <div>
        <label>Post:</label>
       <textarea
        type="text"
        value={postToEdit.review_post}
        onChange={(e) => setPostToEdit({
          ...postToEdit,
          review_post: e.target.value,
        })
      }
      />
      </div>
      <button type="submit">Submit</button>

      {/* <input
        type="button"
        value="Submit Changes"
      onClick={() => {
        handleSubmit;
        navigate('/blogs');
      }}
      /> */}
      <input 
      type="button"
      value="Delete"
      onClick={() => {
        const shouldDelete = window.confirm(
          "Are you sure you want to delete this post?"
        );
        if (shouldDelete) {
          handleDelete(review_id);
          navigate('/reviews');
        }
      }}
      />
    </form>
  </div>
  </>
);
} 