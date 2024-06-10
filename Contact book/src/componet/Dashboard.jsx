import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {

  const [data, SetData] = useState([]);

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MTc5OTQ1MTQ0OTUtNjU4MTIxMzU3IiwiaWF0IjoxNzE3OTk0NTE0LCJleHAiOjE3MTgxNjczMTR9.kMIv6efVircklLkyqrnnQWpuR9YsOzoX_2vZQPWSEc4';

  useEffect(() => {

    axios.get('https://service.apikeeda.com/contact-book',

      {
        headers: { Authorization: token }
      }
    )
      .then(function (response) {
        // console.log(response.data);
        SetData(response.data.data)
      })

  }, [])

  return (
    <>
      <Link to={'/viewcon'}>
        <div className=' bg-[#343a40] flex flex-col justify-center items-center w-[300px] h-[250px]'>
          <h1 className='text-white m-0 text-[24px]'>Total contact</h1>
          <p className='text-white text-[22px] mt-2'>{ data.length}</p>
        </div>
      </Link>

    </>
  )
}
