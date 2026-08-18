document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

async function fetchProducts() {
  const productGrid = document.getElementById("productGrid");

  try {
    // API 엔드포인트는 백엔드 서버 명세서에 맞게 변경하세요.
    const response = await fetch(
      "http://teacherdev09.kro.kr:10002/api/products",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    if (response.ok) {
      // API 응답 구조에 맞게 수정 (예: data.products 또는 data)
      const products = data.products || data;

      if (!products || products.length === 0) {
        productGrid.innerHTML = "<p>등록된 상품이 없습니다.</p>";
        return;
      }

      // 상품 목록 HTML 그리기
      productGrid.innerHTML = products
        .map(
          (product) => `
        <div class="product-card" onclick="goToDetail(${product.id})">
          <img src="${product.imageUrl || "https://via.placeholder.com/150"}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p class="price">${Number(product.price).toLocaleString()}원</p>
          <p class="desc">${product.description || ""}</p>
        </div>
      `,
        )
        .join("");
    } else {
      productGrid.innerHTML = "<p>상품 목록을 불러오는 데 실패했습니다.</p>";
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    productGrid.innerHTML = "<p>서버 통신 오류가 발생했습니다.</p>";
  }
}

// 상품 클릭 시 상세 페이지로 이동
function goToDetail(productId) {
  location.href = `product-detail.html?id=${productId}`;
}
