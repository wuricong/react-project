import {useEffect, useState} from "react";
// import {Button} from "antd";
import {MailOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import './index.less'
// import {NavLink} from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'sub1',
        label: 'Navigation One',
        icon: <MailOutlined/>,
        children: [
            {
                key: 'g1',
                label: 'Item 1',
                type: 'group',
                children: [
                    {key: '1', label: 'page'},
                    {key: '2', label: 'home'},
                ],
            },
            {
                key: 'g2',
                label: 'Item 2',
                type: 'group',
                children: [
                    {key: '3', label: 'Option 3'},
                    {key: '4', label: 'Option 4'},
                ],
            },
        ],
    },
    {
        type: 'divider',
    },
    {
        key: 'grp',
        label: 'Group',
        type: 'group',
        children: [
            {key: '13', label: 'Option 13'},
            {key: '14', label: 'Option 14'},
        ],
    },
];

export const MenuLayout: React.FC = () => {
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    return (
        <Menu
            onClick={onClick}
            className="menu-left"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />

    );
};
const Layout = () => {
    // let [layer, setLayer] = useState({value: 1, type: "title"});
    let [count, setCount] = useState(1)
    // const handleChangeState = () => {
    //     setTimeout(() => {
    //         setLayer(() => ({...layer, type: "name"}));
    //     });
    // };

    useEffect(() => {
        setCount(count++)
    }, [count])

    // const handleAdd = () => {
    //     setCount(count + 1)
    // }
    return (
        <div className="menu-class">
            我是首页
            {/*<div>{layer.type}</div>*/}
            {/*<div>{count}</div>*/}
            {/*<Button type="primary" onClick={handleAdd}>加1</Button>*/}
            {/*<Button onClick={handleChangeState}>异步改变状态</Button>*/}
            {/*<div style={{color: "white"}}>Count:{layer.type}</div>*/}
        </div>
    );
};

export default Layout;
