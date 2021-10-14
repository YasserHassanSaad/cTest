import React, { useState, useEffect } from 'react';
import axios from 'axios';

const USERS_URL = 'https://example.com/api/users';

const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <a onClick={() => paginate(number)} href='!#' className='page-link'>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  } 

const Table = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      const res = await axios.get(`https://example.com/api/users?page=${currentPage}`)
      console.log(res)
      setUsers(res.data)
      setLoading(false)
    }

    // THERE IS A PROBLEM WITH FETCHING DATA, WHENEVER REQUEST IS SENT, IT GIVE CLIENT ERROR

    fetchUsers()
  }, [])

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const pageHandler = (pageParam) => {
      setCurrentPage(pageParam)
      console.log(currentPage)
  }

  return (
    <div className='container mt-5'>
      <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
        //  render elements in tbody
        </tbody>
      </table>
      <section className="pagination">
      <Pagination />
        <button className="first-page-btn" onClick={() => pageHandler(0)}>first</button>
        <button className="previous-page-btn" onClick={() => pageHandler(currentPage - 1)}>previous</button>
        <button className="next-page-btn" onClick={() => pageHandler(currentPage + 1)}>next</button>
        <button className="last-page-btn" onClick={() => pageHandler(Pagination.pageNumbers - 1)}>last</button>
      </section>
    </div>
      <Pagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate} />
    </div>
  )
}

export default Table