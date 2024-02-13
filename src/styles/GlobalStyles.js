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
        height: 100%;
        margin-top: 1.74rem;
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
    }
    
    .goto-counsel {
        float: right;
        font-size: 1.25rem;
        border: none;
        background-color: white;
        display: none;
        cursor: pointer;
    }
    
    .goto-citizensInformation {
        font-size: 1.25rem;
        border: none;
        background-color: white;
        display: none;
        cursor: pointer;
    }
    
    /* 위에 두개는 pages 폴더안에 들어있는 파일들만 */
    /* 아래부터는 components 하위폴더안에 있는 컴포넌트들 스타일시트 */
    /* CitizenCounselList */
    * {
        box-sizing: border-box;
    }
    
    .citizenCounselList-wrapper {
        width: 41.5625rem;
        height: 29.9375rem;
        overflow: auto;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        margin-top: 7rem;
    }

    .ment-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ment-wrapper p {
        display: inline-block;
        margin: 0 0 15px 0;
    }

    .citizenName {
        font-size: 40px;
        font-weight: bold;
    }

    .citizensCounList {
        font-size: 16px;
        font-weight: bold;
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
        border: 1px solid #000;
        border-left: none;
        margin-right: 2rem;
    }
    
    .list-wrapper {
        width: 41.5625rem;
        margin: 0 auto;
    }
    
    table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        font-size: 1.25rem;
    }
    
    th,
    td {
        text-align: center;
        vertical-align: middle;
        border: 1px solid #000;
        padding: 8px;
    }
    
    th {
        padding-top: 20px;
        padding-bottom: 20px;
    }
    
    .inquiry-btn {
        width: 4.5625rem;
        height: 1.6875rem;
        border-radius: 3.125rem;
        border: 1px solid #000;
        font-size: 0.875rem;
        background-color: white;
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
    .searchBar-wrapper,
    .searchBar,
    .search-img,
    .list-wrapper {
        width: 95%;
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
