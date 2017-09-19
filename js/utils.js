(function () {
  'use strict';
  var utils = window.utils = {};
  utils.getCompaniesFromSeal = function (str) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve([{
          text: '深圳市家家顺房产交易有限公司',
          value: '330002',
          x: 1
        }, {
          text: '深圳市盛联行投资发展有限公司',
          value: '330001',
          x: 1
        }, {
          text: '深圳市盛联行投资发展有限公司',
          value: '330010',
          x: 1
        }, {
          text: '深圳市家家顺控股集团有限公司',
          value: '330007',
          x: 1
        }, {
          text: '深圳市盛联按揭代理有限公司',
          value: '330003',
          x: 1
        }, {
          text: '深圳市万顺通基金管理有限公司',
          value: '330021',
          x: 1
        }, {
          text: '深圳市乐有家网络科技有限公司',
          value: '330016',
          x: 1
        }, {
          text: '惠州市家家顺房产经纪有限公司',
          value: '330013',
          x: 1
        }, {
          text: '深圳市万顺通资产管理有限公司',
          value: '330020',
          x: 1
        }, {
          text: '深圳市顺联担保投资有限公司',
          value: '330008',
          x: 1
        }]);
      }, 1000);
    });
  };

  utils.getSealInfosByCompany = function (param) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve({
          page: 90,
          total: 100,
          rowsPage: 10,
          datas: [
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
        });
      }, 1000);
    });
  };

})();
