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
        selectCompanies: [],
        dataFrom: utils.getCompaniesFromSeal,

        sealInfos: [],
        totalItems: 0,
        loadingTable: false,
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
    computed: {
      currPage: function () {
        return this.pagination && this.pagination.page ? this.pagination.page : 1;
      }
    },
    mounted: function () {
      this.doSearch();
    },
    watch: {
      pagination: {
        handler() {
          this.doSearch();
        },
        deep: true
      }
    },
    methods: {
      doSearch: function () {
        var that = this;
        that.loadingTable = true;
        var companyIds = this.selectCompanies.map(function (company) {
          return company.value;
        });
        utils.getSealInfosByCompany({
          companyIds: companyIds,
          rows: this.pagination.rowsPerPage,
          page: this.pagination.page
        }).then(function (data) {
          that.totalItems = data.total;
          that.pagination.rowsPerPage = data.rowsPage;
          that.pagination.page = data.page;
          that.sealInfos = data.datas;
          that.loadingTable = false;
        }).catch(function (e) {
          console.error(e);
          alert('服务器异常');
        });
      }
    }
  };
})();
