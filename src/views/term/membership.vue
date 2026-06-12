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
          {{ t.locationTitle }}
        </h3>
        <p class="leading-relaxed text-neutral-700">
          {{ t.location }}
        </p>
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
      'GPS, 네트워크 등을 통해 확인되는 현재 위치정보 및 사용자가 등록한 보드 활동 지역과 활동 기록',
      '알림 제공을 위한 기기 정보',
    ],
    locationTitle: '위치정보 접근 및 사용',
    location:
      '앱은 주변 보드 활동 장소 표시, 활동 위치 등록, 사용자 간 활동 공유 등 위치 기반 기능을 제공하기 위해 사용자의 동의가 있는 경우에만 기기의 위치정보에 접근하거나 위치정보를 수집합니다. 위치정보는 해당 기능 제공 및 서비스 개선 목적으로 사용되며, 법령상 보관이 필요한 경우를 제외하고 회원 탈퇴 또는 이용 목적 달성 시 삭제됩니다.',
    purposeTitle: '이용 목적',
    purpose:
      '수집된 정보는 서비스 제공, 사용자 간 활동 공유, 위치 기반 기능 제공, 서비스 개선 및 보드 문화 활동 분석을 위해 사용됩니다.',
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
      'GPS、ネットワーク等により確認される現在地情報、および利用者が登録したボード活動地域と活動履歴',
      '通知提供のための端末情報',
    ],
    locationTitle: '位置情報へのアクセスおよび利用',
    location:
      '本アプリは、周辺のボード活動場所の表示、活動位置の登録、利用者間の活動共有など、位置情報に基づく機能を提供するため、利用者の同意がある場合に限り端末の位置情報へアクセスし、または位置情報を収集します。位置情報は当該機能の提供およびサービス改善の目的で利用され、法令上保存が必要な場合を除き、退会または利用目的の達成時に削除されます。',
    purposeTitle: '利用目的',
    purpose:
      '収集された情報は、サービス提供、利用者間の活動共有、位置情報に基づく機能の提供、サービス改善およびボード文化活動の分析のために使用されます。',
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
      '通过 GPS、网络等确认的当前位置，以及用户登记的板类活动地区和活动记录',
      '用于通知服务的设备信息',
    ],
    locationTitle: '位置信息访问与使用',
    location:
      '本应用为提供附近板类活动地点显示、活动位置登记、用户之间活动共享等基于位置的功能，仅在用户同意的情况下访问设备位置信息或收集位置信息。位置信息将用于提供相关功能及改进服务，除法律要求保存的情况外，将在用户注销或使用目的达成时删除。',
    purposeTitle: '使用目的',
    purpose:
      '所收集的信息将用于服务提供、用户之间的活动共享、基于位置的功能提供、服务改进及板类文化活动分析。',
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
      '透過 GPS、網路等確認的目前位置，以及使用者登錄的板類活動地區和活動紀錄',
      '用於通知服務的裝置資訊',
    ],
    locationTitle: '位置資訊存取與使用',
    location:
      '本應用程式為提供附近板類活動地點顯示、活動位置登錄、使用者間活動分享等基於位置的功能，僅在使用者同意時存取裝置位置資訊或蒐集位置資訊。位置資訊將用於提供相關功能及改善服務，除法律要求保存者外，將於會員退出或使用目的達成時刪除。',
    purposeTitle: '使用目的',
    purpose:
      '所蒐集之資料將用於服務提供、使用者間活動分享、基於位置的功能提供、服務改善及板類文化活動分析。',
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
      'Current location information identified through GPS, network, or similar technologies, and board activity locations and records registered by users',
      'Device information for notification services',
    ],
    locationTitle: 'Access to and Use of Location Information',
    location:
      'The app accesses or collects device location information only with the user\'s consent to provide location-based features, including displaying nearby board activity places, registering activity locations, and sharing activities between users. Location information is used to provide those features and improve the service, and is deleted when the account is deleted or the purpose of use is fulfilled, unless retention is required by law.',
    purposeTitle: 'Purpose of Use',
    purpose:
      'The collected information is used for service provision, sharing activities between users, providing location-based features, service improvement, and analysis of board culture activities.',
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
