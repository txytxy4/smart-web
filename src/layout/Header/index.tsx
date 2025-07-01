import styles from './index.module.scss';
import {Image, Avatar, Modal} from "antd";
import { UserOutlined } from '@ant-design/icons';
import reactIcon from '@/assets/react.svg'
import { use, useEffect, useState} from 'react';
import { getUserInfo } from '@/api/user/user';
import type { UserInfo } from '@/api/user/user.type'


const Header = () => {
    const [user, setUser] = useState<UserInfo | null>(null); //用户信息
    const [dialog, setDialog] = useState<boolean>(false)
    const fetchUserInfo = async () => {
        try {
          const userId = localStorage.getItem('userId');
          // 如果 getUserInfo 需要 userId 参数
          const res = await getUserInfo(userId as number | string);
          // 处理获取到的用户信息，比如 setState 或显示在页面
          console.log('用户信息', res);
          if (res.code === 200) {
            const data = {...res.data.profile, ...res.data};
            setUser(data)
          }
        } catch (error) {
          // 错误处理
          console.error('获取用户信息失败', error);
        }
      };
    useEffect(() => {
        fetchUserInfo();
    }, [])

    return (<div className={styles.container}>
        <div className={styles.icon}>
            <Image src={reactIcon} width={30} height={30}></Image>
        </div>
        <div className={styles.userWrap}>
             <p className={styles.nickname}>{user?.nickname}</p>
            <Avatar icon={<UserOutlined />} src={user?.avatarUrl} size={30} />
        </div>
        <Modal title="用户信息" open={dialog} onCancel={() => setDialog(false)} onOk={() => setDialog(false)}>
            <p></p>
        </Modal>
    </div>)
}

export default Header