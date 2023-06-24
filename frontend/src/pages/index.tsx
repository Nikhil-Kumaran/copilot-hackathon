import Image from "next/image";
import { Inter } from "next/font/google";
import { useUser } from "@/hooks/data-fetching/useUser";

import { Button, Space, DatePicker, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Auth } from "@/components/Auth";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div style={{ padding: 100, width: "500px", margin: "0 auto" }}>
      <Auth />
    </div>
  );
}
