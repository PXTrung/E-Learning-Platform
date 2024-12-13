import { useState } from "react";
import ResetPassword from "./components/resetPassword/ResetPassword";
import TransactionList from "./components/transaction/TransactionList";

const SettingPage = () => {
  const [tab, setTab] = useState(1);

  return (
    <div className="setting-page-container">
      <div className="setting-page-navigation">
        <div className="setting-page-navigation-header-container">
          <h2 className="setting-page-navigation-header">Account Setting</h2>
        </div>
        <div
          className="setting-page-navigation-item-container"
          onClick={() => setTab(1)}
        >
          <div
            className={`setting-page-navigation-item ${
              tab == 1 ? " isActive" : ""
            }`}
          >
            <span
              className={`setting-page-navigation-title ${
                tab == 1 ? " isActive" : ""
              }`}
            >
              Change Password
            </span>
          </div>
        </div>
        <div
          className="setting-page-navigation-item-container"
          onClick={() => setTab(2)}
        >
          <div
            className={`setting-page-navigation-item ${
              tab == 2 ? " isActive" : ""
            }`}
          >
            <span
              className={`setting-page-navigation-title ${
                tab == 2 ? " isActive" : ""
              }`}
            >
              Transaction
            </span>
          </div>
        </div>
      </div>
      <div className="setting-page-content-container">
        <div className="setting-page-content-wrapper">
          {tab == 1 && <ResetPassword />}
          {tab == 2 && <TransactionList />}
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
