import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    //Main.css
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-image: url('../pages/main/img_main_background.svg');
        background-size: cover;
        background-repeat: no-repeat;
        margin: 0;
        height: 100vh;
        min-height: 100%;
    }
    // 이거 Main.js 안에 스타일 시트로 구현함 삭제할까 말까
  
    .logo-container {
        text-align: center;
        flex-grow: 1;
    }
    
    .logo {
        width: 15%;
    }
    
    .footer {
        width: 100%;
        height: 113px;
        background-color: #99D5E4;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .footer-logo {
        width: 200px;
    }

    /* CitizensDetails.css */
    * {
        box-sizing: border-box;
        font-family: "Gmarket Sans";
    }
    
    .components-wrapper {
        width: 100%;
        // height: 100%;
        height: 37.5675rem;

        margin-top: 5.62rem;
        margin-bottom: 3rem;
        display: flex;
        justify-content: center;
        flex-direction: row;
        gap: 3.38rem;
    }
    
    .goto-citizens {
        font-size: 1.25rem;
        border: none;
        background-color: white;
        display: none;
        padding: 0;
        margin-left: 2rem;
    }
    
    .goto-counsel {
        float: right;
        font-size: 1.25rem;
        border: none;
        background-color: white;
        display: none;
        cursor: pointer;
        padding: 0;
        margin-right: 2rem;
    }
    
    .goto-citizensInformation {
        font-size: 1.75rem;
        border: none;
        background-color: white;
        display: none;
        cursor: pointer;
        padding: 0;
        margin-left: 2rem;
    }

    .citiznesInformation,
    .citiznesCounselList {
        height: 37.5675rem;
        overflow: hidden;
    }

    /* 위에 두개는 pages 폴더안에 들어있는 파일들만 */
    /* 아래부터는 components 하위폴더안에 있는 컴포넌트들 스타일시트 */
    /* CitizenCounselList */
    * {
        box-sizing: border-box;
    }
    
    .citizenCounselList-wrapper {
        width: 41.5625rem;
        overflow: auto;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
    }

    .ment-wrapper {
        display: flex;
        height: 3rem;
        justify-content: center;
        align-items: center;
        margin: 0 0 0.5rem 0;
    }

    .ment-wrapper p {
        display: inline-block;
        font-weight: bold;
    }

    .citizenName {
        font-size: 2.5rem;
        margin: 0;
    }

    .citizensCounList {
        font-size: 1rem;
        margin: 1rem 0 0 0;
    }
    
    .searchBar-wrapper {
        width: 41.5625rem;
        text-align: center;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        margin-bottom: 1.38rem;
    }
    
    .searchBar {
        width: 20.9375rem;
        height: 2.75rem;
        border: 1px solid #000;
        border-right: none;
        outline: none;
    }
    
    .search-img {
        height: 2.75rem;
        padding: 0.3rem;
        border: 1px solid #000;
        border-left: none;
        margin-right: 1rem;
        cursor: pointer;
    }

    .sort-img {
        width: 2.1rem;
        height: 2.1rem;
    }

    .write-img {
        width: 2.1rem;
        height: 2.1rem;
        margin-left: 0.31rem;
        display: none;
    }
    
    .list-wrapper {
        width: 41.5625rem;
        height: 29.9375rem;
        overflow: auto;
        margin: 0 auto;
    }
    
    .counselTable {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        font-size: 1.25rem;
    }
    
    .counselTable th,
    .counselTable td {
        text-align: center;
        vertical-align: middle;
        border: 1px solid #000;
        padding: 8px;
    }
    
    .counselTable th {
        padding-top: 1.3rem;
        padding-bottom: 1.2rem;
    }
    
    .inquiry-btn {
        width: 4.5625rem;
        height: 1.6875rem;
        border-radius: 3.125rem;
        border: 1px solid #000;
        font-size: 0.875rem;
        background-color: white;
        cursor: pointer;
    }
    
    /* CitizenInfor.css*/
    * {
        box-sizing: border-box;
    }
    
    .citizenInfor-wrapper {
        width: 22.75rem;
        border: 1px solid #000;
        display: flex;
        flex-direction: column;
        margin-top: 1.005rem;
    }
    
    .infor-wrapper {
        height: 93%;
        display: flex;
        margin-top: 1.37rem;
        margin-bottom: 1.62rem;
        flex-direction: column;
        justify-content: center;
    }
    
    .category-wrapper {
        width: 18rem;
        margin: 0 auto;
        margin-bottom: 0.38rem;
    }
    
    .category-wrapper img {
        margin-right: 0.31rem;
    }
    
    .category-wrapper p {
        display: inline-block;
        margin: 0;
        color: #878485;
    }

    .content-wrapper {
        width: 18rem;
        margin: 0 auto;
        border-bottom: 1px solid #000;
        margin-bottom: 0.38rem;
        display: flex;
        justify-content: space-between;
    }
    
    .content-wrapper p {
        display: inline-block;
        margin: 0;
        margin-bottom: 0.38rem;
    }

    .content-wrapper span {
        display: inline-block;
        margin: 0;
        margin-bottom: 0.38rem;
    }

    // .content-wrapper input {
    //     border: none;
    // }
    
    .plus-btn {
        width: 2.5625rem;
        height: 1.3125rem;
        font-size: 0.6875rem;
        display: none;
    }
    
    .btn-wrapper {
        width: 18rem;
        margin: 0 auto;
        margin-bottom: 1.37rem;
        height: 7%;
        display: flex;
        justify-content: flex-end;
        gap: 0.37rem;
    }
    
    .btn-wrapper button {
        width: 4.25rem;
        height: 1.8125rem;
        border-radius: 0.3125rem;
        border: none;
        background-color: #95d1d9;
        color: #fff;
        cursor: pointer;
    }
    
    /* CitizenList.css */
    .table-wrapper {
        width: 100%;
        overflow-x: auto;
    }

    .table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    .table-row {
        background-color: white;
    }

    .table-header,
    .table-cell {
        border: 1px solid black;
        padding: 10px;
        text-align: left;
    }

    .table-cell button {
        border: 1px solid #000;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
        background-color: transparent;
        color: #000;
        position: relative;
        margin: 0 auto;
        display: block;
    }

    /* FileUpload.css */
    .upload-container {
        display: flex;
        flex-direction: column;
        width: 50%;
        height: auto;
        border: 1px solid black;
        padding: 5px;
    }
    .upload-tag-container{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 5px;
    }
    .ic-file {
        width: 1rem;
        height: 1rem;
        margin-right: 3px;
    }

    .file-input-container {
        display: flex;
        flex: 1;
        align-items: center;
        margin-bottom: 5px;
        justify-content: center;
        border: 0.5px dashed black;
        border-radius: 5px;
        cursor: pointer;
    }
    .file-input-label {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
    }
    .file-save-button {
        align-self: flex-end;
        width: fit-content;
        height: auto;
        padding: 5px;
        color: white;
        background-color: #aed391;
        border: 0px;
        border-radius: 10px;
        cursor: pointer;
    }
    .uipanel-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 1rem;
        width: 100%;
        height: fit-content;
        margin: 0 auto;
        padding: 1rem 3rem;
    }

    /* Header.css */
    .header-container {
        margin-top: 20px;
        padding: 0;
        display: flex;
        justify-content: space-between;
    }
    
    .logo-container {
    text-align: center;
    flex-grow: 1;
    }

    .logo {
    width: 15%;
    height: auto;
    }

    .home-button {
    margin-right: 20px;
    }

    /* MedicineList.css */
    .table-wrapper {
        width: 100%;
        overflow-x: auto;
    }

    .table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    .table-row {
        background-color: white;
    }

    .table-header,
    .table-cell {
        border: 1px solid black;
        padding: 10px;
        text-align: left;
    }

    .table-cell button {
        border: 1px solid #000;
        border-radius: 30px;
        padding: 5px 10px;
        cursor: pointer;
        background-color: #ade391;
        color: white;
        position: relative;
        margin: 0 auto;
        display: block;
    }

    /* AddCounseling.css */
    .addCounseling-wrapper {
        margin: 0 auto;
        width: 19.25rem;
        height: 31.3125rem;
        border: 1px solid #000;
        display: flex;
        flex-direction: column;
        margin-top: 1.005rem;
      }
      
      .counselTitle {
        display: inline-block;
        margin: 0 auto;
        margin-top: 0.44rem;
      }
      
      .counsel-wrapper {
        height: 93%;
        display: flex;
        margin-top: 3.25rem;
        margin-bottom: 1.62rem;
        flex-direction: column;
      }
      
      .counsel-category-wrapper {
        width: 16rem;
        margin: 0 auto;
        margin-bottom: 0.38rem;
      }
      
      .counsel-category-wrapper p {
        display: inline-block;
        margin: 0;
      }
      
      .counsel-content-wrapper {
        width: 16rem;
        margin: 0 auto;
        border-bottom: 1px solid #000;
        margin-bottom: 0.87rem;
        display: flex;
        justify-content: space-between;
        color: #878485;
      }
      
      .counsel-content-wrapper p {
        display: inline-block;
        color: #565656;
        font-size: 0.875rem;
        margin: 0;
        padding: 0.19rem;
      }
      
      .counsel-content-wrapper span {
        display: inline-block;
        margin: 0;
        margin-bottom: 0.38rem;
      }
      
      .counsel-btn-wrapper {
        width: 18rem;
        margin: 0 auto;
        margin-bottom: 0.56rem;
        height: 7%;
        display: flex;
        justify-content: flex-end;
        gap: 0.69rem;
      }
      
      .counsel-btn-wrapper button {
        width: 4.25rem;
        height: 1.8125rem;
        border-radius: 3.125rem;
        border: none;
        background-color: #aed391;
        color: #000;
        cursor: pointer;
      }
      
    // CitizenAdd.css
    .citizenAdd-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center top;
        align-items: center;
        height: 100vh;
    }
    
    .citizenAdd-title {
        font-size: 24px;
        margin-top: 90px;
    }
      
    .input-field {
        display: flex;
        flex-direction: column;
        margin-top: 21px;
    }
    
    .input-field label {
        font-size: 20px;
        margin-bottom: 2px;
    }
    
    .input-field input {
        height: 60px;
        width: 590px;
        border: 1px solid black;
        border-radius: 5px;
        padding-left: 17px;
        padding-right: 17px;
    }
    
    .button-wrapper {
        margin-top: 62px;
    }
    
    .button-wrapper > * {
        margin-right: 50px;
    }
    
    .citizen-add-button {
        background-color: #AED391;
        color: white;
        font-size: 20px;
        padding-right: 24px;
        padding-left: 24px;
        padding-top: 18px;
        padding-bottom: 18px;
        border: none;
        border-radius: 5px;
    }
    
    .line-text {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 50%;
        margin-top: 90px;
        margin-bottom: 40px;
    }
      
    .line {
        flex-grow: 1;
        height: 3px;
        background-color: black;
        align-self: center;
        min-width: 0;
    }
    
    .line-text span {
        font-size: 24px;
    }

    // accountSetting.css
    .account-wrapper {
        width: 100%;
        height: 100%;
        margin-top: 1.74rem;
        margin-bottom: 1.74rem;
    }
    // width: 1440 / 1172 height: 1024/ 487+100
    .account-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 1rem;
    }
    .switch-button-container {
        height: 30%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .switch-button-container button {
        flex: 1;
        text-align: center;
        padding: 1rem 2rem;
        border: 0.5px solid black;
        border-radius: 1rem 1rem 0 0;
        background-color: #aed391;
        color: black;
        font-weight: bold;
        white-space: nowrap;
    }
    .account-input-wrapper {
        height: fit-content;
        width: 100%;
        padding: 2.5rem 4rem;
        border: 1px solid black;
    }
    .account-input-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        margin: auto 4rem;
    }
    .account-input-container span {
        font-weight: bold;
        white-space: nowrap;
    }
    .account-input-container input {
        padding: 1rem;
    }
    .account-input-container button {
        padding: 1rem 2rem;
        background-color: #aed391;
        border: 0px;
        color: white;
        font-weight: bold;
        white-space: nowrap;
    }

    /* 반응형 디스플레이 : 현재 중복되는 것들만 삭제한 상태*/
    @media (max-width: 768px) {
    .logo {
        width: 20%;
    }

    .footer-logo {
        width: 180px;
    }
    
    .counselList {
        display: none;
    }

    .goto-citizens,
    .goto-counsel,
    .goto-citizensInformation {
        display: block;
    }

    .citizenCounselList-wrapper {
        margin-top: 1rem;
        margin: 0 auto;
    }
    
    .citizenCounselList-wrapper,
    .list-wrapper {
        width: 95%;
    }

    .searchBar-wrapper,
    .searchBar,
    .search-img {
        width: 90%
    }

    .citizenName {
        font-size: 1.25rem;
    }

    .citizensCounList {
        font-size: 0.8125rem;
        margin: 0.3rem 0 0 0;
    }

    .write-img {
        display: block;
    }

    .btn-wrapper {
        display: none;
    }

    table,
    .inquiry-btn {
        font-size: 0.9rem;
    }
    
    .searchBar {
        flex-shrink: 1;
    }
    .search-img {
        flex-shrink: 3;
    }
    .plus-icon {
        display: none;
    }
    .citizenInfor-wrapper {
        border: none;
    }
    .table-cell:nth-child(4),
    .table-header:nth-child(4),
    .table-cell:nth-child(5),
    .table-header:nth-child(5),
    .table-cell:nth-child(6),
    .table-header:nth-child(6) {
        display: none;
    }
    .home-button {
        display: none;
    }
`;
export default GlobalStyles;
