<template>
  <div class="mx-auto max-w-4xl px-4 py-10 text-neutral-800">
    <!-- Language Switch -->
    <div class="mb-8 flex flex-wrap justify-end gap-2">
      <button
        v-for="l in locales"
        :key="l"
        @click="locale = l"
        class="rounded-md border border-neutral-300 px-3 py-1 text-sm font-medium transition
               hover:bg-neutral-100
               data-[active=true]:border-neutral-900
               data-[active=true]:bg-neutral-900
               data-[active=true]:text-white"
        :data-active="locale === l"
      >
        {{ labels[l] }}
      </button>
    </div>

    <article class="space-y-6">
      <h2 class="text-2xl font-bold tracking-tight">
        {{ t.title }}
      </h2>

      <p class="leading-relaxed text-neutral-700">
        {{ t.desc1 }}
      </p>

      <section class="space-y-2">
        <h3 class="text-lg font-semibold text-neutral-900">
          {{ t.deleteTitle }}
        </h3>
        <ul class="list-disc space-y-1 pl-5 text-neutral-700">
          <li v-for="(item, i) in t.deleteItems" :key="i">
            {{ item }}
          </li>
        </ul>
      </section>

      <p class="leading-relaxed text-neutral-700">
        {{ t.desc2 }}
      </p>

      <section class="space-y-2">
        <h3 class="text-lg font-semibold text-neutral-900">
          {{ t.methodTitle }}
        </h3>
        <ol class="list-decimal space-y-1 pl-5 text-neutral-700">
          <li v-for="(item, i) in t.methodItems" :key="i">
            {{ item }}
          </li>
        </ol>
      </section>

      <p class="leading-relaxed font-medium text-neutral-800">
        {{ t.desc3 }}
      </p>

      <section class="space-y-2 pt-2">
        <h3 class="text-lg font-semibold text-neutral-900">
          {{ t.contactTitle }}
        </h3>
        <ul class="list-disc space-y-1 pl-5 text-neutral-700">
          <li v-for="(item, i) in t.contactItems" :key="i">
            {{ item }}
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const locale = ref('ko')
const locales = ['ko', 'ja', 'zh-cn', 'zh-tw', 'en']

const labels = {
  ko: '한국어',
  ja: '日本語',
  'zh-cn': '简体中文',
  'zh-tw': '繁體中文',
  en: 'English',
}

const messages = {
  /* =========================
     한국어
  ========================= */
  ko: {
    title: '회원탈퇴 및 계정 삭제 안내',
    desc1:
      '이용자는 언제든지 오보타 앱 및 보드위키 웹 서비스에서 계정 삭제를 요청할 수 있습니다.',
    deleteTitle: '삭제되는 정보',
    deleteItems: [
      '회원 프로필 및 로그인 정보',
      '즐겨찾기 및 개인 설정 정보',
      '기타 서비스 이용 중 생성된 개인정보',
    ],
    desc2:
      '단, 서비스 운영 기록 및 통계 목적의 익명화된 데이터는 개인정보가 아닌 형태로 보관될 수 있습니다.',
    methodTitle: '탈퇴 방법',
    methodItems: [
      '오보타 앱 실행',
      '마이페이지 → 설정',
      '회원탈퇴 메뉴 선택',
    ],
    desc3:
      '탈퇴가 완료되면 계정 정보는 즉시 삭제되며 복구할 수 없습니다.',
    contactTitle: '문의처',
    contactItems: [
      '연락처: 010-3436-3622',
      '이메일: board.wiki.korea@gmail.com',
    ],
  },

  /* =========================
     일본어
  ========================= */
  ja: {
    title: '会員退会およびアカウント削除のご案内',
    desc1:
      '利用者はいつでも Obota アプリおよび BoardWiki のウェブサービスにてアカウント削除を申請できます。',
    deleteTitle: '削除される情報',
    deleteItems: [
      '会員プロフィールおよびログイン情報',
      'お気に入りおよび個人設定情報',
      'その他、サービス利用中に生成された個人情報',
    ],
    desc2:
      'ただし、サービス運営および統計目的のため、匿名化されたデータは個人情報ではない形で保存される場合があります。',
    methodTitle: '退会方法',
    methodItems: [
      'Obota アプリを起動',
      'マイページ → 設定',
      '会員退会メニューを選択',
    ],
    desc3:
      '退会が完了すると、アカウント情報は即時に削除され、復元することはできません。',
    contactTitle: 'お問い合わせ先',
    contactItems: [
      '連絡先: 010-3436-3622',
      'メール: board.wiki.korea@gmail.com',
    ],
  },

  /* =========================
     중국어 간체
  ========================= */
  'zh-cn': {
    title: '会员注销与账户删除说明',
    desc1:
      '用户可随时在 Obota 应用或 BoardWiki 网站中申请删除账户。',
    deleteTitle: '被删除的信息',
    deleteItems: [
      '会员资料及登录信息',
      '收藏及个性化设置信息',
      '服务使用过程中产生的其他个人信息',
    ],
    desc2:
      '但用于服务运营记录及统计目的的匿名化数据，可能以非个人信息形式保存。',
    methodTitle: '注销方式',
    methodItems: [
      '打开 Obota 应用',
      '我的页面 → 设置',
      '选择注销账户',
    ],
    desc3:
      '注销完成后，账户信息将立即删除，且无法恢复。',
    contactTitle: '联系方式',
    contactItems: [
      '联系电话: 010-3436-3622',
      '电子邮箱: board.wiki.korea@gmail.com',
    ],
  },

  /* =========================
     중국어 번체
  ========================= */
  'zh-tw': {
    title: '會員退出與帳戶刪除說明',
    desc1:
      '使用者可隨時於 Obota 應用程式或 BoardWiki 網站申請刪除帳戶。',
    deleteTitle: '刪除之資料',
    deleteItems: [
      '會員個人資料與登入資訊',
      '收藏與個人化設定資訊',
      '服務使用過程中所產生之其他個人資料',
    ],
    desc2:
      '惟基於服務營運紀錄與統計目的，匿名化資料可能以非個人資料形式保存。',
    methodTitle: '退出方式',
    methodItems: [
      '開啟 Obota 應用程式',
      '我的頁面 → 設定',
      '選擇會員退出',
    ],
    desc3:
      '完成退出後，帳戶資料將立即刪除，且無法復原。',
    contactTitle: '聯絡方式',
    contactItems: [
      '聯絡電話: 010-3436-3622',
      '電子郵件: board.wiki.korea@gmail.com',
    ],
  },

  /* =========================
     영어
  ========================= */
  en: {
    title: 'Account Withdrawal and Deletion Guide',
    desc1:
      'Users may request account deletion at any time through the Obota app or the BoardWiki web service.',
    deleteTitle: 'Information to Be Deleted',
    deleteItems: [
      'User profile and login information',
      'Favorites and personal settings',
      'Other personal information generated during service use',
    ],
    desc2:
      'However, anonymized data retained for service operation records and statistical purposes may be stored in a non-personal form.',
    methodTitle: 'How to Withdraw',
    methodItems: [
      'Launch the Obota app',
      'My Page → Settings',
      'Select the account withdrawal option',
    ],
    desc3:
      'Once withdrawal is completed, account information is deleted immediately and cannot be restored.',
    contactTitle: 'Contact Information',
    contactItems: [
      'Phone: 010-3436-3622',
      'Email: board.wiki.korea@gmail.com',
    ],
  },
}

const t = computed(() => messages[locale.value])
</script>
