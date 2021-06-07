import React from 'react'

const Showstudents = ({Datas,editDataid,deleteData}) => {
    return (
        <div className="col-12">
        <h3>Lists of Students</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">DOB</th>
              <th scope="col">Standard</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Datas.map((val, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{val.Firstname}</td>
                  <td>{val.Lastname}</td>
                  <td>{val.DateofBirth}</td>
                  <td>
                    {val.Class} <sup>Th</sup>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger mr-3 mb-2"
                      style={{ minWidth: "80px" }}
                      onClick={() => {
                        deleteData(val.id);
                      }}
                    >
                      DELETE
                    </button>

                    <button
                      className="btn btn-warning mb-2"
                      onClick={() => {
                        editDataid(val.id);
                      }}
                      style={{ minWidth: "80px" }}
                    >
                      EDIT
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
}

export default Showstudents
