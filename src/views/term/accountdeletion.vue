<script lang="ts" setup>
</script>

<template>
  <div class="term">
    <h2>회원탈퇴 및 계정 삭제 안내</h2>

    <p>오보타(Ovota)는 이용자가 언제든지 자신의 계정을 삭제할 수 있도록 합니다. 탈퇴 시, 아래 정보가 영구적으로 삭제됩니다:</p>
    <ul>
      <li>회원 프로필 및 로그인 정보</li>
      <li>스팟 기록 및 즐겨찾기 내역</li>
      <li>기타 서비스 이용 중 생성된 데이터</li>
    </ul>

    <p>회원탈퇴는 아래의 경로를 통해 진행할 수 있습니다.</p>
    <ol>
      <li>오보타 앱 실행</li>
      <li>마이페이지 > 설정(⚙️)</li>
      <li>회원탈퇴 메뉴 선택 후, 안내 확인 및 '탈퇴하기' 버튼 누르기</li>
    </ol>

    <p>탈퇴 후에는 해당 계정과 관련된 모든 데이터가 즉시 삭제되며, 복구할 수 없습니다.</p>
    <p>계정 삭제에 어려움이 있을 경우 아래 연락처로 문의해 주세요.</p>

    <h3>사업자 정보</h3>
    <ul>
      <li><strong>서비스 제공자:</strong> 보드위키</li>
      <li><strong>연락처:</strong> 010-3436-3622</li>
      <li><strong>이메일:</strong> board.wiki.korea@gmail.com</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.term {
  word-wrap: break-word;
  padding: 40px 20px;

  > * {
    line-height: 1.6;
  }

  p {
    font-size: 1.2rem;
  }

  h2 {
    font-size: 2rem;
    padding: 20px 0;
  }

  h3 {
    font-size: 1.6rem;
    padding: 20px 0;
  }

  ul,
  ol {
    padding-left: 1.2rem;
    font-size: 1.2rem;
    margin: 10px 0;
  }

  li {
    margin-bottom: 0.5rem;
  }
}
</style>
