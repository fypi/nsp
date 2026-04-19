import { redirect } from 'next/navigation';

export default function RootPage() {
  // 自动跳转到 /zh，解决 404！
  redirect('/zh');
}