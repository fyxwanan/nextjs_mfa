import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen gap-[16px]">
      <Button type="primary" className="w-[80px]">
        <Link href="/mfa">生成 MFA</Link>
      </Button>
      <Button type="primary" className="w-[80px]">
        <Link href="/login">登录</Link>
      </Button>
    </div>
  );
}
