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

    <article class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">
        {{ t.title }}
      </h2>

      <section class="space-y-2">
        <h3 class="text-lg font-semibold text-neutral-900">
          {{ t.collectTitle }}
        </h3>
        <ul class="list-disc space-y-1 pl-5 text-neutral-700">
          <li v-for="(item, i) in t.collectItems" :key="i">
            {{ item }}
          </li>
        </ul>
      </section>

      <section class="space-y-2">
        <h3 class="text-lg font-semibold text-neutral-900">
          {{ t.purposeTitle }}
        </h3>
        <p class="leading-relaxed text-neutral-700">
          {{ t.purpose }}
        </p>
      </section>

      <section class="space-y-2">
        <h3 class="text-lg font-semibold text-neutral-900">
          {{ t.retentionTitle }}
        </h3>
        <p class="leading-relaxed text-neutral-700">
          {{ t.retention }}
        </p>
      </section>

      <section class="space-y-2">
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
    title: '개인정보 수집 및 이용 동의',
    collectTitle: '수집 항목',
    collectItems: [
      '이름 또는 닉네임',
      '소셜 로그인 정보',
      '보드 활동 지역 및 활동 기록',
      '알림 제공을 위한 기기 정보',
    ],
    purposeTitle: '이용 목적',
    purpose:
      '수집된 정보는 서비스 제공, 사용자 간 활동 공유, 서비스 개선 및 보드 문화 활동 분석을 위해 사용됩니다.',
    retentionTitle: '보유 및 파기',
    retention:
      '개인정보는 회원 탈퇴 시 즉시 삭제되며, 법령에 의해 보관이 필요한 경우를 제외하고는 복구할 수 없습니다.',
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
    title: '個人情報の収集および利用に関する同意',
    collectTitle: '収集項目',
    collectItems: [
      '氏名またはニックネーム',
      'ソーシャルログイン情報',
      'ボード活動地域および活動履歴',
      '通知提供のための端末情報',
    ],
    purposeTitle: '利用目的',
    purpose:
      '収集された情報は、サービス提供、利用者間の活動共有、サービス改善およびボード文化活動の分析のために使用されます。',
    retentionTitle: '保有および廃棄',
    retention:
      '個人情報は会員退会時に直ちに削除され、法令により保存が必要な場合を除き復元できません。',
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
    title: '个人信息收集与使用同意书',
    collectTitle: '收集项目',
    collectItems: [
      '姓名或昵称',
      '社交登录信息',
      '板类活动地区及活动记录',
      '用于通知服务的设备信息',
    ],
    purposeTitle: '使用目的',
    purpose:
      '所收集的信息将用于服务提供、用户之间的活动共享、服务改进及板类文化活动分析。',
    retentionTitle: '保存与销毁',
    retention:
      '个人信息将在用户注销会员时立即删除，法律要求保存的情况除外，且无法恢复。',
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
    title: '個人資料蒐集與利用同意書',
    collectTitle: '蒐集項目',
    collectItems: [
      '姓名或暱稱',
      '社群登入資訊',
      '板類活動地區及活動紀錄',
      '用於通知服務的裝置資訊',
    ],
    purposeTitle: '使用目的',
    purpose:
      '所蒐集之資料將用於服務提供、使用者間活動分享、服務改善及板類文化活動分析。',
    retentionTitle: '保存與刪除',
    retention:
      '個人資料將於會員退出時立即刪除，法律另有規定需保存者除外，且無法復原。',
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
    title: 'Consent to Collection and Use of Personal Information',
    collectTitle: 'Information Collected',
    collectItems: [
      'Name or nickname',
      'Social login information',
      'Board activity location and activity records',
      'Device information for notification services',
    ],
    purposeTitle: 'Purpose of Use',
    purpose:
      'The collected information is used for service provision, sharing activities between users, service improvement, and analysis of board culture activities.',
    retentionTitle: 'Retention and Deletion',
    retention:
      'Personal information is deleted immediately upon account deletion and cannot be recovered unless retention is required by law.',
    contactTitle: 'Contact Information',
    contactItems: [
      'Phone: 010-3436-3622',
      'Email: board.wiki.korea@gmail.com',
    ],
  },
}

const t = computed(() => messages[locale.value])
</script>
