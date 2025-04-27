import {
    aMapKey
} from '@/config';

const weather = (city) => {
    // console.log(city);
    return new Promise((r, j) => {
        uni.request({
            url: 'https://restapi.amap.com/v3/weather/weatherInfo',
            data: {
                city,
                key: aMapKey,
                extensions: 'base'
            },
            header: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET',
            success: (res) => {
                // console.log(res);
                if (res.statusCode == 200) {
                    let data = res.data,
                        {
                            status,
                            lives
                        } = data;
                    if (status == 1 && lives && lives.length) {
                        r(lives[0]);
                    } else {
                        j(null);
                    }
                } else {
                    j(null);
                }
            },
            fail: (error) => {
                j(null);
            }
        })
    })
};
const regeo = ({ longitude, latitude }) => {
    return new Promise((r, j) => {
        uni.request({
            url: 'https://restapi.amap.com/v3/geocode/regeo',
            data: {
                location: `${longitude},${latitude}`,
                key: aMapKey,
                extensions: 'base'
            },
            header: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET',
            success: (res) => {
                if (res.statusCode == 200) {
                    let data = res.data,
                        {
                            status,
                            regeocode
                        } = data;
                    if (status == 1 && regeocode) {
                        r(regeocode);
                    } else {
                        j(null);
                    }
                } else {
                    j(null);
                }
            },
            fail: (error) => {
                j(null);
            }
        })
    });

};

export {
    weather,
    regeo
}