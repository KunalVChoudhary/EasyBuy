import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi= createApi({
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:8000'}),
    tagTypes:['getReviews'],
    endpoints:(builder)=>({
        getProductReviews:builder.query({
            query:()=> '/review/:productId',
            transformResponse:(reviewList)=>reviewList.reverse(),
            providesTags:['getReviews']
        }),
        postProductReview:builder.mutation({
            query:({rating,comment})=>({
                url:'/review/:productId',
                method:'POST',
                body:{rating,comment}
            }),
            invalidatesTags:['getReviews'],
            async onQueryStarted({rating,comment},{dispatch,queryFulfilled}){
                const postResult=dispatch(reviewApi.util.updateQueryData('getProductReveiws',undefined,(reviews)=>{
                    reviews.unshift({rating,comment}) //may be will ask for key error while rendering
                }))
                try {
                    await queryFulfilled()
                } catch (error) {
                    postResult.undo()
                }
            }
        }),
        updateProductReview:builder.mutation({
            query:({reviewId,rating,comment})=>({
                url:`/review/${reviewId}`,
                method:'PATCH',
                body:{rating,comment}
            }),
            invalidatesTags:['getReviews'],
            async onQueryStarted({reviewId,rating,comment},{dispatch,queryFulfilled}){
                const patchResult=dispatch(
                    reviewApi.util.updateQueryData('getProductReviews',undefined,(reviews)=>{
                        const reviewindex=reviews.findIndex((review)=> review._id == reviewId)
                        if (reviewindex != -1){
                            reviews[reviewindex]={...reviews[reviewindex],rating:rating,comment:comment}
                        }
                    })
                )
                try{
                    await queryFulfilled;
                }
                catch{
                    patchResult.undo()
                }
            }
        }),
        deleteProductReview:builder.mutation({
            query:({reviewId})=>({
                url:`/review/${reviewId}`,
                method: 'DELETE',
            }),
            invalidatesTags:['getReviews'],
            async onQueryStarted({reviewId},{dispatch,queryFulfilled}){
                const deleteResult=dispatch(
                    reviewApi.util.updateQueryData('getProductReviews',undefined,(reviews)=>{
                        const reviewindex=reviews.findIndex((review)=> review._id == reviewId)
                        if (reviewindex != -1){
                            reviews.splice(reviewindex,1)
                        }
                    })
                )
                try{
                    await queryFulfilled
                }
                catch{
                    deleteResult.undo()
                }
            }
        })
    })
})