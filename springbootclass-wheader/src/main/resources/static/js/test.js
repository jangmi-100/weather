$(function () {
    let latPoint = ""; // 위도
    let lonPoint = ""; // 경도
    let xPoint = "";   // 격자 x 포인트
    let yPoint = "";   // 격자 y 포인트

    // API에서 제공받은 위도/경도를 사용해 변환
    const result = dfs_xy_conv("toXY", 37.5665, 126.9780); // 예: 서울 시청 좌표
    xPoint = result.x;
    yPoint = result.y;

    console.log("Converted Grid Coordinates -> X:", xPoint, "Y:", yPoint);

    // 오늘 날짜와 기준 시간 계산
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const formattedDate = year + month + day;

    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    if (minutes < 30) {
        hours -= 1; // 30분 이하일 경우 1시간 전으로 보정
        minutes += 30;
    } else {
        minutes -= 30;
    }

    const formattedTime = ('0' + hours).slice(-2) + ('0' + minutes).slice(-2);

    console.log("Formatted Date:", formattedDate, "Formatted Time:", formattedTime);

    // API 요청
    const fetchWeatherData = async () => {
        const serviceKey = ""; // 인증키 입력
        const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst`;
        const params = new URLSearchParams({
            serviceKey,
            pageNo: 1,
            numOfRows: 1000,
            dataType: "JSON",
            base_date: formattedDate,
            base_time: formattedTime,
            nx: xPoint,
            ny: yPoint,
        });

        try {
            const response = await fetch(`${url}?${params}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const jsonResponse = await response.json();
            const items = jsonResponse.response.body.items.item;

            console.log("Weather Data:", items);

            items.forEach((item) => {
                console.log(
                    `Category: ${item.category}, Date: ${item.fcstDate}, Time: ${item.fcstTime}, Value: ${item.fcstValue}`
                );
            });
        } catch (error) {
            console.error("Failed to fetch weather data:", error);
        }
    };

    fetchWeatherData();

    // 좌표 변환 함수
    function dfs_xy_conv(code, v1, v2) {
        const RE = 6371.00877;
        const GRID = 5.0;
        const SLAT1 = 30.0;
        const SLAT2 = 60.0;
        const OLON = 126.0;
        const OLAT = 38.0;
        const XO = 43;
        const YO = 136;

        const DEGRAD = Math.PI / 180.0;
        const RADDEG = 180.0 / Math.PI;

        const re = RE / GRID;
        const slat1 = SLAT1 * DEGRAD;
        const slat2 = SLAT2 * DEGRAD;
        const olon = OLON * DEGRAD;
        const olat = OLAT * DEGRAD;

        const sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        const sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        const ro = re * sf / Math.pow(sf, sn);

        const rs = {};
        if (code === "toXY") {
            rs['lat'] = v1;
            rs['lng'] = v2;
            const ra = re * sf / Math.pow(Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5), sn);
            let theta = v2 * DEGRAD - olon;
            theta = Math.atan2(Math.sin(theta), Math.cos(theta));
            rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
            rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
        }
        return rs;
    }
});
