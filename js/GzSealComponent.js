/**
 * 印章实行组件
 * Created by HWliao on 2017/9/17.
 */
(function () {
  'use strict';

  window.GzSealComponent = {
    template: '#seal',
    data: function () {
      return {
        mselect: [{text: 'lhw', value: 1}],
        dataFrom: function () {
          return Promise.resolve([{
            text: 't1',
            value: 1,
            x: 1
          }, {
            text: 't2',
            value: 2,
            x: 1
          }, {
            text: 't3',
            value: 3,
            x: 1
          }]);
        },
        loading: false,
        items3: [],
        search: null,
        select: [],
        states: [
          "Alabama",
          "Alaska",
          "American Samoa",
          "Arizona",
          "Arkansas",
          "California",
          "Colorado",
          "Connecticut",
          "Delaware",
          "District of Columbia",
          "Federated States of Micronesia",
          "Florida",
          "Georgia",
          "Guam",
          "Hawaii",
          "Idaho",
          "Illinois",
          "Indiana",
          "Iowa",
          "Kansas",
          "Kentucky",
          "Louisiana",
          "Maine",
          "Marshall Islands",
          "Maryland",
          "Massachusetts",
          "Michigan",
          "Minnesota",
          "Mississippi",
          "Missouri",
          "Montana",
          "Nebraska",
          "Nevada",
          "New Hampshire",
          "New Jersey",
          "New Mexico",
          "New York",
          "North Carolina",
          "North Dakota",
          "Northern Mariana Islands",
          "Ohio",
          "Oklahoma",
          "Oregon",
          "Palau",
          "Pennsylvania",
          "Puerto Rico",
          "Rhode Island",
          "South Carolina",
          "South Dakota",
          "Tennessee",
          "Texas",
          "Utah",
          "Vermont",
          "Virgin Island",
          "Virginia",
          "Washington",
          "West Virginia",
          "Wisconsin",
          "Wyoming"
        ],
        totalItems: 0,
        itemsTable: [],
        loadingTable: true,
        pagination: {rowsPerPage: 5},
        headers: [
          {text: '公司名称', align: 'left', sortable: false, value: 'name'},
          {text: '保管人', align: 'left', sortable: false, value: 'calories'},
          {text: '监印人', align: 'left', sortable: false, value: 'fat'},
          {text: '在职接收人', align: 'left', sortable: false, value: 'carbs'},
          {text: '收入接收人', align: 'left', sortable: false, value: 'protein'},
          {text: '分行接收人', align: 'left', sortable: false, value: 'sodium'},
          {text: '财务接收人', align: 'left', sortable: false, value: 'calcium'},
          {text: '人事接收人', align: 'left', sortable: false, value: 'iron'},
          {text: '操作', align: 'center', sortable: false, value: 'op'}
        ],
        dialog: false,
        dialog1: false,
        editItems: [{
          label: '*选择公司',
          loading: false,
          items: [],
          rules: [function () {
            console.log(arguments);
            return true;
          } || 'You must choose at least one'],
          search: '',
          select: []
        }, {
          label: '*选择公司',
          loading: false,
          items: [],
          rules: [function () {
            console.log(arguments);
            return true;
          } || 'You must choose at least one'],
          search: '',
          select: []
        }, {
          label: '*选择公司',
          loading: false,
          items: [],
          rules: [function () {
            console.log(arguments);
            return true;
          } || 'You must choose at least one'],
          search: '',
          select: []
        }, {
          label: '*选择公司',
          loading: false,
          items: [],
          rules: [function () {
            console.log(arguments);
            return true;
          } || 'You must choose at least one'],
          search: '',
          select: []
        }, {
          label: '*选择公司',
          loading: false,
          items: [],
          rules: [function () {
            console.log(arguments);
            return true;
          } || 'You must choose at least one'],
          search: '',
          select: []
        }, {
          label: '*选择公司',
          loading: false,
          items: [],
          rules: [function () {
            console.log(arguments);
            return true;
          } || 'You must choose at least one'],
          search: '',
          select: []
        }, {
          label: '*选择公司',
          loading: false,
          items: [],
          rules: [function () {
            console.log(arguments);
            return true;
          } || 'You must choose at least one'],
          search: '',
          select: []
        }, {
          label: '*选择公司',
          loading: false,
          items: [],
          rules: [function () {
            console.log(arguments);
            return true;
          } || 'You must choose at least one'],
          search: '',
          select: []
        }],
      };
    },
    mounted: function () {
      this.getDataFromApi()
        .then(data => {
          this.itemsTable = data.items;
          this.totalItems = data.total;
        })
    },
    watch: {
      search: function (val) {
        val && this.querySelections(val)
      },
      pagination: {
        handler() {
          this.getDataFromApi()
            .then(data => {
              this.itemsTable = data.items;
              this.totalItems = data.total;
            })
        },
        deep: true
      }
    },
    methods: {
      querySelections(v) {
        this.loading = true;
        // Simulated ajax query
        setTimeout(() => {
          this.items3 = this.states.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          });
          this.loading = false
        }, 500);
      },
      getDataFromApi() {
        this.loadingTable = true;
        return new Promise((resolve, reject) => {
          const {sortBy, descending, page, rowsPerPage} = this.pagination;
          let items = this.getDesserts();
          const total = items.length;
          if (this.pagination.sortBy) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy];
              const sortB = b[sortBy];
              if (descending) {
                if (sortA < sortB) return 1;
                if (sortA > sortB) return -1;
                return 0;
              } else {
                if (sortA < sortB) return -1;
                if (sortA > sortB) return 1;
                return 0;
              }
            })
          }
          if (rowsPerPage > 0) {
            items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage);
          }
          setTimeout(() => {
            this.loadingTable = false;
            resolve({
              items,
              total
            })
          }, 1000);
        });
      },
      getDesserts() {
        return [
          {
            value: false,
            name: '家家顺xxxxx',
            calories: '廖红卫',
            fat: '廖红卫',
            carbs: '廖红卫',
            protein: '廖红卫',
            sodium: '廖红卫',
            calcium: '廖红卫',
            iron: '廖红卫'
          },
          {
            value: false,
            name: '家家顺',
            calories: '廖红卫',
            fat: '廖红卫',
            carbs: '廖红卫',
            protein: '廖红卫',
            sodium: '廖红卫',
            calcium: '廖红卫',
            iron: '廖红卫'
          },
          {
            value: false,
            name: '家家顺',
            calories: '廖红卫',
            fat: '廖红卫',
            carbs: '廖红卫',
            protein: '廖红卫',
            sodium: '廖红卫',
            calcium: '廖红卫',
            iron: '廖红卫'
          },
          {
            value: false,
            name: '家家顺',
            calories: '廖红卫',
            fat: '廖红卫',
            carbs: '廖红卫',
            protein: '廖红卫',
            sodium: '廖红卫',
            calcium: '廖红卫',
            iron: '廖红卫'
          },
          {
            value: false,
            name: '家家顺',
            calories: '廖红卫',
            fat: '廖红卫',
            carbs: '廖红卫',
            protein: '廖红卫',
            sodium: '廖红卫',
            calcium: '廖红卫',
            iron: '廖红卫'
          },
          {
            value: false,
            name: '家家顺',
            calories: '廖红卫',
            fat: '廖红卫',
            carbs: '廖红卫',
            protein: '廖红卫',
            sodium: '廖红卫',
            calcium: '廖红卫',
            iron: '廖红卫'
          },
          {
            value: false,
            name: '家家顺',
            calories: '廖红卫',
            fat: '廖红卫',
            carbs: '廖红卫',
            protein: '廖红卫',
            sodium: '廖红卫',
            calcium: '廖红卫',
            iron: '廖红卫'
          },
          {
            value: false,
            name: '家家顺',
            calories: '廖红卫',
            fat: '廖红卫',
            carbs: '廖红卫',
            protein: '廖红卫',
            sodium: '廖红卫',
            calcium: '廖红卫',
            iron: '廖红卫'
          },
          {
            value: false,
            name: '家家顺',
            calories: '廖红卫',
            fat: '廖红卫',
            carbs: '廖红卫',
            protein: '廖红卫',
            sodium: '廖红卫',
            calcium: '廖红卫',
            iron: '廖红卫'
          },
          {
            value: false,
            name: '家家顺',
            calories: '廖红卫',
            fat: '廖红卫',
            carbs: '廖红卫',
            protein: '廖红卫',
            sodium: '廖红卫',
            calcium: '廖红卫',
            iron: '廖红卫'
          }
        ]
      }
    }
  };
})();
