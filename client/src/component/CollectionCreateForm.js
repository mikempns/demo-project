import { Form, Input, Modal, Radio ,DatePicker, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useEffect} from 'react';
import moment from 'moment';

  const CollectionCreateForm = ({ visible, onCreate, onCancel , mode , dataEdit, deleteItem}) => {
  const [form] = Form.useForm();
  const dateFormat = 'YYYY/MM/DD';
  const today = moment();
  const EditDay = mode === 'Edit'? moment(dataEdit.date , dateFormat):"";
  const { confirm } = Modal;

  useEffect(() => {
    form.resetFields();
   });

   const showPropsConfirm = () => {
    confirm({
      title: 'Are you sure delete this item?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteItem(dataEdit.id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const footerAdd = [
      <Button key="back" onClick={onCancel}>
        Cancel
      </Button>,
      <Button key="submit" type="primary" onClick={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}>
        Submit
      </Button>,
    ]

  const footerEdit = [
    <Button key="back" onClick={onCancel}>
    Cancel
    </Button>,
    <Button key="submit" type="primary" onClick={() => {
      form
        .validateFields()
        .then((values) => {
          form.resetFields();
          onCreate(values,dataEdit.id);
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        });
    }}>
      Submit
    </Button>,
    
    <Button
      type="danger"
      onClick={showPropsConfirm}
    >
      Delete
    </Button>,
  ]
  
  
  return (
    <div>
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      footer={(mode === 'Edit') ? footerEdit:(mode === 'Add')?footerAdd:""}
      forceRender
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
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
          initialValue = { mode === 'Edit' ? dataEdit.list: ''}
        >
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Type" className="collection-create-form_last-form-item" rules={[
            {
              required: true,
              message: 'Please input type',
            },
          ]}
          initialValue={mode === 'Edit' ? dataEdit.type: ''}
          >
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
          initialValue={mode === 'Edit' ? dataEdit.amount: ''}
        >
          <Input />
        </Form.Item>
        <Form.Item 
        name="date" 
        label="DatePicker" 
        initialValue={mode === 'Edit' ? EditDay: today}
        rules={[
          {
            type: 'object',
            required: true,
            message: 'Please select time!',
          },
        ]}>
        <DatePicker format={dateFormat}/>
      </Form.Item>
      </Form>
    </Modal>
    </div>
  );
};
export default CollectionCreateForm;