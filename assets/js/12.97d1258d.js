(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{429:function(t,a,s){t.exports=s.p+"assets/img/composite-overlap.d7381e50.png"},430:function(t,a,s){t.exports=s.p+"assets/img/composite-overlap2.437338b2.png"},431:function(t,a,s){t.exports=s.p+"assets/img/composite-overlap3.b496e67d.png"},432:function(t,a,s){t.exports=s.p+"assets/img/layer-border.8dcad124.png"},529:function(t,a,s){"use strict";s.r(a);var e=s(65),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"合成层详解"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#合成层详解"}},[t._v("#")]),t._v(" 合成层详解")]),t._v(" "),e("p",[t._v("在"),e("RouterLink",{attrs:{to:"/blog/broswer/render-mechanism.html#_5-分层布局树-生成layer-tree"}},[t._v("浏览器渲染原理")]),t._v("一文中已经讲过"),e("code",[t._v("渲染层")]),t._v("的概念，在此就不多做赘述。下面我们说下 合成层概念、提升规则、工作原理，优化以及调试手段等。")],1),t._v(" "),e("h2",{attrs:{id:"为什么需要graphicslayer"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#为什么需要graphicslayer"}},[t._v("#")]),t._v(" 为什么需要GraphicsLayer？")]),t._v(" "),e("p",[t._v("层叠上下文、半透明、mask等等问题通过RenderLayer解决了。但是浏览器里面经常有动画、video、canvas、3d的css等东西。这意味着页面在有这些元素时，页面显示会经常变动，也就意味着位图会经常变动。每秒60帧的动效里，每次变动都重绘整个位图是很恐怖的性能开销。")]),t._v(" "),e("p",[t._v("因此浏览器为了优化这一过程。引出了"),e("code",[t._v("GraphicsLayers")]),t._v("和"),e("code",[t._v("GraphicsContext")]),t._v("。")]),t._v(" "),e("h2",{attrs:{id:"概念"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#概念"}},[t._v("#")]),t._v(" 概念")]),t._v(" "),e("blockquote",[e("p",[t._v("PS: Chrome修改了 “Blink引擎” 的一些实现，某些我们之前熟知的类名有了变化，比如 RenderObject 变成了 LayoutObject，RenderLayer 变成了 PaintLayer（感兴趣可以查看"),e("a",{attrs:{href:"https://www.chromium.org/blink/slimming-paint",target:"_blank",rel:"noopener noreferrer"}},[t._v("Slimming Paint"),e("OutboundLink")],1),t._v("）。后续文案我们还是依然使用原来的命名进行书写。")])]),t._v(" "),e("p",[t._v("某些特殊的渲染层会被认为是合成层（Compositing Layers），合成层拥有单独的 GraphicsLayer，而其他不是合成层的渲染层，则和其第一个拥有 GraphicsLayer 父层公用一个。")]),t._v(" "),e("p",[t._v("每个 GraphicsLayer 都有一个 "),e("code",[t._v("GraphicsContext")]),t._v("，GraphicsContext 负责输出该层的位图（GraphicsContext将"),e("code",[t._v("RGB图像")]),t._v("，"),e("code",[t._v("GMYK图像")]),t._v(" 或者 "),e("code",[t._v("黑白图像")]),t._v("绘制到一个位图对象中），位图是存储在共享内存中，作为纹理上传到 GPU 中，最后由 GPU 将多层位图进行合成，然后 draw 到屏幕上，此时，我们的页面也就展现到了屏幕上。")]),t._v(" "),e("h2",{attrs:{id:"合成层提升规则"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#合成层提升规则"}},[t._v("#")]),t._v(" 合成层提升规则")]),t._v(" "),e("p",[t._v("渲染层提升为合成层有一个先决条件，该渲染层必须是 SelfPaintingLayer（基本可认为是"),e("RouterLink",{attrs:{to:"/blog/broswer/render-mechanism.html#_5-分层布局树-生成layer-tree"}},[t._v("浏览器渲染原理")]),t._v("一文中提到的 NormalPaintLayer）。以下所讨论的渲染层提升为合成层的情况都是在该渲染层为 SelfPaintingLayer 前提下的。")],1),t._v(" "),e("p",[t._v("一旦一个元素提升为了合成层就会有自己的绘图上下文，可以独立于普通文档流中，改动后可以避免整个页面重绘，提升性能：")]),t._v(" "),e("ul",[e("li",[t._v("当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层")]),t._v(" "),e("li",[t._v("对于 transform 和 opacity 效果，不会触发 layout 和 paint")])]),t._v(" "),e("h3",{attrs:{id:"直接原因-direct-reason"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#直接原因-direct-reason"}},[t._v("#")]),t._v(" 直接原因（direct reason）")]),t._v(" "),e("ul",[e("li",[t._v("硬件加速的 iframe 元素（比如 iframe 嵌入的页面中有合成层）")]),t._v(" "),e("li",[t._v("使用加速视频解码的 video 元素")]),t._v(" "),e("li",[t._v("覆盖在 video 元素上的视频控制栏")]),t._v(" "),e("li",[t._v("拥有 3D（WebGL）上下文或硬件加速的 2D 上下文的 canvas 元素")]),t._v(" "),e("li",[t._v("硬件加速的插件，比如 flash 等")]),t._v(" "),e("li",[t._v("在 DPI 较高的屏幕上，fix 定位的元素会自动地被提升到合成层中。但在 DPI 较低的设备上却并非如此，因为这个渲染层的提升会使得字体渲染方式由子像素变为灰阶 "),e("RouterLink",{attrs:{to:"/demo/fixed-transform.html"}},[t._v("demo")])],1),t._v(" "),e("li",[t._v("3D 或透视变换(perspective transform) CSS 属性，如"),e("code",[t._v("transform: translateZ(0)")]),t._v(" 或 "),e("code",[t._v("transform: translate3d(10px,10px,10px)")])]),t._v(" "),e("li",[e("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/backface-visibility",target:"_blank",rel:"noopener noreferrer"}},[t._v("backface-visibility"),e("OutboundLink")],1),t._v(" 为 hidden")]),t._v(" "),e("li",[t._v("overflow 不为 visible。有需要剪裁(clip)的内容，当内容展示不下被隐藏或出现滚动条时，内容元素 和 滚动条 会提升成合成层")]),t._v(" "),e("li",[t._v("对 opacity、transform、fliter、backdropfilter 应用了 animation 或 transition（需要是 active 的 animation 或者 transition，当 animation 或者 transition 效果未开始或结束后，提升合成层也会失效）")]),t._v(" "),e("li",[e("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change",target:"_blank",rel:"noopener noreferrer"}},[t._v("will-change"),e("OutboundLink")],1),t._v(" 设置为 opacity、transform、top、left、bottom、right（其中 top、left 等需要设置明确的定位属性，如 relative 等）")])]),t._v(" "),e("h3",{attrs:{id:"后代元素原因"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#后代元素原因"}},[t._v("#")]),t._v(" 后代元素原因")]),t._v(" "),e("ul",[e("li",[t._v("有合成层后代同时本身有 transform、opactiy（小于 1）、mask、fliter、reflection 属性")]),t._v(" "),e("li",[t._v("有合成层后代同时本身 overflow 不为 visible（如果本身是因为明确的定位因素产生的 SelfPaintingLayer，则需要 z-index 不为 auto）")]),t._v(" "),e("li",[t._v("有合成层后代同时本身 fixed 定位")]),t._v(" "),e("li",[t._v("有 3D transfrom 的合成层后代同时本身有 preserves-3d 属性")]),t._v(" "),e("li",[t._v("有 3D transfrom 的合成层后代同时本身有 perspective")])]),t._v(" "),e("h3",{attrs:{id:"overlap-重叠原因"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#overlap-重叠原因"}},[t._v("#")]),t._v(" overlap 重叠原因")]),t._v(" "),e("p",[t._v("元素有一个兄弟元素在合成层渲染，并且该兄弟元素的 z-index 较小，那这个元素也会被提升到合成层。")]),t._v(" "),e("h4",{attrs:{id:"如何算是重叠"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#如何算是重叠"}},[t._v("#")]),t._v(" 如何算是重叠？")]),t._v(" "),e("p",[t._v("那如何算是重叠呢，最常见和容易理解的就是 "),e("em",[e("strong",[t._v("元素的 border-box（content+padding+border）和合成层的有重叠")])]),t._v("，当然 margin area 的重叠是无效的。")]),t._v(" "),e("p",[t._v("其他的还有一些不常见的情况，也算是同合成层重叠的条件，如下：")]),t._v(" "),e("ul",[e("li",[t._v("filter 效果同合成层重叠")]),t._v(" "),e("li",[t._v("transform 变换后同合成层重叠")]),t._v(" "),e("li",[t._v("overflow scroll 情况下同合成层重叠。即如果一个 overflow scroll（不管 overflow:auto 还是 overflow:scroll，只要是能 scroll 即可） 的元素同一个合成层重叠，则其可视子元素也同该合成层重叠")])]),t._v(" "),e("h4",{attrs:{id:"为什么会因为重叠原因而产生合成层呢"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#为什么会因为重叠原因而产生合成层呢"}},[t._v("#")]),t._v(" 为什么会因为重叠原因而产生合成层呢？")]),t._v(" "),e("p",[e("img",{attrs:{src:s(429),alt:"重叠"}}),t._v("\n蓝色的矩形重叠在绿色矩形之上，同时它们的父元素是一个 GraphicsLayer。此时假设绿色矩形为一个 GraphicsLayer，如果 overlap 无法提升合成层的话，那么蓝色矩形不会提升为合成层，也就会和父元素公用一个 GraphicsLayer。\n"),e("img",{attrs:{src:s(430),alt:"重叠"}}),t._v("\n此时，渲染顺序就会发生错误，因此为保证渲染顺序，overlap 也成为了合成层产生的原因，也就是如下的正常情形。\n"),e("img",{attrs:{src:s(431),alt:"重叠"}})]),t._v(" "),e("h2",{attrs:{id:"合成层调试"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#合成层调试"}},[t._v("#")]),t._v(" 合成层调试")]),t._v(" "),e("p",[t._v("使用 Chrome DevTools 工具，通过"),e("code",[t._v("More tools —> Layers")]),t._v("面板，勾选上”Paints“和”Slow scroll rects“可以查看网站具体是如何划分层的。\n"),e("img",{attrs:{src:s(432),alt:"合成层查看"}}),t._v("\n打开"),e("code",[t._v("More tools —> Rendering")]),t._v("面板，勾选上 "),e("code",[t._v("Layer borders")]),t._v("，页面上的合成层会用青色或黄色边框框出来。")]),t._v(" "),e("p",[t._v("有了这个视图，你就能知道页面中到底有多少个合成层，点击 “Layers -> Details -> Paint Profiler”，我们可以查看合成层的具体绘制步骤以及绘制时长。如果你在对页面滚动或渐变效果的性能分析中发现 Composite 过程耗费了太多时间，那么你可以从这个视图里看到页面中有多少个渲染层，它们为何被创建，从而对合成层的数量进行优化。")]),t._v(" "),e("h3",{attrs:{id:"compositing-reason-合成原因"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#compositing-reason-合成原因"}},[t._v("#")]),t._v(" Compositing Reason — 合成原因")]),t._v(" "),e("ul",[e("li",[t._v("n/a 表示在合成过程中没有特别需要说明或记录的步骤或原因。这种情况可能发生在以下情况下：\n"),e("ul",[e("li",[t._v("简单合成：当图像或视频的合成过程非常简单，没有需要特别解释的步骤或原因时，就会出现这种情况")]),t._v(" "),e("li",[t._v("没有特殊调整：有时，合成过程中可能不需要对图像或视频进行额外的调整或修饰，因此不会有特别的原因或步骤")]),t._v(" "),e("li",[t._v('不适用于特定情况：有时候，在记录合成过程中，可能会有某些步骤不适用于特定的情况，因此在那些步骤上可能会标记为 "n/a"')])])]),t._v(" "),e("li",[t._v("Has a 3d transform")]),t._v(" "),e("li",[t._v("Is an accelerated video")]),t._v(" "),e("li",[t._v("Is an accelerated canvas, or is a display list backed canvas that was promoted to a layer based on a performance heuristic.")]),t._v(" "),e("li",[t._v("Is an accelerated plugin")]),t._v(" "),e("li",[t._v("Is an accelerated iFrame")]),t._v(" "),e("li",[t._v("Is an accelerated SVG root")]),t._v(" "),e("li",[t._v("Has backface-visibility: hidden")]),t._v(" "),e("li",[t._v("Has an active accelerated transform animation or transition")]),t._v(" "),e("li",[t._v("Has an active accelerated opacity animation or transition")]),t._v(" "),e("li",[t._v("Has an active accelerated filter animation or transition")]),t._v(" "),e("li",[t._v("Has an active accelerated backdrop filter animation or transition")]),t._v(" "),e("li",[t._v("Is DOM overlay for WebXR immersive-ar mode")]),t._v(" "),e("li",[t._v("Is fixed or sticky position")]),t._v(" "),e("li",[t._v("Is a scrollable overflow element")]),t._v(" "),e("li",[t._v("Scroll parent is not an ancestor")]),t._v(" "),e("li",[t._v("Has clipping ancestor")]),t._v(" "),e("li",[t._v("Is overlay controls for video")]),t._v(" "),e("li",[t._v("Has a will-change: transform compositing hint")]),t._v(" "),e("li",[t._v("Has a will-change: opacity compositing hint")]),t._v(" "),e("li",[t._v("Has a will-change: filter compositing hint")]),t._v(" "),e("li",[t._v("Has a will-change: backdrop-filter compositing hint")]),t._v(" "),e("li",[t._v("Has a will-change compositing hint other than transform and opacity")]),t._v(" "),e("li",[t._v("Has a backdrop filter")]),t._v(" "),e("li",[t._v("Is a mask for backdrop filter")]),t._v(" "),e("li",[t._v("Is the document.rootScroller")]),t._v(" "),e("li",[t._v("Might overlap other composited content")]),t._v(" "),e("li",[t._v("Overlaps other composited content")]),t._v(" "),e("li",[t._v("Parent with composited negative z-index content")]),t._v(" "),e("li",[t._v("Layer was separately composited because it could not be squashed")]),t._v(" "),e("li",[t._v("Has opacity that needs to be applied by compositor because of composited descendants")]),t._v(" "),e("li",[t._v("Has a mask that needs to be known by compositor because of composited descendants")]),t._v(" "),e("li",[t._v("Has a reflection that needs to be known by compositor because of composited descendants")]),t._v(" "),e("li",[t._v("Has a filter effect that needs to be known by compositor because of composited descendants")]),t._v(" "),e("li",[t._v("Has a blending effect that needs to be known by compositor because of composited descendants")]),t._v(" "),e("li",[t._v("Has a perspective transform that needs to be known by compositor because of 3d descendants")]),t._v(" "),e("li",[t._v("Has a preserves-3d property that needs to be known by compositor because of 3d descendants")]),t._v(" "),e("li",[t._v("Should isolate descendants to apply a blend effect")]),t._v(" "),e("li",[t._v("Is a fullscreen video element with composited descendants")]),t._v(" "),e("li",[t._v("Is the root layer")]),t._v(" "),e("li",[t._v("Secondary layer, the horizontal scrollbar layer")]),t._v(" "),e("li",[t._v("Secondary layer, the vertical scrollbar layer")]),t._v(" "),e("li",[t._v("Secondary layer, the scroll corner layer")]),t._v(" "),e("li",[t._v("Secondary layer, to house contents that can be scrolled")]),t._v(" "),e("li",[t._v("Secondary layer, home for a group of squashable content")]),t._v(" "),e("li",[t._v("Secondary layer, to contain any normal flow and positive z-index contents on top of a negative z-index layer")]),t._v(" "),e("li",[t._v("Secondary layer, to contain the mask contents")]),t._v(" "),e("li",[t._v("Layer painted on top of other layers as decoration")]),t._v(" "),e("li",[t._v("Layer for link highlight, frame overlay, etc")]),t._v(" "),e("li",[t._v("Ancestor in same 3D rendering context has a hidden backface")])]),t._v(" "),e("h3",{attrs:{id:"层消耗内存"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#层消耗内存"}},[t._v("#")]),t._v(" 层消耗内存")]),t._v(" "),e("p",[t._v("层合成的过程会产生内存消耗，那么我们如何来评估层消耗的内存，下面举例来说明：")]),t._v(" "),e("div",{staticClass:"language-html extra-class"},[e("pre",{pre:!0,attrs:{class:"language-html"}},[e("code",[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("html")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("id")]),e("span",{pre:!0,attrs:{class:"token attr-value"}},[e("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("div1"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("id")]),e("span",{pre:!0,attrs:{class:"token attr-value"}},[e("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("div2"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("style")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),e("span",{pre:!0,attrs:{class:"token style"}},[e("span",{pre:!0,attrs:{class:"token language-css"}},[t._v("\n"),e("span",{pre:!0,attrs:{class:"token selector"}},[t._v("#div1, #div2")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v("will-change")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" transform"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token selector"}},[t._v("#div1")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v("width")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100px"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v("height")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100px"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v("background")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("rgba")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("255"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 0"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 0"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token selector"}},[t._v("#div2")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v("width")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 10px"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v("height")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 10px"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v("background")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("rgba")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("255"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 0"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 0"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v("will-change")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" transform"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v("transform")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("scale")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("10"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("style")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("html")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),e("p",[t._v("如上，我们创建了两个容器 div1 和 div2，div1 的物理尺寸是 "),e("code",[t._v("100×100px（100×100×3 = 30000 字节）")]),t._v("，而 div2 只有 "),e("code",[t._v("10×10px（10×10×3 = 300 字节）")]),t._v(" 但放大了 10 倍。 div2 由于存在 "),e("code",[t._v("will-change")]),t._v(" 属性，transform 动画将通过 GPU 来渲染图层。 我们通过图像的高度乘以图像的宽度来获得图像中像素的数量。然后，我们将其乘以3，因为每个像素都用三个字节（RGB）描述。那么不难理解，如果图像包含透明区域，我们要乘以4，因为需要额外的字节来描述透明度：（RGBA）：100×100×4 = 40000 字节。")]),t._v(" "),e("p",[t._v("所以，对于图片和纯色层元素，我们可以将图片或元素的尺寸减少到原始的5%——10%，然后使用scale将它们放大；用户不会看到什么区别，但是你可以减少资源请求耗时和大量的存储空间。")]),t._v(" "),e("h2",{attrs:{id:"层爆炸与层压缩"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#层爆炸与层压缩"}},[t._v("#")]),t._v(" 层爆炸与层压缩")]),t._v(" "),e("h3",{attrs:{id:"层压缩"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#层压缩"}},[t._v("#")]),t._v(" 层压缩")]),t._v(" "),e("p",[t._v("由于重叠的原因，可能随随便便就会产生出大量合成层来，而每个合成层都要消耗 CPU 和内存资源，岂不是严重影响页面性能。这一点浏览器也考虑到了，因此就有了"),e("code",[t._v("层压缩（Layer Squashing）")]),t._v("的处理。如果多个渲染层同一个合成层重叠时，这些渲染层会被压缩到一个 GraphicsLayer 中，以防止由于重叠原因导致可能出现的“层爆炸”。")]),t._v(" "),e("p",[t._v("浏览器的自动的层压缩也不是万能的，有很多特定情况下，浏览器是无法进行层压缩的。 如下所示，而这些情况也是我们应该尽量避免的：")]),t._v(" "),e("ul",[e("li",[t._v("无法进行会打破渲染顺序的压缩")]),t._v(" "),e("li",[t._v("video 元素的渲染层无法被压缩同时也无法将别的渲染层压缩到 video 所在的合成层上")]),t._v(" "),e("li",[t._v("iframe、plugin 的渲染层无法被压缩同时也无法将别的渲染层压缩到其所在的合成层上")]),t._v(" "),e("li",[t._v("无法压缩有 reflection 属性的渲染层（squashingReflectionDisallowed）")]),t._v(" "),e("li",[t._v("无法压缩有 blend mode 属性的渲染层（squashingBlendingDisallowed）")]),t._v(" "),e("li",[t._v("当渲染层同合成层有不同的裁剪容器（clipping container）时，该渲染层无法压缩（squashingClippingContainerMismatch）")]),t._v(" "),e("li",[t._v("相对于合成层滚动的渲染层无法被压缩（scrollsWithRespectToSquashingLayer）")]),t._v(" "),e("li",[t._v("当渲染层同合成层有不同的具有 opacity 的祖先层（一个设置了 opacity 且小于 1，一个没有设置 opacity，也算是不同）时，该渲染层无法压缩（squashingOpacityAncestorMismatch，同 squashingClippingContainerMismatch）")]),t._v(" "),e("li",[t._v("当渲染层同合成层有不同的具有 transform 的祖先层时，该渲染层无法压缩（squashingTransformAncestorMismatch，同上）")]),t._v(" "),e("li",[t._v("当渲染层同合成层有不同的具有 filter 的祖先层时，该渲染层无法压缩（squashingFilterAncestorMismatch，同上）")]),t._v(" "),e("li",[t._v("当覆盖的合成层正在运行动画时，该渲染层无法压缩（squashingLayerIsAnimating），当动画未开始或者运行完毕以后，该渲染层才可以被压缩")])]),t._v(" "),e("p",[t._v("如果多个渲染层同一个合成层重叠时，这些渲染层会被压缩到一个 GraphicsLayer 中，以防止由于重叠原因导致可能出现的“层爆炸”。")]),t._v(" "),e("h3",{attrs:{id:"层爆炸"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#层爆炸"}},[t._v("#")]),t._v(" 层爆炸")]),t._v(" "),e("p",[e("em",[e("strong",[t._v("层爆炸，指的是由于重叠而导致的大量额外 Composited Layer 的问题")])]),t._v("。通过之前的介绍，我们知道同合成层重叠也会使元素提升为合成层，虽然有浏览器的层压缩机制，但是也有很多无法进行压缩的情况。也就是说除了我们显式的声明的合成层，还可能由于重叠原因不经意间产生一些不在预期的合成层，极端一点可能会产生大量的额外合成层，出现层爆炸的现象。")]),t._v(" "),e("p",[t._v("解决层爆炸的问题，最佳方案是打破 overlap 的条件，也就是说让其他元素不要和合成层元素重叠，譬如巧妙的使用 "),e("code",[t._v("z-index")]),t._v(" 属性。")]),t._v(" "),e("h2",{attrs:{id:"性能优化"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#性能优化"}},[t._v("#")]),t._v(" 性能优化")]),t._v(" "),e("p",[t._v("提升为合成层简单说来有以下几点好处：")]),t._v(" "),e("ul",[e("li",[t._v("合成层的位图，会交由 GPU 合成，比 CPU 处理要快")]),t._v(" "),e("li",[t._v("当需要 repaint 时，只需要 repaint 自身合成层，不会影响到其他的合成层")]),t._v(" "),e("li",[t._v("对于 transform 和 opacity 效果，不会触发 layout 和 paint\n利用合成层对于提升页面性能方面有很大的作用，因此我们也总结了一下几点优化建议。")])]),t._v(" "),e("h3",{attrs:{id:"提升动画效果的元素"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#提升动画效果的元素"}},[t._v("#")]),t._v(" 提升动画效果的元素")]),t._v(" "),e("p",[t._v("提升合成层的最好方式是使用 CSS 的 will-change 属性。从合成层提升规则一节，可以知道 will-change 设置为 opacity、transform、top、left、bottom、right 可以将元素提升为合成层。")]),t._v(" "),e("div",{staticClass:"language-css extra-class"},[e("pre",{pre:!0,attrs:{class:"language-css"}},[e("code",[e("span",{pre:!0,attrs:{class:"token selector"}},[t._v("div")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v("will-change")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" transform"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("但是兼容性不太好，对于那些目前还不支持 will-change 属性的浏览器，目前常用的是使用一个 3D transform 属性来强制提升为合成层：")]),t._v(" "),e("div",{staticClass:"language-css extra-class"},[e("pre",{pre:!0,attrs:{class:"language-css"}},[e("code",[e("span",{pre:!0,attrs:{class:"token selector"}},[t._v("div")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v("transform")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("translateZ")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("0"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("但需要注意的是，不要创建太多的渲染层。因为每创建一个新的渲染层，就意味着新的内存分配和更复杂的层管理。之后我们会详细讨论。")]),t._v(" "),e("p",[t._v("如果你已经把一个元素放到一个新的合成层里，那么可以使用 "),e("code",[t._v("Performance ——> Timeline")]),t._v(" 来确认这么做是否真的改进了渲染性能。别盲目提升合成层，一定要分析其实际性能表现。")]),t._v(" "),e("h3",{attrs:{id:"css3硬件加速"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#css3硬件加速"}},[t._v("#")]),t._v(" css3硬件加速")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("硬件加速")]),t._v(" "),e("p",[t._v("GPU（Graphics Processing Unit） 是图像处理器。GPU 硬件加速是指应用 GPU 的图形性能对浏览器中的一些图形操作交给 GPU 来完成，因为 GPU 是专门为处理图形而设计，所以它在速度和能耗上更有效率。 GPU 加速可以不仅应用于3D，而且也可以应用于2D。这里， GPU 加速通常包括以下几个部分：Canvas2D，布局合成（Layout Compositing）, CSS3转换（transitions），CSS3 3D变换（transforms），WebGL和视频(video)。")])]),t._v(" "),e("p",[t._v("使用css3硬件加速，可以让"),e("code",[t._v("transform")]),t._v("、"),e("code",[t._v("opacity")]),t._v("、"),e("code",[t._v("filters")]),t._v("这些动画不会引起重排和重绘。但是对于动画的其它属性，比如"),e("code",[t._v("background-color")]),t._v("这些，还是会引起重排和重绘的，不过它还是可以提升这些动画的性能。")]),t._v(" "),e("div",{staticClass:"language-css extra-class"},[e("pre",{pre:!0,attrs:{class:"language-css"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*\n * 根据上面的结论\n * 将 2d transform 换成 3d\n * 就可以强制开启 GPU 加速\n * 提高动画性能\n */")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token selector"}},[t._v("div")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* transform: translate(10px, 10px); */")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v("transform")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("translate3d")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("10px"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 10px"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 0"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("但是如果你为太多元素使用css3硬件加速，会导致内存占用较大，会有性能问题，我们应该避免引起隐式合成层的提升。另外在动画结束的时候得关闭硬件加速，不然会产生字体模糊（由于GPU和CPU的算法的不同，在GPU渲染字体会导致抗锯齿无效）。")]),t._v(" "),e("h3",{attrs:{id:"避免隐式合成"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#避免隐式合成"}},[t._v("#")]),t._v(" 避免隐式合成")]),t._v(" "),e("p",[t._v("保持动画的对象的z-index尽可能的高，这样可以尽量避免兄弟元素被隐式的提升成合成层。理想的，这些元素应该是body元素的直接子元素。当然，这不是总可能的。所以你可以克隆一个元素，把它放在body元素下仅仅是为了做动画。")]),t._v(" "),e("p",[t._v("将元素上设置will-change CSS属性，元素上有了这个属性，浏览器会提升这个元素成为一个复合层（不是总是）。这样动画就可以平滑的开始和结束。但是不要滥用这个属性，否则会大大增加内存消耗。")]),t._v(" "),e("h3",{attrs:{id:"减少绘制区域"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#减少绘制区域"}},[t._v("#")]),t._v(" 减少绘制区域")]),t._v(" "),e("p",[t._v("对于不需要重新绘制的区域应尽量避免绘制，以减少绘制区域。")]),t._v(" "),e("p",[t._v("举个🌰：一个 fix 在页面顶部的固定不变的导航 header，在页面内容某个区域 repaint 时，整个屏幕包括 fix 的 header 也会被重绘。")]),t._v(" "),e("p",[t._v("而对于固定不变的区域，我们期望其并不会被重绘，因此可以通过之前的方法，将其提升为独立的合成层。")]),t._v(" "),e("p",[t._v("减少绘制区域，需要仔细分析页面，区分绘制区域，减少重绘区域甚至避免重绘。")]),t._v(" "),e("h2",{attrs:{id:"最后-合理管理合成层"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#最后-合理管理合成层"}},[t._v("#")]),t._v(" 最后 — 合理管理合成层")]),t._v(" "),e("p",[t._v("看完上面的文章，你会发现提升合成层会达到更好的性能。这看上去非常诱人，但是问题是，创建一个新的合成层并不是免费的，它得消耗额外的内存和管理资源。实际上，在内存资源有限的设备上，合成层带来的性能改善，可能远远赶不上过多合成层开销给页面性能带来的负面影响。同时，由于每个渲染层的纹理都需要上传到 GPU 处理，因此我们还需要考虑 CPU 和 GPU 之间的带宽问题、以及有多大内存供 GPU 处理这些纹理的问题。")]),t._v(" "),e("h2",{attrs:{id:"参考文档"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#参考文档"}},[t._v("#")]),t._v(" 参考文档")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome",target:"_blank",rel:"noopener noreferrer"}},[t._v("GPU Accelerated Compositing in Chrome"),e("OutboundLink")],1)]),t._v(" "),e("p",[e("a",{attrs:{href:"https://fed.taobao.org/blog/taofed/do71ct/performance-composite",target:"_blank",rel:"noopener noreferrer"}},[t._v("无线性能优化：Composite"),e("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=n.exports}}]);