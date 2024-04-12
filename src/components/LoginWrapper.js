import MedicareLogo from 'Images/img_medicare_logo.svg';
import 'styles/ForComps/LoginWrapper.css';

export default function LoginWrapper( { content }) {
    return (
    <div className="main-container">
      {content}
      <footer className="footer">
        <img src={MedicareLogo} alt="footer-logo" className="footer-logo" />
      </footer>
    </div>
    )
}