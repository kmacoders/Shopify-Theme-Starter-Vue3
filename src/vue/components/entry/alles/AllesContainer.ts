import { onSectionSelected } from 'Helpers/sections';
import Vue from 'vue';
import Component from 'vue-class-component';
import store from 'Vue/store/index';
import { mapActions, mapGetters } from 'vuex';

@Component({
  store,
  computed: {
    ...mapGetters('CollectionStore', {
      isCollectionLoading: 'getIsCollectionLoading',
    }),
  },
  methods: {
    ...mapActions('CollectionStore', [
      'onDisabledLoading',
    ]),
  },
})
class AllesContainer extends Vue {
  isCollectionLoading!: boolean;

  onDisabledLoading!: () => void;
}

onSectionSelected(('#loading-ui-alles'), () => {
  const allesContainer = new AllesContainer({
    el: '#loading-ui-alles',
    delimiters: ['${', '}'],
  });
});
