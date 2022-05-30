import { FC, useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import request from '../../src/pages/utils/request';
import { baseCloudRequest } from '../pages/utils/api/query';


// todo 要给一句默认的,还是先请求一遍?
const Sentence: FC = () => {
    const [data, setData] = useState('');
    const [from, setFrom] = useState('')

    const getData = async () => {
        const result = await request({
            url: 'https://v1.hitokoto.cn/?c=b',
        })
        if (result) {
            console.log(result);
            setData(result.data.hitokoto);
            setFrom(result.data.from);
        }
    }

    const testCloud = async() => {
        const result = await baseCloudRequest()
        console.log(result);
    }

    useEffect(() => {
        testCloud()
        getData();
        const timer = setInterval(() => {
           getData()
        }, 10000)
        return () => {
            clearInterval(timer)
        }
    },[])

    

    return <>
        <View>{ data }</View>
        <View>{ from }</View>
    </>
}


export default Sentence