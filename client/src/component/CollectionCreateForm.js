import { Form, Input, Modal, Radio ,DatePicker } from 'antd';
import moment from 'moment';

  const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const dateFormat = 'YYYY/MM/DD';
  
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
            form.resetFields();
            onCreate(values);
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
        <Form.Item 
        name="date" 
        label="DatePicker" 
        initialValue={moment()}
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