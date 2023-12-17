const BASE_URL = `${import.meta.env.VITE_SERVICE_URL}/api/users`;

//   LOGIN
export async function logIn(username, password) {
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
        return result;
      } catch (error) {
        console.log("You are not logged in. Try again!", error);
      }
    }

    // LOGOUT
    export const logout = async () => {

      const response = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Logout failed');
      }
    };