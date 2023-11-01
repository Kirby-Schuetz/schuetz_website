const client = require("../client")

const createReview = async () => {
   const inputParams = {

   }
    try {

    }
}

const getAllReviews = async () => {
    try {
        const { rows }
        = await client.query(`
        SELECT *
        FROM reviews;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

const getSingleReview = async (review_id) => {
    try {
        const {
            rows: [reviews]
        }
        = await client.query(`
        SELECT *
        FROM reviews
        WHERE review_id = ${review_id};
        `)
        return reviews
    } catch (error) {
        throw error
    }
}

const _bytesToString = (bytes) => {
    const buffer = Buffer.from(bytes);
    const string = buffer.toString();
    return string;
}

module.exports = { getAllReviews, getSingleReview }