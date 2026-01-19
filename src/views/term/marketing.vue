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

      <p class="leading-relaxed text-neutral-700">
        {{ t.desc2 }}
      </p>

      <p class="leading-relaxed text-neutral-700">
        {{ t.desc3 }}
      </p>

      <section class="space-y-2 pt-2">
        <h3 class="text-lg font-semibold text-neutral-900">
          {{ t.businessTitle }}
        </h3>
        <ul class="list-disc space-y-1 pl-5 text-neutral-700">
          <li v-for="(item, i) in t.businessItems" :key="i">
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
    title: '마케팅 수신 동의 (선택)',
    desc1:
      '회사는 이용자의 동의가 있는 경우에 한하여 서비스 안내 및 프로모션 정보를 제공할 수 있습니다.',
    desc2:
      '현재 마케팅 메시지는 발송되지 않으며, 향후 서비스 확장 시 적용될 수 있습니다.',
    desc3:
      '이용자는 언제든지 마케팅 수신 동의를 철회할 수 있습니다.',
    businessTitle: '사업자 정보',
    businessItems: [
      '서비스 제공자: 보드위키',
      '연락처: 010-3436-3622',
      '이메일: board.wiki.korea@gmail.com',
    ],
  },

  /* =========================
     일본어
  ========================= */
  ja: {
    title: 'マーケティング受信への同意（任意）',
    desc1:
      '会社は、利用者の同意がある場合に限り、サービス案内およびプロモーション情報を提供することがあります。',
    desc2:
      '現在、マーケティングメッセージは配信されていませんが、今後のサービス拡張により適用される可能性があります。',
    desc3:
      '利用者はいつでもマーケティング受信の同意を撤回することができます。',
    businessTitle: '事業者情報',
    businessItems: [
      'サービス提供者: BoardWiki',
      '連絡先: 010-3436-3622',
      'メール: board.wiki.korea@gmail.com',
    ],
  },

  /* =========================
     중국어 간체
  ========================= */
  'zh-cn': {
    title: '营销信息接收同意（可选）',
    desc1:
      '公司仅在获得用户同意的情况下，向用户提供服务通知及促销信息。',
    desc2:
      '目前未发送任何营销信息，未来可能随着服务扩展而适用。',
    desc3:
      '用户可随时撤回营销信息接收同意。',
    businessTitle: '企业信息',
    businessItems: [
      '服务提供方: BoardWiki',
      '联系电话: 010-3436-3622',
      '电子邮箱: board.wiki.korea@gmail.com',
    ],
  },

  /* =========================
     중국어 번체
  ========================= */
  'zh-tw': {
    title: '行銷資訊接收同意（選擇性）',
    desc1:
      '公司僅在取得使用者同意的情況下，提供服務通知與促銷資訊。',
    desc2:
      '目前未發送任何行銷訊息，未來可能因服務擴展而適用。',
    desc3:
      '使用者可隨時撤回行銷資訊接收之同意。',
    businessTitle: '業者資訊',
    businessItems: [
      '服務提供者: BoardWiki',
      '聯絡電話: 010-3436-3622',
      '電子郵件: board.wiki.korea@gmail.com',
    ],
  },

  /* =========================
     영어
  ========================= */
  en: {
    title: 'Consent to Receive Marketing Communications (Optional)',
    desc1:
      'The Company may provide service notifications and promotional information only with the user’s consent.',
    desc2:
      'Currently, no marketing messages are being sent, but this may apply in the future as the service expands.',
    desc3:
      'Users may withdraw their consent to receive marketing communications at any time.',
    businessTitle: 'Business Information',
    businessItems: [
      'Service Provider: BoardWiki',
      'Phone: 010-3436-3622',
      'Email: board.wiki.korea@gmail.com',
    ],
  },
}

const t = computed(() => messages[locale.value])
</script>
