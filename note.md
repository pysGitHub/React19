## 导入的插件：

#### 1.安装router
`npm install react-router-dom`


#### 2.导入AntDesign
`npm install antd --save`


#### 3.导入scss
`npm install -D sass`


#### 4.导入 rxjs 实现订阅
`npm install rxjs`



#### 5.导入redux
`npm install @reduxjs/toolkit react-redux`


## 遇到的问题：

#### 1. 导入公共样式
Q: 在公共样式中导入其他的公共样式的scss文件 @import "xxxxx" 报警告
A: 使用@use 导入

T:
```scss
// 导入公共样式，在公共样式中导入其他公共样式（将公共样式color.scss导入公共样式文件commmon.scss中）
@use './color.scss' as *;
@forward './color.scss';
```


#### 2. React 修改第三方组件样式
Q: React 修改Antdesignsign 组件样式（以Select组件为例）
```tsx
    <Select
    value={selectedLanguage}
    onChange={changeLanguage}
    placeholder="Select Language"
    variant="borderless"
    className='lanSelect'
    >
    {languageList.map((item) => (
        <Option key={item.value} value={item.value}>
        {item.label}
        </Option>
    ))}
    </Select>
```
A: 在要修改的组件定义一个类名,然后使用 :where()

T:
```scss
//(法1：) 设置语言选择器样式
:where(.lanSelect) {
    font-size: $font-size-16;

    .ant-select-content {
        background-color: transparent !important;
        border: none !important;
        font-size: $font-size-16;
        color: $public-color1;
    }

    .anticon,
    .anticon-down {
        font-size: $font-size-16;
        color: $public-color1;
    }
}



/* 法2：
    * 如果不行，试试下面的方法：
    * 设置菜单展开后的样式
    * 注意：修改了Menu组件的第二级标签，审查出来的类为： 
    * class="ant-menu ant-menu-sub ant-menu-inline"
    * 但是在改写的时候需要将名称连接起来，中间无空格，否则无法修改样式
*/ 
.lanSelect {
    .ant-select-content {
        background-color: transparent !important;
        border: none !important;
        font-size: $font-size-16;
        color: $public-color1;
    }

    .anticon,
    .anticon-down {
        font-size: $font-size-16;
        color: $public-color1;
    }
}


/**
 * 法3：动态添加类名。
 * 如果元素是动态生成的，那么可以通过动态添加类名来修改样式。比如：Menu组件的子元素Tooltip; hover样式

 * 添加类名：

  useEffect(() => {
    if (什么时候添加类名的条件) {
      // 例如在body上添加添加类名 menuHidden
      document.body.classList.add('menuHidden');
    } else {
      document.body.classList.remove('menuHidden');
    }
    
    // 清理函数
    return () => {
      document.body.classList.remove('menuHidden');
    };
  }, [什么时候添加类名]);


  样式：
    .menuHidden {
        // .css-var-root.ant-tooltip-css-var 这个div是antd的tooltip组件的样式，
        // 直接添加到了body标签下的，用于显示提示信息，这里隐藏掉
        .css-var-root.ant-tooltip-css-var {
            display: none;
        }
    }
 * /
```
