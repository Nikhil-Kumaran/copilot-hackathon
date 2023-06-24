import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useUser } from '@/hooks/data-fetching/useUser'

import { Button, Space, DatePicker, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {data, error, isLoading} = useUser()
  console.log("data, error, isLoading", data, error, isLoading)
  const onChange = () => {};

  return (
    <div style={{ padding: 100 }}>
      <Space direction="vertical">
        <Button type="primary">Primary Button</Button>
        <Button type="ghost">Ghost Button</Button>
        <DatePicker onChange={onChange} />
        <SearchOutlined style={{fontSize: 60, color: 'green'}} />
        <Card>
          <p>Card content</p>
        </Card>
      </Space>
    </div>
  )
}
