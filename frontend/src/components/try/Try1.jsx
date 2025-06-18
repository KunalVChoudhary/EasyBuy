import React, { useEffect } from 'react'
import { useGetCartItemsQuery } from '../../redux/apiSlice/apiCartSlice';

function Try1() {
  const { data, error, isLoading } = useGetCartItemsQuery(undefined, {
  refetchOnMountOrArgChange: true});

  useEffect(() => {
    console.log('🚀 TestQuery hook status:', { isLoading, error, data });
  }, [isLoading, error, data]);

  console.log(import.meta.env.VITE_API_URL);

  return(
    <div>
      lop
    </div>
  )
}


export default Try1