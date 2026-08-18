const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedPanelId = tab.getAttribute("aria-controls");
    tabs.forEach((item) => {
      const isSelected = item === tab;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-selected", String(isSelected));
    });
    panels.forEach((panel) => { panel.hidden = panel.id !== selectedPanelId; });
  });
});

document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.previousElementSibling;
    const shouldShow = input.type === "password";
    input.type = shouldShow ? "text" : "password";
    button.textContent = shouldShow ? "숨김" : "보기";
    button.setAttribute("aria-label", shouldShow ? "비밀번호 숨기기" : "비밀번호 표시");
  });
});

document.querySelectorAll(".auth-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    form.querySelector(".form-message").textContent = form.id === "login-panel" ? "로그인 요청이 확인되었습니다." : "회원가입 요청이 확인되었습니다.";
  });
});

