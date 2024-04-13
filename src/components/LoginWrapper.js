import 'styles/ForComps/LoginWrapper.css';

export default function LoginWrapper( { content }) {
    return (
    <div className="main-container">
      {content}
      <div className="footer"/>
    </div>
    )
}