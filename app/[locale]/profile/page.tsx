'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function ProfilePage() {
  const router = useRouter()
  const params = useParams()
  const locale = params?.locale || 'zh'

  const [user, setUser] = useState(null)

  useEffect(() => {
    const get = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push(`/${locale}/login`)
      } else {
        setUser(data.user)
      }
    }
    get()
  }, [])

  if (!user) return <div>加载中...</div>

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        个人信息
      </h1>

      <div style={{ marginBottom: 16 }}>
        <strong>邮箱：</strong> {user.email}
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>用户 ID：</strong> {user.id}
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>登录时间：</strong> {new Date(user.created_at).toLocaleString()}
      </div>
    </div>
  )
}