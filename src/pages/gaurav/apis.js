import axios from "axios";

export const createGauravForm = async (product) =>
  await axios.post("https://gv-boot-demo.herokuapp.com/save", product, {});

// export const listProductsByCount = async (count) => await axios.get(process.env.REACT_APP_API + '/products/' + count)

// export const removeProduct = async (authToken, slug) => await axios.delete(process.env.REACT_APP_API + '/product/' + slug, {
//     headers: {
//         authToken
//     }
// })

// export const updateProduct = async (slug, authToken, product) => await axios.put(process.env.REACT_APP_API + '/product/' + slug, product, {
//     headers: {
//         authToken
//     }
// })
