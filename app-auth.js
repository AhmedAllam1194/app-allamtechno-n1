<!-- ضعه كملف منفصل باسم app-auth.js في جذر المشروع -->

<script type="module">
import { db } from "./config.js";
import {
  doc, getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// عناصر الواجهة
const $u = document.getElementById("username");
const $p = document.getElementById("password");
const $btn = document.getElementById("loginBtn");

// رسالة بسيطة
function toast(msg, type="err"){
  alert(msg); // ممكن تستبدلها بتوست من تصميمك
}

async function login() {
  const username = ($u?.value || "").trim();
  const password = ($p?.value || "").trim();

  if (!username || !password) {
    toast("من فضلك أدخل اسم المستخدم وكلمة المرور");
    return;
  }

  try {
    // اقفل الزر مؤقتًا
    if ($btn) { $btn.disabled = true; $btn.textContent = "جارِ الدخول..."; }

    // 1) التحقّق من كلمة المرور: usernames/{username}.password
    const passRef = doc(db, "usernames", username);
    const passSnap = await getDoc(passRef);
    if (!passSnap.exists()) {
      throw new Error("اسم المستخدم غير موجود.");
    }
    const savedPass = passSnap.data()?.password || "";
    if (password !== String(savedPass)) {
      throw new Error("كلمة المرور غير صحيحة.");
    }

    // 2) جلب الدور من users/{username}.role (اختياري)
    let role = "developer";
    const roleRef = doc(db, "users", username);
    const roleSnap = await getDoc(roleRef);
    if (roleSnap.exists() && roleSnap.data()?.role) {
      role = roleSnap.data().role;
    } else if (username.toLowerCase() === "admin") {
      role = "admin";
    }

    // 3) حفظ الجلسة محلّيًا
    const session = {
      username,
      role,
      loginAt: Date.now()
    };
    localStorage.setItem("atd_session", JSON.stringify(session));

    // 4) تحويل لواجهة النظام
    // لو الواجهة الرئيسية عندك index.html في نفس المجلد، خليه "./"
    window.location.href = "./"; 
  } catch (err) {
    console.error(err);
    toast(err.message || "فشل تسجيل الدخول.");
  } finally {
    if ($btn) { $btn.disabled = false; $btn.textContent = "دخول"; }
  }
}

// ربط زر الدخول و Enter
if ($btn) $btn.addEventListener("click", login);
[$u, $p].forEach(el=>{
  if(!el) return;
  el.addEventListener("keydown", e=>{
    if(e.key === "Enter") login();
  });
});
</script>
