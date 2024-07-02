import React, { useEffect } from 'react';
import { DatePicker } from 'antd';
import { Table, Input } from "antd";
import { useApi } from '../services/apiContext';
const { Search } = Input;

const Tables = () => {
    const { products, loading, error, fetchProducts } = useApi();
  
    useEffect(() => {
      fetchProducts({ supplier: 'FragranceNet', first: 0, last: 50 });
    }, [fetchProducts]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    // const dataSource = [
    //         {
    //           key: '1',
    //           name: 'Mike',
    //           age: 32,
    //           address: '10 Downing Street',
    //         },
    //         {
    //           key: '2',
    //           name: 'John',
    //           age: 42,
    //           address: '10 Downing Street',
    //         },
    //       ];
          
    const columns = [
        { title: 'SKU', dataIndex: 'SKU', key: 'SKU' },
        { title: 'Product Category', dataIndex: 'Product Category', key: 'Product Category' },
        { title: 'Brand', dataIndex: 'Brand', key: 'Brand' },
        { title: 'Title', dataIndex: 'Title', key: 'Title' },
        { title: 'supplier', dataIndex: 'supplier', key: 'supplier' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Year Introduced', dataIndex: 'Year Introduced', key: 'Year Introduced' },
        { title: 'Cost Price', dataIndex: 'Cost Price', key: 'Cost Price' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Size', dataIndex: 'size', key: 'size' },
      ];
    return (
      <div>
        <h1>Product List</h1>
        {/* <ul>
          {products.map(product => (
            <li key={product.id}>{product.name} - ${product.price}</li>
          ))}
        </ul> */}
        <Search placeholder="Search by patients..." style={{ marginBottom: 16 }} />
        <Table dataSource={products} columns={columns} />;

      </div>
    );
  };
  

  



export default Tables;