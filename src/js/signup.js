document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const bodyData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  try {
    const res = await fetch(
      "http://teacherdev09.kro.kr:10002/api/users/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      },
    );
    const data = await res.json();

    if (res.ok) {
      alert("회원가입이 완료되었습니다!");
      location.href = "index.html"; // 로그인 페이지로 이동
    } else {
      alert(data.message || "회원가입 실패");
    }
  } catch (err) {
    console.error(err);
  }
});
