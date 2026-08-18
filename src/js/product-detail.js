// URL 쿼리 스트링에서 상품 ID 추출 (?id=1)
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

document.addEventListener("DOMContentLoaded", () => {
  if (productId) {
    fetchProductDetail();
    fetchReviews();
  }
});

// A. 상품 상세 데이터 조회
async function fetchProductDetail() {
  try {
    const res = await fetch(
      `http://teacherdev09.kro.kr:10002/api/products/${productId}`,
    );
    const data = await res.json();
    const product = data.product || data;

    document.getElementById("title").innerText = product.name;
    document.getElementById("image").src = product.imageUrl || "";
    document.getElementById("price").innerText =
      `${Number(product.price).toLocaleString()}원`;
    document.getElementById("description").innerText = product.description;
  } catch (err) {
    console.error("상품 정보 로드 실패:", err);
  }
}

// B. 주문하기 기능
document.getElementById("orderBtn")?.addEventListener("click", async () => {
  const quantity = document.getElementById("quantity").value;

  try {
    // common.js에 만든 fetchWithAuth 공통 함수 활용 (토큰 자동 첨부)
    const res = await fetchWithAuth(
      "http://teacherdev09.kro.kr:10002/api/orders",
      {
        method: "POST",
        body: JSON.stringify({
          productId: productId,
          quantity: Number(quantity),
        }),
      },
    );
    const data = await res.json();

    if (res.ok) {
      alert("주문이 성공적으로 완료되었습니다!");
      location.href = "orders.html"; // 주문 내역 페이지로 이동
    } else {
      alert(data.message || "주문 실패");
    }
  } catch (err) {
    console.error("주문 에러:", err);
  }
});

// C. 리뷰 목록 조회
async function fetchReviews() {
  try {
    const res = await fetch(
      `http://teacherdev09.kro.kr:10002/api/products/${productId}/reviews`,
    );
    const data = await res.json();
    const reviews = data.reviews || data;

    const reviewList = document.getElementById("reviewList");
    if (!reviews || reviews.length === 0) {
      reviewList.innerHTML = "<p>작성된 리뷰가 없습니다.</p>";
      return;
    }

    reviewList.innerHTML = reviews
      .map(
        (r) => `
      <div style="border-bottom: 1px solid #ccc; padding: 5px 0;">
        <strong>${r.userName || "익명"}</strong>: ${r.content}
      </div>
    `,
      )
      .join("");
  } catch (err) {
    console.error("리뷰 로드 실패:", err);
  }
}

// D. 리뷰 작성 제출
document.getElementById("reviewForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const content = document.getElementById("reviewContent").value;

  try {
    const res = await fetchWithAuth(
      `http://teacherdev09.kro.kr:10002/api/products/${productId}/reviews`,
      {
        method: "POST",
        body: JSON.stringify({ content }),
      },
    );

    if (res.ok) {
      alert("리뷰가 등록되었습니다!");
      document.getElementById("reviewContent").value = "";
      fetchReviews(); // 리뷰 목록 새로고침
    } else {
      alert("리뷰 등록 실패");
    }
  } catch (err) {
    console.error("리뷰 등록 에러:", err);
  }
});
