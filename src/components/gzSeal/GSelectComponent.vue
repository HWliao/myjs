<template>
  <el-select
    v-model="value9"
    size="small"
    multiple
    filterable
    remote
    name="test"
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading"
    style="width: 500px;">
    <el-option
      v-for="item in options4"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

</template>

<script>
  export default {
    name: 'g-select',
    data() {
      return {
        options4: [],
        value9: [],
        list: [],
        loading: false,
        states: [
          'Alabama',
          'Alaska',
          'Arizona',
          'Arkansas',
          'California',
          'Colorado',
          'Connecticut',
          'Delaware',
          'Florida',
          'Georgia',
          'Hawaii',
          'Idaho',
          'Illinois',
          'Indiana',
          'Iowa',
          'Kansas',
          'Kentucky',
          'Louisiana',
          'Maine',
          'Maryland',
          'Massachusetts',
          'Michigan',
          'Minnesota',
          'Mississippi',
          'Missouri',
          'Montana',
          'Nebraska',
          'Nevada',
          'New Hampshire',
          'New Jersey',
          'New Mexico',
          'New York',
        ],
      };
    },
    mounted() {
      this.list = this.states.map(item => ({ value: item, label: item }));
    },
    methods: {
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => (item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1));
          }, 200);
        } else {
          this.options4 = [];
        }
      },
    },
  };
</script>
