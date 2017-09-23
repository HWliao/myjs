/**
 * auto select 组件包装
 */
(function () {
  'use strict';
  window.MSelect = {
    template: '#MSelect',
    props: {
      multiple: {
        type: Boolean,
        default: false
      },
      debounceSearch: {
        type: Number,
        default: 200
      },
      disabled: {
        type: Boolean,
        default: false
      },
      hint: {
        type: String,
        required: true
      },
      persistentHint: {
        type: Boolean,
        default: true
      },
      label: {
        type: String,
        required: true
      },
      noDataText: {
        type: String,
        default: '暂无数据'
      },
      required: {
        type: Boolean,
        default: false
      },
      returnObject: {
        type: Boolean,
        default: true
      },
      rules: {
        type: Array,
        default: function () {
          return [];
        }
      },
      dataFrom: {
        type: Function,
        required: true
      },
      value: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    computed: {},
    data: function () {
      var select = null, items = null;
      // 对于输入值进行处理
      if (this.multiple) {
        select = this.value;
        items = [].concat(this.value);
      } else {
        select = this.value[0] || {};
        items = this.value[0] ? [this.value[0]] : [];
      }
      return {
        select: select,
        clearable: true,
        autocomplete: true,
        browserAutocomplete: 'off',
        searchInput: null,
        loading: false,
        items: items
      }
    },
    watch: {
      searchInput: function (val) {
        this.querySelections(val);
      },
      select: {
        handler: function (v) {
          if (v instanceof Array) {
            this.$emit('input', v);
          } else {
            this.$emit('input', [v]);
          }
        },
        deep: true
      }
    },
    methods: {
      doclick: function () {
        this.querySelections(this.searchInput || '');
      },
      querySelections: function (v) {
        var that = this;
        that.loading = true;
        that.dataFrom(v).then(function (dItems) {
          if (dItems && dItems.length > 0) {
            that.items = dItems;
          }
          that.loading = false;
        }).catch(function (e) {
          console.error(e);
          that.loading = false;
        });
      }
    }
  };
})();
