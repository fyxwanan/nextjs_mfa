"use client"

import { Button, Form, Input } from "antd"
import type { FormInstance } from "antd"

type Iprops = {
    onSubmit: (values: any) => void
    onReset: () => void
    form: FormInstance
}

const Mfa = (props: Iprops) => {

    if (!props.form) {
        return null;
    }

    return (
        <Form
            labelAlign="left"
            form={props.form}
            className="w-full"
        >
            <Form.Item 
                name="email" 
                label="Email" 
                rules={[{ required: true, message: 'Please enter your email' }]}
                validateTrigger="onBlur"
            >
                <Input />
            </Form.Item>
            <div className="flex items-center justify-center gap-[16px]">
                <Button type="default" htmlType="reset" onClick={() => props.onReset()}>
                    Reset
                </Button>
                <Button type="primary" htmlType="submit" onClick={() => props.onSubmit(props.form.getFieldsValue())}>
                    Submit
                </Button>
            </div>
        </Form>
    )
}

export default Mfa;