---
# You can also start simply with 'default'
theme: dracula
# some information about your slides (markdown enabled)
title: Effect
# apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
monacoRunAdditionalDeps:
  - './global'
  - 'effect'
  - '@effect/platform'
  - '@effect/platform-browser'
---

## TypeScript en producción con

<h1>
  <img src="/effect-logo.svg" alt="Effect" style="display: inline; width: 200px;"/>
</h1>

<v-click>

#### **Menos convenciones, más expresiones.**

</v-click>

<br />
<br />

Montevideo JavaScript Meetup - Noviembre 2025

> Juan Seveso - Joaquín Gatica

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    <carbon:arrow-right class="inline"/>
  </span>
</div>

---
src: ./pages/1.intro.md
---

---
src: ./pages/2.contents.md
---

---
src: ./pages/3.demo.md
---

---
src: ./pages/4.conclusion.md
---
