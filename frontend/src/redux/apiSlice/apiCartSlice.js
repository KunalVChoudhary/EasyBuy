import  {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const cartApi= createApi({
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:8000",credentials: "include"}),
    tagTypes:['getCart'],
    endpoints:(builder)=>({
        getCartItems:builder.query({
            query:()=> '/cart',
            transformResponse: (items)=> items.reverse(),
            providesTags:['getCart']
        }),
        postCartItem:builder.mutation({
            query:(item)=>({
                url:'/cart',
                method:'POST',
                body:item              
            }),
            invalidatesTags:['getCart'],
            async onQueryStarted(item, { dispatch, queryFulfilled }) {
                const postResult = dispatch(
                  cartApi.util.updateQueryData("getCartItems", undefined, (draft) => {
                    draft.unshift({...item });
                  }),
            )
            try {
                await queryFulfilled;
            } catch {
                postResult.undo();
            }
            },            
        }),
        updateCartItem:builder.mutation({
            query:(item)=>({
                url:"/cart",
                method:'PATCH',
                body:item
            }),
            invalidatesTags:['getCart'],
            async onQueryStarted(item, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                  cartApi.util.updateQueryData("getCartItems", undefined, (items) => {
                  const itemIndex=items.findIndex((element)=>element.productId===item.productId)
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
            invalidatesTags:['getCart'],
            async onQueryStarted({productId},{dispatch,queryFulfilled}){
                const deleteResult=dispatch(
                    cartApi.util.updateQueryData('getCartItems',undefined,(items)=>{
                        const itemIndex=items.findIndex((element)=>element.productId===productId)
                        if (itemIndex !== -1) {
                            items.splice(itemIndex, 1);
                          }
                    }),
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

export const {useGetCartItemsQuery,usePostCartItemMutation,useUpdateCartItemMutation,useDeleteCartItemMutation} = cartApi