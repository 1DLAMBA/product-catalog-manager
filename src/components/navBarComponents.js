import React, { useEffect, useState } from 'react';
import { useApi } from '../services/apiContext';
import { Button, Form, Input, Select, Space, Table, Modal, Avatar, Badge } from "antd";
import './style/navBar.css';
import { UserOutlined, BellOutlined } from '@ant-design/icons';
import logo from './../assets/logo.png';


const { Search } = Input;


const NavBar =(props)=>{
  const { products, loading, error, fetchProducts } = useApi();
  const [supplier, setSupplier] = useState(props.supply);
  const [search, setSearch] = useState('');

  const handleSearch = (value) => {
    setSearch(value);
    fetchProducts({ supplier: supplier, search: value, first: 0, last: 50 });
  };
  return (
    <div className='d-flex justify-content-between Nav-body'>
        {/* <h1>Product List</h1> */}
        <img src={logo}/>
        <Search placeholder="Search" style={{ marginBottom: 16, width: "20vw" }} value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={handleSearch} />
          <span className='d-flex'>
          <Badge dot className='me-2'>
          <Avatar
    size={24}
icon={<BellOutlined />}
    />
            </Badge>
          <Avatar
    size={24}
    icon={<UserOutlined />}
  />
  <p>Admin</p>
          </span>

    </div>
  );
};

export default NavBar;