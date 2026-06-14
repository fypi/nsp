'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

function getAccountLabels(locale) {
  if (locale === 'en') {
    return {
      account: 'Account Center',
      profile: 'Profile',
      security: 'Security',
      logout: 'Logout',
      login: 'Login',
    }
  }

  if (locale === 'zh-TW') {
    return {
      account: '個人中心',
      profile: '個人資訊',
      security: '安全設定',
      logout: '登出',
      login: '登入',
    }
  }

  return {
    account: '个人中心',
    profile: '个人信息',
    security: '安全设置',
    logout: '退出登录',
    login: '登录',
  }
}

function getUserDisplayName(user, fallback = '用户') {
  if (!user) return fallback

  const meta = user.user_metadata || {}

  const name =
    meta.display_name ||
    meta.full_name ||
    meta.name ||
    meta.username ||
    meta.nickname

  if (typeof name === 'string' && name.trim()) {
    return name.trim()
  }

  if (user.email) {
    return user.email.split('@')[0]
  }

  return fallback
}

export default function UserMenu() {
  const router = useRouter()
  const params = useParams()
  const locale = typeof params?.locale === 'string' ? params.locale : 'zh'

  const menuRef = useRef(null)

  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const labels = useMemo(() => getAccountLabels(locale), [locale])

  const userDisplayName = useMemo(() => {
    return getUserDisplayName(user, labels.account)
  }, [user, labels.account])

  const avatarLetter = userDisplayName?.charAt(0)?.toUpperCase() || 'U'

  useEffect(() => {
    setMounted(true)

    const get = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user || null)
    }

    get()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      listener?.subscription?.unsubscribe?.()
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setOpen(false)
    router.push(`/${locale}`)
  }

  if (!mounted) {
    return (
      <button
        type="button"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid #ddd',
          background: '#fff',
          cursor: 'default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
        }}
      >
        ···
      </button>
    )
  }

  if (!user) {
    return (
      <button
        type="button"
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
          fontWeight: 'bold',
        }}
        aria-label={labels.login}
      >
        ?
      </button>
    )
  }

  return (
    <div ref={menuRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
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
          fontWeight: 'bold',
          fontSize: 16,
        }}
        aria-label="User menu"
        title={user.email || userDisplayName}
      >
        {avatarLetter}
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 48,
            width: 260,
            background: '#fff',
            boxShadow: '0 18px 42px rgba(15, 23, 42, 0.16)',
            borderRadius: 18,
            padding: '8px 0',
            zIndex: 9999,
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              padding: '14px 16px',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
              background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: '#111827',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: 17,
                  flex: '0 0 40px',
                }}
              >
                {avatarLetter}
              </div>

              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: '#111827',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginBottom: 4,
                  }}
                  title={userDisplayName}
                >
                  {userDisplayName}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: '#6b7280',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  title={user.email || ''}
                >
                  {user.email}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setOpen(false)
              router.push(`/${locale}/account`)
            }}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '11px 16px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 14,
              color: '#111827',
              fontWeight: 650,
            }}
          >
            {labels.account}
          </button>

          <button
            type="button"
            onClick={() => {
              setOpen(false)
              router.push(`/${locale}/account/profile`)
            }}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '11px 16px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 14,
              color: '#111827',
              fontWeight: 650,
            }}
          >
            {labels.profile}
          </button>

          <button
            type="button"
            onClick={() => {
              setOpen(false)
              router.push(`/${locale}/account/security`)
            }}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '11px 16px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 14,
              color: '#111827',
              fontWeight: 650,
            }}
          >
            {labels.security}
          </button>

          <button
            type="button"
            onClick={logout}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '12px 16px',
              border: 'none',
              borderTop: '1px solid rgba(0,0,0,0.06)',
              marginTop: 4,
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 14,
              color: '#d11a2a',
              fontWeight: 800,
            }}
          >
            {labels.logout}
          </button>
        </div>
      )}
    </div>
  )
}