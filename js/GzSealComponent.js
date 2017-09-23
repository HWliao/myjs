/**
 * 印章实行组件
 * Created by HWliao on 2017/9/17.
 */
(function () {
  'use strict';

  var DATA = {
    company: {text: '印章所属公司', value: 'company'},
    save: {text: '保管人', value: 'save'},
    monitor: {text: '监印人', value: 'monitor'},
    employed: {text: '在职接收人', value: 'employed'},
    income: {text: '收入接收人', value: 'income'},
    branch: {text: '分行接收人', value: 'branch'},
    finance: {text: '财务接收人', value: 'finance'},
    hr: {text: '人事接收人', value: 'hr'}
  };

  window.GzSealComponent = {
    template: '#seal',
    data: function () {
      return {
        selectCompanies: [],
        dataFrom: utils.getCompaniesFromSeal,

        sealInfos: [],
        totalItems: 0,
        loadingTable: false,
        pagination: {page: 1, rowsPerPage: 5},
        headers: [
          {text: DATA.company.text, align: 'left', sortable: false, value: DATA.company.value},
          {text: DATA.save.text, align: 'left', sortable: false, value: DATA.save.value},
          {text: DATA.monitor.text, align: 'left', sortable: false, value: DATA.monitor.value},
          {text: DATA.employed.text, align: 'left', sortable: false, value: DATA.monitor.value},
          {text: DATA.income.text, align: 'left', sortable: false, value: DATA.income.value},
          {text: DATA.branch.text, align: 'left', sortable: false, value: DATA.branch.value},
          {text: DATA.finance.text, align: 'left', sortable: false, value: DATA.finance.value},
          {text: DATA.hr.text, align: 'left', sortable: false, value: DATA.hr.value},
          {text: '操作', align: 'center', sortable: false, value: 'op'}
        ],

        toDeleteItem: null,
        deleting: false,

        editObj: null,
        editing: false,
        editValid: false,
        editItems: [],

        replaceDialog: false,
        replaceValid: false,
        replacing: false,
        replaceItems: [
          {
            label: '选择人员',
            hint: '被替换人员',
            rules: [utils.validQuiredFunc('被替换人员不能为空')],
            select: [],
            dataFrom: utils.searchEmp
          }, {
            label: '选择人员',
            hint: '替换人员',
            rules: [utils.validQuiredFunc('替换人员不能为空')],
            select: [],
            dataFrom: utils.searchEmp
          }, {
            label: '印章所属公司',
            hint: '印章信息中对应的公司,与系统中的公司有可能存在名字上的差异. 不选择表示全部',
            select: [],
            dataFrom: utils.getCompaniesFromSeal
          }, {
            label: '印章类别',
            hint: '对应表格中想要替换的列,不选择表示全部',
            select: [],
            items: [
              {
                text: DATA.save.text,
                value: DATA.save.value
              }, {
                text: DATA.monitor.text,
                value: DATA.monitor.value
              }, {
                text: DATA.employed.text,
                value: DATA.employed.value
              }, {
                text: DATA.income.text,
                value: DATA.income.value
              }, {
                text: DATA.branch.text,
                value: DATA.branch.value
              }, {
                text: DATA.finance.text,
                value: DATA.finance.value
              }, {
                text: DATA.hr.text,
                value: DATA.hr.value
              }
            ]
          }
        ],

        snackbarText: '',
        snackbar: false,
        snackbarState: 'info'
      };
    },
    computed: {
      currPage: function () {
        return this.pagination && this.pagination.page ? this.pagination.page : 1;
      },
      editText: function () {
        if (this.editObj && !!this.editObj.id) {
          return '修改印章信息';
        }
        return '新增印章信息';
      },
      editDialog: {
        set: function (v) {
          if (!v) this.editObj = null;
        },
        get: function () {
          return !!this.editObj;
        }
      },
      deleteDialog: {
        set: function (v) {
          if (!v) this.toDeleteItem = null;
        },
        get: function () {
          return !!this.toDeleteItem
        }
      },
      editHasChange: function () {
        // editform 中数据是否有改变
        var that = this;
        if (!that.editObj) return false;
        if (!that.editItems || that.editItems.length === 0) return false;
        return this.editItems.some(function (item) {
          var oldVal = that.editObj[item.value] || undefined;
          var newVal = item.select && item.select.length > 0 && item.select[0] ? item.select[0].value || undefined : undefined;
          return oldVal !== newVal;
        });
      }
    },
    mounted: function () {
      this.doSearch(null, true);
    },
    watch: {
      pagination: {
        handler: function (val, oldVal) {
          var newRows = val.rowsPerPage;
          var newPage = val.page;
          var oldRows = oldVal.rowsPerPage;
          var oldPage = oldVal.page;

          if (newPage !== oldPage || newRows !== oldRows) {
            this.doSearch(null, true);
          }
        },
        deep: true
      }
    },
    methods: {
      doSearch: function (e, flag) {
        var that = this;
        that.loadingTable = true;
        var companyIds = this.selectCompanies.map(function (company) {
          return company.value;
        });
        companyIds = JSON.stringify(companyIds);
        var page = this.pagination.page;
        if (!flag && page !== 1) {
          // 点击查询按钮触发的查询,
          // 第一页,通过改变页码触发查询
          that.pagination.page = 1;
        }
        utils.getSealInfosByCompany({
          companyIds: companyIds,
          rowsPage: this.pagination.rowsPerPage,
          page: this.pagination.page
        }).then(function (data) {
          that.totalItems = data.total;
          that.pagination.rowsPerPage = data.rowsPage;
          that.pagination.page = data.page;
          that.sealInfos = data.data;
          that.loadingTable = false;
        }).catch(function (e) {
          console.error(e);
          alert('服务器异常');
        });
      },
      doDelete: function (id) {
        var that = this;
        that.deleting = true;
        utils.deleteSealById(id).then(function () {
          that.toDeleteItem = null;
          that.deleting = false;
          that.doSearch(null, true);
        }).catch(function (err) {
          console.error(err);
          that.toDeleteItem = null;
          that.deleting = false;
        });
      },
      editCommit: function () {
        var that = this;
        if (that.$refs.editForm.validate()) {
          that.editing = true;

          var isAdd = !(that.editObj && that.editObj.id);
          var action = isAdd ? '新增' : '修改';
          var param = null;
          if (isAdd) {
            param = {};
          } else {
            param = JSON.parse(JSON.stringify(that.editObj));
          }
          that.editItems.map(function (item) {
            param[item.text] = item.select[0].empName || item.select[0].text;
            param[item.value] = item.select[0].value;
          });
          utils.commitEditForm(param).then(function () {
            that.editing = false;
            that.editObj = null;
            that.doSearch(null, true);
            // 显示提示
            that.snackbar = true;
            that.snackbarState = 'success';
            that.snackbarText = action + '成功';
          }, function (err) {
            console.error(err);
            that.editing = false;
            // 显示提示
            that.snackbar = true;
            that.snackbarState = 'error';
            if (typeof err === 'string') {
              that.snackbarText = err;
            } else {
              that.snackbarText = action + '失败';
            }
          });
        }
      },
      editCancel: function () {
        this.editObj = null;
      },
      editModal: function (obj) {
        // 动态替换整个form
        this.editItems = utils.getEditItems(obj);
        this.editing = false;
        this.editObj = obj || {};
      },
      repalceCommit: function () {
        var that = this;
        var old = that.replaceItems[0].select[0];
        var newOne = that.replaceItems[1].select[0];

        // 选择公司
        var selectCompany = that.replaceItems[2].select.reduce(function (arr, item) {
          if (item && item.value) {
            arr.push(item.value);
          }
          return arr;
        }, []);
        selectCompany = selectCompany.length > 0 ? JSON.stringify(selectCompany) : undefined;
        // 选择字段
        var selectField = that.replaceItems[3].select.reduce(function (arr, item) {
          if (item && item.value) {
            arr.push(item.value);
          }
          return arr;
        }, []);
        selectField = selectField.length > 0 ? JSON.stringify(selectField) : undefined;

        that.replacing = true;
        utils.repalceCommit({
          oldNumber: old.value,
          oldName: old.empName || old.text,
          newNumber: newOne.value,
          newName: newOne.empName || newOne.text,
          selectCompany: selectCompany,
          selectField: selectField
        }).then(function (data) {
          that.replacing = false;
          that.replaceDialog = false;
          that.doSearch(null, true);

          that.snackbar = true;
          that.snackbarState = 'success';
          that.snackbarText = '替换成功';
        }, function (err) {
          console.error(err);
          that.replacing = false;
          that.snackbar = true;
          that.snackbarState = 'error';
          if (typeof err === 'string') {
            that.snackbarText = err;
          } else {
            that.snackbarText = '替换失败';
          }
        });
      }
    }
  };
})();
