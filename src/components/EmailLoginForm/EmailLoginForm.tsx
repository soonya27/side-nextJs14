"use client"
import React, { useState } from 'react';
import styles from './EmailLoginForm.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
    email: string;
    password: string;
}

const DEFAULT_DATA = {
    email: '',
    password: '',
}


export default function EmailLoginForm() {
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        clearErrors,
        getFieldState,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<FormData> = (data) => console.log(data)

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">이메일</label>
            <input defaultValue=""
                className={`${errors.email && errors.email?.type === 'pattern' && styles.formInputNotValidated}`}
                {...register("email", {
                    required: true,
                    pattern: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6})*$/,
                })} />
            {errors.email && errors.email?.type === 'pattern' && (
                <p>이메일 형식을 확인해주세요.</p>
            )}
            {errors.email && errors.email?.type === 'required' && (
                <p>이메일을 입력해주세요.</p>
            )}

            <label htmlFor="">비밀번호</label>
            <input
                // type="password"
                {...register("password", {
                    required: true,
                })} />


            <div>
                <button type="submit">로그인</button>
            </div>

        </form>
    );
}

