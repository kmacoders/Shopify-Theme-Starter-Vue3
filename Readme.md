## Chuyển từ theme test sang theme chính

### 1. Snipets
- Trong folder `snipets` tạo ra file `product-w-h.liquid` để thêm phần chỉnh sửa width, height cho product.
```
<!-- Remove default value
Set empty text in fisrt init -->
<div  class="product__create__print">
	<label  for="width">Width (cm)</label>
	<input  id="productWidth"  type="text"  name="properties[Width(cm)]"/>
	
	<label  for="height">Height (cm)</label>
	<input  id="productHeight"  type="text"  name="properties[Height(cm)]"/>
</div>
```

### 2. Sections

- Trong file `product-template.liquid` ( trong folder `section` ) , include file vừa tạo bên trên vào nếu `product.type = "Creative Prints"`, thêm ngay trước phần code show giá product.
```
...

{% if  product.type == "Creative Prints" %}
	{% render  'product-w-h' %}
{% endif %}

<div  class="product-single__meta">
	<div  class="h4 product-price">
	...
...
``` 

- Thêm đoạn này vào đầu wrapper của product template, trigger run Javascript

```

{% if product.type == "Creative Prints" %}
  {% assign typeClassName = 'creative-container' %}
{% endif %}
{% if product.type == "Decorative Walls" %}
  {% assign typeClassName = 'decorative-container' %}
{% endif %}

<div class="wrapper xo-wrapper-product {{ typeClassName }}"
  {% if product.type == "Creative Prints" %} data-product-type='Creative Prints'{% endif %}
  {% if product.type == "Decorative Walls" %} data-product-type='Decorative Walls'{% endif %}
>

```

à thôi, cóp cả file  `product-template.liquid` chuyển sang cho nhanh vì bên trong còn chỉnh sửa bao nhiêu.

### 3. Assets
- Chuyển file `chroma-app.js` sang `Assets`.

### 4. Layout

- Copy toàn bộ `theme.liquid` thay thế cho `theme.liquid` trong folder `layout`.
