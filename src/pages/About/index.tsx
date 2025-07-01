import { useNavigate} from 'react-router';
import usePriceStore from '../../store/price';
import useUserStore from '../../store/user'

const About = () => {
    const navigate = useNavigate();
    const { price, incrementPrice, decrementPrice, resetPrice, getPrice } = usePriceStore();
    const { gourd, updateGourd } = useUserStore()
    const toPage = () => {
        console.log('跳转');
        navigate('/index/goods', { state: { name: '小满zs', age: 18 }}) //3. useNavigate 跳转
    }

    const sse = new EventSource('http://localhost:3000/sse');
    sse.addEventListener('message', (e) => {
        console.log('e', e);
    })

    const login = async () => {
        try {
            const res = await fetch('http://localhost:3000/user/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: 'box',
                    password: '11111'
                })
            })
            
            // 检查响应状态
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            // 获取响应数据
            const data = await res.json();
            console.log('接口返回的数据:', data);
            
        } catch (e) {
            console.log('请求失败:', e);
        }
    }
    return (
        <div>
            <div>about</div>
            <p>{price}</p>
            <button onClick={toPage}>跳转</button>
            <button onClick={incrementPrice}>+1</button>
            <p>{gourd.oneChild}</p>
            <p>{gourd.twoChild}</p>
            <p>{gourd.threeChild}</p>
            <p>{gourd.fourChild}</p>
            <p>{gourd.fiveChild}</p>
            <p>{gourd.sixChild}</p>
            <p>{gourd.sevenChild}</p>
            <button onClick={updateGourd}>进化</button>
            <button onClick={login}>登录</button>
        </div>
    )
}

export default About