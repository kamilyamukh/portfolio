export const TYPER_STATES = ["pill", "highlight", "outline", "plain"];

export class Typer {
  constructor(el, options = {}) {
    this.el = el;
    this.states = options.states || TYPER_STATES;
    this.stateDuration = options.stateDuration ?? 70;
    this.stagger = options.stagger ?? 35;
  }

  in(text) {
    return new Promise((resolve) => {
      this.el.textContent = "";
      const chars = [...text].map((ch) => {
        const span = document.createElement("span");
        span.className = "typer-char";
        span.textContent = ch === " " ? " " : ch;
        this.el.appendChild(span);
        return span;
      });

      if (chars.length === 0) {
        resolve();
        return;
      }

      let remaining = chars.length;
      chars.forEach((span, i) => {
        const startDelay = i * this.stagger;
        this.states.forEach((state, si) => {
          window.setTimeout(() => {
            span.className = `typer-char typer-char--${state}`;
          }, startDelay + si * this.stateDuration);
        });
        const finishDelay = startDelay + this.states.length * this.stateDuration;
        window.setTimeout(() => {
          remaining -= 1;
          if (remaining === 0) resolve();
        }, finishDelay);
      });
    });
  }

  clear() {
    this.el.textContent = "";
  }
}
