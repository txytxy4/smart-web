import styles from './index.module.scss';
import {Image} from "antd"
import reactIcon from '@/assets/react.svg'

const Header = () => {

    return (<div className={styles.container}>
        <div className={styles.icon}>
            <Image src={reactIcon} width={30} height={30}></Image>
        </div>
    </div>)
}

export default Header