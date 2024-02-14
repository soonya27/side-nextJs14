"use client"
import React, { useState } from 'react';
import styles from './JoinForm.module.css';

type FormData = {
    email: string;
    password: string;
    passwordComfirm: string;
    name: string;
}

const DEFAULT_DATA = {
    email: '',
    password: '',
    passwordComfirm: '',
    name: '',
}

export default function JoinForm() {
    const [formData, setFormData] = useState<FormData>(DEFAULT_DATA);
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="">이메일</label>
            <input type="text" name="email" id="" value={formData.email} onChange={handleChange} />

            <label htmlFor="">비밀번호</label>
            <input type="password" name="password" id="" value={formData.password} onChange={handleChange} />
            <input type="password" name="passwordComfirm" id="" value={formData.passwordComfirm} onChange={handleChange} />

            <label htmlFor="">닉네임</label>
            <div>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
                <button >가입하기</button>
            </div>

        </form>
    );
}

