import { Form, InputNumber, Popconfirm, Table, Typography, Input } from 'antd';
import { useState, useEffect } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import UrlApi from '../Url_api';
import axios from 'axios';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TableView = ({}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(true);
  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
    var user = localStorage.getItem('user');
    if(loadData){
      axios.post(UrlApi('getCashBookByUser'), {'user': user})
      .then(res => {
        const originData = [];
        for (let i = 0; i < res.data.data.length ; i++) {
          originData.push({
            item: i.toString(),
            list: res.data.data[i].list,
            Income: res.data.data[i].type === "Income" ? <CheckOutlined color='green'/> : "",
            Expense: res.data.data[i].type === "Expense" ? <CheckOutlined /> : "",
            amount: res.data.data[i].amount,
          });
        }
        setData(originData);
      });
      setLoadData(false);
    }
    
   });

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'item',
      dataIndex: 'item',
      width: '5%',
      align: 'center'
    },
    {
      title: 'name',
      dataIndex: 'list',
      width: '40%',
      editable: true,
      align: 'center'
    },
    {
      title: 'type',
      children: [
        {
          title: 'Income',
          dataIndex: 'Income',
          width: 150,
          editable: true,
          align: 'center'
        },
        {
          title: 'Expense',
          dataIndex: 'Expense',
          width: 150,
          editable: true,
          align: 'center'
        },
      ],
    }, 
    {
      title: 'amount (THB.)',
      dataIndex: 'amount',
      width: '15%',
      editable: true,
      align: 'center'
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      align: 'center',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'amount' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        loading={loading}
        size="small"
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default TableView;