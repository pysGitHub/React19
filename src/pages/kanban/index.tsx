import React, { useMemo } from 'react';
import KanbanCard, { type KanbanCardProps } from './kanban-card';
import { Row, Col } from 'antd';
import type { MenuItem } from '../../components/layout-menu';

const KanBan: React.FC = () => {

    const kanbanCardList = useMemo(() => {
        const menuDabaList: MenuItem[][] = [
            [
                { key: 'condition-render', icon: 'PieChartOutlined', label: '条件渲染' },
                { key: 'event-binding', icon: 'DesktopOutlined', label: '事件绑定' },
                {
                    key: 'hooks',
                    label: 'Api Hooks',
                    icon: 'MailOutlined',
                    children: [
                        { key: 'hooks-usestate', label: 'useState', icon: 'ContainerOutlined' },
                        { key: 'hooks-usereducer', label: 'useReducer', icon: 'ContainerOutlined' },
                        { key: 'hooks-useref', label: 'useRef', icon: 'ContainerOutlined' },
                        { key: 'hooks-useeffect', label: 'useEffect', icon: 'ContainerOutlined' },
                        { key: 'hooks-forward-ref', label: 'forwardRef', icon: 'ContainerOutlined' },
                    ],
                },
                {
                    key: 'component-pass-value',
                    label: '组件传值',
                    icon: 'AppstoreOutlined',
                    children: [
                        { key: 'father-to-son', label: '父传子' },
                        { key: 'son-to-father', label: '子传父' },
                        { key: 'context-pass-value', label: '上下文传值' },
                    ],
                },
                {
                    key: 'optimize-performance',
                    label: '优化性能',
                    icon: 'TeamOutlined',
                    children: [
                        { key: 'use-memo', label: 'useMemo' },
                        { key: 'use-callback', label: 'useCallback' },
                        { key: 'react-memo', label: 'React.memo' },
                    ],
                },
            ],
        ]



        const listData: Array<KanbanCardProps> = [
            {
                title: '基础知识',
                description: 'React19 涉及到的基础知识',
                path: '/layout',
                menuData: menuDabaList[0]
            },
            {
                title: 'form 表单',
                description: '共用组件创建form表单',
                path: '/form'
            },

        ];




        return listData.map((item, index) => {
            return (
                <Col
                    key={item.path}
                    xs={{ span: 24 }} // 小于576px时，一行1列 
                    md={{ span: 12 }} // 默认，一行3列 
                    lg={{ span: 8 }} // 大于992px时，一行3列 
                    xl={{ span: 6 }} // 大于1200px时，一行4列 
                >
                    <div style={{ padding: '8px' }}>
                        <KanbanCard
                            title={item.title}
                            description={item.description}
                            path={item.path}
                            menuData={item.menuData}
                        />
                    </div>
                </Col>
            )
        })
    }, [])


    return (
        <>
            <h2><strong>Kanban</strong></h2>

            <section>
                <Row gutter={[16, 16]}>
                    {kanbanCardList}
                </Row>
            </section>
        </>
    )
}

export default KanBan;