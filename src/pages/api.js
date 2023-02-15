import axios from "axios";

 export const getAllProductApi = async () => {
    try {
      const res = await axios.get(
        "https://lobster-app-ddwng.ondigitalocean.app/product/list",
        {
          headers: {
            api_key: "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH",
          },
        }
      );
      console.log(res.data.message)
      return res.data.message;
    } catch (error) {
      throw new Error(error);
    }
  };

  
 export const  getAllProductId= async (id) => {
    try {
      const res = await axios.get(
            `https://lobster-app-ddwng.ondigitalocean.app/product/${id}`,
        {
          headers: {
            api_key: "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH",
          },
        }
      );
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      console.log(res.data.message)
      return res.data.message;
    } catch (error) {
      throw new Error(error);
    }
  };


  export const createProduct = async (inputs) => {
    try {
      const request = await axios.post(
        "https://lobster-app-ddwng.ondigitalocean.app/product/add_new",
        inputs,
        {
      headers: {
            "api_key": "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH"
          }
        }
      );
      console.log(request.data.message);
      return request.data.message;

    } catch (error) {
      console.log(error)
    }

  };


  