'use client'

import React from 'react';
import useSWR from 'swr';

export default function PostList() {
    //클라이언트 컴포넌트에서 백엔드레 api/post get요청
    //서버에서 post데이터 가지고옴
    const { data, isLoading: loading, error } = useSWR('/api/post');
    console.log(data)


    return (
        <div>
            {
                loading && <p>loading...</p>
            }
            {
                data && <p>length : {data.number}</p>
            }
        </div>
    );
}

