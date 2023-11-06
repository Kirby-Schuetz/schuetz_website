const BASE_URL = "http://localhost:5005/api/users";

//   LOGIN
export async function logIn(username, password) {
    console.log("here");  
    try {
        const response = await fetch(`${BASE_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              username: username,
              password: password,
            },
          }),
        });
        const result = await response.json();
        console.log(result);
        return result;
      } catch (error) {
        console.log("You are not logged in. Try again!", error);
      }
    }