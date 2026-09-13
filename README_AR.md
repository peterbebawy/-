# موديول أخصائية التخاطب — React + Firebase

نظام عربي Responsive لإدارة حالات التخاطب: بيانات الحالة → تقييم متعدد المجالات → مؤشرات تلقائية → خطة علاج → جلسات متابعة → ملفات/عينات → تقرير PDF.

## جاهزية GitHub

المشروع جاهز للرفع كمستودع GitHub:

- `.gitignore` يمنع رفع `.env` و`node_modules` وملفات البناء.
- `.env.example` هو القالب الآمن لإعداد Firebase.
- Workflow في `.github/workflows/ci.yml` يثبت الحزم ثم يشغل `npm run build` تلقائيًا مع كل Push وPull Request.
- لا تضع مفاتيح خدمة Admin أو Service Account داخل المستودع.

### رفع المشروع إلى GitHub

```bash
git init
git add .
git commit -m "Initial speech therapy module"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

> ملف `.env` لن يتم رفعه بسبب `.gitignore`. ارفع فقط `.env.example`.

## دعم الموبايل

الواجهة Mobile-first ومناسبة للموبايل والتابلت، وتشمل:

- قائمة جانبية Drawer على الشاشات الصغيرة.
- شريط تنقل سفلي ثابت للوصول السريع للرئيسية والحالات والإضافة.
- أزرار وحقول بارتفاع مناسب للمس.
- حقول إدخال بحجم 16px على الهواتف لتفادي Zoom التلقائي في بعض المتصفحات.
- دعم Safe Area للأجهزة ذات النوتش.
- النماذج تتحول إلى عمود واحد على الهاتف.
- التقييم 0–4 يتحول إلى شبكة لمس واضحة.
- الجداول قابلة للسحب أفقيًا عند الحاجة.
- التقرير قابل للعرض والطباعة من الهاتف.

يمكن فتح النظام من Chrome/Safari على الهاتف مباشرة بعد النشر على Firebase Hosting أو أي استضافة HTTPS.

## 1) التشغيل السريع بدون Firebase

1. انسخ `.env.example` إلى `.env` واترك `VITE_FIREBASE_ENABLED=false`.
2. نفذ:

```bash
npm install
npm run dev
```

3. افتح الرابط الذي يعرضه Vite.
4. يمكن الدخول بأي بريد وكلمة مرور لا تقل عن 6 أحرف في وضع Demo؛ البيانات تحفظ في LocalStorage للتجربة فقط.

### اختبار على هاتف داخل نفس شبكة Wi‑Fi

شغّل:

```bash
npm run dev -- --host 0.0.0.0
```

ثم افتح من الهاتف عنوان IP الخاص بالكمبيوتر مع المنفذ الذي يعرضه Vite، مثل:

```text
http://192.168.1.10:5173
```

هذا للاختبار المحلي فقط. للإنتاج استخدم HTTPS.

## 2) ربط Firebase الحقيقي

1. أنشئ مشروع Firebase وسجل Web App.
2. فعّل Authentication > Email/Password.
3. أنشئ Cloud Firestore وCloud Storage.
4. انسخ `.env.example` إلى `.env` وضع القيم الخاصة بمشروعك ثم اجعل:

```text
VITE_FIREBASE_ENABLED=true
```

5. ضع `VITE_CLINIC_ID=main-clinic` أو معرف العيادة المطلوب.
6. أنشئ مستخدم الأخصائية من Authentication.
7. في Firestore أنشئ:

```text
clinics/main-clinic/members/USER_UID
```

والحقول المقترحة:

```text
displayName
email
role: "admin"
active: true
```

8. أنشئ مستند العيادة:

```text
clinics/main-clinic
```

وفيه `name`.
9. انشر قواعد Firestore وStorage.
10. نفذ Build ثم انشر Hosting.

## 3) البناء

```bash
npm install
npm run build
```

الناتج سيكون داخل مجلد `dist`.

## 4) النشر على Firebase Hosting

بعد تثبيت Firebase CLI وتسجيل الدخول وتهيئة المشروع:

```bash
npm run build
firebase deploy --only hosting,firestore:rules,storage
```

`firebase.json` يحتوي Rewrite إلى `index.html` حتى يعمل React Router عند فتح الروابط مباشرة.

## 5) قاعدة البيانات

- `clinics/{clinicId}` بيانات العيادة.
- `clinics/{clinicId}/members/{uid}` المستخدمون والصلاحيات.
- `clinics/{clinicId}/patients/{patientId}` بيانات الطفل والتاريخ الطبي والنمائي.
- `.../patients/{patientId}/assessments/{assessmentId}` التقييمات والإجابات والدرجات والخطة.
- `.../patients/{patientId}/sessions/{sessionId}` سجل الجلسات والتقدم والبرنامج المنزلي.
- `.../patients/{patientId}/files/{fileId}` بيانات التسجيلات والملفات.
- الملفات الفعلية داخل Storage في `clinics/{clinicId}/patients/{patientId}/...`.

## 6) مجالات التقييم الحالية

1. الفحص الفموي الحركي ووظائف أعضاء النطق.
2. النطق والأصوات والعمليات الفونولوجية.
3. اللغة الاستقبالية.
4. اللغة التعبيرية.
5. التواصل الاجتماعي/البراغماتي.
6. الطلاقة.
7. الصوت والرنين.
8. الانتباه واللعب والمهارات الداعمة للتواصل.

المقياس الحالي 0–4 هو مقياس متابعة سريري داخلي وليس اختبارًا معياريًا. استبدله بالمقياس المؤسسي أو المرخص قبل الاستخدام السريري الرسمي إذا لزم.

## 7) الأمان

- لا تستخدم Firestore في Test Mode في الإنتاج.
- القواعد المرفقة تقصر البيانات على أعضاء العيادة المسجلين.
- ملفات Storage تقبل صوت/صور/PDF بحد 25MB لكل ملف.
- يفضل تفعيل Firebase App Check قبل الإطلاق.
- لا تفعل التخزين الدائم Offline على أجهزة مشتركة عند التعامل مع بيانات حساسة.
- لا ترفع Service Account JSON أو مفاتيح Admin SDK إلى GitHub.

## 8) ما يحتاج تخصيصًا قبل الاعتماد النهائي

- اسم العيادة والشعار والهوية البصرية.
- بيانات الأخصائية والتوقيع.
- البنود العلمية التي تعتمدها الأخصائية فعليًا.
- المقاييس المعيارية المرخصة إن وجدت.
- نموذج التقرير النهائي.
- صياغة الموافقات وسياسة الخصوصية وآلية الموافقة على التسجيلات الصوتية.
