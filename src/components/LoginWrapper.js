import MedicareLogo from 'Images/img_medicare_logo.svg';
import 'styles/ForComps/LoginWrapper.css';

export default function LoginWrapper( { content }) {
    return (
    <div className="main-container">
      <div className="main-logo-container">
        <img src="/icons/ic_logo.svg" alt="logo" className="logo" />
      </div>
      <div className='main-content'>
        <p>늘픔 약 재고 관리 서비스에 오신 것을 환영합니다</p>
        {content}
      </div>
      <footer className="footer">
        <img src={MedicareLogo} alt="footer-logo" className="footer-logo" />
      </footer>
    </div>
    )
}