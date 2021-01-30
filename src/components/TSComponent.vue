<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class TSComponent extends Vue {
  // Declared as component data
  message = 'Hello Hưng Đẹp Trai !'

  mounted() {
    console.log('Test thử components Vue TS');
  }
}

const test = new TSComponent({
  // el: '', //Query to select hihih
  delimiters: ['${', '}']
});
</script>

<style>
  .product-template__container {
    border: 1px solid rgb(136, 230, 49);
  }
</style>
