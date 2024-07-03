const AllUser = () => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job Title</th>
              <th>Email</th>
              <th>Username</th>
              <th>Domain</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Samy Chowdhury</td>
              <td>Backend Developer</td>
              <td>samy@gmail.com</td>
              <td>samychowdhury</td>
              <td>software</td>
            </tr>
            <tr>
              <th>1</th>
              <td>Samy Chowdhury</td>
              <td>Backend Developer</td>
              <td>samy@gmail.com</td>
              <td>samychowdhury</td>
              <td>software</td>
            </tr>
            <tr>
              <th>1</th>
              <td>Samy Chowdhury</td>
              <td>Backend Developer</td>
              <td>samy@gmail.com</td>
              <td>samychowdhury</td>
              <td>software</td>
            </tr>
           
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUser;
