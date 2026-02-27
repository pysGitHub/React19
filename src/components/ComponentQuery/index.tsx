import React from 'react';
import { Row, Col, Input, InputNumber, Select, DatePicker, TimePicker, Cascader, TreeSelect, AutoComplete, Switch, Slider, Rate } from 'antd';
import type { InputProps, InputNumberProps, SelectProps, DatePickerProps, TimePickerProps, CascaderProps, TreeSelectProps, AutoCompleteProps, SwitchProps, RateProps } from 'antd';

export interface ComponentItem {
  type: string;
  title: string;
  index: number;
  props?: any;
  options?: any[];
  span?: number; // 控制每项占用的栅格数，默认为6 (即一行4个)
  xs?: number; // 屏幕宽度 < 576px时的栅格数
  sm?: number; // 屏幕宽度 >= 576px时的栅格数
  md?: number; // 屏幕宽度 >= 768px时的栅格数
  lg?: number; // 屏幕宽度 >= 992px时的栅格数
  xl?: number; // 屏幕宽度 >= 1200px时的栅格数
  xxl?: number; // 屏幕宽度 >= 1600px时的栅格数
  onChange?: (value: any, item: ComponentItem) => void; // 为每个组件添加独立的onChange回调
}

export interface ComponentQueryProps {
  data: ComponentItem[];
  gutter?: number; // 控制栅格间距
  onChange?: (value: any, item: ComponentItem) => void; // 整体组件的onChange回调
}

const ComponentQuery: React.FC<ComponentQueryProps> = ({ data = [], gutter = 16, onChange }) => {
  // 根据index排序
  const sortedData = [...data].sort((a, b) => a.index - b.index);

  // 渲染特定类型组件的函数
  const renderComponent = (item: ComponentItem) => {
    const { type, props = {}, options = [] } = item;

    // 合并全局onChange和单独组件的onChange
    const handleChange = (value: any) => {
      // 如果组件有自己的onChange，则优先执行
      if (item.onChange) {
        item.onChange(value, item);
      } else if (onChange) {
        // 否则执行全局的onChange
        onChange(value, item);
      }
    };

    // 为不同的组件类型设置onChange事件
    const componentProps = {
      ...props,
      onChange: handleChange
    };

    switch (type.toLowerCase()) {
      case 'input':
        // Input的值变化处理
        return <Input
          {...(componentProps as InputProps)}
          value={props.value}
          onChange={(e) => handleChange(e.target.value)}
        />;
      case 'number':
      case 'inputnumber':
        return <InputNumber
          {...(componentProps as InputNumberProps)}
          style={{ width: '100%' }}
        />;
      case 'select':
        return <Select
          {...(componentProps as SelectProps)}
          options={options}
          style={{ width: '100%' }}
        />;
      case 'datepicker':
        return <DatePicker
          {...(componentProps as DatePickerProps)}
          style={{ width: '100%' }}
        />;
      case 'timepicker':
        return <TimePicker
          {...(componentProps as TimePickerProps)}
          style={{ width: '100%' }}
        />;
      case 'cascader':
        return <Cascader
          {...(componentProps as CascaderProps<any>)}
          options={options}
          style={{ width: '100%' }}
        />;
      case 'treeselect':
        return <TreeSelect
          {...(componentProps as TreeSelectProps<any>)}
          treeData={options}
          style={{ width: '100%' }}
        />;
      case 'autocomplete':
        return <AutoComplete
          {...(componentProps as AutoCompleteProps)}
          options={options}
          style={{ width: '100%' }}
        />;
      case 'switch':
        return <Switch {...(componentProps as SwitchProps)} />;
      case 'rate':
        return <Rate {...(componentProps as RateProps)} />;
      default:
        return <Input
          placeholder={`Unsupported type: ${type}`}
          onChange={(e) => handleChange(e.target.value)}
        />;
    }
  };

  return (
    <Row gutter={gutter}>
      {sortedData.map((item, index) => {
        // 使用响应式栅格系统，优先使用用户配置，否则使用默认规则
        const colProps = {
          xs: item.xs || 24,    // 默认在小屏幕上占满整行
          sm: item.sm || (item.span ? undefined : 12),  // 如果没有明确指定span，sm默认为12
          md: item.md || (item.span ? undefined : 8),   // 如果没有明确指定span，md默认为8
          lg: item.lg || (item.span ? undefined : 8),   // 如果没有明确指定span，lg默认为8
          xl: item.xl || (item.span ? undefined : 6),   // 如果没有明确指定span，xl默认为6
          xxl: item.xxl || (item.span ? undefined : 4), // 如果没有明确指定span，xxl默认为4
        };

        // 如果用户指定了span属性，则覆盖默认响应式行为
        if (item.span !== undefined) {
          colProps.span = item.span;
        }

        return (
          <Col {...colProps} key={`${item.type}-${item.index}-${index}`}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{item.title}</div>
              {renderComponent(item)}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default ComponentQuery;