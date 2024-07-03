import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import { Button, Form, Input, Select, Space, Table, Modal, Skeleton } from "antd";
import { useApi } from '../services/apiContext';
import NavBar from './navBarComponents';
import Filter from './filter';
import './style/table.css';
import { type } from '@testing-library/user-event/dist/type';
import { render } from '@testing-library/react';


const { Search } = Input;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Tables = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  // const [loading, setLoading] = useState(true);
  const { products, error, loading, fetchProducts } = useApi();
  const [supplier, setSupplier] = useState('FragranceNet');
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    fetchProducts({ supplier: supplier, first: 0, last: 50 });
  }, [fetchProducts, supplier]);

  const handleSupplierChange = (value) => {
    setSupplier(value);
    fetchProducts({ supplier: value, search: search, first: 0, last: 50 });
  };

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  const columns = [
    { title: 'SKU', dataIndex: 'SKU', key: 'SKU' },
    { title: 'Image', dataIndex: 'Image_1', render: theImageURL => <img alt={theImageURL} src={theImageURL} width={"100%"}/>, width: 70, },
    // { title: 'Product Category', dataIndex: 'Product Category', key: 'Product Category' },
    { title: 'Brand', dataIndex: 'Brand', key: 'Brand' },
    { title: 'Title', dataIndex: 'Title', key: 'Title' },
    { title: 'supplier', dataIndex: 'supplier', key: 'supplier' },
    // { title: 'Description', dataIndex: 'description', key: 'description' },
    // { title: 'Year Introduced', dataIndex: 'Year Introduced', key: 'Year Introduced' },
    { title: 'Cost Price', dataIndex: 'Cost Price', key: 'Cost Price' },
    { title: 'Quantity', dataIndex: 'Quantity', key: 'Quantity' },
    { title: 'Size', dataIndex: 'size', key: 'size' },
  ];
  
  return (
    <div className=''>
      
        <NavBar supply={supplier}/>
        {loading ? (
        <div className="skeleton-table d-flex flex-column" >
          <div className="skeleton-table mx-auto d-flex justify-content-between  "  style={{ width: "90%"}}>

          <Skeleton.Input active style={{ width: 10, marginRight: 8 }} />

          <Skeleton.Input active style={{ width: 200, marginRight: 8 }} />

          </div>
          {[...Array(1)].map((_, index) => (
            <div key={index} className="skeleton-table-row mx-auto d-flex justify-content-between" style={{ width: "90%"}}>
              <Skeleton.Input active style={{ width: "90vw", marginRight: 20, height: "50vh" }} />
              {/* <Skeleton.Input active style={{ width: 150, marginRight: 8, height: "50vh" }} />
              <Skeleton.Input active style={{ width: 200, marginRight: 8, height: "50vh" }} />
              <Skeleton.Input active style={{ width: 100, marginRight: 8, height: "50vh" }} /> */}
            </div>
          ))}
        </div>
      ) : (
          <div className='p-5 body'>
        <div className='d-flex justify-content-between'>

        <Filter supply={supplier}/>

      <Form.Item label="Select Supplier" style={{width: "40%"}} >
          <Select
           value={supplier} onChange={handleSupplierChange}>
            <Select.Option value="FragranceX">FragranceX</Select.Option>
            <Select.Option value="FragranceNet">FragranceNet</Select.Option>
            <Select.Option value="Morris Costumes">Morris Costumes</Select.Option>
          </Select>
        </Form.Item>
        </div>
      
      <Table dataSource={products} columns={columns} />;
      </div>
      )}
      
    </div>
  );
};






export default Tables;