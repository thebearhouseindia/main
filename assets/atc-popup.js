class AtcPopup extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.querySelectorAll(".mb_variant-item.available").forEach((item) => {
      item.addEventListener("click", () => this.handleAddToCart(item));
    });
  }

  handleAddToCart(item) {
    const variantId = item.dataset.variantId;

    if (!variantId) return;

    fetch("/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: variantId, quantity: 1 }),
    })
      .then((response) => response.json())
      .then((data) => {
        document.dispatchEvent(new Event("closeVariantPopup"));
        document.dispatchEvent(
          new CustomEvent("ajaxProduct:added", { detail: data })
        );
        this.showNotification();
        document.dispatchEvent(new Event("cart:close"));
      })
      .catch((error) => console.error("Error adding to cart:", error));
  }

  showNotification() {
    const notificationEle = document.createElement("div");
    notificationEle.innerHTML = `<svg fill="#fff" width="24" height="24" role="img" aria-hidden="true" class="Icon_icon-content-1__kPDLF AdditionalInfo_icon__9Gliw" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 24 24"><path d="m9 19.707-5.854-5.853.708-.708L9 18.293 20.146 7.146l.708.708z"></path></svg> Item added to shopping bag`;

    // Apply styles
    Object.assign(notificationEle.style, {
      position: "fixed",
      top: "20px",
      right: "-300px",
      background: "#111111",
      color: "#fff",
      padding: "12px 10px",
      transition: "right 0.5s ease-in-out",
      zIndex: "9999",
      width: "80%",
      maxWidth: "350px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    });

    document.body.appendChild(notificationEle);

    // Animate in
    setTimeout(() => {
      notificationEle.style.right = "20px";
    }, 100);

    // Auto-remove after 2 seconds
    setTimeout(() => {
      notificationEle.style.right = "-300px";
      setTimeout(() => notificationEle.remove(), 500);
    }, 2000);
  }
}

customElements.define("atc-popup", AtcPopup);

class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.opener = this.querySelector("atc-opener");
    this.popup = this.querySelector("atc-popup");
    this.overlay = this.querySelector(".variant-popup-overlay");
    this.bnNav = document.querySelector(".bn_container");
    this.headerNav = document.querySelector(".header-sticky-wrapper");
  }

  connectedCallback() {
    this.attachEventListeners();
    document.addEventListener("closeVariantPopup", () =>
      this.handleOutsideClick({ target: document.body })
    );
  }

  attachEventListeners() {
    this.opener.addEventListener("click", () => this.togglePopup());
    this.overlay.addEventListener("click", (event) =>
      this.handleOutsideClick(event)
    );
  }

  togglePopup() {
    if (this.popup) {
      this.popup.classList.toggle("open");
      this.overlay?.classList.toggle(
        "hide",
        !this.popup.classList.contains("open")
      );
      this.bnNav?.classList.toggle(
        "hide",
        this.popup.classList.contains("open")
      );
      this.headerNav?.classList.toggle(
        "z_i-0",
        this.popup.classList.contains("open")
      );
      document.body.style.overflow = this.popup.classList.contains("open")
        ? "hidden"
        : "";
    }
  }

  handleOutsideClick(event) {
    if (this.popup && !this.popup.contains(event.target)) {
      this.popup.classList.remove("open");
      this.overlay?.classList.add("hide");
      this.bnNav?.classList.remove("hide");
      this.headerNav?.classList.remove("z_i-0");
      document.body.style.overflow = "";
    }
  }
}

customElements.define("product-card", ProductCard);
