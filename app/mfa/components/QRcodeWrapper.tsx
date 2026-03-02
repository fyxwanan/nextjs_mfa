"use client"

import { QRCodeCanvas } from "qrcode.react"

type Iprops = {
    otpauth_url: string
}

const QRcodeWrapper = (props: Iprops) => {
    const { otpauth_url } = props
    return (
        <div>
            <QRCodeCanvas value={otpauth_url} size={200} />
        </div>
    )
}

export default QRcodeWrapper;