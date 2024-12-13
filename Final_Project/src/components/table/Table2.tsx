import React from "react";
import noNameUser from "../../assets/images/NoName.png";
import searchIcon from "../../assets/images/search.png";
import "./table.css";

const Table2 = () => {
  return (
    <>
      <div className="table_container">
        <div className="table_caption">Manage Customers</div>

        <div className="table">
          <section className="table_header">
            <div className="input-group">
              <img src={searchIcon} alt="Search Icon" />
              <input type="search" placeholder="Search Data..." />
            </div>

            <h1>Customer's Orders</h1>
          </section>

          <section className="table_body">
            <table className="dashboard_table">
              <thead>
                <tr>
                  <th> Id </th>
                  <th> Customer </th>
                  <th> Location </th>
                  <th> Order Date </th>
                  <th> Status </th>
                  <th> Amount </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> 1 </td>
                  <td>
                    {" "}
                    <img src={noNameUser} alt="" />
                    Zinzu Chan Lee
                  </td>
                  <td> Seoul </td>
                  <td> 17 Dec, 2022 </td>
                  <td>
                    <p className="status delivered">Delivered</p>
                  </td>
                  <td>
                    {" "}
                    <strong> $128.90 </strong>
                  </td>
                </tr>
                <tr>
                  <td> 2 </td>
                  <td>
                    <img src={noNameUser} alt="" /> Jeet Saru{" "}
                  </td>
                  <td> Kathmandu </td>
                  <td> 27 Aug, 2023 </td>
                  <td>
                    <p className="status cancelled">Cancelled</p>
                  </td>
                  <td>
                    {" "}
                    <strong>$5350.50</strong>{" "}
                  </td>
                </tr>
                <tr>
                  <td> 3</td>
                  <td>
                    <img src={noNameUser} alt="" /> Sonal Gharti{" "}
                  </td>
                  <td> Tokyo </td>
                  <td> 14 Mar, 2023 </td>
                  <td>
                    <p className="status shipped">Shipped</p>
                  </td>
                  <td>
                    {" "}
                    <strong>$210.40</strong>{" "}
                  </td>
                </tr>
                <tr>
                  <td> 4</td>
                  <td>
                    <img src={noNameUser} alt="" /> Alson GC{" "}
                  </td>
                  <td> New Delhi </td>
                  <td> 25 May, 2023 </td>
                  <td>
                    <p className="status delivered">Delivered</p>
                  </td>
                  <td>
                    {" "}
                    <strong>$149.70</strong>{" "}
                  </td>
                </tr>
                <tr>
                  <td> 5</td>
                  <td>
                    <img src={noNameUser} alt="" /> Sarita Limbu{" "}
                  </td>
                  <td> Paris </td>
                  <td> 23 Apr, 2023 </td>
                  <td>
                    <p className="status pending">Pending</p>
                  </td>
                  <td>
                    {" "}
                    <strong>$399.99</strong>{" "}
                  </td>
                </tr>
                <tr>
                  <td> 6</td>
                  <td>
                    <img src={noNameUser} alt="" /> Alex Gonley{" "}
                  </td>
                  <td> London </td>
                  <td> 23 Apr, 2023 </td>
                  <td>
                    <p className="status cancelled">Cancelled</p>
                  </td>
                  <td>
                    {" "}
                    <strong>$399.99</strong>{" "}
                  </td>
                </tr>
                <tr>
                  <td> 7</td>
                  <td>
                    <img src={noNameUser} alt="" /> Jeet Saru{" "}
                  </td>
                  <td> New York </td>
                  <td> 20 May, 2023 </td>
                  <td>
                    <p className="status delivered">Delivered</p>
                  </td>
                  <td>
                    {" "}
                    <strong>$399.99</strong>{" "}
                  </td>
                </tr>
                <tr>
                  <td> 8</td>
                  <td>
                    <img src={noNameUser} alt="" /> Aayat Ali Khan{" "}
                  </td>
                  <td> Islamabad </td>
                  <td> 30 Feb, 2023 </td>
                  <td>
                    <p className="status pending">Pending</p>
                  </td>
                  <td>
                    {" "}
                    <strong>$149.70</strong>{" "}
                  </td>
                </tr>
                <tr>
                  <td> 9</td>
                  <td>
                    <img src={noNameUser} alt="" /> Alson GC{" "}
                  </td>
                  <td> Dhaka </td>
                  <td> 22 Dec, 2023 </td>
                  <td>
                    <p className="status cancelled">Cancelled</p>
                  </td>
                  <td>
                    {" "}
                    <strong>$249.99</strong>{" "}
                  </td>
                </tr>
                <tr>
                  <td> 10</td>
                  <td>
                    <img src={noNameUser} alt="" /> Alson GC{" "}
                  </td>
                  <td> Dhaka </td>
                  <td> 22 Dec, 2023 </td>
                  <td>
                    <p className="status cancelled">Cancelled</p>
                  </td>
                  <td>
                    {" "}
                    <strong>$249.99</strong>{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="table_footer"></section>
        </div>
      </div>
    </>
  );
};

export default Table2;
