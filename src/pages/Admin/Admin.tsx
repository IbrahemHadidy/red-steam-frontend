'use client';
import { FC } from 'react';
import Link from 'next/link';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import './Admin.scss';

const Admin: FC = () => {

  return (
    <>
      <Header />
      <div className="admin-panel">
        <h1>Welcome Admin!</h1>
        <p>Manage your users, games, and offers here.</p>

        <div className="admin-options">
          <Link href="/admin/manage-users" className="admin-option">
            <button className="large-button">Manage Users</button>
          </Link>
          <Link href="/admin/manage-games" className="admin-option">
            <button className="large-button">Manage Games</button>
          </Link>
          <Link href="/admin/manage-offers" className="admin-option">
            <button className="large-button">Manage Offers</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
