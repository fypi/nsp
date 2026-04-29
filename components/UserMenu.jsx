'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function UserMenu() {
  const router = useRouter()
  const params = useParams()
  const locale = params?.locale || 'zh'

  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)

  // 登录态
  useEffect(() => {
    const get = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    get()
  }, [])

  // 退出登录
  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setOpen(false)
    router.push(`/${locale}`)
  }

  // 未登录：点击跳登录
  if (!user) {
    return (
      <button
        onClick={() => router.push(`/${locale}/login`)}
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid #ddd',
          background: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold'
        }}
      >
        ?
      </button>
    )
  }

  // 已登录：头像 + 下拉菜单
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: 'none',
          background: '#000',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold,
          fontSize: 16
        }}
      >
        {user.email?.[0]?.toUpperCase()}
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 48,
            width: 180,
            background: '#fff',
            boxShadow: '0 2px 10px #0002',
            borderRadius: 8,
            padding: 8,
            zIndex: 999
          }}
        >
          <div style={{ padding: '8px 12px', fontSize: 13, color: '#666' }}>
            {user.email}
          </div>

          <button
            onClick={() => {
              setOpen(false)
              router.push(`/${locale}/profile`)
            }}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '8px 12px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer'
            }}
          >
            个人信息
          </button>

          <button
            onClick={logout}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '8px 12px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: 'red'
            }}
          >
            退出登录
          </button>
        </div>
      )}
    </div>
  )
}