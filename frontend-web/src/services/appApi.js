import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create the api

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
    endpoints: (builder) => ({
        // signup
        signup: builder.mutation({
            query: (user) => ({
                url: "/users/signup",
                method: "POST",
                body: user,
            }),
        }),
        // login
        login: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),
    //    create a user
        createUser: builder.mutation({
            query: (user) => ({
            url: "/users/create",
            method: "POST",
            body: user,
            }),
        }),
      
        // delete user
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/delete/${id}`,
                method: "DELETE",
            }),
        }),
        // update user
        
        updateUser: builder.mutation({
            query: (user) => ({
            url: `/users/${user.id}`,
            body: user,
            method: "PATCH",
            }),
        }),
  
         // creating product
        createProduct: builder.mutation({
            query: (product) => ({
                url: "/products",
                body: product,
                method: "POST",
            }),
        }),
        //delete product
        deleteProduct: builder.mutation({
            query: ({ product_id, user_id }) => ({
                url: `/products/${product_id}`,
                body: {
                    user_id,
                },
                method: "DELETE",
            }),
        }),
        //update product
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/products/${product.id}`,
                body: product,
                method: "PATCH",
            }),
        }),

        // add to cart
        addToCart: builder.mutation({
            query: (cartInfo) => ({
                url: "/products/add-to-cart",
                body: cartInfo,
                method: "POST",
            }),
        }),
        // remove from cart
        removeFromCart: builder.mutation({
            query: (body) => ({
                url: "/products/remove-from-cart",
                body,
                method: "POST",
            }),
        }),

        // increase cart
        increaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/increase-cart",
                body,
                method: "POST",
            }),
        }),

        // decrease cart
        decreaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/decrease-cart",
                body,
                method: "POST",
            }),
        }),
        // create order
        createOrder: builder.mutation({
            query: (body) => ({
                url: "/orders",
                body,
                method: "POST",
            }),
        }),
        //create order card
        createOrderCard: builder.mutation({
            query: (body) => ({
                url: "/orders/create",
                body,
                method: "POST",
            }),
        }),
  
        // delete order
        deleteOrder: builder.mutation({
            query: (id) => ({
              url: `/orders/${id}`,
              method: "DELETE",
            }),
        }),
        createRate: builder.mutation({
            query: (productId) => ({
                url: `/rate/${productId}`,
                method: "POST",
            }),
        }),
      
        //create address
        createAddress: builder.mutation({
            query: (address) => ({
                url: "/address",
                body: address,
                method: "POST",
            }),
        }),
        //update address
        updateAddress: builder.mutation({
            query: (id) => ({
              url: `/address/${id}`,
              method: "PATCH",
            }),
        }),
        //delete address
        deleteAddress: builder.mutation({
            query: (id) => ({
              url: `/address/${id}`,
              method: "DELETE",
            }),
        }),
    }),
});

export const {
    useCreateAddressMutation,
    useUpdateRateMutation,
    useSignupMutation,
    useLoginMutation,
    useCreateProductMutation,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useIncreaseCartProductMutation,
    useDecreaseCartProductMutation,
    useCreateOrderMutation,
    useCreateOrderCardMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useDeleteOrderMutation,
    useCreateUserMutation,
    useUpdateOrderMutation,
    useCreateRateMutation,
} = appApi;

export default appApi;