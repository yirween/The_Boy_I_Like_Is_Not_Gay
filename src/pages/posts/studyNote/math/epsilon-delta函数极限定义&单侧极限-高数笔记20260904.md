---
layout: ../../../../layouts/MarkdownPostLayout.astro
title: 'epsilon-delta函数极限定义&单侧极限-高数笔记20260904'
author: 'yirween'
description: "关于epsilon-delta函数极限和单侧极限的课堂笔记"
# image:
#   url: 
#   alt: 
pubDate: 2026-09-04
tags: ["笔记", "高数", "极限", "函数"]
---

# $\varepsilon-\delta$函数极限定义

$$
    \forall \varepsilon > 0 , \exists\delta(\varepsilon),\text{使得 当} 0 < | x - x_{0} | < \delta \text{时, 有} | f(x) - A | < \varepsilon
$$

## eg.证明$\lim\limits_{x \to 0} \cos x = 1$
**分析**：<br />
$\quad\quad  \forall \varepsilon > 0$, 欲使$| \cos x - 1 | < \varepsilon$<br />
$\quad\quad  $只需$|\cos x  -1 | = |-2 \sin^{2}\frac{x}{2} | \le |2 \cdot \frac{x^2}{2}| = x^{2} < \varepsilon$<br />
$\quad\quad  |x| < \sqrt{\varepsilon}$

**证明**: <br />
$\quad\quad  \forall\varepsilon > 0$, $\exists\delta = \sqrt{\varepsilon}$<br />
$\quad\quad  $对于$\forall x$, 当$0 < |x| < \delta = \sqrt{\varepsilon}$时<br />
$\quad\quad  $有$|\cos x - 1| = |-2 \sin \frac{x^2}{2}| = |2 \sin \frac{x^2}{2}| < x^{2} = \varepsilon$<br />
$\quad\quad  $...