import { useNavigate } from 'react-router';
import { Button } from 'antd';
import './index.module.scss'

export default function Unknow () {
    const navigate = useNavigate(); 
    const back = () => {
        navigate('index/home');
    }

    return (
        <div className='container'>
            <p>页面错误，请返回</p>
            <Button onClick={back} color="primary" variant="link">返回</Button>
        </div>
    )
}