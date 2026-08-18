document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // 기본 폼 제출(페이지 리로드) 방지

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        // API 요청 (서버 URL 및 엔드포인트는 실제 설정에 맞게 변경)
        const response = await fetch(
          "http://teacherdev09.kro.kr:10002/api/users/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          },
        );

        const data = await response.json();

        if (response.ok) {
          alert("로그인 성공!");

          // Access Token을 로컬 스토리지에 저장 (이후 인증 요청에 사용)
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
          }

          // 로그인 성공 후 메인 페이지로 이동
          location.href = "index.html";
        } else {
          // 서버에서 에러 응답을 전달한 경우
          alert(data.message || "로그인에 실패했습니다.");
        }
      } catch (error) {
        console.error("Network Error:", error);
        alert("서버와 통신 중 오류가 발생했습니다.");
      }
    });
  }
});

// 공통 함수: 인증 헤더가 필요한 API 요청 시 사용
async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  return fetch(url, { ...options, headers });
}
