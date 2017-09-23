(function () {
  'use strict';
  var utils = window.utils = {};
  utils.getCompaniesFromSeal = function (str) {
    return ajaxPost('/gz/seal/company/query', {str: str}).then(function (data) {
      var companies = [];
      if (data && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var company = data[i];
          if (company && company.companyId) {
            companies.push({
              value: company.companyId,
              text: company.company || ''
            });
          }
        }
      }
      return companies;
    }, function (err) {
      return [];
    });
  };

  utils.getSealInfosByCompany = function (param) {
    return ajaxPost('/gz/seal/query/companyIds', param).then(function (data) {
      return data || [];
    }, function (err) {
      return param;
    });
  };

  utils.deleteSealById = function (id) {
    return ajaxPost('/gz/seal/updateToDelete', {id: id}).then(function (data) {
      if (data != 1) {
        return Promise.reject(data.infoStr);
      }
      return data.infoNo;
    });
  };

  utils.searchEmp = function (str) {
    str = str || '';
    return ajaxPost('/gz/emp/search', {str: str}).then(function (data) {
      if (data && data.length > 0) {
        return data.map(function (item) {
          return {
            text: item.empName + '--' + item.deptName,
            value: item.empNumber,
            deptName: item.deptName,
            deptNumber: item.deptNumber,
            empName: item.empName
          };
        });
      }
      return [];
    });
  };

  utils.searchCompany = function (str) {
    str = str || '';
    return ajaxPost('/gz/company/query', {sealId: 1, companyName: str}).then(function (data) {
      if (data && data.length > 0) {
        return data.map(function (item) {
          return {
            text: item.itemName || '',
            value: item.itemId
          };
        });
      }
      return [];
    });
  };

  utils.commitEditForm = function (param) {
    console.log(param);
    return ajaxPost('/gz/seal/updateOrAdd', param).then(function (data) {
      console.log(data);
      return 1;
    });
  };

  utils.repalceCommit = function (param) {
    return ajaxPost('/gz/seal/repalceEmpInSeal', param).then(function (data) {
      console.log(data);
      return data;
    });
  };

  utils.validQuiredFunc = function (str) {
    str = str || '';
    return function (val) {
      if (val && val.value !== null && val.value !== undefined) {
        return true;
      }
      return str;
    }
  };
  var id = 0;
  utils.getEditItems = function (obj) {
    var items = [{
      text: 'company',
      value: 'companyId',
      label: '印章所属公司',
      hint: '印章所属公司',
      rules: [utils.validQuiredFunc('印章所属公司不能为空')],
      select: [],
      dataFrom: utils.searchCompany
    }, {
      text: 'saveEmpName',
      value: 'saveEmpId',
      label: '保管人',
      hint: '印章保管人',
      rules: [utils.validQuiredFunc('印章保管人不能为空')],
      select: [],
      dataFrom: utils.searchEmp
    }, {
      text: 'monitorEmpName',
      value: 'monitorEmpId',
      label: '监印人',
      hint: '印章监印人',
      rules: [utils.validQuiredFunc('监印人不能为空')],
      select: [],
      dataFrom: utils.searchEmp
    }, {
      text: 'employedEmpName',
      value: 'employedEmpId',
      label: '在职接收人',
      hint: '盖在职/实习协议章的接收人',
      rules: [utils.validQuiredFunc('在职接收人不能为空')],
      select: [],
      dataFrom: utils.searchEmp
    }, {
      text: 'incomeEmpName',
      value: 'incomeEmpId',
      label: '收入证明接收人',
      hint: '盖收入证明章的接收人',
      rules: [utils.validQuiredFunc('收入证明接收人不能为空')],
      select: [],
      dataFrom: utils.searchEmp
    }, {
      text: 'branchEmpName',
      value: 'branchEmpId',
      label: '分行接收人',
      hint: '盖分行章接收人',
      rules: [utils.validQuiredFunc('分行接收人不能为空')],
      select: [],
      dataFrom: utils.searchEmp
    }, {
      text: 'financeEmpName',
      value: 'financeEmpId',
      label: '财务接收人',
      hint: '盖财务章接收人',
      rules: [utils.validQuiredFunc('财务接收人不能为空')],
      select: [],
      dataFrom: utils.searchEmp
    }, {
      text: 'hrEmpName',
      value: 'hrEmpId',
      label: '人事章接收人',
      hint: '盖人事章接收人',
      rules: [utils.validQuiredFunc('人事章接收人不能为空')],
      select: [],
      dataFrom: utils.searchEmp
    }];
    return items.map(function (item) {
      item.id = id++;
      if (obj) {
        item.select = [{
          text: obj[item.text],
          value: obj[item.value]
        }];
      }
      return item;
    });
  };

  function ajaxPost(url, param) {
    return new Promise(function (resolve, reject) {
      $.post(url, param).then(function (res) {
        if (res.infoNo == '1') {
          resolve(res.data);
        } else {
          alert(res.infoStr || '服务异常');
          console.error(res);
          reject(res.infoStr);
        }
      }, function (err) {
        alert('服务异常');
        console.error(err);
        reject(err);
      });
    });
  }

})();
