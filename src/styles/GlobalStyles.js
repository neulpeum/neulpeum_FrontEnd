import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle `
    //Main.css, Options.css
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
  
    .main-content > p {
        margin-top: 74px;
        font-size: 32px;
    }

    .logo-container {
        text-align: center;
        flex-grow: 1;
    }
    
    .logo-container > img {
        width: 280px;
        height: 218px;
    }

    .main-logo-container > img {
        margin-top: 76px;
        width: 327px;
        height: 242px;
    }

    .default-link-styles {
        text-decoration: none;
        display: inline-block;
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
        height: 37.5675rem;
        margin-top: 4.3rem;
        margin-bottom: 3rem;
        display: flex;
        justify-content: center;
        flex-direction: row;
        gap: 3.38rem;
    }

    .link-styles {
        text-decoration: none;
        display: inline-block;
        margin-left: 2rem;
    }
    
    .goto-citizens {
        font-size: 1.25rem;
        border: none;
        background-color: white;
        display: none;
        padding: 0;
        cursor: pointer;
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
    // 지금 아래에 작성되는 스타일시트는 이제부터 전역 페이지에서 공통적으로 사용될 스타일만 허용하겠음 by 오태형

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
        font-size: 1.5rem;
        margin: 1rem 0 0 0;
    }

    .list-wrapper {
        width: 30rem;
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
        white-space: nowrap;
    }
    
    .counselTable th {
        padding-top: 1.3rem;
        padding-bottom: 1.2rem;
        font-size: 1.25rem;
    }
    
    .inquiry-btn {
        width: 4.5625rem;
        height: 1.6875rem;
        border-radius: 3.125rem;
        border: 1px solid #000;
        font-size: 0.875rem;
        padding-top: 0.3rem;
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
        // height: 93%;
        display: flex;
        margin-top: 3.56rem;
        margin-bottom: 1rem;
        flex-direction: column;
        justify-content: center;
    }
    
    .category-wrapper {
        width: 18rem;
        margin: 0 auto;
        margin-bottom: 0.38rem;
    }
    
    .category-wrapper img {
        margin-right: 0.19rem;
    }
    
    .category-wrapper p {
        display: inline-block;
        margin: 0;
        color: #878485;
        font-size: 1.25rem;
    }

    .content-wrapper {
        width: 18rem;
        margin: 0 auto;
        margin-bottom: 0.81rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        white-space: pre-wrap;
    }

    .content-wrapper span {
        display: inline-block;
        font-size: 1.125rem;
        margin: 0;
        margin-bottom: 0.2rem;
        padding-left: 0.2rem;
    }

    .content-wrapper input,
    .inforCounselTextarea {
        display: inline-block;
        font-size: 1.125rem;
        margin: 0;
        margin-bottom: 0.2rem;
        padding-left: 0.2rem;
        border: none;
        border-bottom: 1px solid #000;
        outline: none;
    }

    .inforCounselTextarea {
        resize: none;
    }

    .inforCounselTextarea::-webkit-scrollbar {
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

    /* Search.css */

    .searchBar-wrapper {
        width: 41.5625rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        margin-bottom: 1.38rem;
    }
    
    .searchForm {
        display: flex;
        align-items: center;
    }
    
    .searchBar {
        width: 20.9375rem;
        height: 2.75rem;
        border: 1px solid #000;
        border-right: none;
        outline: none;
        padding-left: 0.5rem;
        padding-top: 0.2rem;
        font-size: 1.25rem;
    }
    
    .search-img {
        height: 2.75rem;
        width: 2.75rem;
        padding: 0.3rem;
        border: 1px solid #000;
        border-left: none;
        margin-right: 1rem;
        cursor: pointer;
    }
    
    .write-img {
        width: 2.1rem;
        height: 2.1rem;
        margin-left: 0.31rem;
        display: none;
    }
    
    .searchBtn {
        background-color: white;
        border: none;
        cursor: pointer;
        margin: 0;
        padding: 0;
        height: 2.75rem;
        width: 2.75rem;
    }
    
    /* CitizenList.css */
    .table-wrapper {
        width: 1180px;
        overflow-x: auto;
        margin: 0 auto;
        margin-top: 20px;
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

    .DetailButtonContainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
    }

    .DetailButton {
        font-size: 26px;
        font-weight: bold;
    }

    /* FileUpload.css */
    .upload-container {
        width: 588px;
        height: 131px;
        position: absolute;
        top: 283px;
        left: 171px;
        border: 1px solid black;
    }
    .ic-file {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 11px;
        left: 14px;
        cursor: pointer;
    }
    .ic-file-span{
        font-size: 20px;
        position: absolute;
        left: 54px;
        top: 17px;
    }
    .upload-container-label {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 20px;
        color: rgba(0, 0, 0, 0.5);
    }
    
    .file-save-button {
        width: 104px;
        height: 37px;
        font-size: 20px;
        position: absolute;
        top: 77px;
        left: 464px;
        color: white;
        background-color: #aed391;
        border: 0px;
        border-radius: 5px;
        cursor: pointer;
    }

    /* Modal.css */
    .modal-back {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.25);
    }
    
    .counsel-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 70%;
        max-width: 68.875rem;
        height: 60%;
        max-height: 45.06255rem;
        min-height: 40rem;
        border-radius: 1.25rem;
        box-shadow: -5px -5px 10px 0px rgba(0, 0, 0, 0.25) inset;
        padding: 20px;
        background-color: white;
        outline: none;
    }
    
    .modal-wrapper {
        height: 90%;
    }
    
    .modal-content-wrapper {
        height: 100%;
    }
    
    .modal-title {
        margin-top: 2rem;
        margin-left: 2rem;
        margin-right: 4.13rem;
        display: flex;
        justify-content: space-between;
    }
    
    .modal-title p {
        display: inline-block;
        font-size: 2rem;
        margin: 0;
        margin-top: 0.19rem;
    }
    
    .modal-title img {
        width: 2.66369rem;
        height: 2.03856rem;
        cursor: pointer;
    }
    
    .m-name,
    .m-date {
        font-weight: bold;
        margin-right: 0.3rem;
    }
    
    .modal-content {
        margin-top: 1.5rem;
        height: 70%;
    }
    
    .m-otc {
        display: inline-block;
        margin: 0;
        margin-left: 2.7rem;
        font-size: 1.25rem;
    }
    
    .modal-counsel {
        margin: 0 auto;
        width: 90%;
        max-width: 60.69369rem;
        height: 90%;
        margin-top: 1rem;
        background-color: #aed391;
        border-radius: 0.75rem;
        padding: 3rem;
        white-space: pre-wrap;
        overflow-y: auto;
    }
    
    .modal-counsel p,
    .modal-counsel textarea {
        display: inline-block;
        font-size: 1.5rem;
        margin: 0;
        background-color: #aed391;
    }
    
    .modalCounselTextarea {
        width: 100%;
        height: 90%;
        resize: none;
    }
    
    .modalCounselTextarea::-webkit-scrollbar {
        display: none;
    }
    
    .modal-btn-wrapper {
        float: right;
        margin-top: 1.58rem;
        margin-right: 1.5rem;
    }
    
    .modal-btn-wrapper button {
        width: 6.6875rem;
        height: 3rem;
        border-radius: 3.125rem;
        background-color: #95d1d9;
        border: none;
        margin-right: 1.8rem;
        font-size: 1.125rem;
        cursor: pointer;
    }

    .addCounsel-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 20.5625rem;
        width: 80%;
        height: 7.4374rem;
        border-radius: 0.3125rem;
        background-color: #e8e8e8;
        outline: none;
        border: 1px solid #000;
    }
    
    .addModal-gr {
        height: 1.4375rem;
        border-radius: 0.3125rem 0.3125rem 0rem 0rem;
        border-bottom: 1px solid #000;
        background-color: #aed392;
    }
    
    .addModal-content-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .addModal-content-wrapper p {
        text-align: center;
    }
    
    .addModal-btn-wrapper {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }
    
    .addModal-btn-wrapper button {
        width: 2.75rem;
        height: 1.25rem;
        border-radius: 0.3125rem;
        border: 0.7px solid #000;
        background-color: #d9d9d9;
        cursor: pointer;
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

    /* NoResult.css */
    .NoResultViewContainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        margin-top: 26px;
    }

    .SearchQuery {
        margin-left: 7px;
        font-size: 20px;
    }

    /* Drugs.css */
    .Drugtable-wrapper {
        width: 77.7%;
        height: 42%;
        margin: 1rem auto;
    }

    .Drugtable {
        width: 100%;
        border-collapse: collapse;
    }

    .Drugtable-row {
        background-color: white;
    }

    .Drugtable-header {
        border: 1px solid black;
        padding: 30px 0;
        text-align: center;
        font-size: 28px;
        font-weight: bold;
    }
    .Drugtable-cells {
        overflow-y: auto;
    }
    .Drugtable-cell {
        border: 1px solid black;
        padding: 15px 0;
        text-align: center;
        font-size: 20px;
        overflow-x: auto;
    }

    .DrugStyleButtonContainer {
        width: 89%;
        display: flex;
        justify-content: end;
    }

    /* AddCounseling.css */
    .addCounseling-wrapper {
        margin: 0 auto;
        width: 19.25rem;
        display: flex;
        flex-direction: column;
        margin-top: 4.87rem;
        margin-bottom: 2rem;
      }

      .counselTitle-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      
      .counselName,
      .counselTitle {
        display: inline-block;
        margin: 0;
        font-weight: bold;
      }

      .counselName {
        font-size: 2rem;
      }

      .counselTitle {
        margin-top: 0.44rem;
        font-size: 1.5rem;
      }
      
      .counsel-wrapper {
        height: 93%;
        display: flex;
        margin-top: 2.81rem;
        margin-bottom: 2.63rem;
        flex-direction: column;
      }
      
      .counsel-category-wrapper {
        width: 16rem;
        margin: 0 auto;
        margin-bottom: 0.38rem;
        font-weight: bold;
      }
      
      .counsel-category-wrapper p {
        display: inline-block;
        font-size: 0.9375rem;
        margin: 0;
      }
      
      .counselPro-content-wrapper {
        width: 16rem;
        margin: 0 auto;
        border-bottom: 1px solid #000;
        margin-bottom: 0.87rem;
        display: flex;
        justify-content: space-between;
        color: #878485;
      }

      .counsel-content-wrapper {
        width: 16rem;
        margin: 0 auto;
        margin-bottom: 0.87rem;
        display: flex;
        justify-content: space-between;
        color: #878485;
      }

      .counselOtc-content-wrapper {
        width: 16rem;
        min-height: 6rem;
        margin: 0 auto;
        margin-bottom: 0.87rem;
      }

      .counselDate-content-wrapper p,
      .counsel-content-wrapper p,
      .counselPro-content-wrapper input,
      .counsel-content-wrapper textarea {
        width: 16rem;
        display: inline-block;
        color: #565656;
        margin: 0;
        padding: 0.19rem;
        outline: 0;
        font-size: 0.9375rem;
      }

      .counselPro-content-wrapper input {
        border: 0;
      }

      .counsel-content-wrapper textarea {
        resize: none;
        border-radius: 0.3125rem;
        border: 1px solid #000;
    }

    .counselTextarea::-webkit-scrollbar {
        display: none;
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
        margin-bottom: 40px;
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
        margin-top: 56px;
        margin-bottom: 12px;
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

    /* 반응형 디스플레이 : 현재 중복되는 것들만 삭제한 상태*/
    @media (max-width: 768px) {
    .main-logo-container > img {
        margin-top: 95px;
        width: 209px;
        height: 170px;
    }

    .main-content > p {
        margin-top: 75px;
        font-size: 15px;
    }
    
    .logo-container > img {
        width: 94px;
        height: 67px;
    }

    .footer-logo {
        width: 180px;
    }

    .goto-citizens,
    .goto-counsel,
    .goto-citizensInformation {
        display: block;
    }

    .components-wrapper {
        margin-top: 2.9rem; 
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
    .searchBar,{
        width: 90%
    }

    .citizenName {
        font-size: 2rem;
    }

    .citizensCounList {
        font-size: 1.25rem;
        margin: 0.5rem 0 0 0;
    }

    .write-img {
        display: block;
    }

    .btn-wrapper {
        display: none;
    }

    .counselTable th,
    .counselTable td {
        font-size: 0.9375rem;
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
    .table-wrapper {
        width: 85%;
        overflow-x: auto;
        margin: 0 auto;
    }
    .counsel-modal {
        width: 90%;
        max-width: 21.625rem;
        min-width: 18rem;
        max-height: 29.43753rem;
        min-height: 29.43753rem;
        border-radius: 1.25rem;
        box-shadow: -5px -5px 10px 0px rgba(0, 0, 0, 0.25) inset;
    }
    .modal-wrapper {
        height: 100%;
    }
    .modal-title {
        margin-top: 0.3rem;
        margin-left: 0.3rem;
        margin-right: 1.37rem;
    }
    .modal-title p {
        display: inline-block;
        font-size: 1.125rem;
        margin: 0;
        margin-top: 0.1rem;
    }
    .modal-title img {
        width: 0.83631rem;
        height: 1.33169rem;
    }
    .m-name,
    .m-date {
        font-weight: bold;
        margin-right: 0.3rem;
    }
    .modal-content {
        margin-top: 1rem;
        height: 68%;
    }
    .m-otc {
        display: inline-block;
        margin: 0;
        margin-left: 0.3rem;
        font-size: 0.874rem;
    }
    .modal-counsel {
        max-width: 19.05628rem;
        height: 85%;
        margin-top: 1rem;
        background-color: #aed391;
        border-radius: 0.75rem;
        padding: 1rem;
        padding-top: 2rem;
    }
    .modal-counsel p,
    .modal-counsel textarea {
        display: inline-block;
        font-size: 0.875rem;
        margin: 0;
        margin-top: 0.2rem;
    }
    .modal-btn-wrapper {
        float: right;
        margin-top: 1rem;
        margin-right: 0.1rem;
    }
    .modal-btn-wrapper button {
        width: 3.70375rem;
        height: 1.9625rem;
        border-radius: 3.125rem;
        background-color: #95d1d9;
        border: none;
        margin-right: 0.6rem;
        font-size: 0.875rem;
    }
`;
export default GlobalStyles;