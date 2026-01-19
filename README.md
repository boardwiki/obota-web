boardwiki – web application service

📘 BoardWiki Web Application (Frontend 중심 Full-Stack Canonical)
Project Structure & Architecture Context

본 문서는 BoardWiki Web Application의 단일 기준 문서 (Single Source of Truth) 이다.

구조

타입 분리 전략

API / Store 책임

인증·권한 흐름

세션 복구 정책

관리자 UI 반응형 정책

Supabase 기반 Backend 설계

를 정의하며,
AI 및 신규 개발자가 동일한 설계 의도로 확장하도록 보장하는 것을 목적으로 한다.

⚠️ 본 문서는 실제 코드 상태 + 설계 의도 + 확장 방향과 항상 일치해야 한다.
코드 변경 시 문서 갱신은 선택이 아니라 필수이다.

1. Core Stack

Vue 3 (Composition API)

Vite

Pinia

Supabase (Auth / RPC / RLS)

TypeScript

Tailwind CSS

i18n (vue-i18n, locale prefix routing)

2. Directory Structure (Actual)

본 트리 구조는 현재 BoardWiki Web Frontend의 실제 코드 구조이며,
본 문서의 모든 Architectural / Canonical Rule은
아래 구조를 기준으로 정의된다.

src/
│  App.vue
│  env.d.ts
│  main.ts
│  supabase.ts
│
├─api
│  │  _withBoot.ts
│  └─supabase
│      adminRoleMember.ts
│      auth.ts
│      event.ts
│      eventPublic.ts
│      eventPublicRegistration.ts
│      eventRegistration.ts
│      permission.ts
│      profile.ts
│      roleGrant.ts
│      terms.ts
│      uploadEventThumbnail.ts
│
├─assets
├─components
├─constants
├─locales
├─plugins
├─router
├─stores
├─types
└─views


디렉토리 상세 구조는 설계의 일부이며 임의 변경을 허용하지 않는다.

3. Architectural Principles
API Layer

Supabase SDK 직접 호출은 api/supabase/* 에서만 허용

Store / View 에서 Supabase SDK 직접 접근 ❌

API 함수는 의미 단위로 분리

DB Row ↔ Policy Type 변환 책임은 API Layer 단독

Store Responsibility

Store는 상태(state) + 흐름 제어(flow)만 담당

DB 구조 / 네트워크 구현 / Row 타입 인식 ❌

단일 진실(Source of Truth)은 Supabase session

View Responsibility

View는 정책 타입(Policy Type) 만 사용

DB 컬럼명 / snake_case / Row 구조 인식 ❌

4. Type Separation Policy (🔥 핵심)
1️⃣ DB Layer — types/db/*

Supabase 테이블 구조 그대로 표현

snake_case 유지

Row / Insert / Update 기준 타입

❌ View / Store에서 직접 사용 금지

2️⃣ Domain / Policy Layer — types/event/*, types/member/*

UI / Store / 비즈니스 로직 기준 타입

admin / public / payload 명확히 분리

DB Row 타입 직접 의존 ❌

3️⃣ View Layer

Admin View → Admin 정책 타입만 사용

User View → User / Member 정책 타입만 사용

DB 구조 인식 ❌

5. Constants Policy

문자열 / 숫자 하드코딩 ❌

상태값, visibility, role, permission은 constants로 관리

UI / Store / API 전 영역에서 동일 상수 참조

6. i18n Policy

화면 출력 문자열은 locales/* 에서만 관리

컴포넌트 내 문자열 하드코딩 ❌

공통 → common.json

기능별 → admin.json / user.json

7. Authentication & Authorization Flow (🔥)
Auth Store 단일 책임 원칙

세션 관리의 단일 진실은 Supabase session

access_token을 Store state로 직접 관리 ❌

session.access_token 은 getter로만 파생 사용

Flow
1. 앱 부팅 → authStore.initAuth()
2. Supabase session 조회
3. 로그인 상태 시 permission RPC 호출
4. onAuthStateChange 로 상태 동기화
5. router guard 에서 auth / permission 검사

8. Session Refresh & Recovery Policy

refresh는 authStore.ensureValidSession() 단독 책임

axios / View / 기타 레이어에서 refresh 시도 ❌

refresh 실패 시 logout ❌ → window.reload() ✅

Idle / Sleep Recovery

visibilitychange 이벤트에서 ensureValidSession 호출

실패 시 강제 reload 로 좀비 세션 복구

9. Axios Policy (🔥 중요)

axios는 Supabase 인증 / refresh 책임 ❌

토큰 소비자 역할만 수행

401 응답 시 → window.reload()

auth store 상태 직접 수정 ❌

10. _withBoot Execution Boundary (🔥 핵심)

_withBoot 는 API Layer 전용 표준 실행 래퍼이다.

Boot UI 시작 / 종료

API 호출 timeout 보호

예외 발생 시 UX 복구

API 실행 경계 제공

Timeout

기본: 8초

대용량 작업: 최대 60초

View / Store 는 성공 / 실패만 판단한다.

11. Admin UI & Responsive Policy

Desktop-first

모바일은 기능 제거 ❌ → 표현 방식 변경

모든 관리 기능은 모바일에서도 접근 가능

Table Handling

Desktop: table 유지

Mobile: table ❌ → card / list 전환

overflow-x-auto ❌

12. Profile & Member Architecture (🔥 Canonical)

auth.users : 인증 전용

public.profile : 서비스 정책 데이터

Contact

contact_email

contact_phone_country

contact_phone

📌 Auth email ≠ Contact email
Auth email 을 profile 에 복사·고정 ❌

13. Canonical Rule Reminder (🔥 최종 규칙)

Supabase SDK는 api/supabase/* 외부 사용 ❌

types/db/* 타입을 View / Store 로 전달 ❌

Store는 흐름만, View는 정책만 책임

DB 구조 인식은 API Layer에서만 허용

14. Event Public Registration Architecture (🔥 Canonical)
핵심 원칙

신청 로직은 RPC 단일 진입점 (apply_event)

신청 가능 여부 / 중복 / 기간 검증은 DB에서만 판단

View는 판단 ❌, 결과 해석만 수행

User 조회는 View Table 기반

상세는 페이지 이동 ❌ → Global Modal (useModal)

(이하 14-1 ~ 14-6 구조 및 책임은 원문 내용 그대로 유지)

15. Backend Architecture (Supabase Canonical)

BoardWiki의 Backend는 전통적인 API 서버가 아닌
Supabase(PostgreSQL + Auth + RLS + RPC) 를 중심으로 구성된다.

Backend는 데이터의 진실(Source of Truth)

Frontend는 Backend 판단을 재현하지 않는다

검증 / 권한 / 상태 판단은 항상 DB에서 수행

16. Backend Responsibility Model
Database Layer

PostgreSQL (Supabase)

모든 영속 데이터의 단일 진실

상태 / 기간 / 권한 판단의 최종 주체

RLS

auth.uid() 기반 스코프 강제

Frontend 신뢰 여부와 무관하게 항상 적용

View (Read Model)

사용자 / 공개 / 관리자 조회는 View Table 기반

Frontend는 View를 API 결과처럼 사용

RPC (Write Model)

쓰기/행동은 RPC 단일 진입점

검증 / 상태 변경 / 트랜잭션 담당

17. Relationship with AI Canonicals

본 README는 다음 Canonical과 함께 사용된다.

AI_SUPABASE_CANONICAL.txt
→ 데이터 / 권한 / DB 판단 기준

AI_FRONTEND_CANONICAL.txt
→ UI / Route / State 판단 기준

AI_MASTER_GUIDE.txt
→ AI 추론 규칙 요약 헌법

📌 README는 사람 + AI 공용 설계 문서이다.

✅ 마지막 한 줄

이 문서는 BoardWiki Web Application의 헌법이며,
사람과 AI 모두를 위한 기준점이다.