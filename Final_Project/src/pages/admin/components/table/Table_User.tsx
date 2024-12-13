import noNameUser from "../../../../assets/images/NoName.png";
import searchIcon from "../../../../assets/images/search.png";
import "../../../../assets/css/table.css";
import useAuth from "../../../../hooks/auth/useAuth";
import { formatFromDataDate } from "../../../../utils/formatDate";
import { Pagination } from "@mantine/core";
import useStore from "../../../../store";

const Table_User = () => {
  const { getAllUsers } = useAuth();

  const { data } = getAllUsers();

  const { userQuery } = useStore();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    userQuery.setFullName(value);
  };

  return (
    <>
      <div className="table_container">
        <div className="table_caption">Manage Customers</div>

        <div className="table">
          <section className="table_header">
            <div className="input-group">
              <img src={searchIcon} alt="Search Icon" />
              <input
                type="search"
                placeholder="Search Data..."
                onChange={handleOnChange}
              />
            </div>
          </section>

          <section className="table_body">
            <table className="dashboard_table">
              <thead>
                <tr className="user_rows">
                  <th> Avatar </th>
                  <th> Full Name </th>
                  <th> Email </th>
                  <th> DateOfBirth </th>
                  <th> Phone Number </th>
                  <th> Role </th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((i) => (
                  <tr className="user_rows" key={i.email}>
                    <td>
                      <img
                        src={i.avatarUrl ? i.avatarUrl : noNameUser}
                        alt=""
                      />
                    </td>
                    <td>{i.fullName}</td>
                    <td>{i.email}</td>
                    <td>
                      {i.dateOfBirth
                        ? formatFromDataDate(i.dateOfBirth)
                        : "..."}
                    </td>
                    <td>{i.phoneNumber ? i.phoneNumber : "..."}</td>
                    <td>
                      <strong>{i.role}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="table_footer">
            <Pagination
              total={data?.totalPages || 10}
              value={userQuery.page}
              onChange={userQuery.setPage}
              color="indigo"
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default Table_User;
