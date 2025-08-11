// app-auth.js
import { staticUsers } from './config.js';

const $ = (sel) => document.querySelector(sel);

function login() {
  const u = $('#username')?.value?.trim() || '';
  const p = $('#password')?.value?.trim() || '';

  if (!u || !p) {
    alert('لو سمحت اكتب اسم المستخدم وكلمة المرور');
    return;
  }

  // تحقق من اليوزرات الثابتة
  const hit = staticUsers.find(x => x.username.toLowerCase() === u.toLowerCase() && x.password === p);

  if (hit) {
    // خزّن بيانات الجلسة
    localStorage.setItem('atd_username', hit.username);
    localStorage.setItem('atd_role', hit.role);
    localStorage.setItem('atd_logged_in', '1');

    // روح للواجهة الرئيسية (عدّل المسار لو عندك صفحة تانية)
    window.location.href = './index.html';
    return;
  }

  // لو عايز بعدين نفعّل تسجيل دخول من Firestore نضيفه هنا
  alert('بيانات غير صحيحة. جرّب: admin / 102030405060 أو developer / 5781829');
}

window.addEventListener('DOMContentLoaded', () => {
  $('#loginBtn')?.addEventListener('click', login);
  $('#password')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') login();
  });
});
