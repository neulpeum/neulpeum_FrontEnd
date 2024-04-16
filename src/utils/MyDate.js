export const MyDate = {
    convertDate: (dateString, targetFormNumber) => {
        const dateRegexs = [
            /^(\d{4})-(\d{2})-(\d{2})$/,                     // YYYY-MM-DD
            /^(\d{4})\.(\d{2})\.(\d{2}) (\d{2}):(\d{2})$/,   // YYYY.MM.DD HH:MM
            /^(\d{4})\.(\d{2})\.(\d{2})$/,                         // YYYY.MM.DD
            /^(\d{4})년 (\d{2})월 (\d{2})일$/,                       // YYYY년 MM월 DD일 
        ];
        let year, month, day, hour, minute;
        const matchedRegex = dateRegexs.find((regex) => regex.test(dateString));
        if (matchedRegex === undefined) return null;

        const match = matchedRegex.exec(dateString);
        if (match.length === 6) {
            year = match[1];
            month = match[2];
            day = match[3];
            hour = match[4];
            minute = match[5];
        } else {
            year = match[1];
            month = match[2];
            day = match[3];
        }
        
        let formattedDate;
        switch (targetFormNumber) {
            case (0):
                formattedDate = `${year}-${month}-${day}`;
                break;
            case (1):
                formattedDate = `${year}.${month}.${day} ${hour}:${minute}`;
                break;
            case (2):
                formattedDate = `${year}.${month}.${day}`;
                break;
            case (3):
                formattedDate = `${year}년 ${month}월 ${day}일`;
                break;
            case (4):
                formattedDate = `${year}년 ${month}월 ${day}일, ${hour}시 ${minute}분`
                break;
            default:
                formattedDate = null;
                break;
        }

        return formattedDate;
    },
    createCurrentDate: () => {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');

        return `${year}.${month}.${day} ${hours}:${minutes}`;
    }
};