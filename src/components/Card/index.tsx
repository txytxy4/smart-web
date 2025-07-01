import './public/css/index.css'
import React from "react"

interface Props {
    title?: string | number
    children?: React.ReactNode,
    callback?: (params: string | number) => void
}

// export default function Card (props:Props) {
//     const {title} = props

//     return (
//         <div className="card-wrap">
//             <header>
//                 <div>{title}</div>
//                 <div>副标题</div>
//             </header>
//             <main></main>
//             <footer>
//                 <button>确认</button>
//                 <button>取消</button>
//             </footer>
//         </div>
//     )
// }

 const Card:React.FC<Props> = ({title="default", children, callback}) => {

        return (
        <div className="card-wrap">
            <header>
                <div>{title}</div>
                <div>副标题</div>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <button onClick={() => callback && callback(0)}>确认</button>
                <button>取消</button>
            </footer>
        </div>
    )
}

export default Card