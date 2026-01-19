import {ref, watch, computed, nextTick} from "vue"
import type {Component, Ref} from "vue"

export interface ModalOptions {
  show?: boolean
  title?: string
  message?: string
  contentComponent?: any
  contentComponentProps?: Record<string, any>
  contentComponentEmits?: Record<string, any>
  type?: string
  roundBtn?: boolean

  showConfirm?: boolean
  showCancel?: boolean
  showDelete?: boolean

  confirmText?: string
  cancelText?: string
  deleteText?: string

  confirmCallback?: ((contentRef?: any) => void | boolean | Promise<void | boolean>) | null
  cancelCallback?: ((contentRef?: any) => void | boolean | Promise<void | boolean>) | null
  deleteCallback?: ((contentRef?: any) => void | boolean | Promise<void | boolean>) | null

  handleCancel?: ((modal: Modal) => void) | null
  confirmDisabled?: boolean

  closeBtn?: boolean
  backBtn?: boolean
  closeReason?: string | null

  onContentMounted?: ((contentRef?: any) => void) | null

  // background 클릭 닫힘 여부
  isCloseBg?: boolean
  [key: string]: any
}

export interface Modal extends ModalOptions {
  id: number
  show: boolean
  closeReason: string | null
  contentRef: any
}

const modalStack: Ref<Modal[]> = ref([])
let scrollY = 0

watch(
  () => modalStack.value.length,
  async (newLen, oldLen) => {
    // ✅ oldLen 인자를 받아서 이전 상태를 체크합니다.
    if (typeof window === "undefined") return

    await nextTick()

    const appEl = document.getElementById("app")
    if (!appEl) {
      console.warn("#app not found")
      return
    }

    // --- 스크롤 잠금 로직 ---
    if (newLen > 0 && oldLen === 0) {
      scrollY = window.scrollY || window.pageYOffset
      appEl.style.top = `-${scrollY}px`
      appEl.classList.add("open")

      document.body.style.overflow = "hidden"

      // console.log("✅ 스크롤 저장 및 잠금: .open 추가됨", scrollY)
    }

    // --- 스크롤 복원 로직 ---
    else if (newLen === 0 && oldLen === 1) {
      appEl.classList.remove("open")
      appEl.style.top = ""
      document.body.style.overflow = ""

      window.scrollTo(0, scrollY)
      // scrollY = 0; // 필요하다면 초기화
    }
  },
  {flush: "post"}
)

export function useModal() {
  const defaultModalOptions = (): ModalOptions => ({
    show: false,
    title: "",
    message: "",
    contentComponent: null,
    contentComponentProps: {},
    contentComponentEmits: {},
    type: "alert",
    roundBtn: true,

    showConfirm: true,
    showCancel: false,
    showDelete: false,

    confirmText: "확인",
    cancelText: "취소",
    deleteText: "삭제",

    confirmCallback: null,
    cancelCallback: null,
    deleteCallback: null,

    handleCancel: null,
    confirmDisabled: false,

    closeBtn: true,
    backBtn: false,
    closeReason: null,

    onContentMounted: null,

    // background 클릭 닫힘 여부
    isCloseBg: true,
  })

  const showModal = (modalData: ModalOptions): number => {
    const modalId = Date.now() + Math.random()
    modalStack.value.push({
      id: modalId,
      ...defaultModalOptions(),
      ...modalData,
      show: true,
      closeReason: null,
      contentRef: null,
    } as Modal)

    return modalId
  }

  const closeModal = (id?: number) => {
    if (id) {
      modalStack.value = modalStack.value.filter((m) => m.id !== id)
    } else {
      modalStack.value.pop()
    }
  }

  const removeModal = (id: number) => {
    modalStack.value = modalStack.value.filter((m) => m.id !== id)
  }

  const topModal = computed(() => modalStack.value[modalStack.value.length - 1])

  const handleCancel = async (modal: Modal) => {
    modal.closeReason = "cancel"
    if (modal?.cancelCallback) {
      const result = await modal.cancelCallback(modal.contentRef)
      if (result === false) return
    }
    closeModal(modal.id)
  }

  const closeAllModals = () => {
    modalStack.value = []
  }

  // ✅ 외부에서 contentRef만 안전하게 가져갈 수 있는 헬퍼
  const getTopModalRef = () => topModal.value?.contentRef || null

  return {
    // 모달 상태 객체
    showModal,
    closeModal,
    topModal,
    getTopModalRef,
    handleCancel,
    removeModal,
    modalStack,
    closeAllModals,
  }
}
