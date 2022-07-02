import { Button, Form, Input, Modal, Radio ,DatePicker,Space ,TimePicker  } from 'antd';
import { useState } from 'react';
import moment from 'moment';

  const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const dateFormat = 'YYYY/MM/DD';
  


  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Please select time!',
      },
    ],
  };
  
  return (
    <div>
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            const data = {
                'list' : values.list,
                'type' : values.type,
                'amount' : values.amount,
                'date' : values.date.format('YYYY/MM/DD')
            } 
            form.resetFields();
            onCreate(data);
            
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="list"
          label="List"
          rules={[
            {
              required: true,
              message: 'Please input list',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Type" className="collection-create-form_last-form-item" rules={[
            {
              required: true,
              message: 'Please input type',
            },
          ]}>
          <Radio.Group>
            <Radio value="Income">Income</Radio>
            <Radio value="Expense">Expense</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[
            {
              required: true,
              message: 'Please input amount',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="date" label="DatePicker" {...config}>
        <DatePicker />
      </Form.Item>
      </Form>
    </Modal>
    </div>
  );
};
export default CollectionCreateForm;