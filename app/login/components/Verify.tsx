"use client";

import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import type { FormInstance } from "antd";

type Iprops = {
    onVerify: (values: string) => void;
    form: FormInstance;
    onBack: () => void;
};

const Verify = (props: Iprops) => {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState<string>("");
    const onChange = (value: string) => {
        setText(value);
        if (value.length === 6) {
            props.onVerify(value);
        }
    };

    return (
        <div className="flex justify-center items-center flex-col gap-4 mt-10">
            <h2 className="text-xl font-bold mb-4">MFA Verification</h2>
            <Form form={props.form}>
                <Form.Item name="otp" noStyle rules={[{ len: 6, message: 'Please enter 6 digits' }]}>
                    <Input.OTP length={6} onChange={onChange} size="large" />
                </Form.Item>
            </Form>
            <div className="flex items-center justify-center gap-[16px] mt-[16px]">
                <Button 
                    type="default" 
                    onClick={() => {
                        props.onBack();
                    }} 
                >
                    上一步
                </Button>
                <Button 
                    type="primary" 
                    onClick={() => {
                        if (text.length === 6) {
                            setLoading(true);
                            props.onVerify(text);
                        } else {
                            message.error("Please enter 6 digits");
                        }
                    }} 
                >
                    Verify
                </Button>
            </div>
        </div>
    );
};

export default Verify;