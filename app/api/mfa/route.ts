import { NextResponse } from 'next/server';
import speakeasy from 'speakeasy';
import { saveSecret, getSecret } from '@/app/lib/db';

export async function POST(request: Request) {
  const data = await request.json();
  console.log("data", data)
  
  // 1. Check if user already has a secret
  let secretBase32 = await getSecret(data.email);
  let otpauth_url = '';

  if (secretBase32) {
    // Reconstruct otpauth_url for existing secret
    // We need to manually construct or use speakeasy to get URL if we only stored base32
    // speakeasy.otpauthURL({ ... })
    otpauth_url = speakeasy.otpauthURL({ 
        secret: secretBase32, 
        label: 'MFA_TEST:' + data.email, 
        issuer: 'MFA_TEST', 
        encoding: 'base32' 
    });
  } else {
    // 2. Generate new if not exists
    const secret = speakeasy.generateSecret({
        name: 'MFA_TEST:' + data.email,
        issuer: 'MFA_TEST'
    });
    secretBase32 = secret.base32;
    otpauth_url = secret.otpauth_url || ''; // Handling optional type
    
    await saveSecret(data.email, secretBase32);
  }

  return NextResponse.json({
    secret: secretBase32,
    otpauth_url: otpauth_url
  });
}