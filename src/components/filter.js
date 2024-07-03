import React, { useEffect, useState } from 'react';
import { useApi } from '../services/apiContext';
import { Button, Form, Input, Select, Space, Table, Modal } from "antd";
import { FilterFilled } from '@ant-design/icons';

const Filter =(props)=>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { products, loading, error, fetchProducts } = useApi();
  const [form] = Form.useForm();
  const [supplier, setSupplier] = useState(props.supply);
  const [filters, setFilters] = useState({
    Quantity_gt: 0,
    Quantity_lt: 1000000,

    // COMMENTED BECAUSE THE PARAMETERS SEEM TO BE INCORECT
    // Cost_price_lt: '',
    // Cost_price_gt: '',
  });
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFilterChange = (changedValues, allValues) => {
    setFilters(allValues);
  };

  const handleSubmit = () => {
    console.log(filters);
    fetchProducts({ supplier: supplier, ...filters,  first: 0, last: 50 });
    setIsModalOpen(false);
  };

  return (
    <div>
        <Button type="text" onClick={showModal} icon={<FilterFilled />}>
          Filter
        </Button>
        <Modal title="Filter" open={isModalOpen} onOk={handleSubmit} onCancel={handleCancel}>
      <Form
       className=''
       form={form}
    name="filters"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      width: 300,
    }}
    initialValues={filters}
    
    // initialValues={filters}
    onValuesChange={handleFilterChange}
    autoComplete="off"
    required="false"
      
    >
    <label>Quantity</label>
      <div className='d-flex justify-content-between '> 

        <div className='d-flex'>

    <Form.Item
      
      name="Quantity_gt"
      value={filters.Quantity_gt || ''}
      
      rules={[
        {
          required: true,
          message: 'Filter quantity',
        },
      ]}
    >
      <Input type='number' 
      placeholder="More than"
      value="0"
      /> 
    </Form.Item><p>to</p>
        </div>
        <div className=' ms-5 d-flex'>

    <Form.Item
      name="Quantity_lt"
      value={filters.Quantity_lt || null}
      
      rules={[
        {
          // required: true,
          message: 'Filter quantity',
        },
      ]}
    >
      <Input type='number' 
     placeholder="less than"
     value="10000000"

     />
    </Form.Item>
    </div>
      </div>

      <label>Cost Price</label>

      <div className='d-flex'> 
      <div className='d-flex'>

    <Form.Item
   
      rules={[
        {
          // required: true,
          message: 'Filter quantity',
        },
      ]}
    >
      <Input type='number' 
      placeholder="More than"/>
    </Form.Item><p>to</p>
    </div>
    <div className=' ms-5 d-flex'>

    <Form.Item
      
      rules={[
        {
          // required: true,
          message: 'Filter quantity',
        },
      ]}
    >
      <Input type='number'
   placeholder="Less than"
   />
    </Form.Item></div>
</div>
   
    </Form>
      </Modal>

    </div>
  );

}

export default Filter;
