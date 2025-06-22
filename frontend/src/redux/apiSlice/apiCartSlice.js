import  {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const cartApi= createApi({
    reducerPath: 'cartApi',
    baseQuery:fetchBaseQuery({baseUrl:`${import.meta.env.VITE_API_URL}`,credentials: "include"}),
    tagTypes:['getCart','getCartLength'],
    endpoints:(builder)=>({
        getCartItems:builder.query(
            {
            query:()=> '/cart',
            transformResponse: (items)=> items.reverse(),
            providesTags:['getCart']}
        ),
        getCartLength:builder.query(
            {
            query:()=> '/cart/len',
            providesTags:['getCartLength']}
        ),
        postCartItem:builder.mutation({
            query:(item)=>({
                url:'/cart',
                method:'POST',
                body:item              
            }),
            invalidatesTags:['getCart', 'getCartLength'],
            async onQueryStarted(item, { dispatch, queryFulfilled }) {
                const postResult = dispatch(
                  cartApi.util.updateQueryData("getCartItems", undefined, (draft) => {
                    draft.unshift({...item });
                  }),
                )

                const addToCartLengthPatch = dispatch(
                    cartApi.util.updateQueryData("getCartLength", undefined, (len) => {
                        return len + 1;
                    })
                )

                try {
                    await queryFulfilled;
                } catch {
                    postResult.undo();
                    addToCartLengthPatch.undo()
                }
            },            
        }),
        updateCartItem:builder.mutation({
            query:(item)=>({
                url:"/cart",
                method:'PATCH',
                body:item
            }),
            invalidatesTags:['getCart', 'getCartLength'],
            async onQueryStarted(item, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                  cartApi.util.updateQueryData("getCartItems", undefined, (items) => {
                  const itemIndex=items.findIndex((element)=>element.productId._id===item.productId)
                  if (itemIndex !== -1) {
                    items[itemIndex] = { ...items[itemIndex], ...item };
                   }
                })
            )
            try {
                await queryFulfilled;
            } catch {
                patchResult.undo();
            }
            }, 
        }),
        deleteCartItem:builder.mutation({
            query:({productId})=>({
                url:'/cart',
                method:'DELETE',
                body:{productId}
            }),
            invalidatesTags:['getCart', 'getCartLength'],
            async onQueryStarted({productId},{dispatch,queryFulfilled}){
                const deleteResult=dispatch(
                    cartApi.util.updateQueryData('getCartItems',undefined,(items)=>{
                        const itemIndex=items.findIndex((element)=>element.productId._id===productId)
                        if (itemIndex !== -1) {
                            items.splice(itemIndex, 1);
                          }
                    }),
                )

                const addToCartLengthPatch = dispatch(
                    cartApi.util.updateQueryData("getCartLength", undefined, (len) =>{
                        return Math.max(len - 1, 0)
                    })
                )

                try {
                    await queryFulfilled
                } catch (error) {
                    deleteResult.undo()
                }
            }
        })
    })
});

export const {useGetCartItemsQuery,useGetCartLengthQuery,usePostCartItemMutation,useUpdateCartItemMutation,useDeleteCartItemMutation} = cartApi