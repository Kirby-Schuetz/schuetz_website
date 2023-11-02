const BASE_URL = "http://localhost:5497/schuetzsite/reviews";

// GET all reviews
export async function fetchAllReviews() {
    console.log("Fetching reviews");
    try {
        console.log("URL: ", `${BASE_URL}/`);
        const response = await fetch(`${BASE_URL}/`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log("No reviews", error);
        return error;
    }
}
// POST create a review
export async function createReview(postData, token) {
    console.log("API Client: ", postData)
    try {
        const response = await fetch(`${BASE_URL}/`, {
            method: "POST",
            headers: {
                "Content-Type": "applicatin/json",
                "Authorization": `Bearer ${token}`
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
export async function getReviewByReviewId(review_id) {
    try {
        const response = await fetch(`${BASE_URL}/reviews/${review_id}`);
        if (response.status === 204) {
            const result = await response.json();
            return result;
        }
    } catch (error) {
        console.error(error);
    }
}
// PUT edit review
export const editReview = async (reviewEdits, review_id, token) => {
    try {
      const response = await fetch(`${BASE_URL}/${review_id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reviewEdits)
      });
      if (response.status === 202) {
        const result = await response.json();
        return result;
      }
    } catch (error) {
      console.log("Your review did not update. Try again!", error);
    }
  }
// DELETE review
export async function deleteReview(review_id, token) {
    try {
        const response = await fetch(`${BASE_URL}/${review_id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 201) {
          const result = await response.json();
          return result;
        }
        
    } catch (error) {
        console.log("Your review did not delete. Try again!", error);
    }
}