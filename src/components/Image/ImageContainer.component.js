import './ImageContainer.scss';
export default function ImageContainer(props){
    return (
        <div key={props.key} className={props.imgContain}>
            <img className={props.classes} alt="snakeladder" src={props.sSrc}></img>
        </div>
    )
}