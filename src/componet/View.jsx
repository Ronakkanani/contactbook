import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function View() {
  const [search, Setsearch] = useState();
  const [data, SetData] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: '',
    nickName: ''
  });

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MTc1NTkyNTI1MzUtOTM3MDAxMzUwIiwiaWF0IjoxNzE3NTU5MjUyLCJleHAiOjE3MTc3MzIwNTJ9.4giOIzQaPhiv8-4oBEOD1aMhOC-tUpx4A4sxB5-uqaQ';


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






  const handleDelete = (item) => {
    axios.delete(`https://service.apikeeda.com/contact-book/${item._id}`, data, {
      headers: { Authorization: token }
    })
      .then(function (response) {
        // Update the local state to remove the deleted item
        // SetData(data.filter(item => item.id !== id));
        window.location.reload(true)
      })
      .catch(function (error) {
        console.error("There was an error deleting the item!", error);
      });
  };
  const handleEdit = (data) => {
    setFormData(data); // Populate form data with contact details
    handleShow(); // Show the modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = () => {
    axios.patch(`https://service.apikeeda.com/contact-book/${formData._id}`, formData, {
      headers: { Authorization: token }
    })
      .then(function (response) {
        console.log('Contact updated successfully:', response.data);
        handleClose();
      })
      .catch(function (error) {
        console.error("There was an error deleting the item!", error);
      });

  };




  useEffect(() => {
    if (search) {
      axios.get(`https://service.apikeeda.com/contact-book/find?search=${search}`, {
        headers: { Authorization: token }
      })
        .then(response => {
          SetData(response.data.data);
        })
        .catch(error => {
          console.error("There was an error searching the data!", error);
        });
    } else {
      axios.get('https://service.apikeeda.com/contact-book', {
        headers: { Authorization: token }
      })
        .then(response => {
          SetData(response.data.data);
        })
        .catch(error => {
          console.error("There was an error fetching the data!", error);
        });
    }
  }, [search]);

  return (
    <>
      <div className="container mx-auto">
        <div className='flex py-4 align-items-center'>

          <input
            onChange={(e) => Setsearch(e.target.value)}
            value={search}
            type="text"
            placeholder='Search contact'
            className=' bg-[#343a40] rounded-md flex justify-end  px-3 py-2 w-[400px] text-white'
          />
          {/* <button className='btn ms-3 btn-info'>Search</button> */}
        </div>

        <table className="min-w-full border-collapse block md:table">
          <thead className="block md:table-header-group">
            <tr className="border border-gray-300 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative ">
              <th className="bg-gray-100 p-2 text-gray-700 font-bold md:border md:border-gray-300 text-left block md:table-cell">Name</th>
              <th className="bg-gray-100 p-2 text-gray-700 font-bold md:border md:border-gray-300 text-left block md:table-cell">Mobile No</th>
              <th className="bg-gray-100 p-2 text-gray-700 font-bold md:border md:border-gray-300 text-left block md:table-cell">Edit</th>
              <th className="bg-gray-100 p-2 text-gray-700 font-bold md:border md:border-gray-300 text-left block md:table-cell">Remove</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {
              data != null && data.map((item, index) => {
                return (
                  <tr key={index} className="bg-white border border-gray-300 md:border-none block md:table-row">
                    <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">{item.firstName}</td>
                    <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">{item.mobileNo}</td>
                    <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                      <a onClick={() => handleEdit(item)} href="#" className="text-blue-500 hover:text-blue-700">Edit</a>
                    </td>
                    <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                      <a href="#" className="text-red-500 red hover:text-red-700" onClick={() => handleDelete(item)}>Remove</a>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Contacts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="" >

              <div class="col  mt-3">
                <input type="text" name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
              </div>
              <div class="col mt-3">
                <input type="text" name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
              </div>


              <div class="col mt-3">
                <input type="tel" name="mobileNo" className="form-control" value={formData.mobileNo} onChange={handleChange} placeholder="Mobile Number" required />
              </div>
              <div class="col mt-3">
                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} placeholder="Email" required />
              </div>
              <div class="col mt-3">
                <input type="text" name="nickName" className="form-control" value={formData.nickName} onChange={handleChange} placeholder="Nick Name" required />
              </div>


              <div className="col-5 mt-4 mx-auto">
                <button type="submit" className='form-control btn btn-dark' onClick={handleSaveChanges}>Add Contact</button>
              </div>

            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}
