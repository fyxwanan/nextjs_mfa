import { NextResponse } from 'next/server';
import speakeasy from 'speakeasy';
import { getSecret } from '@/app/lib/db';

export async function POST(request: Request) {
    const data = await request.json();
    console.log("data", data)
    const { token, email } = data;

    const secret = await getSecret(email);

    if (!secret) {
        return NextResponse.json({
            success: false,
            message: "Secret not found or expired"
        });
    }

    const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        window: 2 // 允许前后 2 个时间步长 (即 ±60秒) 的误差
    });

    console.log(`Verifying token: ${token} for email: ${email}`);
    console.log(`Secret used: ${secret}`);
    console.log(`Verification result: ${verified}`);

    return NextResponse.json({
        success: verified
    });
}