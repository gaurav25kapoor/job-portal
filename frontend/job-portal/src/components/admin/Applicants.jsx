import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
  const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                
            }
        }
        fetchAllApplicants();
    }, []);
  return (
    <div>
      <Navbar/>
      <div className='mx-auto max-w-7xl'>
        <h1 className='mt-5 ml-2 text-lg font-bold'>Applicants ({applicants?.application?.length})</h1>
        <ApplicantsTable/>
      </div>
    </div>
  )
}

export default Applicants