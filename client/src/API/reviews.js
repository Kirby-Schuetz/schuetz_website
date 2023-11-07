const BASE_URL = "http://localhost:5005/api/reviews";

// GET all reviews
export async function fetchAllReviews() {
    console.log("Fetching reviews");
    try {
        const response = await fetch(`${BASE_URL}/`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log("No reviews!", error);
        return error;
    }
}
// POST create a review
export async function createReview(postData) {
    console.log("API Client: ", postData)
    try {
        const response = await fetch(`${BASE_URL}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData)
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log("Your review did not post", error);
    }
}
// GET review by review_id
export async function fetchReviewByReviewId(review_id) {
    try {
        const response = await fetch(`${BASE_URL}/${review_id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }            
        const result = await response.json();
            return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
// PUT edit review
export const editReview = async (review_id, reviewEdits) => {
    console.log("Submitting edits")
    try {
      const response = await fetch(`${BASE_URL}/${review_id}/edit`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewEdits)
      });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
      console.log("Your review did not update. Try again!", error);
    }
  }
// DELETE review
export async function deleteReview(review_id) {
    try {
        const response = await fetch(`${BASE_URL}/${review_id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
            }
        });
          const result = await response.json();
          return result; 
    } catch (error) {
        console.log("Your review did not delete. Try again!", error);
    }
}