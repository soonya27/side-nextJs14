"use client"
import React, { useState } from 'react';
import styles from './JoinForm.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createKey } from 'next/dist/shared/lib/router/router';

type FormData = {
    email: string;
    password: string;
    passwordComfirm?: string;
    nickname: string;
    check: string[];
}

const DEFAULT_DATA = {
    email: '',
    password: '',
    passwordComfirm: '',
    nickname: '',
}


const checkList = [
    { id: 0, name: 'checklist0', title: '만 14세 이상입니다.', required: true },
    { id: 1, name: 'checklist1', title: '서비스 이용약관에 동의합니다.', required: true },
    { id: 2, name: 'checklist2', title: '개인정보 수집/이용에 동의합니다.', required: true },
    { id: 3, name: 'checklist3', title: '개인정보 마케팅 활용에 동의합니다.', required: true },
    { id: 4, name: 'checklist4', title: '이벤트 할인혜택 알림 수신에 동의합니다.', required: false },
    { id: 5, name: 'checklist5', title: '장기 미 접속시 계정 활성 상태 유지에 동의합니다.', required: false },
];

export default function JoinForm() {
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

    const [pswComfirmDone, setPswComfirmDone] = useState(false);
    const handleChangePswCf = () => {
        if (getFieldState("passwordComfirm").invalid) {
            setPswComfirmDone(true);
        }
    }
    const handleBlurPswCf = () => {
        // console.log('focus 나옴')  // -> ref로 체크해야하나봄..
        setPswComfirmDone(false);
    }

    const handleClickCheckNickname = () => {
        //api 중복확인 체크
        //사용불가 -> ui 
        //사용가능 -> form validate true
        //변경되면 다시 중복확인 button 생김
    }

    //서비스약관 동의 체크박스
    const [checkItems, setCheckItems] = useState<number[]>([]);
    const handleSingleCheck = (checked, id) => {
        if (checked) {
            setCheckItems(prev => [...prev, id])
        } else {
            setCheckItems(checkItems.filter(list => list !== id));
        }

    }

    const allCheckedHandler = (e) => {
        if (e.target.checked) {
            setCheckItems(checkList.map((item) => item.id))
        } else {
            setCheckItems([]);
        }
    }




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
                    pattern:
                        // !@#$%^&* 만 가능  ?는 안되나
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,

                })} />
            {errors.password && errors.password?.type === 'pattern' && (
                <p>
                    8자 이상의 영문 대 소문자, 숫자 및 특수문자만 입력 가능합니다.
                </p>
            )}

            <input
                // type="password"
                className={`${errors.email && errors.email?.type === 'pattern' && styles.formInputNotValidated}`}
                {...register("passwordComfirm",
                    {
                        required: true,
                        validate: value => value === watch('password'),
                        onChange: handleChangePswCf,
                        onBlur: handleBlurPswCf
                    }
                )}
            />
            {(errors.passwordComfirm &&
                errors.passwordComfirm?.type === 'validate'
                && (<p>입력하신 정보와 상이합니다.</p>))}

            {/* focus돼 있을때만 validation 체크 true일때 일치합니다 보이고 focus떼면 사라짐 */}
            {!errors.passwordComfirm && pswComfirmDone
                && (<p>일치합니다.</p>)}




            <label htmlFor="">닉네임</label>
            <div>
                <input defaultValue=""
                    className={`${errors.nickname && errors.nickname?.type === 'validate' && styles.formInputNotValidated}`}
                    {...register("nickname", {
                        required: true,
                    })} />

                <button type="button" onClick={handleClickCheckNickname}>중복확인</button>
            </div>

            <div>
                <label htmlFor="allCheck">allCheck</label>
                <input type="checkbox" name="allCheck" id="allCheck" checked={checkItems.length === checkList.length ? true : false} onChange={allCheckedHandler} />
                {
                    checkList.map(check => (
                        <div key={`check-${check.id}`}>
                            <label htmlFor={`checkID${check.id}`}>{check.title} {`(${check.required ? '필수' : '선택'})`}</label>
                            <input type="checkbox"
                                id={`checkID${check.id}`}
                                checked={checkItems.includes(check.id) ? true : false}
                                {...register("check", {
                                    required: check.required,
                                })}
                                name={check.name}
                                onChange={(e) => handleSingleCheck(e.target.checked, check.id)}
                            />
                        </div>
                    ))
                }
                {(errors.check &&
                    errors.check?.type === 'required'
                    && (<p>체크해주세요.</p>))}
            </div>

            <div>
                {/*  <input type="text" name="name" value={formData.name} onChange={handleChange} />*/}
                <button type="submit" onClick={() => console.log(errors)}>회원가입하기</button>
            </div>

        </form>
    );
}

