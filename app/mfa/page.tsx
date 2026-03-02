"use client"

import { useState, Fragment } from "react"
import { Button, Form, Input, message } from "antd"
import useAxios from "@/app/hooks/useAxios"
import QRcodeWrapper from "./components/QRcodeWrapper"
import MFAForm from "./components/MFAForm"
import Link from "next/link"

enum ViewType {
    MFA_FORM = "mfa_form",
    MFA_QRCODE = "mfa_qrcode",
}

const Mfa = () => {
    const [form] = Form.useForm();
    // 1 form   2 qrcode   3 verify
    const [step, setStep] = useState<ViewType>(ViewType.MFA_FORM);
    const [otpauthUrl, setOtpauthUrl] = useState<string>("");
    const axios = useAxios();

    const handleReset = () => {
        form.resetFields();
    }

    const handleSubmit = async () => {
        const validate = await form.validateFields();
        if (!validate) {
            return;
        }
        const values = form.getFieldsValue();
        try {
            const res = await axios.post('/api/mfa', {
                email: values.email,    
                password: values.password
            });
            if (res.data.otpauth_url) {
                setOtpauthUrl(res.data.otpauth_url);
                setStep(ViewType.MFA_QRCODE);
            }
        } catch (error) {
            console.error("Failed to generate secret", error);
        }
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
            case ViewType.MFA_QRCODE:
                return (
                    <div className="flex flex-col items-center justify-center">
                        <div className="mb-[16px]">
                            请使用对应的MFA工具扫描二维码
                        </div>
                        <QRcodeWrapper otpauth_url={otpauthUrl} />
                        <div className="mt-[16px] flex items-center justify-center gap-[16px]">
                            <Button type="primary" onClick={() => setStep(ViewType.MFA_FORM)}>
                                上一步
                            </Button>
                            <Button type="primary">
                                <Link href="/login">
                                    登录
                                </Link>
                            </Button>
                        </div>
                    </div>
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

export default Mfa;