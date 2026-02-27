import React, { useState } from 'react';
import ComponentQuery, {type ComponentItem } from '../../components/ComponentQuery';

const ComponentQueryExample: React.FC = () => {
  const [allFormData, setAllFormData] = useState<Record<string, any>>({});

  // 更新数据状态的辅助函数
  const updateFormData = (title: string, value: any) => {
    setAllFormData(prev => ({
      ...prev,
      [title]: value
    }));
  };

  // 示例数据
  const data: ComponentItem[] = [
    {
      type: 'input',
      title: '用户名',
      index: 0,
      props: {
        placeholder: '请输入用户名',
        defaultValue: ''
      },
      onChange: (value, item) => {
        console.log(`选择了 ${item.title}:`, value);
        updateFormData(item.title, value);
      }
    },
    {
      type: 'number',
      title: '年龄',
      index: 2,
      props: {
        placeholder: '请输入年龄',
        min: 0,
        max: 120
      },
      onChange: (value, item) => {
        console.log(`${item.title} 改变为:`, value);
        updateFormData(item.title, value);
      }
    },
    {
      type: 'input',
      title: '邮箱',
      index: 1,
      props: {
        placeholder: '请输入邮箱地址',
        type: 'email'
      },
      onChange: (value, item) => {
        console.log(`输入了 ${item.title}:`, value);
        updateFormData(item.title, value);
      }
    },
    {
      type: 'select',
      title: '性别',
      index: 3,
      props: {
        placeholder: '请选择性别',
        allowClear: true
      },
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
        { label: '其他', value: 'other' }
      ],
      onChange: (value, item) => {
        console.log(`选择了 ${item.title}:`, value);
        updateFormData(item.title, value);
      }
    },
    {
      type: 'datepicker',
      title: '生日',
      index: 4,
      props: {
        placeholder: '请选择生日',
        style: { width: '100%' }
      },
      onChange: (value, item) => {
        console.log(`选择了 ${item.title}:`, value);
        updateFormData(item.title, value);
      }
    },
    {
      type: 'timepicker',
      title: '预约时间',
      index: 5,
      props: {
        placeholder: '请选择时间',
        format: 'HH:mm:ss'
      },
      onChange: (value, item) => {
        console.log(`选择了 ${item.title}:`, value);
        updateFormData(item.title, value);
      }
    },
    {
      type: 'switch',
      title: '是否启用',
      index: 6,
      props: {
        defaultChecked: false
      },
      onChange: (checked, item) => {
        console.log(`${item.title} 状态改变为:`, checked);
        updateFormData(item.title, checked);
      }
    },
    {
      type: 'slider',
      title: '满意度',
      index: 7,
      props: {
        min: 0,
        max: 100,
        defaultValue: 50
      },
      onChange: (value, item) => {
        console.log(`${item.title} 改变为:`, value);
        updateFormData(item.title, value);
      }
    }
  ];

  const handleGlobalChange = (value: any, item: ComponentItem) => {
    console.log(`全局监听 - ${item.title} 变更为:`, value);
    updateFormData(item.title, value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>ComponentQuery 组件示例</h2>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <h3>整体表单数据：</h3>
        <pre>{JSON.stringify(allFormData, null, 2)}</pre>
      </div>
      
      <ComponentQuery 
        data={data} 
        onChange={handleGlobalChange} 
      />
    </div>
  );
};

export default ComponentQueryExample;