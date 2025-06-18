import  {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const wishListApi=createApi({
    baseQuery:fetchBaseQuery({baseUrl:`${import.meta.env.VITE_API_URL}`, credentials: "include"}),
    tagTypes:['getWishList'],
    endpoints:(builder)=>({
        getWishListItems:builder.query({
            query:()=>'/wishlist',
            transformResponse: (list)=>list.reverse(),
            providesTags:['getWishList']           
        }),
        postWishListItem:builder.mutation({
            query:({productId})=>({
                url:'/wishlist',
                method:'POST',
                body:{productId}
            }),
            invalidatesTags:['getWishList'],
            async onQueryStarted({productId},{dispatch,queryFulfilled}){
                const postResult= dispatch(wishListApi.util.updateQueryData('getWishListItems',undefined,(list)=>{
                    list.unshift({productId});
                }))
                try {
                    await queryFulfilled
                } catch (error) {
                    postResult.undo()
                }
            }
        }),
        deleteWishListItem:builder.mutation({
            query:({productId})=>({
                url:'/wishlist',
                method:'DELETE',
                body:{productId}
            }),
            invalidatesTags:['getWishList'],
            async onQueryStarted({productId},{dispatch,queryFulfilled}){
                const deleteResult=dispatch(
                    wishListApi.util.updateQueryData('getWishListItems',undefined,(list)=>{
                        const itemIndex=list.findIndex((element)=>element===productId)
                        if (itemIndex !== -1) {
                            list.splice(itemIndex, 1);
                          }
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
})

export const {useGetWishListItemsQuery,usePostWishListItemMutation,useDeleteWishListItemMutation} = wishListApi;