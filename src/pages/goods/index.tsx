import { useState, useEffect } from "react";
import "./css/index.css";
import { Button } from "antd";
import { useNavigate, useLocation } from "react-router";
import usePriceStore from '../../store/price'

interface GoodsItem {
  goods_name: string;
  color?: string;
  num: number;
  price: string;
  id: number;
  url: string;
}

const Goods = () => {
  const { state } = useLocation()
  const [goodsList, setGoodsList] = useState<GoodsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { price, incrementPrice, decrementPrice, resetPrice, getPrice } = usePriceStore();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);
      setGoodsList([
        {
          goods_name: 'bob',
          color: 'red',
          num: 23,
          price: '22',
          id: 2,
          url: '/index/about'
        }
      ]);
    } catch (error) {
      console.error("获取商品数据失败:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(state);
  
  useEffect(() => {
    getData();
    
  }, []);

  const addItem = (item: GoodsItem) => {
    setGoodsList(
      goodsList.map((goods) => {
        if (goods.id === item.id) {
          return { ...goods, num: goods.num + 1 };
        }
        return goods;
      })
    );
  };

  const reduceItem = (item: GoodsItem) => {
    setGoodsList(
      goodsList.map((goods) => {
        if (goods.id === item.id && goods.num > 0) {
          return { ...goods, num: goods.num - 1 };
        }
        return goods;
      })
    );
  };

  const toPages = (url: string, item: GoodsItem) => {
    navigate(url, { state: { ...item } });
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="goods-container">
      {goodsList.map((item) => {
        return (
          <div className="goods-item" key={item.id}>
            <span className="info-text" style={{ color: item.color }}>
              {item.goods_name}
            </span>
            <span className="info-text">{item.num}</span>
            <span className="info-text">{item.price}</span>
            <div className="handle-wrap">
              <Button onClick={() => addItem(item)}>增加</Button>
              <Button onClick={() => reduceItem(item)}>减少</Button>
              <Button onClick={() => toPages(item.url, item)}>跳转</Button>
            </div>
          </div>
        );
      })}
      <p>{price}</p>
      <button onClick={decrementPrice}>-1</button>
    </div>
  );
};

export default Goods;
