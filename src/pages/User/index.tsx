import { useState,useEffect } from "react"
import type { UserInfo } from '@/api/user/user.type'
import styles from './index.module.scss';
import { getUserInfo, uploadAvatar, updateUserInfo } from '@/api/user/user';
import { Avatar, Button, Form, Input, Upload, message, Select } from "antd";
import type { GetProp, UploadProps } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadRequestOption } from 'rc-upload/lib/interface';


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

// interface UploadRequestOption {
//     file: File;
//     onSuccess?: (response:unknown) => void;
//     onError?: (error: Error) => void;
//     onProgress?: (event: { percent: number }) => void;
//   }

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('你只能上传 JPG/PNG 文件!');
  }
  const isLt2M = file.size / 1024 / 1024 < 8;
  if (!isLt2M) {
    message.error('图片尺寸需要小于8m!');
  }
  return isJpgOrPng && isLt2M;
};

const User: React.FC  = () => {

    const [user, setUser] = useState<UserInfo | null>(null); //用户信息
    const [loading, setLoading] = useState(false); //加载状态
    const [saving, setSaving] = useState(false);


        const fetchUserInfo = async () => {
          try {
            const userId = localStorage.getItem('userId');
            const res = await getUserInfo(userId as number | string);
            console.log('res', res);
            
            if (res.code === 200) {
              const data = {...res.data.profile, ...res.data};
              setUser(data);
              console.log('user', data);
            }
          } catch (error) {
            console.error('获取用户信息失败', error);
          }
        };
    useEffect(() => {

        
        fetchUserInfo();
      }, []);

      const handleUpload = async (options: UploadRequestOption) => {
         try {
            const { file } = options;
            
            setLoading(true);
            const formData = new FormData();
            formData.append('file', file as Blob);
            console.log('formdata', formData);
            
            const res = await uploadAvatar(formData);
            console.log('res', res);
            if (res.code === 200) {
                const url = res.data?.path
                setUser({...user, avatarUrl: url})
            } else {
                message.error(res.message);
            }
         } catch(error) {
            console.log('error',error);
            
         } finally {
            setLoading(false)
         }
      }

      const handleChange = (value: string) => {
            setUser({...user, role: value})
      }

const save = async () => {
  if (!user?.id) {
    message.error('用户ID缺失，无法保存');
    return;
  }
  setSaving(true);
  try {
    const data: Record<string, unknown> = {};
    if (user.nickname) data.nickname = user.nickname;
    if (user.address) data.address = user.address;
    if (user.phone) data.phone = user.phone;
    if (user.role) data.role = user.role;
    if (user.avatarUrl) data.avatarUrl = user.avatarUrl;
    data.id = user.id;

    const res = await updateUserInfo(data);
    if (res.code === 200) {
      message.success('修改成功');
      fetchUserInfo?.();
      // 更新用户信息
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      message.error(res.message || '保存失败');
    }
  } catch (error) {
    message.error((error as Error)?.message || '保存失败，请重试');
  } finally {
    setSaving(false);
  }
};

      const uploadButton = (
        <Button style={{ border: 0, background: 'none' }}>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </Button>
      );

    return (
        <div className={styles.container}>
            <Form>
                <Form.Item label="头像">
                    <Upload beforeUpload={beforeUpload} listType="picture-circle" showUploadList={false} customRequest={handleUpload}>
                        {user?.avatarUrl ? <Avatar src={user?.avatarUrl}></Avatar> : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item label="昵称">
                    <Input value={user?.nickname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({...user, nickname: e.target.value})}></Input>
                </Form.Item>
                <Form.Item label="手机号">
                    <Input value={user?.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({...user, phone: e.target.value})}></Input>
                </Form.Item>
                <Form.Item label="地址">
                    <Input value={user?.address} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({...user, address: e.target.value})}></Input>
                </Form.Item>
                <Form.Item label="权限">
                    <Select defaultValue="user" onChange={handleChange} options={[
                        {value: 'admin', label: '管理员'},
                        {value: 'user', label: '用户'},
                        {value: 'member', label: '组员'}
                    ]}></Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={save} loading={saving}>保存</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default User