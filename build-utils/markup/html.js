/**
 * HTML ( base on Liquid ) common markup
 *
 */
// test: [/\.css$/, /\.liquid/],

const FULL_HEADING = {
  liquid: `
  {% case section.settings.align_header %}
    {% when 'left' %}
      {% assign align_class = 'text-left' %}
    {% when 'center' %}
      {% assign align_class = 'text-center' %}
    {% when 'right' %}
      {% assign align_class = 'text-right' %}
    {% else %}

  {% endcase %}

  <div class="section-header {{ align_class }}">
    <h2 class="section-header__title">{{ section.settings.heading}}</h2>
    {% if section.settings.subheading == blank %}
      <div class="sc-hr-small"></div>
    {% else %}
      <div class="section-subheading">
        <p>{{ section.settings.subheading }}</p>
      <div class="sc-hr-small"></div>
      </div>
    {% endif %}
  </div>
  `,

  jsonSchemaSetting: `
  {
    "type" : "header",
    "content": "Section header"
  },
  {
    "type": "text",
    "id": "heading",
    "label": "Heading",
    "default": "Heading of section"
  },
  {
    "type": "textarea",
    "id": "subheading",
    "label": "Sub heading",
    "default": "Sub heading of section"
  },
  {
    "type": "select",
    "id": "align_header",
    "label": "Align Header",
    "options": [
      { "value": "left", "label": "Left" },
      { "value": "center", "label": "Center" },
      { "value": "right", "label": "Right" }
    ],
    "default": "center"
  }
  `
};

module.exports = {
  html: [{
    dir: 'dist',
    test: [/\.liquid/],
    rules: [{
      search: '@HTML_FULL_HEADING',
      replace: FULL_HEADING.liquid
    }, {
      search: '@SETTING_FULL_HEADING',
      replace: FULL_HEADING.jsonSchemaSetting
    }]
  }]
}
