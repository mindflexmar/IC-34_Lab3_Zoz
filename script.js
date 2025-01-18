document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const modalName = document.getElementById("modal-name");
    const modalDescription = document.getElementById("modal-description");
    const modalPrice = document.getElementById("modal-price");
    const closeButton = document.querySelector(".close-button");
    const addToCartButton = document.getElementById("add-to-cart");

    const cartModal = document.getElementById("cart-modal");
    const cartList = document.querySelector("#cart-modal #cart-list");
    const totalPriceElement = document.getElementById("total-price");
    const cartCountElement = document.getElementById("cart-count");

    let cart = [];
    let totalPrice = 0;

    let selectedItem = null;

    // Відкриваємо модальне вікно товару
    document.querySelectorAll(".order-button").forEach((button) => {
        button.addEventListener("click", (event) => {
            const parent = event.target.closest(".pancake");
            selectedItem = {
                name: parent.dataset.name,
                price: parseFloat(parent.dataset.price),
                description: parent.dataset.description,
            };

            modalName.textContent = selectedItem.name;
            modalDescription.textContent = selectedItem.description;
            modalPrice.textContent = selectedItem.price;

            modal.style.display = "block";
        });
    });

    // Закрити модальне вікно
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
        if (event.target === cartModal) {
            cartModal.style.display = "none";
        }
    });

    // Додаємо товар до кошика
    addToCartButton.addEventListener("click", () => {
        if (selectedItem) {
            cart.push(selectedItem);
            totalPrice += selectedItem.price;

            // Оновлюємо кошик
            updateCart();

            modal.style.display = "none";
        }
    });

    // Оновлюємо відображення кошика
    function updateCart() {
        cartList.innerHTML = ""; // Очищаємо список

        cart.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${item.name} - ${item.price.toFixed(2)} грн`;
            cartList.appendChild(listItem);
        });

        // Оновлюємо загальну суму і кількість товарів
        totalPriceElement.textContent = totalPrice.toFixed(2);
        cartCountElement.textContent = cart.length;

        console.log("Total Price:", totalPrice); // Лог для перевірки суми
    }

    // Відкриваємо/закриваємо кошик
    window.toggleCart = () => {
        cartModal.style.display = cartModal.style.display === "block" ? "none" : "block";
    };
});



