"use client"

import { useState, Fragment } from "react"
import { Button, Form, Input, message } from "antd"
import useAxios from "@/app/hooks/useAxios"
import MFAForm from "./components/MFAForm"
import Verify from "./components/Verify"
import LoginSuccess from "./components/LoginSuccess"

enum ViewType {
    MFA_FORM = "mfa_form",
    MFA_VERIFY = "mfa_verify",
    MFA_SUCCESS = "mfa_success"
}

const Login = () => {
    const [form] = Form.useForm();
    // 1 form   2 qrcode   3 verify
    const [step, setStep] = useState<ViewType>(ViewType.MFA_FORM);
    const axios = useAxios();

    const handleReset = () => {
        form.resetFields();
    }

    const handleVerify = async (value: string) => {
        try {
            const res = await axios.post('/api/mfa/verify', {
                token: value,
                email: form.getFieldValue("email")
            });
            if (res.data.success) {
                setStep(ViewType.MFA_SUCCESS);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.error("Failed to verify", error);
        }
    }

    const handleSubmit = async () => {
        const validate = await form.validateFields();
        if (!validate) {
            return;
        }
        setStep(ViewType.MFA_VERIFY);
    }

    const renderContent = () => {
        switch (step) {
            case ViewType.MFA_FORM:
                return (
                    <MFAForm
                        onSubmit={handleSubmit}
                        onReset={handleReset}
                        form={form}
                    />
                )
            case ViewType.MFA_VERIFY:
                return (
                    <Verify
                        onVerify={handleVerify}
                        form={form}
                        onBack={() => setStep(ViewType.MFA_FORM)}
                    />
                )
            case ViewType.MFA_SUCCESS:
                return (
                    <LoginSuccess />
                )
            default:
                return null;
        }
    }


    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-[400px] border border-gray-200 p-[16px] rounded-md flex items-center justify-center">
                {renderContent()}
            </div>
        </div>
    )
}

export default Login;