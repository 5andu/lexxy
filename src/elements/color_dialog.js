export class ColorDialog extends HTMLElement {
  connectedCallback() {
    this.dialog = this.querySelector("dialog")
    this.addEventListener("click", this.#handleColorButtonClick.bind(this))
    this.addEventListener("keydown", this.#handleKeyDown.bind(this))
  }

  show() {
    this.dialog.show()
  }

  close() {
    this.dialog.close()
  }

  #handleColorButtonClick(event) {
    let color = {}

    const button = event.target.closest("[data-color]")
    if (!button) return

    const buttonGroup = button.closest("[data-button-group]")
    if (!buttonGroup) return

    if (!button.hasAttribute("data-selected")) {
      buttonGroup.querySelectorAll("[data-selected]").forEach(button => {
        button.removeAttribute("data-selected")
      })

      button.setAttribute("data-selected", "true")
    } else {
      button.removeAttribute("data-selected")
    }

    const attribute = buttonGroup.dataset.buttonGroup === "color" ? "color" : "background-color"
    const value = buttonGroup.querySelector("[data-selected]")?.dataset.color

    color = { [attribute]: value }

    this.#editor.dispatchCommand("highlight", color)
    this.close()
  }

  #handleKeyDown(event) {
    if (event.key === "Escape") {
      event.stopPropagation()
      this.close()
    }
  }

  get #editor() {
    return this.closest("lexxy-toolbar").editor
  }
}

// We should extend the native dialog and avoid the intermediary <dialog> but not
// supported by Safari yet: customElements.define("lexxy-color-dialog", ColorDialog, { extends: "dialog" })
customElements.define("lexxy-color-dialog", ColorDialog)
