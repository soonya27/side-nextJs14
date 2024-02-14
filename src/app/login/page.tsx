import JoinForm from '@/components/JoinForm/JoinForm';
import Link from 'next/link';
import React from 'react';

export default function LoginPage() {
    return (
        <>
            <h2>로그인</h2>
            <Link href="">
                <button>구글 계정으로</button>
            </Link>
            <Link href="">
                <button>카카오 계정으로</button>
            </Link>

            <Link href="/login/email">
                <button>이메일로 로그인하기</button>
            </Link>

        </>
    );
}

