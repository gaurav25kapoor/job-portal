import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
  const {searchedQuery}=useSelector(store=>store.job)

  const dispatch=useDispatch()
  useEffect(()=>{
    const fetchAllJobs=async()=>{
      try {
        const res=await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true})
        dispatch(setAllJobs(res.data.jobs))
      } catch (error) {
        
      }
    }
    fetchAllJobs();
  },[])
}

export default useGetAllJobs