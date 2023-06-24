import Image from "next/image";
import { Inter } from "next/font/google";
import { useUser } from "@/hooks/data-fetching/useUser";

import { Button, Space, DatePicker, Card, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Auth } from "@/components/Auth";
import { useEffect } from "react";
import { getAuthKey } from "@/utils/auth-key";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (getAuthKey()) {
      router.push("/portal");
    }
  }, []);

  return (
    <div style={{ padding: 100, width: "500px", margin: "0 auto" }}>
      <Auth />
    </div>
  );
}
